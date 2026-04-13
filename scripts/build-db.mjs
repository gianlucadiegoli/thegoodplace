// Orchestratore della pipeline di build.
// Unisce tutte le fonti, applica lo scoring, produce data/brands.json.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { fetchBCorps } from "./sources/bcorp.mjs";
import { fetchWikidataCompanies } from "./sources/wikidata.mjs";
import { fetchCurated } from "./sources/curated.mjs";
import { fetchGoodOnYou } from "./sources/goodonyou.mjs";
import { fetchEthicalConsumer } from "./sources/ethicalconsumer.mjs";
import { fetchCDP } from "./sources/cdp.mjs";
import {
  baselineScores,
  applyBCorp,
  applyFossilFinance,
  applyWeapons,
  applyControversy,
  applySector,
  applyGoodOnYou,
  applyEthicalConsumer,
  applyCDP,
  overallScore,
} from "./scoring.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "data", "brands.json");

const ONLY = process.argv
  .find((a) => a.startsWith("--only="))
  ?.split("=")[1];

async function main() {
  console.log("Build DB - The Good Place\n");

  const records = [];

  if (!ONLY || ONLY === "bcorp") {
    console.log("Scarico B Corp directory...");
    try {
      records.push(...(await fetchBCorps()));
      console.log(`  ${records.length} aziende B Corp totali\n`);
    } catch (e) {
      console.error(`  Errore B Corp: ${e.message}\n`);
    }
  }

  if (!ONLY || ONLY === "wikidata") {
    console.log("Scarico Wikidata...");
    try {
      const wd = await fetchWikidataCompanies({ limit: 3000 });
      records.push(...wd);
      console.log(`  ${wd.length} aziende da Wikidata\n`);
    } catch (e) {
      console.error(`  Errore Wikidata: ${e.message}\n`);
    }
  }

  if (!ONLY || ONLY === "curated") {
    console.log("Carico lista curata...");
    const curated = await fetchCurated();
    records.push(...curated);
    console.log(`  ${curated.length} voci curate\n`);
  }

  if (!ONLY || ONLY === "goodonyou") {
    console.log("Carico Good On You...");
    const goy = await fetchGoodOnYou();
    records.push(...goy);
    console.log(`  ${goy.length} brand moda\n`);
  }

  if (!ONLY || ONLY === "ethicalconsumer") {
    console.log("Carico Ethical Consumer...");
    const ec = await fetchEthicalConsumer();
    records.push(...ec);
    console.log(`  ${ec.length} brand\n`);
  }

  if (!ONLY || ONLY === "cdp") {
    console.log("Carico CDP A-List...");
    const cdp = await fetchCDP();
    records.push(...cdp);
    console.log(`  ${cdp.length} aziende con grade climate\n`);
  }

  console.log(`Totale record grezzi: ${records.length}\n`);

  // Raggruppa per dominio
  const grouped = new Map();
  for (const r of records) {
    if (!r.domain) continue;
    const key = normalizeDomain(r.domain);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(r);
  }

  console.log(`Domini unici: ${grouped.size}\n`);

  // Calcola scoring per ogni dominio
  const brands = {};
  for (const [domain, entries] of grouped) {
    const scored = scoreEntries(entries);
    if (scored) brands[domain] = scored;
  }

  console.log(`Brand con punteggio: ${Object.keys(brands).length}\n`);

  const output = {
    meta: {
      version: "2.0.0",
      lastUpdated: new Date().toISOString().slice(0, 10),
      totalBrands: Object.keys(brands).length,
      sources: [
        "B Corp Directory (bcorporation.net)",
        "Wikidata (wikidata.org)",
        "Banking on Climate Chaos 2024 (bankingonclimatechaos.org)",
        "Don't Bank on the Bomb 2024 (dontbankonthebomb.com)",
        "Carbon Majors (influencemap.org)",
        "Good On You (goodonyou.eco)",
        "Ethical Consumer (ethicalconsumer.org)",
        "CDP - Carbon Disclosure Project (cdp.net)",
      ],
      criteria: {
        ambiente: "Impatto ambientale: emissioni CO2, finanza fossile, economia circolare",
        diritti_lavoro: "Diritti dei lavoratori: salari equi, sicurezza, supply chain",
        trasparenza: "Trasparenza fiscale: pagamento tasse, reporting pubblico",
        governance: "Governance etica: diversita, anticorruzione, lobby responsabile",
        comunita: "Impatto sulla comunita: investimenti sociali, inclusione",
        armamenti: "Non coinvolgimento in armamenti e settori controversi",
      },
    },
    brands,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Scritto ${OUT_PATH}`);
}

function scoreEntries(entries) {
  const scores = baselineScores();
  const fontiSet = new Set();
  const notes = [];
  let name = null;

  for (const e of entries) {
    if (e.name && !name) name = e.name;

    if (e.source === "bcorp") {
      applyBCorp(scores, e.bcorp_score);
      fontiSet.add("B Corp Directory");
      notes.push(`Certificata B Corp (score ${e.bcorp_score}).`);
    }

    if (e.fossil_finance_bn) {
      applyFossilFinance(scores, e.fossil_finance_bn);
      fontiSet.add("Banking on Climate Chaos 2024");
      notes.push(`Finanza fossile: ${e.fossil_finance_bn} mld USD (2016-2023).`);
    }

    if (e.weapons) {
      applyWeapons(scores, e.weapons);
      fontiSet.add("Don't Bank on the Bomb 2024");
      if (e.weapons === "producer") notes.push("Produttore di armamenti controversi.");
      if (e.weapons.startsWith("financier")) notes.push("Finanziatore di armamenti nucleari.");
    }

    if (e.sector) {
      applySector(scores, e.sector);
      if (e.sector === "fossil_fuel") {
        fontiSet.add("Carbon Majors");
        notes.push("Settore combustibili fossili.");
      }
    }

    if (e.controversies) {
      for (const c of e.controversies) {
        applyControversy(scores, c);
      }
      fontiSet.add(sourceDisplayName(e.source));
      notes.push(`Controversie: ${e.controversies.join(", ")}.`);
    }

    if (e.goodonyou_rating) {
      applyGoodOnYou(scores, e.goodonyou_rating);
      fontiSet.add("Good On You");
      const labels = { 1: "We Avoid", 2: "Not Good Enough", 3: "It's a Start", 4: "Good", 5: "Great" };
      notes.push(`Good On You: ${labels[e.goodonyou_rating]}.`);
    }

    if (e.ec_rating) {
      applyEthicalConsumer(scores, e.ec_rating);
      fontiSet.add("Ethical Consumer");
      if (e.ec_rating === "best") notes.push("Ethical Consumer: Best Buy.");
      if (e.ec_rating === "worst") notes.push("Ethical Consumer: da evitare.");
    }

    if (e.cdp_climate) {
      applyCDP(scores, e.cdp_climate);
      fontiSet.add("CDP");
      if (e.cdp_climate === "A") notes.push("CDP Climate A List.");
      else if (e.cdp_climate === "F") notes.push("CDP Climate: F (non disclosure).");
      else notes.push(`CDP Climate grade: ${e.cdp_climate}.`);
    }

    if (e.positive === "ethical_bank") {
      scores.ambiente = 9;
      scores.diritti_lavoro = 9;
      scores.trasparenza = 10;
      scores.governance = 9;
      scores.comunita = 10;
      scores.armamenti = 10;
      fontiSet.add("Global Alliance for Banking on Values");
      notes.push("Membro dell'alleanza globale per la finanza etica.");
    }
  }

  if (!name) return null;

  return {
    name,
    scores,
    overall: overallScore(scores),
    note: notes.join(" ") || "Dati aggregati da fonti pubbliche.",
    fonti: [...fontiSet],
  };
}

function sourceDisplayName(key) {
  const map = {
    oxfam: "Oxfam",
    icij: "ICIJ",
    clean_clothes: "Clean Clothes Campaign",
    eff: "Electronic Frontier Foundation",
    amnesty: "Amnesty International",
    breakfreefromplastic: "Break Free From Plastic",
    globalwitness: "Global Witness",
    recommon: "ReCommon",
    carbonmajors: "Carbon Majors",
    banktrack: "BankTrack",
    dbob: "Don't Bank on the Bomb",
    bcorp: "B Corp Directory",
    wikidata: "Wikidata",
    gabv: "Global Alliance for Banking on Values",
    ethical_consumer: "Ethical Consumer",
    goodonyou: "Good On You",
    cdp: "CDP",
  };
  return map[key] || key;
}

function normalizeDomain(d) {
  return d.replace(/^www\./, "").toLowerCase();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
