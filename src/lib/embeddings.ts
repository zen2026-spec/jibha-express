/**
 * Local multilingual embeddings using @xenova/transformers
 * Model: paraphrase-multilingual-MiniLM-L12-v2 (384 dims, supports FR/EN/AR)
 * No API key needed — model is downloaded once and cached locally (~90MB).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pipeline: ((texts: string | string[], options?: Record<string, unknown>) => Promise<any>) | null = null;

async function getEmbedder() {
  if (pipeline) return pipeline;

  // Dynamic import to avoid SSR issues
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const xenovaModule = await import('@xenova/transformers');
  const { pipeline: createPipeline, env } = xenovaModule;

  env.allowRemoteModels = true;

  pipeline = await createPipeline(
    'feature-extraction',
    'Xenova/paraphrase-multilingual-MiniLM-L12-v2',
  );

  return pipeline!;
}

/**
 * Generate a 384-dimensional embedding vector for a text.
 * Supports French, English, and Arabic.
 */
export async function embed(text: string): Promise<number[]> {
  const embedder = await getEmbedder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = await embedder(text, { pooling: 'mean', normalize: true });
  const data: Float32Array = Array.isArray(output) ? output[0].data : output.data;
  return Array.from(data);
}

/**
 * Generate embeddings for multiple texts in batch.
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const embedder = await getEmbedder();
  const results: number[][] = [];

  const CHUNK = 16;
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const outputs: any = await embedder(chunk, { pooling: 'mean', normalize: true });
    const arr = Array.isArray(outputs) ? outputs : [outputs];
    for (const out of arr) {
      results.push(Array.from(out.data as Float32Array));
    }
    process.stdout?.write(`\r  Embeddings: ${Math.min(i + CHUNK, texts.length)}/${texts.length}`);
  }
  return results;
}
