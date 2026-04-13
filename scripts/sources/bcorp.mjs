// Fonte: B Lab / B Corp Directory (https://www.bcorporation.net/en-us/find-a-b-corp)
//
// Il sito usa Algolia per la ricerca. L'API key e l'app ID sono pubblicamente
// esposti nel JS del sito ufficiale. Qui li usiamo per scaricare tutte le
// aziende certificate.
//
// NOTA: B Lab potrebbe cambiare questi parametri. In caso di errore,
// controlla le richieste di rete su https://www.bcorporation.net
// cercando una chiamata ad algolia.net.

const ALGOLIA_APP_ID = "OUP2SH13CR";
const ALGOLIA_API_KEY = "5dcc4fcb88ac89e5c5ba4945ae41a165"; // search-only public key
const INDEX_NAME = "bcorp_production";

const HITS_PER_PAGE = 1000;

export async function fetchBCorps({ maxPages = 10 } = {}) {
  const results = [];

  for (let page = 0; page < maxPages; page++) {
    const url = `https://${ALGOLIA_APP_ID.toLowerCase()}-dsn.algolia.net/1/indexes/${INDEX_NAME}/query`;

    const body = {
      params: `hitsPerPage=${HITS_PER_PAGE}&page=${page}&query=`,
    };

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "X-Algolia-API-Key": ALGOLIA_API_KEY,
        "X-Algolia-Application-Id": ALGOLIA_APP_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      throw new Error(`B Corp API errore: ${r.status} ${await r.text()}`);
    }

    const data = await r.json();
    results.push(...data.hits);

    console.log(`  B Corp: pagina ${page + 1}/${data.nbPages}, aziende: ${results.length}`);

    if (page + 1 >= data.nbPages) break;
  }

  return results.map(normalizeBCorp).filter(Boolean);
}

function normalizeBCorp(hit) {
  const website = hit.website || hit.url || hit.company_website;
  if (!website) return null;

  const domain = extractDomain(website);
  if (!domain) return null;

  return {
    source: "bcorp",
    domain,
    name: hit.company_name || hit.name,
    bcorp_score: hit.overall_score || hit.current_score || 80,
    industry: hit.industry_category || hit.sector,
    country: hit.country,
    certified_since: hit.date_first_certified || hit.current_status_date,
    raw: hit,
  };
}

function extractDomain(url) {
  try {
    if (!/^https?:\/\//.test(url)) url = "https://" + url;
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
