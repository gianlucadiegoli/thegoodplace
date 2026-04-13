// Fonte: Good On You (https://goodonyou.eco)
//
// Rating di brand moda su Planet, People, Animals.
// Scala: 1="We Avoid" 2="Not Good Enough" 3="It's a Start" 4="Good" 5="Great"
//
// Il sito non offre API pubblica documentata. I rating sono pubblici su
// https://directory.goodonyou.eco/brand/<slug> (HTML).
// Qui forniamo una lista curata dei brand piu' diffusi, con i rating
// visibili pubblicamente sul sito (aggiornare periodicamente).

export async function fetchGoodOnYou() {
  // Dati estratti dal directory pubblico di Good On You.
  // Ogni brand ha un rating complessivo 1-5 (o "overall")
  // ed eventualmente rating per Planet/People/Animals.
  const brands = [
    // Great (5)
    { domain: "pangaia.com", name: "Pangaia", rating: 5 },
    { domain: "veja-store.com", name: "Veja", rating: 5 },
    { domain: "people-tree.co.uk", name: "People Tree", rating: 5 },
    { domain: "armedangels.com", name: "Armed Angels", rating: 5 },
    { domain: "kotn.com", name: "Kotn", rating: 5 },

    // Good (4)
    { domain: "patagonia.com", name: "Patagonia", rating: 4 },
    { domain: "eileenfisher.com", name: "Eileen Fisher", rating: 4 },
    { domain: "everlane.com", name: "Everlane", rating: 4 },
    { domain: "thereformation.com", name: "Reformation", rating: 4 },
    { domain: "stellamccartney.com", name: "Stella McCartney", rating: 4 },

    // It's a Start (3)
    { domain: "levi.com", name: "Levi's", rating: 3 },
    { domain: "adidas.com", name: "Adidas", rating: 3 },
    { domain: "cos.com", name: "COS", rating: 3 },
    { domain: "uniqlo.com", name: "Uniqlo", rating: 3 },
    { domain: "benetton.com", name: "Benetton", rating: 3 },
    { domain: "gap.com", name: "Gap", rating: 3 },

    // Not Good Enough (2)
    { domain: "hm.com", name: "H&M", rating: 2 },
    { domain: "zara.com", name: "Zara", rating: 2 },
    { domain: "nike.com", name: "Nike", rating: 2 },
    { domain: "puma.com", name: "Puma", rating: 2 },
    { domain: "mango.com", name: "Mango", rating: 2 },
    { domain: "tommy.com", name: "Tommy Hilfiger", rating: 2 },
    { domain: "calvinklein.com", name: "Calvin Klein", rating: 2 },
    { domain: "lacoste.com", name: "Lacoste", rating: 2 },
    { domain: "gucci.com", name: "Gucci", rating: 2 },
    { domain: "prada.com", name: "Prada", rating: 2 },

    // We Avoid (1)
    { domain: "shein.com", name: "Shein", rating: 1 },
    { domain: "boohoo.com", name: "Boohoo", rating: 1 },
    { domain: "prettylittlething.com", name: "PrettyLittleThing", rating: 1 },
    { domain: "fashionnova.com", name: "Fashion Nova", rating: 1 },
    { domain: "temu.com", name: "Temu", rating: 1 },
    { domain: "romwe.com", name: "Romwe", rating: 1 },
  ];

  return brands.map((b) => ({
    source: "goodonyou",
    domain: b.domain,
    name: b.name,
    goodonyou_rating: b.rating,
    sector: "fashion",
  }));
}
