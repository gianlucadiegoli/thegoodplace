// Fonte: Ethical Consumer (https://www.ethicalconsumer.org)
//
// Rivista indipendente UK che valuta aziende su 5 categorie:
// Environment, Animals, People, Politics, Product Sustainability.
// Scala: 0-20 (piu' alto = meglio).
//
// I rating dettagliati sono dietro paywall. Le "best buy" e "worst companies"
// nelle guide gratuite sono la fonte principale qui.
// Riferimenti: "Shopping Guides" pubbliche su ethicalconsumer.org.

export async function fetchEthicalConsumer() {
  const entries = [
    // BEST (raccomandati nelle guide pubbliche)
    { domain: "ecosia.org", name: "Ecosia", ec_rating: "best", category: "search_engine" },
    { domain: "duckduckgo.com", name: "DuckDuckGo", ec_rating: "best", category: "search_engine" },
    { domain: "fairphone.com", name: "Fairphone", ec_rating: "best", category: "electronics" },
    { domain: "tonysschocolonely.com", name: "Tony's Chocolonely", ec_rating: "best", category: "food" },
    { domain: "divinechocolate.com", name: "Divine Chocolate", ec_rating: "best", category: "food" },
    { domain: "cafedirect.co.uk", name: "Cafedirect", ec_rating: "best", category: "food" },
    { domain: "lush.com", name: "Lush", ec_rating: "best", category: "cosmetics" },
    { domain: "bodyshop.com", name: "The Body Shop", ec_rating: "best", category: "cosmetics" },
    { domain: "whocaresecowash.com", name: "Who Gives A Crap", ec_rating: "best", category: "household" },
    { domain: "ecover.com", name: "Ecover", ec_rating: "best", category: "household" },
    { domain: "riverford.co.uk", name: "Riverford", ec_rating: "best", category: "food" },
    { domain: "suma.coop", name: "Suma", ec_rating: "best", category: "food" },
    { domain: "triodos.co.uk", name: "Triodos Bank", ec_rating: "best", category: "banking" },
    { domain: "cooperativebank.co.uk", name: "The Co-operative Bank", ec_rating: "best", category: "banking" },
    { domain: "ecology.co.uk", name: "Ecology Building Society", ec_rating: "best", category: "banking" },

    // WORST (elencati come "companies to avoid")
    { domain: "nestle.com", name: "Nestle", ec_rating: "worst", controversies: ["human_rights", "environmental_disaster"] },
    { domain: "unilever.com", name: "Unilever", ec_rating: "worst", controversies: ["environmental_disaster"] },
    { domain: "pg.com", name: "Procter & Gamble", ec_rating: "worst", controversies: ["environmental_disaster", "human_rights"] },
    { domain: "coca-cola.com", name: "Coca-Cola", ec_rating: "worst", controversies: ["environmental_disaster", "human_rights"] },
    { domain: "pepsico.com", name: "PepsiCo", ec_rating: "worst", controversies: ["environmental_disaster"] },
    { domain: "mcdonalds.com", name: "McDonald's", ec_rating: "worst", controversies: ["environmental_disaster", "labor_violation"] },
    { domain: "kfc.com", name: "KFC", ec_rating: "worst", controversies: ["environmental_disaster"] },
    { domain: "starbucks.com", name: "Starbucks", ec_rating: "worst", controversies: ["tax_evasion", "labor_violation"] },
    { domain: "bat.com", name: "British American Tobacco", ec_rating: "worst", sector: "tobacco" },
    { domain: "pmi.com", name: "Philip Morris", ec_rating: "worst", sector: "tobacco" },
    { domain: "jti.com", name: "Japan Tobacco International", ec_rating: "worst", sector: "tobacco" },

    // MIDDLE (menzionati ma non eccellenti)
    { domain: "innocentdrinks.co.uk", name: "Innocent Drinks", ec_rating: "middle" },
    { domain: "benandjerry.com", name: "Ben & Jerry's", ec_rating: "middle" },
  ];

  return entries.map((e) => ({
    source: "ethical_consumer",
    domain: e.domain,
    name: e.name,
    ec_rating: e.ec_rating,
    sector: e.sector,
    controversies: e.controversies,
  }));
}
