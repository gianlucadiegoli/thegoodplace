// Fonte: Wikidata SPARQL endpoint (https://query.wikidata.org/sparql)
//
// Cerca aziende con: sito ufficiale (P856), settore di attivita (P452),
// e controversie note (rapportate tramite articoli "criticism of X"
// o "controversies involving X"). Queste ultime sono euristiche.

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT = "TheGoodPlace-ESG-Bot/1.0 (extension build script)";

// Settori considerati controversi
const CONTROVERSIAL_INDUSTRIES = {
  Q11463: "fossil_fuel", // petroleum industry
  Q192451: "fossil_fuel", // oil and gas industry
  Q6500733: "fossil_fuel", // coal industry
  Q219577: "tobacco",
  Q170877: "gambling",
  Q1639825: "mining",
  Q245065: "fast_fashion", // fast fashion (se presente)
  Q282: "banking", // bank
};

export async function fetchWikidataCompanies({ limit = 2000 } = {}) {
  // Query SPARQL: aziende con sito web, nome e (opzionalmente) industria
  const query = `
    SELECT DISTINCT ?company ?companyLabel ?website ?industryLabel ?countryLabel WHERE {
      ?company wdt:P31/wdt:P279* wd:Q4830453 .  # business enterprise
      ?company wdt:P856 ?website .              # official website
      OPTIONAL { ?company wdt:P452 ?industry . }
      OPTIONAL { ?company wdt:P17 ?country . }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en,it" . }
    }
    LIMIT ${limit}
  `;

  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&format=json`;

  const r = await fetch(url, {
    headers: {
      Accept: "application/sparql-results+json",
      "User-Agent": USER_AGENT,
    },
  });

  if (!r.ok) {
    throw new Error(`Wikidata SPARQL errore: ${r.status}`);
  }

  const json = await r.json();
  return json.results.bindings.map(normalizeWikidata).filter(Boolean);
}

function normalizeWikidata(row) {
  const website = row.website?.value;
  if (!website) return null;

  const domain = extractDomain(website);
  if (!domain) return null;

  const industry = row.industryLabel?.value?.toLowerCase() || "";
  let sector = null;
  if (/oil|gas|petroleum|coal|fossil/.test(industry)) sector = "fossil_fuel";
  else if (/tobacco/.test(industry)) sector = "tobacco";
  else if (/gambling|casino/.test(industry)) sector = "gambling";
  else if (/mining/.test(industry)) sector = "mining";
  else if (/bank|financial/.test(industry)) sector = "banking";
  else if (/fashion|apparel|clothing/.test(industry)) sector = "fashion";

  return {
    source: "wikidata",
    domain,
    name: row.companyLabel?.value,
    sector,
    country: row.countryLabel?.value,
    wikidata_id: row.company?.value.split("/").pop(),
  };
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
