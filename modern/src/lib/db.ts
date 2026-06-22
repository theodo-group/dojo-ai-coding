import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Accès à la base SQLite.
 *
 * La base `modern/` lui est PROPRE : au tout premier accès, si le fichier
 * n'existe pas encore, on le crée et on rejoue les mêmes scripts SQL que le
 * legacy (`../legacy/sql/*.sql` : schéma + seed + triggers). Aucun Docker,
 * aucune dépendance native — `node:sqlite` est intégré à Node (>= 24).
 */

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "compta.db");
const SQL_DIR = path.join(process.cwd(), "..", "legacy", "sql");

// En dev, Next recharge les modules à chaud : on garde l'instance sur
// globalThis pour ne pas rouvrir la base à chaque rechargement.
const globalForDb = globalThis as unknown as { __comptaDb?: DatabaseSync };

function seed(db: DatabaseSync) {
  const files = readdirSync(SQL_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    db.exec(readFileSync(path.join(SQL_DIR, file), "utf8"));
  }
}

export function getDb(): DatabaseSync {
  if (globalForDb.__comptaDb) return globalForDb.__comptaDb;

  const fresh = !existsSync(DB_PATH);
  if (fresh) mkdirSync(DB_DIR, { recursive: true });

  const db = new DatabaseSync(DB_PATH);
  if (fresh) seed(db);

  globalForDb.__comptaDb = db;
  return db;
}
