// Fonte: B Lab / B Corp Directory (https://www.bcorporation.net/en-us/find-a-b-corp)
//
// Il sito e' migrato da Algolia a Typesense. Le credenziali di ricerca
// sono pubbliche (la chiave e' search-only) ed estratte dalle richieste
// di rete del sito ufficiale.
//
// Se smette di funzionare: apri bcorporation.net, DevTools -> Network,
// filtra "typesense", esegui una ricerca e leggi i nuovi valori nella
// Request URL / Request Headers / Payload.

const TYPESENSE_HOST = "94eo8lmsqa0nd3j5p.a1.typesense.net";
const TYPESENSE_API_KEY = "eoWf8NTNsTFdaxcxNSuyaKAjLeV4T3F0"; // search-only
const COLLECTION = "companies-production-en-us";

const PER_PAGE = 250; // max consentito da Typesense

export async function fetchBCorps({ maxPages = 50 } = {}) {
  const results = [];

  for (let page = 1; page <= maxPages; page++) {
    const url = `https://${TYPESENSE_HOST}/multi_search?x-typesense-api-key=${TYPESENSE_API_KEY}`;

    const body = {
      searches: [
        {
          collection: COLLECTION,
          q: "*",
          query_by: "name",
          per_page: PER_PAGE,
          page,
          exhaustive_search: true,
        },
      ],
    };

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Origin: "https://www.bcorporation.net",
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      throw new Error(`B Corp Typesense errore: ${r.status} ${await r.text()}`);
    }

    const data = await r.json();
    const hits = data.results?.[0]?.hits || [];
    results.push(...hits);

    const total = data.results?.[0]?.found || 0;
    console.log(`  B Corp: pagina ${page}, scaricate ${results.length}/${total}`);

    if (results.length >= total || hits.length === 0) break;
  }

  return results.map(normalizeBCorp).filter(Boolean);
}

function normalizeBCorp(hit) {
  const doc = hit.document || hit;

  // Il campo website puo' chiamarsi in modi diversi; provo varie combinazioni
  const website =
    doc.website ||
    doc.websiteUrl ||
    doc.url ||
    doc.companyWebsite ||
    (Array.isArray(doc.websiteKeywords) ? doc.websiteKeywords[0] : doc.websiteKeywords);

  if (!website) return null;
  const domain = extractDomain(website);
  if (!domain) return null;

  return {
    source: "bcorp",
    domain,
    name: doc.name || doc.companyName,
    bcorp_score: doc.overallScore || doc.currentScore || doc.score || 85,
    industry: doc.industry || doc.sector,
    country: doc.hqCountry || doc.country,
    raw: doc,
  };
}

function extractDomain(url) {
  try {
    let s = String(url).trim();
    if (!s) return null;
    if (!/^https?:\/\//i.test(s)) s = "https://" + s;
    return new URL(s).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
