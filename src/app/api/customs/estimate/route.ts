/**
 * POST /api/customs/estimate
 *
 * Estimates Moroccan customs duties using pgvector semantic search.
 * Supports descriptions in French, English, and Arabic.
 *
 * Body: {
 *   description: string   // e.g. "iPhone 15 Pro", "رداء نسائي", "Chaussures Nike"
 *   valueEUR:    number   // declared CIF value in EUR
 *   weightKg?:   number   // optional weight
 * }
 *
 * Returns top-3 HS code matches + full tax breakdown for the best match.
 */

import { NextRequest, NextResponse } from 'next/server';
import { embed } from '@/lib/embeddings';
import { prisma } from '@/lib/prisma';

// EUR → MAD exchange rate (update periodically)
const EUR_TO_MAD = 11.0;

// ─── Moroccan TVA rates by HS chapter ────────────────────────────────────────
// Default 20%, reduced rates for specific chapters
const TVA_BY_CHAPTER: Record<string, number> = {
  '01': 0,  '02': 0,  '03': 0,   // Live animals, meat, fish
  '04': 10, '07': 0,  '08': 0,   // Dairy 10%, veg/fruit exempt
  '10': 0,  '11': 0,  '12': 0,   // Cereals, flour, oil seeds
  '15': 10, '16': 10, '17': 10,  // Fats, prepared food, sugar
  '19': 10, '20': 10, '21': 10,  // Bakery, veg prep, misc food
  '22': 14,                        // Beverages 14%
  '25': 10,                        // Salt, cement
  '27': 10,                        // Mineral fuels
  '30': 7,                         // Pharmaceuticals 7%
  '31': 10,                        // Fertilisers
  '48': 10,                        // Paper
  '49': 7,                         // Books, printed matter 7%
  '51': 10, '52': 10, '53': 10,  // Textiles
  '63': 10,                        // Textile articles
  '84': 20, '85': 20,             // Machinery, electronics 20%
  '87': 20,                        // Vehicles 20%
  '90': 20,                        // Optical, medical 20%
};

function getTVARate(hsCode: string): number {
  const chapter = hsCode.substring(0, 2);
  return TVA_BY_CHAPTER[chapter] ?? 20;
}

// ─── Parafiscal tax (TPI) ─────────────────────────────────────────────────────
// 0.25% on all imports (Taxe Parafiscale à l'Importation)
const TPI_RATE = 0.25;

// ─── Copyright / droit d'auteur ───────────────────────────────────────────────
// Applicable on certain HS chapters (software, recordings, books with digital)
const COPYRIGHT_CHAPTERS = new Set(['37', '49', '85', '92']);
const COPYRIGHT_RATE = 5; // 5% on CIF+DI (charged by BMDA)

function hasCopyright(hsCode: string): boolean {
  return COPYRIGHT_CHAPTERS.has(hsCode.substring(0, 2));
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, valueEUR, weightKg } = body as {
      description: string;
      valueEUR: number;
      weightKg?: number;
    };

    if (!description || typeof description !== 'string' || description.trim().length < 2) {
      return NextResponse.json({ error: 'description is required (min 2 chars)' }, { status: 400 });
    }
    if (!valueEUR || typeof valueEUR !== 'number' || valueEUR <= 0) {
      return NextResponse.json({ error: 'valueEUR must be a positive number' }, { status: 400 });
    }

    // ── 1. Generate query embedding ──────────────────────────────────────────
    const queryVec = await embed(description.trim());
    const vecStr = `[${queryVec.join(',')}]`;

    // ── 2. pgvector cosine similarity search (top 5) ────────────────────────
    const results = await prisma.$queryRaw<
      Array<{ id: number; hsCode: string; description: string; unit: string | null; diRate: number; similarity: number }> // eslint-disable-line @typescript-eslint/no-explicit-any
    >`
      SELECT
        id,
        "hsCode",
        description,
        unit,
        "diRate",
        1 - (embedding <=> ${vecStr}::vector) AS similarity
      FROM customs_rates
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> ${vecStr}::vector
      LIMIT 5
    `;

    if (results.length === 0) {
      return NextResponse.json({ error: 'No HS codes in database. Run import script first.' }, { status: 503 });
    }

    // ── 3. Calculate taxes for each result ──────────────────────────────────
    const valueCIF_MAD = valueEUR * EUR_TO_MAD;

    const matches = results.map((r: { hsCode: string; description: string; unit: string | null; diRate: number; similarity: number }) => {
      const tvaRate = getTVARate(r.hsCode);
      const copyright = hasCopyright(r.hsCode);

      // Standard Moroccan customs calculation formula
      const DI_amount       = valueCIF_MAD * (r.diRate / 100);
      const TPI_amount      = valueCIF_MAD * (TPI_RATE / 100);
      const TVA_base        = valueCIF_MAD + DI_amount + TPI_amount;
      const TVA_amount      = TVA_base * (tvaRate / 100);
      const copyright_amount = copyright ? (valueCIF_MAD + DI_amount) * (COPYRIGHT_RATE / 100) : 0;
      const total_taxes_MAD = DI_amount + TPI_amount + TVA_amount + copyright_amount;
      const total_taxes_EUR = total_taxes_MAD / EUR_TO_MAD;
      const total_to_pay_MAD = valueCIF_MAD + total_taxes_MAD;

      return {
        hsCode:      r.hsCode,
        description: r.description,
        unit:        r.unit,
        confidence:  Math.round(r.similarity * 100) / 100,
        rates: {
          DI:        r.diRate,
          TVA:       tvaRate,
          TPI:       TPI_RATE,
          copyright: copyright ? COPYRIGHT_RATE : 0,
        },
        breakdown: {
          valueEUR,
          valueMAD:         Math.round(valueCIF_MAD),
          DI_rate:          `${r.diRate}%`,
          DI_MAD:           Math.round(DI_amount),
          TPI_rate:         `${TPI_RATE}%`,
          TPI_MAD:          Math.round(TPI_amount),
          TVA_rate:         `${tvaRate}%`,
          TVA_MAD:          Math.round(TVA_amount),
          copyright_rate:   copyright ? `${COPYRIGHT_RATE}%` : null,
          copyright_MAD:    copyright ? Math.round(copyright_amount) : null,
          total_taxes_MAD:  Math.round(total_taxes_MAD),
          total_taxes_EUR:  Math.round(total_taxes_EUR * 100) / 100,
          total_to_pay_MAD: Math.round(total_to_pay_MAD),
          weightKg:         weightKg ?? null,
        },
      };
    });

    return NextResponse.json({
      query:        description,
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
