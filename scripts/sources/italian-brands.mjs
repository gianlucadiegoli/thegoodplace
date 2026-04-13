// Brand italiani: aggiunta curata basata esclusivamente su fonti verificabili.
//
// Criteri di inclusione:
// - Solo brand per cui esiste almeno una fonte pubblica primaria verificabile
// - Niente grade CDP specifici (A, A-, B, ecc.) perche' richiedono verifica
//   puntuale sul sito CDP per ogni azienda; si lascia baseline
// - Niente controversie basate su conoscenza generale non citata
//
// Fonti primarie per le voci presenti:
// - Banking on Climate Chaos (bankingonclimatechaos.org)
// - Don't Bank on the Bomb (dontbankonthebomb.com)
// - B Corp Directory (bcorporation.net) per le certificate italiane
// - Sentenze e inchieste note per casi come Parmalat, MPS, Ponte Morandi
// - Rete Disarmo / Domani per RWM Italia
// - Mighty Earth / Make Chocolate Fair per filiera cacao

export async function fetchItalianBrands() {
  return [
    // === ALIMENTARE ===
    // Brand recognosciuti senza dati verificati: baseline neutra (badge visibile, giudizio sospeso)
    { source: "italian", domain: "barilla.com", name: "Barilla" },
    { source: "italian", domain: "ferrero.com", name: "Ferrero", controversies: ["environmental_disaster"], note: "Critiche documentate su uso di olio di palma e filiera cacao (Mighty Earth, Make Chocolate Fair). Impegni dichiarati su Rainforest Alliance." },
    { source: "italian", domain: "lavazza.com", name: "Lavazza" },
    { source: "italian", domain: "illy.com", name: "Illycaffe'", positive: "bcorp_italian", note: "Certificata B Corp dal 2021." },
    { source: "italian", domain: "granarolo.it", name: "Granarolo" },
    { source: "italian", domain: "parmalat.com", name: "Parmalat (Lactalis)", controversies: ["corruption"], note: "Bancarotta fraudolenta Parmalat 2003, condanne in giudicato." },
    { source: "italian", domain: "perfettivanmelle.com", name: "Perfetti Van Melle" },
    { source: "italian", domain: "campari.com", name: "Campari Group" },
    { source: "italian", domain: "cirio.it", name: "Cirio" },
    { source: "italian", domain: "mutti-parma.com", name: "Mutti" },

    // === GRANDE DISTRIBUZIONE ===
    { source: "italian", domain: "esselunga.it", name: "Esselunga" },
    { source: "italian", domain: "e-coop.it", name: "Coop Italia", positive: "cooperative", note: "Modello cooperativo di consumo." },
    { source: "italian", domain: "conad.it", name: "Conad", positive: "cooperative", note: "Consorzio cooperativo di dettaglianti." },
    { source: "italian", domain: "carrefour.it", name: "Carrefour Italia" },
    { source: "italian", domain: "eurospin.it", name: "Eurospin" },
    { source: "italian", domain: "md.it", name: "MD Discount" },
    { source: "italian", domain: "eataly.com", name: "Eataly" },

    // === BANCHE & ASSICURAZIONI ===
    // Nota: UniCredit, Intesa Sanpaolo sono gia' presenti nella lista curata
    // globale con dati da Banking on Climate Chaos e Don't Bank on the Bomb.
    { source: "italian", domain: "bpm.it", name: "Banco BPM", sector: "banking" },
    { source: "italian", domain: "bper.it", name: "BPER Banca", sector: "banking" },
    { source: "italian", domain: "mps.it", name: "Monte dei Paschi di Siena", sector: "banking", controversies: ["corruption"], note: "Scandali finanziari (Mps-Antonveneta, derivati). Salvataggio pubblico 2017." },
    { source: "italian", domain: "mediolanum.com", name: "Banca Mediolanum", sector: "banking" },
    { source: "italian", domain: "fineco.it", name: "FinecoBank", sector: "banking" },
    { source: "italian", domain: "generali.com", name: "Assicurazioni Generali" },
    { source: "italian", domain: "unipol.it", name: "Unipol" },
    { source: "italian", domain: "posteitaliane.it", name: "Poste Italiane" },
    { source: "italian", domain: "cdp.it", name: "Cassa Depositi e Prestiti", sector: "banking" },

    // === ENERGIA & UTILITIES ===
    // Nota: Enel e' gia' in cdp.mjs con grade A verificato; qui solo aggiunta name
    { source: "italian", domain: "enel.com", name: "Enel" },
    { source: "italian", domain: "a2a.eu", name: "A2A" },
    { source: "italian", domain: "hera.it", name: "Hera" },
    { source: "italian", domain: "iren.it", name: "Iren" },
    { source: "italian", domain: "snam.it", name: "Snam", sector: "fossil_fuel", note: "Principale operatore italiano di infrastrutture gas." },
    { source: "italian", domain: "terna.it", name: "Terna" },
    { source: "italian", domain: "acea.it", name: "Acea" },
    { source: "italian", domain: "saipem.com", name: "Saipem", sector: "fossil_fuel", controversies: ["corruption"], note: "Sentenze per corruzione internazionale (caso Algeria Sonatrach)." },

    // === TELECOMUNICAZIONI ===
    { source: "italian", domain: "tim.it", name: "TIM (Telecom Italia)" },
    { source: "italian", domain: "vodafone.it", name: "Vodafone Italia" },
    { source: "italian", domain: "windtre.it", name: "WindTre" },
    { source: "italian", domain: "iliad.it", name: "Iliad Italia" },
    { source: "italian", domain: "fastweb.it", name: "Fastweb" },

    // === TRASPORTI ===
    { source: "italian", domain: "trenitalia.com", name: "Trenitalia" },
    { source: "italian", domain: "italotreno.it", name: "Italo (NTV)" },
    { source: "italian", domain: "autostrade.it", name: "Autostrade per l'Italia", controversies: ["environmental_disaster"], note: "Crollo del Ponte Morandi, Genova 2018 (43 vittime). Processi in corso/conclusi." },
    { source: "italian", domain: "alitalia.com", name: "ITA Airways" },
    { source: "italian", domain: "atlantia.com", name: "Atlantia" },

    // === MODA & LUSSO ===
    // Nota: Prada, Gucci, Armani sono gia' in goodonyou.mjs con rating Good On You
    { source: "italian", domain: "moncler.com", name: "Moncler" },
    { source: "italian", domain: "luxottica.com", name: "Luxottica (EssilorLuxottica)" },
    { source: "italian", domain: "geox.com", name: "Geox" },
    { source: "italian", domain: "diesel.com", name: "Diesel" },
    { source: "italian", domain: "benetton.com", name: "Benetton Group", note: "Firmataria dell'Accord on Fire and Building Safety dopo Rana Plaza 2013." },
    { source: "italian", domain: "calzedonia.com", name: "Calzedonia" },
    { source: "italian", domain: "ovs.it", name: "OVS" },
    { source: "italian", domain: "yoox.com", name: "YOOX Net-a-Porter" },

    // === AUTO & MECCANICA ===
    { source: "italian", domain: "ferrari.com", name: "Ferrari" },
    { source: "italian", domain: "stellantis.com", name: "Stellantis" },
    { source: "italian", domain: "pirelli.com", name: "Pirelli" },
    { source: "italian", domain: "ducati.com", name: "Ducati" },
    { source: "italian", domain: "piaggio.com", name: "Piaggio" },
    { source: "italian", domain: "lamborghini.com", name: "Lamborghini" },

    // === DIFESA ===
    { source: "italian", domain: "leonardo.com", name: "Leonardo", weapons: "producer", note: "Gruppo italiano di difesa, aerospazio e sicurezza." },
    { source: "italian", domain: "fincantieri.com", name: "Fincantieri", weapons: "producer", note: "Cantieristica navale civile e militare. Contratti per marine militari." },
    { source: "italian", domain: "rwmitalia.com", name: "RWM Italia", weapons: "producer", controversies: ["human_rights"], note: "Inchieste di Rete Disarmo, PAX, Domani su esportazioni bombe MK verso coalizione Arabia Saudita-Emirati (guerra in Yemen)." },

    // === MEDIA ===
    { source: "italian", domain: "rai.it", name: "RAI" },
    { source: "italian", domain: "mediaset.it", name: "Mediaset (MFE)" },
    { source: "italian", domain: "gedi.it", name: "GEDI (Repubblica/Stampa)" },
    { source: "italian", domain: "rcsmediagroup.it", name: "RCS MediaGroup" },

    // === B CORP ITALIANE CERTIFICATE ===
    // Verificabili su bcorporation.net - queste sono alcune delle piu' note
    { source: "italian", domain: "treedom.net", name: "Treedom", positive: "bcorp_italian", note: "Piattaforma di piantumazione alberi geo-tracciati." },
    { source: "italian", domain: "mondora.com", name: "Mondora", positive: "bcorp_italian" },
    { source: "italian", domain: "nativalab.com", name: "Nativa", positive: "bcorp_italian", note: "Prima B Corp italiana (2013)." },
    { source: "italian", domain: "alessi.com", name: "Alessi", positive: "bcorp_italian" },
    { source: "italian", domain: "fratellicarli.com", name: "Fratelli Carli", positive: "bcorp_italian" },
    { source: "italian", domain: "davines.com", name: "Davines", positive: "bcorp_italian" },

    // === ETICI / ALTERNATIVI ITALIANI ===
    { source: "italian", domain: "altroconsumo.it", name: "Altroconsumo", positive: "consumer_advocacy", note: "Associazione indipendente di difesa dei consumatori." },
    { source: "italian", domain: "slowfood.it", name: "Slow Food", positive: "ngo", note: "Movimento internazionale fondato in Italia per il cibo buono, pulito, giusto." },
    { source: "italian", domain: "legambiente.it", name: "Legambiente", positive: "ngo" },
    { source: "italian", domain: "altromercato.it", name: "Altromercato", positive: "fair_trade", note: "Rete italiana del commercio equo solidale." },
    { source: "italian", domain: "libera.it", name: "Libera Terra", positive: "fair_trade", note: "Cooperative su terreni confiscati alle mafie (legge 109/96)." },
  ];
}
