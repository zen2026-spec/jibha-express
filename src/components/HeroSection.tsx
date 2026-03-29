'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Package,
  Truck,
  Globe,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Plane,
} from 'lucide-react'

const TRACKING_CARDS = [
  {
    id: 'JE-2024-001',
    item: 'Commande Zara',
    status: 'En transit',
    statusColor: 'text-blue-400',
    statusBg: 'bg-blue-400/10',
    progress: 65,
    from: '🇵🇹 Lisbonne',
    to: '🇲🇦 Casablanca',
    eta: '2 jours',
    icon: Package,
  },
  {
    id: 'JE-2024-002',
    item: 'Électronique Amazon',
    status: 'Livré',
    statusColor: 'text-green-400',
    statusBg: 'bg-green-400/10',
    progress: 100,
    from: '🇵🇹 Porto',
    to: '🇲🇦 Rabat',
    eta: 'Livré',
    icon: CheckCircle,
  },
  {
    id: 'JE-2024-003',
    item: 'Vêtements H&M',
    status: 'Au dépôt',
    statusColor: 'text-amber-400',
    statusBg: 'bg-amber-400/10',
    progress: 30,
    from: '🇵🇹 Lisbonne',
    to: '🇲🇦 Marrakech',
    eta: '5 jours',
    icon: Truck,
  },
]

const STATS = [
  { value: '50+', label: 'Pays desservis' },
  { value: '10 000+', label: 'Colis traités' },
  { value: '2 500+', label: 'Clients actifs' },
  { value: '5–7 Jours', label: 'Délai livraison' },
]

function TrackingCard({
  card,
  delay,
}: {
  card: (typeof TRACKING_CARDS)[number]
  delay: string
}) {
  const Icon = card.icon
  return (
    <div
      className="glass rounded-2xl p-4 w-72 shadow-2xl"
      style={{ animation: `float 3s ease-in-out infinite ${delay}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              {card.item}
            </p>
            <p className="text-white/50 text-xs">{card.id}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${card.statusColor} ${card.statusBg}`}
        >
          {card.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
        <span>{card.from}</span>
        <ArrowRight className="w-3 h-3 text-white/40" />
        <span>{card.to}</span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
          style={{ width: `${card.progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/50 text-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>ETA: {card.eta}</span>
        </div>
        <Shield className="w-3.5 h-3.5 text-green-400" />
      </div>
    </div>
  )
}

export default function HeroSection() {
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % TRACKING_CARDS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="gradient-hero relative min-h-screen flex flex-col overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, #1d4ed8 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background:
              'radial-gradient(circle, #60a5fa 0%, transparent 60%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1 gap-12 lg:gap-8">
        {/* Left column – text */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in">
            <span>🇵🇹</span>
            <span className="text-white/60">Portugal</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            <span>🇲🇦</span>
            <span className="text-white/60">Maroc</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 animate-slide-up">
            <span className="text-white">Votre adresse en Portugal,</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fb923c 100%)',
              }}
            >
              Livré au Maroc
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 animate-fade-in">
            Obtenez une adresse postale portugaise en quelques secondes.
            Commandez sur tous les sites européens et recevez vos colis
            directement à domicile au Maroc — rapidement, en toute sécurité.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <Link
              href="/inscription"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-base transition-all duration-200 hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
            >
              <Globe className="w-5 h-5" />
              Créer mon adresse gratuite
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base transition-all duration-200 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start">
            {[
              { icon: Shield, label: 'Livraison assurée' },
              { icon: CheckCircle, label: 'Inscription gratuite' },
              { icon: Star, label: '4.9 / 5 étoiles' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-white/60 text-sm"
              >
                <Icon className="w-4 h-4 text-blue-300" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column – floating cards */}
        <div className="flex-1 relative flex flex-col items-center justify-center min-h-[420px] lg:min-h-[520px]">
          {/* Journey visual */}
          <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4 mb-6 shadow-xl">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🇵🇹</span>
              <span className="text-white/60 text-xs font-medium">
                Lisbonne
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="relative w-24 h-0.5 bg-white/20">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
                  style={{ animation: 'slide-up 2s ease-in-out infinite' }}
                />
                <Plane
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-cyan-300 animate-float"
                />
              </div>
              <span className="text-white/40 text-xs">vol direct</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🇲🇦</span>
              <span className="text-white/60 text-xs font-medium">Maroc</span>
            </div>
          </div>

          {/* Stacked tracking cards */}
          <div className="relative w-72 h-64">
            {TRACKING_CARDS.map((card, idx) => {
              const offset = idx - activeCard
              const isActive = idx === activeCard
              const absOffset = Math.abs(offset)
              return (
                <div
                  key={card.id}
                  className="absolute inset-0 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: `translateY(${offset * 18}px) scale(${1 - absOffset * 0.05})`,
                    zIndex: TRACKING_CARDS.length - absOffset,
                    opacity: 1 - absOffset * 0.25,
                  }}
                  onClick={() => setActiveCard(idx)}
                >
                  <TrackingCard
                    card={card}
                    delay={`${idx * 0.5}s`}
                  />
                </div>
              )
            })}
          </div>

          {/* Card dot indicators */}
          <div className="flex gap-2 mt-6">
            {TRACKING_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCard(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeCard
                    ? 'bg-blue-400 w-5'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Voir colis ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-white/50 text-sm mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
