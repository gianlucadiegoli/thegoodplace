// Fonte: CDP (Carbon Disclosure Project, https://www.cdp.net)
//
// CDP valuta aziende su Climate Change, Water Security, Forests.
// Scala: A, A-, B, B-, C, C-, D, D-, F (non disclosure).
// La "A List" annuale e' pubblicata liberamente.
//
// Qui includiamo l'A List 2023 Climate Change (estratto) e note aziende
// con punteggio F o non disclosure.
// Fonte: https://www.cdp.net/en/companies/companies-scores

export async function fetchCDP() {
  // A List 2023 - Climate Change (estratto, ~400+ aziende reali)
  // Qui una selezione dei nomi piu' riconoscibili.
  const aList = [
    "microsoft.com",
    "apple.com",
    "unilever.com",
    "loreal.com",
    "hp.com",
    "alphabet.com",
    "hsbc.com",
    "bnpparibas.com",
    "sony.com",
    "philips.com",
    "nestle.com",
    "danone.com",
    "nvidia.com",
    "ferrari.com",
    "enel.com",
    "iberdrola.com",
    "volvocars.com",
    "samsung.com",
    "lvmh.com",
    "kering.com",
    "deutschetelekom.com",
    "orange.com",
    "vodafone.com",
    "santander.com",
    "allianz.com",
    "axa.com",
    "novartis.com",
    "roche.com",
    "astrazeneca.com",
    "gsk.com",
  ];

  const nameMap = {
    "microsoft.com": "Microsoft",
    "apple.com": "Apple",
    "unilever.com": "Unilever",
    "loreal.com": "L'Oreal",
    "hp.com": "HP",
    "alphabet.com": "Alphabet (Google)",
    "hsbc.com": "HSBC",
    "bnpparibas.com": "BNP Paribas",
    "sony.com": "Sony",
    "philips.com": "Philips",
    "nestle.com": "Nestle",
    "danone.com": "Danone",
    "nvidia.com": "NVIDIA",
    "ferrari.com": "Ferrari",
    "enel.com": "Enel",
    "iberdrola.com": "Iberdrola",
    "volvocars.com": "Volvo Cars",
    "samsung.com": "Samsung",
    "lvmh.com": "LVMH",
    "kering.com": "Kering",
    "deutschetelekom.com": "Deutsche Telekom",
    "orange.com": "Orange",
    "vodafone.com": "Vodafone",
    "santander.com": "Santander",
    "allianz.com": "Allianz",
    "axa.com": "AXA",
    "novartis.com": "Novartis",
    "roche.com": "Roche",
    "astrazeneca.com": "AstraZeneca",
    "gsk.com": "GlaxoSmithKline",
  };

  const records = aList.map((domain) => ({
    source: "cdp",
    domain,
    name: nameMap[domain],
    cdp_climate: "A",
  }));

  // Non disclosure / F graded (selezione nota)
  const nonDisclosure = [
    { domain: "exxonmobil.com", name: "ExxonMobil", cdp_climate: "F" },
    { domain: "chevron.com", name: "Chevron", cdp_climate: "F" },
    { domain: "saudiaramco.com", name: "Saudi Aramco", cdp_climate: "F" },
    { domain: "tesla.com", name: "Tesla", cdp_climate: "F" }, // non-disclosure
    { domain: "berkshirehathaway.com", name: "Berkshire Hathaway", cdp_climate: "F" },
  ];

  records.push(
    ...nonDisclosure.map((e) => ({
      source: "cdp",
      domain: e.domain,
      name: e.name,
      cdp_climate: e.cdp_climate,
    }))
  );

  return records;
}
