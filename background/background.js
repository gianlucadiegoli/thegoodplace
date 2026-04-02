let brandsData = null;

async function loadBrandsData() {
  if (brandsData) return brandsData;
  const url = chrome.runtime.getURL("data/brands.json");
  const response = await fetch(url);
  brandsData = await response.json();
  return brandsData;
}

function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function findBrand(domain, brands) {
  if (!domain) return null;

  // Direct match
  if (brands[domain]) {
    return { domain, ...brands[domain] };
  }

  // Try parent domain (e.g., shop.nike.com -> nike.com)
  const parts = domain.split(".");
  if (parts.length > 2) {
    const parentDomain = parts.slice(-2).join(".");
    if (brands[parentDomain]) {
      return { domain: parentDomain, ...brands[parentDomain] };
    }
  }

  // Partial match (e.g., amazon.it -> amazon.com)
  const baseName = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  for (const [key, value] of Object.entries(brands)) {
    if (key.startsWith(baseName + ".")) {
      return { domain: key, ...value };
    }
  }

  return null;
}

function calculateOverallScore(scores) {
  const values = Object.values(scores);
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round((sum / values.length) * 10) / 10;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_BRAND_INFO") {
    loadBrandsData().then((data) => {
      const domain = extractDomain(message.url);
      const brand = findBrand(domain, data.brands);

      if (brand) {
        const overall = calculateOverallScore(brand.scores);
        sendResponse({
          found: true,
          brand: brand.name,
          domain: brand.domain,
          scores: brand.scores,
          overall,
          note: brand.note,
          fonti: brand.fonti,
          criteria: data.meta.criteria,
        });
      } else {
        sendResponse({ found: false, domain });
      }
    });
    return true; // async response
  }
});
