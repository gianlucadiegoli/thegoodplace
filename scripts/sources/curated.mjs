// Lista curata da report pubblici.
//
// Questa lista e' compilata manualmente da fonti pubbliche citate:
// - Banking on Climate Chaos 2024 (Rainforest Action Network)
//   https://www.bankingonclimatechaos.org/
// - Don't Bank on the Bomb 2024 (PAX)
//   https://www.dontbankonthebomb.com/
// - Carbon Majors Report (InfluenceMap / Climate Accountability Institute)
// - Rapporti Oxfam, Amnesty International, Human Rights Watch
//
// Ogni voce indica la fonte e il tipo di classificazione.

export async function fetchCurated() {
  return [
    // --- TOP FOSSIL FUEL FINANCIERS (Banking on Climate Chaos 2024) ---
    // Dati in miliardi USD cumulati 2016-2023
    { source: "banktrack", domain: "jpmorganchase.com", name: "JPMorgan Chase", fossil_finance_bn: 434, sector: "banking" },
    { source: "banktrack", domain: "citi.com", name: "Citigroup", fossil_finance_bn: 333, sector: "banking" },
    { source: "banktrack", domain: "wellsfargo.com", name: "Wells Fargo", fossil_finance_bn: 317, sector: "banking" },
    { source: "banktrack", domain: "bankofamerica.com", name: "Bank of America", fossil_finance_bn: 280, sector: "banking" },
    { source: "banktrack", domain: "rbc.com", name: "Royal Bank of Canada", fossil_finance_bn: 254, sector: "banking" },
    { source: "banktrack", domain: "mufg.jp", name: "MUFG", fossil_finance_bn: 233, sector: "banking" },
    { source: "banktrack", domain: "barclays.com", name: "Barclays", fossil_finance_bn: 217, sector: "banking" },
    { source: "banktrack", domain: "hsbc.com", name: "HSBC", fossil_finance_bn: 183, sector: "banking" },
    { source: "banktrack", domain: "bnpparibas.com", name: "BNP Paribas", fossil_finance_bn: 155, sector: "banking" },
    { source: "banktrack", domain: "unicreditgroup.eu", name: "UniCredit", fossil_finance_bn: 38, sector: "banking" },
    { source: "banktrack", domain: "intesasanpaolo.com", name: "Intesa Sanpaolo", fossil_finance_bn: 27, sector: "banking" },

    // --- CARBON MAJORS (InfluenceMap / CAI) ---
    { source: "carbonmajors", domain: "saudiaramco.com", name: "Saudi Aramco", sector: "fossil_fuel", controversies: ["environmental_disaster"] },
    { source: "carbonmajors", domain: "shell.com", name: "Shell", sector: "fossil_fuel", controversies: ["environmental_disaster", "greenwashing"] },
    { source: "carbonmajors", domain: "exxonmobil.com", name: "ExxonMobil", sector: "fossil_fuel", controversies: ["environmental_disaster", "greenwashing"] },
    { source: "carbonmajors", domain: "bp.com", name: "BP", sector: "fossil_fuel", controversies: ["environmental_disaster", "greenwashing"] },
    { source: "carbonmajors", domain: "totalenergies.com", name: "TotalEnergies", sector: "fossil_fuel", controversies: ["environmental_disaster"] },
    { source: "carbonmajors", domain: "chevron.com", name: "Chevron", sector: "fossil_fuel", controversies: ["environmental_disaster"] },
    { source: "carbonmajors", domain: "eni.com", name: "ENI", sector: "fossil_fuel", controversies: ["corruption", "environmental_disaster"] },

    // --- NUCLEAR WEAPONS PRODUCERS (Don't Bank on the Bomb 2024) ---
    { source: "dbob", domain: "lockheedmartin.com", name: "Lockheed Martin", weapons: "producer" },
    { source: "dbob", domain: "boeing.com", name: "Boeing", weapons: "producer" },
    { source: "dbob", domain: "northropgrumman.com", name: "Northrop Grumman", weapons: "producer" },
    { source: "dbob", domain: "rtx.com", name: "RTX (Raytheon)", weapons: "producer" },
    { source: "dbob", domain: "generaldynamics.com", name: "General Dynamics", weapons: "producer" },
    { source: "dbob", domain: "leonardo.com", name: "Leonardo", weapons: "producer" },
    { source: "dbob", domain: "airbus.com", name: "Airbus", weapons: "producer" },
    { source: "dbob", domain: "thalesgroup.com", name: "Thales", weapons: "producer" },
    { source: "dbob", domain: "bae-systems.com", name: "BAE Systems", weapons: "producer" },

    // --- NUCLEAR WEAPONS FINANCIERS (Don't Bank on the Bomb 2024) ---
    { source: "dbob", domain: "jpmorganchase.com", name: "JPMorgan Chase", weapons: "financier_nuclear" },
    { source: "dbob", domain: "citi.com", name: "Citigroup", weapons: "financier_nuclear" },
    { source: "dbob", domain: "bankofamerica.com", name: "Bank of America", weapons: "financier_nuclear" },
    { source: "dbob", domain: "wellsfargo.com", name: "Wells Fargo", weapons: "financier_nuclear" },
    { source: "dbob", domain: "morganstanley.com", name: "Morgan Stanley", weapons: "financier_nuclear" },
    { source: "dbob", domain: "gs.com", name: "Goldman Sachs", weapons: "financier_nuclear" },
    { source: "dbob", domain: "unicreditgroup.eu", name: "UniCredit", weapons: "financier_nuclear" },
    { source: "dbob", domain: "bnpparibas.com", name: "BNP Paribas", weapons: "financier_nuclear" },
    { source: "dbob", domain: "deutsche-bank.com", name: "Deutsche Bank", weapons: "financier_nuclear" },

    // --- CONTROVERSIE NOTE ---
    { source: "oxfam", domain: "amazon.com", name: "Amazon", controversies: ["labor_violation", "tax_evasion"] },
    { source: "icij", domain: "apple.com", name: "Apple", controversies: ["tax_evasion", "labor_violation"] },
    { source: "icij", domain: "ikea.com", name: "IKEA", controversies: ["tax_evasion"] },
    { source: "clean_clothes", domain: "zara.com", name: "Zara (Inditex)", controversies: ["labor_violation"], sector: "fast_fashion" },
    { source: "clean_clothes", domain: "hm.com", name: "H&M", controversies: ["labor_violation", "greenwashing"], sector: "fast_fashion" },
    { source: "clean_clothes", domain: "shein.com", name: "Shein", controversies: ["labor_violation", "human_rights"], sector: "fast_fashion" },
    { source: "eff", domain: "facebook.com", name: "Meta (Facebook)", controversies: ["data_privacy", "human_rights"] },
    { source: "eff", domain: "meta.com", name: "Meta", controversies: ["data_privacy", "human_rights"] },
    { source: "amnesty", domain: "nestle.com", name: "Nestle", controversies: ["human_rights", "environmental_disaster", "labor_violation"] },
    { source: "breakfreefromplastic", domain: "coca-cola.com", name: "Coca-Cola", controversies: ["environmental_disaster", "greenwashing"] },
    { source: "globalwitness", domain: "eni.com", name: "ENI", controversies: ["corruption"] },
    { source: "recommon", domain: "glencore.com", name: "Glencore", controversies: ["corruption", "environmental_disaster"], sector: "mining" },

    // --- ESEMPI POSITIVI NOTI ---
    { source: "gabv", domain: "bancaetica.it", name: "Banca Etica", positive: "ethical_bank", sector: "banking" },
    { source: "gabv", domain: "triodos.com", name: "Triodos Bank", positive: "ethical_bank", sector: "banking" },
  ];
}
