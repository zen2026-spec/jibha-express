/**
 * Fast import: Moroccan HS codes → Neon (text only, no embeddings)
 *
 * Usage:
 *   node scripts/import-hscodes-fast.mjs
 *
 * Duration: ~30-60 seconds for 13 135 rows.
 * No model download needed. Safe to re-run (upsert).
 *
 * After this: the customs calculator works on Vercel (pg_trgm search).
 * Optional: run import-hscodes.mjs later to add vector embeddings (better accuracy).
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load .env.local
try {
  const envContent = readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of envContent.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  console.log('✓ .env.local loaded');
} catch { console.warn('⚠ Using existing env vars'); }

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set');
  process.exit(1);
}

const xlsx = require('xlsx');
const { default: pg } = await import('pg');
const { Pool } = pg;

const XLSX_PATH = 'C:/Users/hp/Desktop/LAST MILE EXPRESS BUSINES PLAN/PROPOSAL 2024/HSCODE UPDATE.xlsx';
const BATCH = 200;

// ── Read XLSX ─────────────────────────────────────────────────────────────────
console.log('\n📂 Reading XLSX...');
const wb = xlsx.readFile(XLSX_PATH);
const rows = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }).slice(1);
const hsCodes = rows
  .filter(r => r[0] && r[1])
  .map(r => ({
    hsCode: String(r[0]).trim(),
    description: String(r[1]).replace(/%/g, ' ').replace(/\s+/g, ' ').trim(),
    unit: r[2] ? String(r[2]).trim() : null,
    diRate: parseFloat(r[3]) || 0,
  }));
console.log(`✓ ${hsCodes.length} HS codes loaded`);

// ── Connect ───────────────────────────────────────────────────────────────────
console.log('\n🔌 Connecting to Neon...');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Setup table + extensions ──────────────────────────────────────────────────
await pool.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
await pool.query('CREATE EXTENSION IF NOT EXISTS vector').catch(() => {});

await pool.query(`
  CREATE TABLE IF NOT EXISTS customs_rates (
    id          SERIAL PRIMARY KEY,
    "hsCode"    TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    unit        TEXT,
    "diRate"    DOUBLE PRECISION NOT NULL DEFAULT 0,
    embedding   vector(384)
  )
`);

// Trigram index for fast text search
await pool.query(`
  CREATE INDEX IF NOT EXISTS customs_rates_desc_trgm
  ON customs_rates USING gin (lower(description) gin_trgm_ops)
`).catch(e => console.warn('Trigram index skipped:', e.message));

console.log('✓ Table + indexes ready');

// ── Insert in batches ─────────────────────────────────────────────────────────
console.log(`\n🚀 Inserting ${hsCodes.length} rows (batch=${BATCH})...\n`);
const start = Date.now();
let inserted = 0;

for (let i = 0; i < hsCodes.length; i += BATCH) {
  const batch = hsCodes.slice(i, i + BATCH);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Build multi-row upsert
    const placeholders = batch.map((_, k) => {
      const b = k * 4;
      return `($${b+1}, $${b+2}, $${b+3}, $${b+4})`;
    }).join(', ');
    const values = batch.flatMap(r => [r.hsCode, r.description, r.unit, r.diRate]);

    await client.query(
      `INSERT INTO customs_rates ("hsCode", description, unit, "diRate")
       VALUES ${placeholders}
       ON CONFLICT ("hsCode") DO UPDATE SET
         description = EXCLUDED.description,
         unit = EXCLUDED.unit,
         "diRate" = EXCLUDED."diRate"`,
      values
    );

    await client.query('COMMIT');
    inserted += batch.length;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`\n❌ Batch error at row ${i}:`, err.message);
  } finally {
    client.release();
  }

  process.stdout.write(
    `\r  [${Math.min(i + BATCH, hsCodes.length)}/${hsCodes.length}] ${((Date.now()-start)/1000).toFixed(1)}s`
  );
}

await pool.end();
const sec = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n\n✅ Done! ${inserted} rows in ${sec}s`);
console.log('\n🎉 The customs calculator is now active on Vercel (pg_trgm search).');
console.log('📈 For better accuracy, optionally run: node scripts/import-hscodes.mjs (adds vector embeddings)\n');
