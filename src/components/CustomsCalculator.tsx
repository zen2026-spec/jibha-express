'use client'

import { useState } from 'react'
import { Search, Calculator, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Loader2, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface TaxBreakdown {
  valueEUR: number
  valueMAD: number
  DI_rate: string
  DI_MAD: number
  TPI_rate: string
  TPI_MAD: number
  TVA_rate: string
  TVA_MAD: number
  copyright_rate: string | null
  copyright_MAD: number | null
  total_taxes_MAD: number
  total_taxes_EUR: number
  total_to_pay_MAD: number
  weightKg: number | null
}

interface HsMatch {
  hsCode: string
  description: string
  unit: string | null
  confidence: number
  rates: { DI: number; TVA: number; TPI: number; copyright: number }
  breakdown: TaxBreakdown
}

interface EstimateResult {
  query: string
  eurToMad: number
  bestMatch: HsMatch
  alternatives: HsMatch[]
}

function ConfidenceBadge({ value }: { value: number }) {
  const pct = Math.round(value * 100)
  const color =
    pct >= 80 ? 'bg-green-100 text-green-700 border-green-200'
    : pct >= 60 ? 'bg-amber-100 text-amber-700 border-amber-200'
    : 'bg-red-100 text-red-700 border-red-200'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
      {pct >= 80 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {pct}% confiance
    </span>
  )
}

function BreakdownRow({ label, rate, amountMAD, highlight = false }: {
  label: string; rate: string; amountMAD: number; highlight?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg ${highlight ? 'bg-blue-50' : 'bg-slate-50'}`}>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${highlight ? 'font-semibold text-blue-800' : 'text-slate-600'}`}>{label}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${highlight ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>{rate}</span>
      </div>
      <span className={`font-bold tabular-nums ${highlight ? 'text-blue-700' : 'text-slate-700'}`}>
        {amountMAD.toLocaleString('fr-MA')} MAD
      </span>
    </div>
  )
}

export default function CustomsCalculator() {
  const t = useTranslations('customs')

  const [description, setDescription] = useState('')
  const [valueEUR, setValueEUR] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [showAlternatives, setShowAlternatives] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || !valueEUR) return

    setLoading(true)
    setError(null)
    setResult(null)
    setShowAlternatives(false)

    try {
      const res = await fetch('/api/customs/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description.trim(), valueEUR: parseFloat(valueEUR) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur serveur')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const m = result?.bestMatch
  const bd = m?.breakdown

  return (
    <section className="py-20 bg-white" id="droits-douane">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {t('title')} <span className="text-blue-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t('descLabel')}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={t('descPlaceholder')}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">{t('descHint')}</p>
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t('valueLabel')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">€</span>
                <input
                  type="number"
                  value={valueEUR}
                  onChange={e => setValueEUR(e.target.value)}
                  placeholder="150"
                  min="1"
                  step="0.01"
                  required
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !description.trim() || !valueEUR}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-60 hover:shadow-md hover:-translate-y-0.5 disabled:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {t('calculating')}</>
            ) : (
              <><Calculator className="w-4 h-4" /> {t('calculate')}</>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && m && bd && (
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md">

            {/* HS Code header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-wider font-semibold mb-1">Code HS trouvé</p>
                  <p className="text-2xl font-mono font-bold">{m.hsCode}</p>
                  <p className="text-blue-100 text-sm mt-1 leading-snug max-w-sm">{m.description}</p>
                </div>
                <ConfidenceBadge value={m.confidence} />
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-blue-100">
                <span>DI: <strong className="text-white">{m.rates.DI}%</strong></span>
                <span>TVA: <strong className="text-white">{m.rates.TVA}%</strong></span>
                <span>TPI: <strong className="text-white">{m.rates.TPI}%</strong></span>
                {m.rates.copyright > 0 && <span>Droits auteur: <strong className="text-white">{m.rates.copyright}%</strong></span>}
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-5 space-y-2 bg-white">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Détail du calcul</p>

              {/* CIF value */}
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-100">
                <span className="text-sm font-medium text-slate-600">Valeur CIF déclarée</span>
                <div className="text-right">
                  <span className="font-bold text-slate-700">{bd.valueMAD.toLocaleString('fr-MA')} MAD</span>
                  <span className="text-xs text-slate-400 ml-2">({bd.valueEUR} €)</span>
                </div>
              </div>

              <BreakdownRow label="Droits d'importation" rate={bd.DI_rate} amountMAD={bd.DI_MAD} />
              <BreakdownRow label="Taxe parafiscale (TPI)" rate={bd.TPI_rate} amountMAD={bd.TPI_MAD} />
              <BreakdownRow label="TVA" rate={bd.TVA_rate} amountMAD={bd.TVA_MAD} />
              {bd.copyright_rate && bd.copyright_MAD != null && (
                <BreakdownRow label="Droits d'auteur (BMDA)" rate={bd.copyright_rate} amountMAD={bd.copyright_MAD} />
              )}

              {/* Total */}
              <div className="border-t border-slate-200 mt-3 pt-3 space-y-2">
                <BreakdownRow label="Total droits & taxes" rate="" amountMAD={bd.total_taxes_MAD} highlight />
                <div className="flex items-center justify-between py-3 px-3 rounded-xl bg-blue-600 text-white">
                  <span className="font-bold">Total à payer (CIF + taxes)</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold">{bd.total_to_pay_MAD.toLocaleString('fr-MA')} MAD</span>
                    <span className="text-xs text-blue-200 ml-2">≈ {bd.total_taxes_EUR} €</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">{t('disclaimer')}</p>
              </div>
            </div>

            {/* Alternatives */}
            {result.alternatives.length > 0 && (
              <div className="border-t border-slate-100">
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <span>{result.alternatives.length} autres codes HS possibles</span>
                  {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showAlternatives && (
                  <div className="px-5 pb-4 space-y-2">
                    {result.alternatives.map((alt) => (
                      <div key={alt.hsCode} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <span className="font-mono text-sm font-bold text-slate-700">{alt.hsCode}</span>
                          <p className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">{alt.description}</p>
                        </div>
                        <div className="text-right">
                          <ConfidenceBadge value={alt.confidence} />
                          <p className="text-xs text-slate-400 mt-1">
                            DI {alt.rates.DI}% · TVA {alt.rates.TVA}%
                          </p>
                          <p className="text-xs font-semibold text-slate-600">
                            {alt.breakdown.total_taxes_MAD.toLocaleString('fr-MA')} MAD taxes
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
