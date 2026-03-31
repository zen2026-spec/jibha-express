/**
 * POST /api/customs/estimate
 *
 * Estimates Moroccan customs duties.
 * Search strategy (auto-selects best available):
 *   1. pgvector cosine similarity  — if embeddings were pre-computed (import script)
 *   2. pg_trgm trigram similarity  — always available after data import (no model needed)
 *   3. ILIKE text search           — last-resort fallback
 *
 * Body: { description: string, valueEUR: number, originEU?: boolean }
 * If originEU=true (Union Européenne) → DI = 0% (Accord de Libre-Échange Maroc-UE)
 * TVA et TPI restent inchangés quelle que soit l'origine.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EUR_TO_MAD = 11.0;

// ─── Moroccan TVA rates by HS chapter ────────────────────────────────────────
const TVA_BY_CHAPTER: Record<string, number> = {
  '01': 0,  '02': 0,  '03': 0,
  '04': 10, '07': 0,  '08': 0,
  '10': 0,  '11': 0,  '12': 0,
  '15': 10, '16': 10, '17': 10,
  '19': 10, '20': 10, '21': 10,
  '22': 14,
  '25': 10,
  '27': 10,
  '30': 7,
  '31': 10,
  '48': 10,
  '49': 7,
  '51': 10, '52': 10, '53': 10,
  '63': 10,
  '84': 20, '85': 20,
  '87': 20,
  '90': 20,
};

function getTVARate(hsCode: string): number {
  return TVA_BY_CHAPTER[hsCode.substring(0, 2)] ?? 20;
}

const TPI_RATE = 0.25;
const COPYRIGHT_CHAPTERS = new Set(['37', '49', '85', '92']);
const COPYRIGHT_RATE = 5;

function hasCopyright(hsCode: string): boolean {
  return COPYRIGHT_CHAPTERS.has(hsCode.substring(0, 2));
}

type HsRow = {
  hsCode: string;
  description: string;
  unit: string | null;
  diRate: number;
  similarity?: number;
};

// ─── Search: pgvector (if embeddings exist) ───────────────────────────────────
async function searchByVector(query: string, limit: number): Promise<HsRow[]> {
  // Dynamically import only on runtimes that support it (local dev)
  const { embed } = await import('@/lib/embeddings');
  const vec = await embed(query);
  const vecStr = `[${vec.join(',')}]`;

  return prisma.$queryRaw<HsRow[]>`
    SELECT "hsCode", description, unit, "diRate",
           1 - (embedding <=> ${vecStr}::vector) AS similarity
    FROM customs_rates
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vecStr}::vector
    LIMIT ${limit}
  `;
}

// ─── Search: pg_trgm trigram similarity ──────────────────────────────────────
async function searchByTrigram(query: string, limit: number): Promise<HsRow[]> {
  // Enable pg_trgm if needed (idempotent)
  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm`).catch(() => {});

  return prisma.$queryRaw<HsRow[]>`
    SELECT "hsCode", description, unit, "diRate",
           similarity(lower(description), lower(${query})) AS similarity
    FROM customs_rates
    ORDER BY similarity(lower(description), lower(${query})) DESC,
             description <-> ${query}
    LIMIT ${limit}
  `;
}

// ─── Search: ILIKE fallback ───────────────────────────────────────────────────
async function searchByLike(query: string, limit: number): Promise<HsRow[]> {
  const words = query.trim().split(/\s+/).filter(w => w.length > 2);
  if (words.length === 0) return [];

  // Build a query that matches any of the words
  const pattern = `%${words[0]}%`;
  return prisma.$queryRaw<HsRow[]>`
    SELECT "hsCode", description, unit, "diRate", 0.5 AS similarity
    FROM customs_rates
    WHERE lower(description) ILIKE lower(${pattern})
    LIMIT ${limit}
  `;
}

// ─── Check if embeddings exist ────────────────────────────────────────────────
async function hasEmbeddings(): Promise<boolean> {
  try {
    const result = await prisma.$queryRaw<[{ c: bigint }]>`
      SELECT COUNT(*) AS c FROM customs_rates WHERE embedding IS NOT NULL LIMIT 1
    `;
    return Number(result[0]?.c ?? 0) > 0;
  } catch { return false; }
}

// ─── Check if table has any data ─────────────────────────────────────────────
async function hasData(): Promise<boolean> {
  try {
    const result = await prisma.$queryRaw<[{ c: bigint }]>`
      SELECT COUNT(*) AS c FROM customs_rates LIMIT 1
    `;
    return Number(result[0]?.c ?? 0) > 0;
  } catch { return false; }
}

// ─── Calculate taxes ─────────────────────────────────────────────────────────
function calcTaxes(row: HsRow, valueEUR: number, originEU = false) {
  const valueCIF_MAD = valueEUR * EUR_TO_MAD;
  const tvaRate = getTVARate(row.hsCode);
  const copyright = hasCopyright(row.hsCode);

  // ALE Maroc-UE: DI = 0% pour les produits originaires de l'Union Européenne
  const effectiveDiRate  = originEU ? 0 : row.diRate;

  const DI_amount        = valueCIF_MAD * (effectiveDiRate / 100);
  const TPI_amount       = valueCIF_MAD * (TPI_RATE / 100);
  const TVA_base         = valueCIF_MAD + DI_amount + TPI_amount;
  const TVA_amount       = TVA_base * (tvaRate / 100);
  const copyright_amount = copyright ? (valueCIF_MAD + DI_amount) * (COPYRIGHT_RATE / 100) : 0;
  const total_taxes_MAD  = DI_amount + TPI_amount + TVA_amount + copyright_amount;

  return {
    hsCode:      row.hsCode,
    description: row.description,
    unit:        row.unit,
    confidence:  Math.round((row.similarity ?? 0.5) * 100) / 100,
    originEU,
    rates: {
      DI: effectiveDiRate, DI_nominal: row.diRate, TVA: tvaRate, TPI: TPI_RATE,
      copyright: copyright ? COPYRIGHT_RATE : 0,
    },
    breakdown: {
      valueEUR,
      valueMAD:         Math.round(valueCIF_MAD),
      DI_rate:          originEU ? '0% (ALE UE)' : `${row.diRate}%`,
      DI_MAD:           Math.round(DI_amount),
      TPI_rate:         `${TPI_RATE}%`,
      TPI_MAD:          Math.round(TPI_amount),
      TVA_rate:         `${tvaRate}%`,
      TVA_MAD:          Math.round(TVA_amount),
      copyright_rate:   copyright ? `${COPYRIGHT_RATE}%` : null,
      copyright_MAD:    copyright ? Math.round(copyright_amount) : null,
      total_taxes_MAD:  Math.round(total_taxes_MAD),
      total_taxes_EUR:  Math.round((total_taxes_MAD / EUR_TO_MAD) * 100) / 100,
      total_to_pay_MAD: Math.round(valueCIF_MAD + total_taxes_MAD),
    },
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, valueEUR, originEU } = body as { description: string; valueEUR: number; originEU?: boolean };

    if (!description || typeof description !== 'string' || description.trim().length < 2) {
      return NextResponse.json({ error: 'description is required (min 2 chars)' }, { status: 400 });
    }
    if (!valueEUR || typeof valueEUR !== 'number' || valueEUR <= 0) {
      return NextResponse.json({ error: 'valueEUR must be a positive number' }, { status: 400 });
    }

    const query = description.trim();

    // ── Check DB readiness ───────────────────────────────────────────────────
    const dataReady = await hasData();
    if (!dataReady) {
      return NextResponse.json({
        error: 'Base de données vide. Exécutez le script d\'import : node scripts/import-hscodes-fast.mjs',
        setupRequired: true,
      }, { status: 503 });
    }

    // ── Choose search strategy ───────────────────────────────────────────────
    let rows: HsRow[] = [];
    let strategy = 'trigram';

    // Try pgvector first (only if embeddings exist AND NOT on Vercel serverless)
    const isVercel = !!process.env.VERCEL;
    if (!isVercel && await hasEmbeddings()) {
      try {
        rows = await searchByVector(query, 5);
        strategy = 'vector';
      } catch {
        rows = [];
      }
    }

    // Trigram search (primary on Vercel, fallback elsewhere)
    if (rows.length === 0) {
      try {
        rows = await searchByTrigram(query, 5);
        strategy = 'trigram';
      } catch {
        rows = [];
      }
    }

    // ILIKE last resort
    if (rows.length === 0) {
      rows = await searchByLike(query, 5);
      strategy = 'ilike';
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Aucun résultat trouvé pour ce descriptif.' }, { status: 404 });
    }

    const isEuOrigin = originEU === true;
    const matches = rows.map(r => calcTaxes(r, valueEUR, isEuOrigin));

    return NextResponse.json({
      query,
      strategy,
      originEU: isEuOrigin,
      eurToMad:     EUR_TO_MAD,
      bestMatch:    matches[0],
      alternatives: matches.slice(1),
    });

  } catch (err) {
    console.error('[customs/estimate]', err);
    return NextResponse.json(
      { error: 'Internal server error', detail: String(err) },
      { status: 500 }
    );
  }
}
