# Pipeline di build del database ESG

Questa cartella contiene lo script che costruisce `data/brands.json` a partire
da fonti pubbliche.

## Come eseguire

Requisiti: Node.js >= 18 (per `fetch` nativo).

```bash
npm run build-db
```

Oppure solo una fonte specifica:

```bash
npm run build-db:bcorp      # solo B Corp
npm run build-db:wikidata   # solo Wikidata
npm run build-db:curated    # solo lista curata
```

Il risultato viene scritto in `data/brands.json` (sovrascrive il file esistente).

## Fonti integrate

| Fonte | Tipo | File |
|-------|------|------|
| B Corp Directory | API Algolia pubblica | `sources/bcorp.mjs` |
| Wikidata | SPARQL endpoint pubblico | `sources/wikidata.mjs` |
| Banking on Climate Chaos 2024 | Lista curata | `sources/curated.mjs` |
| Don't Bank on the Bomb 2024 | Lista curata | `sources/curated.mjs` |
| Carbon Majors | Lista curata | `sources/curated.mjs` |
| Oxfam / Amnesty / ICIJ / Clean Clothes / EFF | Lista curata | `sources/curated.mjs` |
| Good On You (moda) | Lista curata dai rating pubblici | `sources/goodonyou.mjs` |
| Ethical Consumer | Lista curata da guide pubbliche | `sources/ethicalconsumer.mjs` |
| CDP Climate A-List | Lista curata dall'A-List annuale | `sources/cdp.mjs` |

## Come aggiungere una nuova fonte

1. Crea `sources/mia-fonte.mjs` che esporta una `async function` che ritorna
   un array di record con almeno `{ domain, name, source }` + eventuali
   campi specifici (es. `controversies`, `fossil_finance_bn`, ecc.).
2. Importala in `build-db.mjs` e aggiungila al flusso.
3. Se introduce nuovi campi, aggiorna `scoring.mjs` per convertirli in
   modificatori sui punteggi.

## Come il punteggio viene calcolato

Ogni criterio parte da **5/10** (neutro). Le fonti applicano modificatori:

- **B Corp certificata**: +2 fino a +4 su ambiente, lavoro, comunita, governance; +1.5 trasparenza
- **Finanza fossile** (mld USD): fino a -4 su ambiente (scala logaritmica)
- **Produttore armamenti**: -8 su armamenti
- **Finanziatore armamenti nucleari**: -5 su armamenti
- **Controversie** (labor_violation, tax_evasion, corruption, ecc.): -2/-4 sui criteri rilevanti
- **Settore fossile/tabacco/mining/fast fashion**: penalita' su criteri rilevanti

Il "voto complessivo" mostrato nell'extension e' la **media aritmetica** dei
6 criteri. Per pesi diversi (es. dare piu' importanza ai diritti del lavoro),
modifica `overallScore()` in `scoring.mjs`.

## Limiti e disclaimer

- I punteggi sono **indicativi** e derivati da euristiche. Un rating ESG serio
  richiede analisi specialistica.
- Le fonti curate vanno aggiornate manualmente con l'uscita dei nuovi report
  annuali.
- B Corp copre solo aziende certificate (~7.000). Wikidata copre migliaia di
  aziende ma con dati eterogenei.
- Il matching per dominio puo' perdere brand che usano domini diversi
  (es. nike.it vs nike.com). Il codice dell'extension gia' gestisce alcuni
  fallback (sottodomini e varianti TLD).
