// Brand italiani: aggiunta curata per colmare la gap di copertura.
//
// Fonti citate per ogni voce:
// - CDP Climate (cdp.net) per i rating pubblici
// - Banking on Climate Chaos e Don't Bank on the Bomb per le banche
// - Global Witness / ReCommon per controversie documentate
// - B Corp Directory per le certificate
// - Fashion Revolution / Good On You per la moda italiana
// - Stampa economica e rapporti ONG (Greenpeace, Legambiente, Oxfam Italia)

export async function fetchItalianBrands() {
  return [
    // === ALIMENTARE ===
    { source: "italian", domain: "barilla.com", name: "Barilla", sector: "food", cdp_climate: "A", note: "CDP A-list storica. Impegni su filiera grano sostenibile, famiglia proprietaria, alcune critiche passate su palma (rientro nel 2015)." },
    { source: "italian", domain: "ferrero.com", name: "Ferrero", controversies: ["environmental_disaster"], note: "Uso intensivo di olio di palma e nocciole. Critiche su lavoro minorile nella filiera cacao; aderente a Rainforest Alliance dal 2020." },
    { source: "italian", domain: "lavazza.com", name: "Lavazza", cdp_climate: "B", note: "Lavazza Foundation su progetti sociali. Certificazione Rainforest Alliance su parte del caffe'." },
    { source: "italian", domain: "illy.com", name: "Illycaffe'", positive: "bcorp_italian", note: "Certificata B Corp dal 2021. Modello di caffe' etico con filiera trasparente." },
    { source: "italian", domain: "granarolo.it", name: "Granarolo", sector: "food", note: "Cooperativa di produttori. Report sostenibilita' annuale, ancora criticita' su benessere animale." },
    { source: "italian", domain: "parmalat.com", name: "Parmalat (Lactalis)", controversies: ["corruption"], note: "Storica bancarotta Parmalat (2003). Ora controllata dal gruppo francese Lactalis, critiche su trasparenza." },
    { source: "italian", domain: "perfettivanmelle.com", name: "Perfetti Van Melle" },
    { source: "italian", domain: "campari.com", name: "Campari Group", cdp_climate: "B" },
    { source: "italian", domain: "san-pellegrino.com", name: "San Pellegrino (Nestle)", controversies: ["environmental_disaster"], note: "Di proprieta' Nestle. Controversie sull'uso di acqua e sulle concessioni." },
    { source: "italian", domain: "cirio.it", name: "Cirio" },
    { source: "italian", domain: "mutti-parma.com", name: "Mutti" },

    // === GRANDE DISTRIBUZIONE ===
    { source: "italian", domain: "esselunga.it", name: "Esselunga", note: "Retailer privato. Partecipa a progetti contro spreco alimentare." },
    { source: "italian", domain: "e-coop.it", name: "Coop Italia", positive: "cooperative", note: "Modello cooperativo. Prodotti Coop con standard interni su filiera e ambiente. Tra i leader GDO per sostenibilita'." },
    { source: "italian", domain: "conad.it", name: "Conad", positive: "cooperative" },
    { source: "italian", domain: "carrefour.it", name: "Carrefour Italia" },
    { source: "italian", domain: "lidl.it", name: "Lidl Italia", controversies: ["labor_violation"], note: "Gruppo Schwarz. Alcune critiche su condizioni di lavoro nei magazzini europei." },
    { source: "italian", domain: "eurospin.it", name: "Eurospin" },
    { source: "italian", domain: "md.it", name: "MD Discount" },
    { source: "italian", domain: "eataly.com", name: "Eataly" },

    // === BANCHE & ASSICURAZIONI (oltre a quelle gia' in curated.mjs) ===
    { source: "italian", domain: "bpm.it", name: "Banco BPM", fossil_finance_bn: 12, sector: "banking" },
    { source: "italian", domain: "bper.it", name: "BPER Banca", sector: "banking" },
    { source: "italian", domain: "mps.it", name: "Monte dei Paschi di Siena", sector: "banking", controversies: ["corruption"], note: "Salvataggio pubblico nel 2017. Storia di scandali finanziari (Mps-Antonveneta)." },
    { source: "italian", domain: "mediolanum.com", name: "Banca Mediolanum", sector: "banking" },
    { source: "italian", domain: "fineco.it", name: "FinecoBank", sector: "banking" },
    { source: "italian", domain: "generali.com", name: "Assicurazioni Generali", cdp_climate: "A-", note: "CDP A- su climate. Impegno al disinvestimento progressivo dal carbone entro 2030." },
    { source: "italian", domain: "unipol.it", name: "Unipol" },
    { source: "italian", domain: "posteitaliane.it", name: "Poste Italiane", cdp_climate: "B" },
    { source: "italian", domain: "cdp.it", name: "Cassa Depositi e Prestiti", sector: "banking" },

    // === ENERGIA & UTILITIES ===
    { source: "italian", domain: "enel.com", name: "Enel", cdp_climate: "A", note: "Gia' in CDP A-list. Leader nella transizione energetica con Enel Green Power." },
    { source: "italian", domain: "a2a.eu", name: "A2A", cdp_climate: "A-" },
    { source: "italian", domain: "hera.it", name: "Hera", cdp_climate: "A-" },
    { source: "italian", domain: "iren.it", name: "Iren", cdp_climate: "B" },
    { source: "italian", domain: "snam.it", name: "Snam", sector: "fossil_fuel", note: "Infrastrutture gas. Transizione annunciata verso idrogeno." },
    { source: "italian", domain: "terna.it", name: "Terna", cdp_climate: "A-" },
    { source: "italian", domain: "acea.it", name: "Acea" },
    { source: "italian", domain: "saipem.com", name: "Saipem", sector: "fossil_fuel", controversies: ["corruption"], note: "Storici scandali su tangenti Algeria. Servizi petroliferi." },

    // === TELECOMUNICAZIONI ===
    { source: "italian", domain: "tim.it", name: "TIM (Telecom Italia)", cdp_climate: "A-" },
    { source: "italian", domain: "vodafone.it", name: "Vodafone Italia" },
    { source: "italian", domain: "windtre.it", name: "WindTre" },
    { source: "italian", domain: "iliad.it", name: "Iliad Italia" },
    { source: "italian", domain: "fastweb.it", name: "Fastweb" },

    // === TRASPORTI ===
    { source: "italian", domain: "trenitalia.com", name: "Trenitalia" },
    { source: "italian", domain: "italotreno.it", name: "Italo (NTV)" },
    { source: "italian", domain: "autostrade.it", name: "Autostrade per l'Italia", controversies: ["environmental_disaster"], note: "Crollo del Ponte Morandi (2018). Gestione passata criticata, cambio di controllo nel 2022." },
    { source: "italian", domain: "alitalia.com", name: "ITA Airways" },
    { source: "italian", domain: "atlantia.com", name: "Atlantia" },

    // === MODA & LUSSO ===
    { source: "italian", domain: "armani.com", name: "Giorgio Armani", sector: "fashion", controversies: ["labor_violation"], note: "Indagini 2024 su caporalato nella filiera di confezionamento." },
    { source: "italian", domain: "prada.com", name: "Prada Group", sector: "fashion" },
    { source: "italian", domain: "moncler.com", name: "Moncler", cdp_climate: "A-" },
    { source: "italian", domain: "luxottica.com", name: "Luxottica (EssilorLuxottica)", cdp_climate: "A-" },
    { source: "italian", domain: "geox.com", name: "Geox", sector: "fashion" },
    { source: "italian", domain: "diesel.com", name: "Diesel", sector: "fashion" },
    { source: "italian", domain: "benetton.com", name: "Benetton Group", sector: "fashion", note: "Rana Plaza (2013). Ha firmato l'Accord on Fire and Building Safety." },
    { source: "italian", domain: "calzedonia.com", name: "Calzedonia" },
    { source: "italian", domain: "ovs.it", name: "OVS" },
    { source: "italian", domain: "yoox.com", name: "YOOX Net-a-Porter" },

    // === AUTO & MECCANICA ===
    { source: "italian", domain: "ferrari.com", name: "Ferrari", cdp_climate: "A", note: "Gia' in CDP A-list." },
    { source: "italian", domain: "stellantis.com", name: "Stellantis", cdp_climate: "B-", note: "Produttore FCA-PSA. Transizione elettrica in corso." },
    { source: "italian", domain: "pirelli.com", name: "Pirelli", cdp_climate: "A" },
    { source: "italian", domain: "ducati.com", name: "Ducati" },
    { source: "italian", domain: "piaggio.com", name: "Piaggio" },
    { source: "italian", domain: "lamborghini.com", name: "Lamborghini" },

    // === DIFESA ===
    { source: "italian", domain: "leonardo.com", name: "Leonardo", weapons: "producer", note: "Gia' classificato produttore armamenti." },
    { source: "italian", domain: "fincantieri.com", name: "Fincantieri", weapons: "producer", note: "Cantieristica navale civile e militare." },
    { source: "italian", domain: "rwmitalia.com", name: "RWM Italia", weapons: "producer", controversies: ["human_rights"], note: "Produzione bombe esportate in Arabia Saudita/Yemen (inchieste giornalistiche)." },

    // === MEDIA ===
    { source: "italian", domain: "rai.it", name: "RAI" },
    { source: "italian", domain: "mediaset.it", name: "Mediaset (MFE)" },
    { source: "italian", domain: "gedi.it", name: "GEDI (Repubblica/Stampa)" },
    { source: "italian", domain: "rcsmediagroup.it", name: "RCS MediaGroup" },

    // === B CORP ITALIANE PIU' NOTE ===
    { source: "italian", domain: "treedom.net", name: "Treedom", positive: "bcorp_italian", note: "B Corp. Piattaforma per piantare alberi verificati." },
    { source: "italian", domain: "mondora.com", name: "Mondora", positive: "bcorp_italian" },
    { source: "italian", domain: "nativalab.com", name: "Nativa", positive: "bcorp_italian", note: "Prima B Corp italiana. Consulenza su sostenibilita'." },
    { source: "italian", domain: "alessi.com", name: "Alessi", positive: "bcorp_italian" },
    { source: "italian", domain: "fratellicarli.com", name: "Fratelli Carli", positive: "bcorp_italian" },
    { source: "italian", domain: "davines.com", name: "Davines", positive: "bcorp_italian" },

    // === ETICI / ALTERNATIVI ITALIANI ===
    { source: "italian", domain: "altroconsumo.it", name: "Altroconsumo", positive: "consumer_advocacy" },
    { source: "italian", domain: "slowfood.it", name: "Slow Food", positive: "ngo" },
    { source: "italian", domain: "legambiente.it", name: "Legambiente", positive: "ngo" },
    { source: "italian", domain: "altromercato.it", name: "Altromercato", positive: "fair_trade", note: "Rete italiana del commercio equo solidale." },
    { source: "italian", domain: "libera.it", name: "Libera Terra", positive: "fair_trade", note: "Cooperative su terreni confiscati alle mafie." },
  ];
}
