// Fonte: B Lab / B Corp Directory (https://www.bcorporation.net/en-us/find-a-b-corp)
//
// Pipeline a due fasi:
//  1. Typesense restituisce nome, slug, score e metadata per tutte le B Corp
//  2. Per ogni slug scarichiamo la pagina azienda e estraiamo l'URL del sito
//     ufficiale dall'HTML, con cache persistente per non rifare le richieste
//
// Le credenziali Typesense sono pubbliche (search-only) ed estratte dalle
// richieste di rete del sito bcorporation.net.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, "..", "..", ".cache");
const CACHE_FILE = join(CACHE_DIR, "bcorp-websites.json");

const TYPESENSE_HOST = "94eo8lmsqa0nd3j5p.a1.typesense.net";
const TYPESENSE_API_KEY = "eoWf8NTNsTFdaxcxNSuyaKAjLeV4T3F0";
const COLLECTION = "companies-production-en-us";
const PER_PAGE = 250;

const COMPANY_PAGE_BASE = "https://www.bcorporation.net/en-us/find-a-b-corp/company/";
const CONCURRENCY = 8;           // richieste parallele
const REQUEST_DELAY_MS = 50;     // pausa dopo ogni request (gentile)

export async function fetchBCorps({ maxPages = 100, skipWebsite = false } = {}) {
  console.log("  Fase 1/2: scarico indice Typesense...");
  const companies = await fetchTypesenseAll(maxPages);
  console.log(`  Fase 1/2: ${companies.length} B Corp dall'indice`);

  if (skipWebsite) {
    // utile per test senza scraping
    return companies.map(normalize).filter(Boolean);
  }

  console.log("  Fase 2/2: estraggo i website dalle pagine aziendali...");
  const websiteMap = await loadCache();
  const initialCached = websiteMap.size;

  const todo = companies.filter((c) => !websiteMap.has(c.slug));
  console.log(`  Cache: ${initialCached} gia' noti, ${todo.length} da scaricare`);

  let done = 0;
  let failed = 0;

  await parallelMap(todo, CONCURRENCY, async (c) => {
    try {
      const website = await fetchCompanyWebsite(c.slug);
      websiteMap.set(c.slug, website || null);
    } catch (e) {
      websiteMap.set(c.slug, null);
      failed++;
    }
    done++;
    if (done % 100 === 0) {
      console.log(`    ${done}/${todo.length} (${failed} errori)`);
      await saveCache(websiteMap);
    }
    if (REQUEST_DELAY_MS) await sleep(REQUEST_DELAY_MS);
  });

  await saveCache(websiteMap);
  console.log(`  Fase 2/2: completata (${done} scaricate, ${failed} errori)`);

  return companies
    .map((c) => normalize(c, websiteMap.get(c.slug)))
    .filter(Boolean);
}

// ---------- Typesense ----------

async function fetchTypesenseAll(maxPages) {
  const results = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://${TYPESENSE_HOST}/multi_search?x-typesense-api-key=${TYPESENSE_API_KEY}`;
    const body = {
      searches: [{
        collection: COLLECTION,
        q: "*",
        query_by: "name",
        per_page: PER_PAGE,
        page,
        exhaustive_search: true,
        filter_by: "isCertified:=true",
      }],
    };
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain", Origin: "https://www.bcorporation.net" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      throw new Error(`Typesense ${r.status}: ${await r.text()}`);
    }
    const data = await r.json();
    const hits = data.results?.[0]?.hits || [];
    const found = data.results?.[0]?.found || 0;
    results.push(...hits.map((h) => h.document));
    if (page === 1) console.log(`    totale certificate: ${found}`);
    if (results.length >= found || hits.length === 0) break;
  }
  return results;
}

// ---------- Scraping pagina azienda ----------

const WEBSITE_REGEXES = [
  // Pattern stretto (attributi in ordine come visto su bcorporation.net)
  /<a\s+href="(https?:\/\/[^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"\s+class="font-serif"/i,
  // Pattern piu' permissivo
  /<a[^>]+href="(https?:\/\/[^"]+)"[^>]+class="[^"]*font-serif[^"]*"[^>]*>/i,
  /<a[^>]+class="[^"]*font-serif[^"]*"[^>]+href="(https?:\/\/[^"]+)"/i,
];

async function fetchCompanyWebsite(slug) {
  const url = `${COMPANY_PAGE_BASE}${encodeURIComponent(slug)}/`;
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (build-db) TheGoodPlace/1.0" },
  });
  if (!r.ok) return null;
  const html = await r.text();

  for (const re of WEBSITE_REGEXES) {
    const m = html.match(re);
    if (m && !/bcorporation\.net/i.test(m[1])) return m[1];
  }
  return null;
}

// ---------- Cache ----------

async function loadCache() {
  if (!existsSync(CACHE_FILE)) return new Map();
  try {
    const raw = await readFile(CACHE_FILE, "utf8");
    return new Map(Object.entries(JSON.parse(raw)));
  } catch {
    return new Map();
  }
}

async function saveCache(map) {
  await mkdir(CACHE_DIR, { recursive: true });
  const obj = Object.fromEntries(map);
  await writeFile(CACHE_FILE, JSON.stringify(obj, null, 0));
}

// ---------- Helpers ----------

async function parallelMap(items, concurrency, fn) {
  const queue = items.slice();
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await fn(item);
    }
  });
  await Promise.all(workers);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalize(doc, website) {
  if (!website) return null;
  const domain = extractDomain(website);
  if (!domain) return null;
  const score = parseFloat(doc.latestVerifiedScore);
  return {
    source: "bcorp",
    domain,
    name: doc.name,
    bcorp_score: Number.isFinite(score) ? score : 85,
    industry: doc.industry,
    country: doc.hqCountry,
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
