// Converte dati grezzi delle varie fonti in punteggi 0-10
// sui 6 criteri: ambiente, diritti_lavoro, trasparenza, governance, comunita, armamenti

const CRITERIA = [
  "ambiente",
  "diritti_lavoro",
  "trasparenza",
  "governance",
  "comunita",
  "armamenti",
];

/**
 * Punteggio di partenza neutrale (5/10) per ogni criterio.
 * Ogni fonte aggiunge/sottrae punti sui criteri rilevanti.
 */
export function baselineScores() {
  const s = {};
  for (const c of CRITERIA) s[c] = 5;
  return s;
}

/**
 * Applica modificatori di B Corp. La certificazione B Corp richiede
 * standard verificati su ambiente, lavoratori, comunita e governance.
 *
 * Il punteggio B Impact Assessment (0-200+) influenza l'ampiezza del bonus.
 */
export function applyBCorp(scores, bcorpScore) {
  // 80 e' la soglia minima di certificazione
  // 120+ e' considerato eccellente
  const bonus = Math.min(4, Math.max(2, (bcorpScore - 80) / 20));

  scores.ambiente = clamp(scores.ambiente + bonus);
  scores.diritti_lavoro = clamp(scores.diritti_lavoro + bonus);
  scores.comunita = clamp(scores.comunita + bonus);
  scores.governance = clamp(scores.governance + bonus - 0.5);
  scores.trasparenza = clamp(scores.trasparenza + 1.5); // report pubblico obbligatorio
  return scores;
}

/**
 * Penalita per finanziamento a combustibili fossili (fonte: BankTrack)
 * miliardi USD dal 2016 (report Banking on Climate Chaos)
 */
export function applyFossilFinance(scores, billionsUSD) {
  const penalty = Math.min(4, Math.log10(Math.max(1, billionsUSD)) * 1.2);
  scores.ambiente = clamp(scores.ambiente - penalty);
  scores.governance = clamp(scores.governance - penalty * 0.3);
  return scores;
}

/**
 * Penalita per finanziamento/produzione di armamenti controversi
 * (Don't Bank on the Bomb, PAX)
 */
export function applyWeapons(scores, kind) {
  // kind: 'producer' | 'financier_nuclear' | 'financier_conventional'
  const penalties = {
    producer: 8,
    financier_nuclear: 5,
    financier_conventional: 3,
  };
  const p = penalties[kind] || 0;
  scores.armamenti = clamp(scores.armamenti - p);
  scores.governance = clamp(scores.governance - 1);
  return scores;
}

/**
 * Penalita per controversie documentate su Wikidata
 * (P1027 controversia, P1552 notable work con significato negativo, ecc.)
 */
export function applyControversy(scores, type) {
  const map = {
    labor_violation: { diritti_lavoro: -3, governance: -1 },
    tax_evasion: { trasparenza: -3, governance: -2 },
    corruption: { governance: -4, trasparenza: -2 },
    environmental_disaster: { ambiente: -4, comunita: -2 },
    human_rights: { diritti_lavoro: -2, comunita: -3 },
    greenwashing: { trasparenza: -2, ambiente: -1 },
    data_privacy: { comunita: -2, governance: -1 },
  };
  const mods = map[type] || {};
  for (const [k, v] of Object.entries(mods)) {
    scores[k] = clamp(scores[k] + v);
  }
  return scores;
}

/**
 * Settore di attivita: certi settori hanno un punteggio armamenti pieno se non coinvolti
 */
export function applySector(scores, sector) {
  const penalties = {
    fossil_fuel: { ambiente: -3, comunita: -1 },
    tobacco: { comunita: -3, diritti_lavoro: -1 },
    gambling: { comunita: -2 },
    fast_fashion: { ambiente: -2, diritti_lavoro: -2 },
    mining: { ambiente: -3, comunita: -2, diritti_lavoro: -1 },
    banking: {}, // valutato su base finanziamenti
  };
  const mods = penalties[sector] || {};
  for (const [k, v] of Object.entries(mods)) {
    scores[k] = clamp(scores[k] + v);
  }
  return scores;
}

export function clamp(n, min = 0, max = 10) {
  return Math.max(min, Math.min(max, Math.round(n * 10) / 10));
}

export function overallScore(scores) {
  const vals = Object.values(scores);
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}
