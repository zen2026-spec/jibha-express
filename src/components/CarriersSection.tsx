'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Package,
  Truck,
  Clock,
  Calculator,
  DollarSign,
  ArrowRight,
} from 'lucide-react'

type Carrier = {
  id: string
  name: string
  subtitle: string
  transit: string
  basePrice: number
  bgColor: string
  borderColor: string
  textColor: string
  badgeColor: string
  logoPath: string
}

const CARRIERS: Carrier[] = [
  {
    id: 'dhl',
    name: 'DHL Express',
    subtitle: 'Express international',
    transit: '2–3',
    basePrice: 28.5,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    logoPath: '/logos/dhl.png',
  },
  {
    id: 'fedex',
    name: 'FedEx',
    subtitle: 'International Priority',
    transit: '3–4',
    basePrice: 24.9,
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    badgeColor: 'bg-violet-100 text-violet-800',
    logoPath: '/logos/fedex.png',
  },
  {
    id: 'ups',
    name: 'UPS',
    subtitle: 'Worldwide Express',
    transit: '3–5',
    basePrice: 22.0,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    badgeColor: 'bg-amber-100 text-amber-900',
    logoPath: '/logos/ups.png',
  },
  {
    id: 'last-mile-express',
    name: 'LAST MILE EXPRESS',
    subtitle: 'Consolidation Maroc',
    transit: '7–10',
    basePrice: 9.9,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    badgeColor: 'bg-green-100 text-green-800',
    logoPath: '/logos/last-mile-express.png',
  },
]

type SimulatorResult = {
  transport: number
  handling: number
  customsEstimate: number
  total: number
  carrierName: string
}

function scrollToSimulator() {
  const el = document.getElementById('price-simulator')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function CarrierCard({ carrier, daysLabel, fromLabel, perKgLabel, calculateLabel }: {
  carrier: Carrier
  daysLabel: string
  fromLabel: string
  perKgLabel: string
  calculateLabel: string
}) {
  return (
    <div
      className={`plan-card rounded-2xl border ${carrier.borderColor} ${carrier.bgColor} p-6 flex flex-col gap-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={scrollToSimulator}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-md overflow-hidden p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={carrier.logoPath} alt={carrier.name} className="object-contain w-full h-full" />
        </div>
        <div>
          <p className="font-bold text-slate-900 text-base leading-tight">{carrier.name}</p>
          <p className="text-xs text-slate-500">{carrier.subtitle}</p>
        </div>
      </div>

      {/* Transit */}
      <div className="flex items-center gap-2">
        <Clock className={`w-4 h-4 ${carrier.textColor} flex-shrink-0`} />
        <span className="text-sm text-slate-700 font-medium">
          {carrier.transit} {daysLabel}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-xs text-slate-400">{fromLabel}</span>
        <span className={`text-2xl font-extrabold ${carrier.textColor}`}>
          €{carrier.basePrice.toFixed(2)}
        </span>
        <span className="text-xs text-slate-400">{perKgLabel}</span>
      </div>

      {/* CTA */}
      <button
        onClick={(e) => { e.stopPropagation(); scrollToSimulator() }}
        className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold border transition-colors duration-200 ${carrier.badgeColor} hover:brightness-95`}
      >
        <Calculator className="w-4 h-4" />
        {calculateLabel}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function PriceSimulator() {
  const t = useTranslations('simulator')
  const [weight, setWeight] = useState<string>('1')
  const [length, setLength] = useState<string>('')
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [declaredValue, setDeclaredValue] = useState<string>('')
  const [selectedCarrier, setSelectedCarrier] = useState<string>('dhl')
  const [result, setResult] = useState<SimulatorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const tCarriers = useTranslations('carriers')

  function calculate() {
    setLoading(true)
    setTimeout(() => {
      const w = parseFloat(weight) || 1
      const l = parseFloat(length) || 0
      const wid = parseFloat(width) || 0
      const h = parseFloat(height) || 0
      const val = parseFloat(declaredValue) || 0
      const volumetricWeight = l > 0 && wid > 0 && h > 0 ? (l * wid * h) / 5000 : 0
      const billableWeight = Math.max(w, volumetricWeight)
      const carrier = CARRIERS.find((c) => c.id === selectedCarrier)!
      const extraKg = Math.max(0, billableWeight - 1)
      const extraSteps = Math.ceil(extraKg / 0.5)
      const transportRate = carrier.basePrice * 0.6
      const transport = carrier.basePrice + extraSteps * (transportRate * 0.5)
      const handling = 5.0
      const customsEstimate = val > 0 ? Math.max(0, val * 0.025) : 0
      const total = transport + handling + customsEstimate
      setResult({
        transport: Math.round(transport * 100) / 100,
        handling,
        customsEstimate: Math.round(customsEstimate * 100) / 100,
        total: Math.round(total * 100) / 100,
        carrierName: carrier.name,
      })
      setLoading(false)
    }, 400)
  }

  return (
    <div id="price-simulator" className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
          <p className="text-sm text-slate-500">{t('subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          {/* Weight */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('weight')}</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="number" min="0.1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)}
                placeholder="ex. 2.5"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('dimensions')}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: length, set: setLength, ph: 'L', label: 'L' },
                { val: width, set: setWidth, ph: 'l', label: 'l' },
                { val: height, set: setHeight, ph: 'H', label: 'H' },
              ].map(({ val, set, ph, label }) => (
                <input key={ph} type="number" min="1" value={val} onChange={(e) => set(e.target.value)}
                  placeholder={ph} aria-label={label}
                  className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">{t('volumetricNote')}</p>
          </div>

          {/* Declared value */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('value')}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="number" min="0" value={declaredValue} onChange={(e) => setDeclaredValue(e.target.value)}
                placeholder="ex. 150"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <p className="text-xs text-slate-400 mt-1">{t('customsNote')}</p>
          </div>

          {/* Carrier */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('carrier')}</label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select value={selectedCarrier} onChange={(e) => setSelectedCarrier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none">
                {CARRIERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.transit} {tCarriers('days')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button onClick={calculate} disabled={!weight || loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-100 shadow-sm">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t('calculating')}
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4" />
                {t('calculate')}
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{t('result')}</p>
                    <p className="font-bold text-slate-900 text-sm">{result.carrierName}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: t('transport'), value: result.transport, icon: <Truck className="w-4 h-4 text-blue-500" /> },
                    { label: t('handling'), value: result.handling, icon: <Package className="w-4 h-4 text-violet-500" /> },
                    { label: t('customs'), value: result.customsEstimate, icon: <DollarSign className="w-4 h-4 text-amber-500" /> },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
                      <div className="flex items-center gap-2">
                        {row.icon}
                        <span className="text-sm text-slate-600">{row.label}</span>
                      </div>
                      <span className="font-semibold text-sm text-slate-900">€{row.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-blue-600 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">{t('total')}</span>
                <span className="text-white font-extrabold text-2xl">€{result.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">{t('disclaimer')}</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-600 mb-1">{t('empty')}</p>
                <p className="text-sm text-slate-400">{t('emptyDesc')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CarriersSection() {
  const t = useTranslations('carriers')

  const GUARANTEES = [
    { icon: <Clock className="w-5 h-5 text-blue-600" />, title: t('guarantees.transit'), desc: t('guarantees.transitDesc') },
    { icon: <Package className="w-5 h-5 text-green-600" />, title: t('guarantees.tracking'), desc: t('guarantees.trackingDesc') },
    { icon: <Truck className="w-5 h-5 text-violet-600" />, title: t('guarantees.insurance'), desc: t('guarantees.insuranceDesc') },
  ]

  return (
    <section className="py-20 bg-white" id="transporteurs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t('title')}{' '}
            <span className="text-blue-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">{t('subtitle')}</p>
        </div>

        {/* Route indicator */}
        <div className="flex items-center justify-center gap-3 mb-10 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-1.5 bg-slate-100 px-4 py-2 rounded-full">
            🇵🇹 <span>{t('from')}</span>
          </span>
          <ArrowRight className="w-5 h-5 text-blue-500" />
          <span className="flex items-center gap-1.5 bg-slate-100 px-4 py-2 rounded-full">
            🇲🇦 <span>{t('to')}</span>
          </span>
        </div>

        {/* Carrier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARRIERS.map((carrier) => (
            <CarrierCard
              key={carrier.id}
              carrier={carrier}
              daysLabel={t('days')}
              fromLabel={t('from_label')}
              perKgLabel={t('per_kg')}
              calculateLabel={t('calculate')}
            />
          ))}
        </div>

        {/* Info strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GUARANTEES.map((item) => (
            <div key={item.title} className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Simulator */}
        <PriceSimulator />
      </div>
    </section>
  )
}
