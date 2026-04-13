// Crea uno zip pulito dell'estensione pronto da distribuire.
// Include solo i file a runtime (no scripts/, no .cache/, no node_modules/, no build config).
//
// Uso: node scripts/package.mjs [--version=X.Y.Z]
// Output: release/thegoodplace-vX.Y.Z.zip

import { readFile, writeFile, mkdir, rm, cp, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RELEASE_DIR = join(ROOT, "release");
const STAGING = join(RELEASE_DIR, "staging");

// Cartelle/file da includere nello zip
const INCLUDE = [
  "manifest.json",
  "background",
  "content",
  "popup",
  "icons",
  "data",
];

async function main() {
  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
  const cliVersion = process.argv
    .find((a) => a.startsWith("--version="))
    ?.split("=")[1];
  const version = cliVersion || manifest.version;

  if (cliVersion && cliVersion !== manifest.version) {
    manifest.version = cliVersion;
    await writeFile(
      join(ROOT, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n"
    );
    console.log(`manifest.json aggiornato a ${cliVersion}`);
  }

  if (!existsSync(join(ROOT, "data", "brands.json"))) {
    console.error("ERRORE: data/brands.json non esiste. Esegui prima:");
    console.error("  node scripts/build-db.mjs");
    process.exit(1);
  }

  console.log(`Pacchettizzo The Good Place v${version}...\n`);

  // Ripulisci e ricrea lo staging
  await rm(STAGING, { recursive: true, force: true });
  await mkdir(STAGING, { recursive: true });

  // Copia i file/cartelle necessari
  for (const entry of INCLUDE) {
    const src = join(ROOT, entry);
    const dst = join(STAGING, entry);
    if (!existsSync(src)) {
      console.warn(`  [skip] ${entry} non trovato`);
      continue;
    }
    await cp(src, dst, { recursive: true });
    const info = await stat(dst);
    console.log(`  ok   ${entry}${info.isDirectory() ? "/" : ""}`);
  }

  // Crea lo zip con la cartella del sistema (zip disponibile su macOS/Linux)
  const zipPath = join(RELEASE_DIR, `thegoodplace-v${version}.zip`);
  await rm(zipPath, { force: true });

  await runZip(STAGING, zipPath);

  // Ripulisci staging
  await rm(STAGING, { recursive: true, force: true });

  const { size } = await stat(zipPath);
  const kb = Math.round(size / 1024);

  console.log(`\nCreato: ${zipPath}`);
  console.log(`Dimensione: ${kb} KB\n`);
  console.log("Prossimi passi:");
  console.log("  1. Condividi lo zip con i tuoi friends & family");
  console.log("  2. Allega INSTALL.md con le istruzioni di installazione");
}

function runZip(srcDir, zipPath) {
  // zip -r archive.zip ./*  (chiamato dentro srcDir cosi' i path sono relativi)
  return new Promise((resolve, reject) => {
    const p = spawn("zip", ["-r", zipPath, "."], { cwd: srcDir, stdio: "inherit" });
    p.on("error", reject);
    p.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`zip exit code ${code}`));
    });
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
