/**
 * Import Moroccan HS codes into Neon PostgreSQL with pgvector embeddings.
 *
 * Usage:
 *   node scripts/import-hscodes.mjs
 *
 * Prerequisites:
 *   1. DATABASE_URL set in .env.local
 *   2. npx prisma migrate dev  (to create customs_rates table + vector column)
 *   3. Internet access on first run (model download ~90MB, cached after)
 *
 * Runtime: ~30-60 min for 13 135 rows (embedding generation is local CPU)
 * Resume-safe: uses UPSERT, so you can restart after interruption.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load .env.local manually
try {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  console.log('✓ .env.local loaded');
} catch {
  console.warn('⚠ Could not load .env.local — using existing env vars');
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set. Add it to .env.local');
  process.exit(1);
}

const xlsx = require('xlsx');
const { pipeline, env } = await import('@xenova/transformers');
const { default: pg } = await import('pg');

const { Pool } = pg;

// ─── Config ──────────────────────────────────────────────────────────────────
const XLSX_PATH = 'C:/Users/hp/Desktop/LAST MILE EXPRESS BUSINES PLAN/PROPOSAL 2024/HSCODE UPDATE.xlsx';
const BATCH_SIZE = 50; // rows per DB transaction
const EMBED_CHUNK = 16; // texts per embedding batch (memory limit)
const VECTOR_DIM = 384;

// ─── Load HS codes from XLSX ──────────────────────────────────────────────────
console.log('\n📂 Reading XLSX...');
const wb = xlsx.readFile(XLSX_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(ws, { header: 1 }).slice(1); // skip header

const hsCodes = rows
  .filter(r => r[0] && r[1])
  .map(r => ({
    hsCode: String(r[0]).trim(),
    description: String(r[1]).replace(/%/g, ' ').replace(/\s+/g, ' ').trim(),
    unit: r[2] ? String(r[2]).trim() : null,
    diRate: parseFloat(r[3]) || 0,
  }));

console.log(`✓ ${hsCodes.length} HS codes loaded`);

// ─── Setup DB ─────────────────────────────────────────────────────────────────
console.log('\n🔌 Connecting to Neon...');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// Enable pgvector extension
await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
console.log('✓ pgvector extension enabled');

// Create table if needed (Prisma migration may not have run yet)
await pool.query(`
  CREATE TABLE IF NOT EXISTS customs_rates (
    id          SERIAL PRIMARY KEY,
    "hsCode"    TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    unit        TEXT,
    "diRate"    DOUBLE PRECISION NOT NULL DEFAULT 0,
    embedding   vector(${VECTOR_DIM})
  )
`);

// Add embedding column if table exists but column doesn't
await pool.query(`
  ALTER TABLE customs_rates
  ADD COLUMN IF NOT EXISTS embedding vector(${VECTOR_DIM})
`).catch(() => {}); // ignore if already exists

// Index for fast cosine similarity search
await pool.query(`
  CREATE INDEX IF NOT EXISTS customs_rates_embedding_idx
  ON customs_rates
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
`).catch(() => {}); // index creation may fail if not enough rows yet

console.log('✓ Table ready');

// ─── Check how many already have embeddings ───────────────────────────────────
const { rows: [{ count }] } = await pool.query(
  `SELECT COUNT(*) FROM customs_rates WHERE embedding IS NOT NULL`
);
const alreadyDone = parseInt(count);
console.log(`ℹ  ${alreadyDone} rows already have embeddings — will skip them`);

// ─── Load embedding model ─────────────────────────────────────────────────────
console.log('\n🤖 Loading embedding model (first run downloads ~90MB)...');
env.allowRemoteModels = true;
const embedder = await pipeline('feature-extraction', 'Xenova/paraphrase-multilingual-MiniLM-L12-v2');
console.log('✓ Model ready');

// ─── Process in batches ───────────────────────────────────────────────────────
console.log(`\n🚀 Starting import (${hsCodes.length} rows, batch=${BATCH_SIZE})...\n`);

let inserted = 0;
let skipped = 0;
const startTime = Date.now();

for (let i = 0; i < hsCodes.length; i += BATCH_SIZE) {
  const batch = hsCodes.slice(i, i + BATCH_SIZE);

  // Skip rows already in DB with embeddings
  const existingRes = await pool.query(
    `SELECT "hsCode" FROM customs_rates WHERE "hsCode" = ANY($1) AND embedding IS NOT NULL`,
    [batch.map(r => r.hsCode)]
  );
  const existingSet = new Set(existingRes.rows.map(r => r.hsCode));
  const toProcess = batch.filter(r => !existingSet.has(r.hsCode));
  skipped += batch.length - toProcess.length;

  if (toProcess.length === 0) {
    process.stdout.write(`\r  [${i + batch.length}/${hsCodes.length}] skipped (already done)`);
    continue;
  }

  // Generate embeddings for this batch
  const embeddings = [];
  for (let j = 0; j < toProcess.length; j += EMBED_CHUNK) {
    const chunk = toProcess.slice(j, j + EMBED_CHUNK).map(r => r.description);
    const outputs = await embedder(chunk, { pooling: 'mean', normalize: true });
    for (const out of (Array.isArray(outputs) ? outputs : [outputs])) {
      embeddings.push(Array.from(out.data));
    }
  }

  // Upsert into DB
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (let k = 0; k < toProcess.length; k++) {
      const { hsCode, description, unit, diRate } = toProcess[k];
      const vec = `[${embeddings[k].join(',')}]`;
      await client.query(
        `INSERT INTO customs_rates ("hsCode", description, unit, "diRate", embedding)
         VALUES ($1, $2, $3, $4, $5::vector)
         ON CONFLICT ("hsCode") DO UPDATE SET
           description = EXCLUDED.description,
           unit = EXCLUDED.unit,
           "diRate" = EXCLUDED."diRate",
           embedding = EXCLUDED.embedding`,
        [hsCode, description, unit, diRate, vec]
      );
    }
    await client.query('COMMIT');
    inserted += toProcess.length;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`\n❌ Batch error at row ${i}:`, err.message);
  } finally {
    client.release();
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
  const remaining = Math.round(((hsCodes.length - i - batch.length) / batch.length) * ((Date.now() - startTime) / BATCH_SIZE / 1000));
  process.stdout.write(
    `\r  [${i + batch.length}/${hsCodes.length}] inserted=${inserted} skipped=${skipped} | ${elapsed}s elapsed, ~${remaining}s left  `
  );
}

// ─── Final index rebuild ──────────────────────────────────────────────────────
console.log('\n\n🔧 Rebuilding vector index...');
await pool.query(`
  DROP INDEX IF EXISTS customs_rates_embedding_idx;
  CREATE INDEX customs_rates_embedding_idx
  ON customs_rates
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
`).catch(e => console.warn('Index rebuild skipped:', e.message));

await pool.end();

const totalSec = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`✅ Done! ${inserted} rows inserted/updated, ${skipped} skipped. Total: ${totalSec}s`);
console.log('\nNext step: Run  npx prisma db push  if you haven\'t already.\n');
