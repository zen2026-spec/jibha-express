'use client'

import { Check, Star, Zap, Building2 } from 'lucide-react'

type Feature = {
  text: string
  included: boolean
}

type Plan = {
  id: string
  name: string
  price: string | null
  priceSubtitle: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  badge: string | null
  badgeColor: string
  description: string
  features: Feature[]
  ctaLabel: string
  ctaHref: string
  highlighted: boolean
  cardClass: string
  ctaClass: string
}

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: null,
    priceSubtitle: 'Gratuit pour toujours',
    icon: Star,
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100',
    badge: null,
    badgeColor: '',
    description: 'Idéal pour commencer vos achats en Europe.',
    features: [
      { text: 'Adresse virtuelle au Portugal', included: true },
      { text: 'Colis illimités', included: true },
      { text: 'Stockage gratuit 20 jours', included: true },
      { text: 'Au-delà : €1,50 HT/colis/jour', included: true },
      { text: 'Paiement PayPal & carte bancaire', included: true },
      { text: 'Suivi en temps réel', included: true },
      { text: 'Notifications par e-mail', included: true },
      { text: 'Achat assisté en Europe', included: false },
      { text: 'Ouverture & photos colis', included: false },
      { text: 'Consolidation de colis', included: false },
    ],
    ctaLabel: 'Commencer gratuitement',
    ctaHref: '/inscription',
    highlighted: false,
    cardClass:
      'bg-white border border-slate-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
    ctaClass:
      'bg-slate-800 hover:bg-slate-700 text-white',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '€19,90',
    priceSubtitle: 'par mois, HT',
    icon: Zap,
    iconColor: 'text-white',
    iconBg: 'bg-white/20',
    badge: 'POPULAIRE',
    badgeColor: 'bg-amber-400 text-amber-900',
    description: 'Pour les acheteurs réguliers qui veulent le meilleur service.',
    features: [
      { text: 'Tout ce qui est inclus dans Standard', included: true },
      { text: 'Crédits pour services assistés', included: true },
      { text: 'Achat assisté en Europe', included: true },
      { text: 'Ouverture & vérification photos colis', included: true },
      { text: 'Consolidation de colis (groupage)', included: true },
      { text: 'Extraction de facture originale', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Calcul droits & taxes Maroc', included: true },
      { text: 'Responsable de compte dédié', included: false },
      { text: 'Tarifs de livraison négociés', included: false },
    ],
    ctaLabel: 'Choisir Premium',
    ctaHref: '/inscription?plan=premium',
    highlighted: true,
    cardClass:
      'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 hover:-translate-y-2 hover:shadow-blue-500/50 scale-105',
    ctaClass:
      'bg-white text-blue-700 hover:bg-blue-50',
  },
  {
    id: 'business',
    name: 'Business Premium',
    price: '€49,90',
    priceSubtitle: 'par mois, HT',
    icon: Building2,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    badge: null,
    badgeColor: '',
    description: 'Pour les entreprises et les vendeurs à volume élevé.',
    features: [
      { text: 'Tout ce qui est inclus dans Premium', included: true },
      { text: 'Volume illimité', included: true },
      { text: 'Responsable de compte dédié', included: true },
      { text: 'Tarifs de livraison négociés', included: true },
      { text: 'Dédouanement express', included: true },
      { text: 'Facturation mensuelle', included: true },
      { text: 'Intégration API', included: true },
      { text: 'Rapports détaillés', included: true },
      { text: 'SLA garanti', included: true },
      { text: 'Formation & onboarding', included: true },
    ],
    ctaLabel: 'Contacter les ventes',
    ctaHref: '/contact?plan=business',
    highlighted: false,
    cardClass:
      'bg-white border border-blue-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
    ctaClass:
      'bg-blue-600 hover:bg-blue-700 text-white',
  },
]

function FeatureRow({
  feature,
  highlighted,
}: {
  feature: Feature
  highlighted: boolean
}) {
  return (
    <li className="flex items-start gap-3 py-1.5">
      <span
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
          feature.included
            ? highlighted
              ? 'bg-white/20 text-white'
              : 'bg-green-50 text-green-600'
            : highlighted
            ? 'bg-white/10 text-white/30'
            : 'bg-slate-50 text-slate-300'
        }`}
      >
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
      <span
        className={`text-sm leading-snug ${
          feature.included
            ? highlighted
              ? 'text-blue-50'
              : 'text-slate-700'
            : highlighted
            ? 'text-blue-300/60 line-through'
            : 'text-slate-300 line-through'
        }`}
      >
        {feature.text}
      </span>
    </li>
  )
}

export default function PricingPlans() {
  return (
    <section className="py-20 bg-slate-50" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos Offres
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Des plans adaptés à{' '}
            <span className="text-blue-600">chaque besoin</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Commencez gratuitement et passez à un plan supérieur au fur et à
            mesure de vos besoins. Pas d&apos;engagement, résiliez à tout moment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.id}
                className={`plan-card relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.cardClass}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${plan.badgeColor}`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.iconBg}`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      plan.highlighted ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-4xl font-extrabold ${
                          plan.highlighted ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm mb-1.5 ${
                          plan.highlighted ? 'text-blue-200' : 'text-slate-400'
                        }`}
                      >
                        {plan.priceSubtitle}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`text-3xl font-extrabold ${
                        plan.highlighted ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Gratuit
                      <span
                        className={`block text-sm font-normal mt-0.5 ${
                          plan.highlighted ? 'text-blue-200' : 'text-slate-400'
                        }`}
                      >
                        {plan.priceSubtitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Divider */}
                <div
                  className={`border-t mb-6 ${
                    plan.highlighted ? 'border-white/20' : 'border-slate-100'
                  }`}
                />

                {/* Features */}
                <ul className="flex-1 space-y-0.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <FeatureRow
                      key={idx}
                      feature={feature}
                      highlighted={plan.highlighted}
                    />
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.ctaHref}
                  className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-100 shadow-sm ${plan.ctaClass}`}
                >
                  {plan.ctaLabel}
                </a>

                {/* No commitment note */}
                <p
                  className={`text-center text-xs mt-3 ${
                    plan.highlighted ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {plan.id === 'standard'
                    ? 'Aucune carte requise'
                    : plan.id === 'business'
                    ? 'Devis personnalisé disponible'
                    : 'Sans engagement · Résiliez à tout moment'}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-slate-400 mt-10">
          Tous les prix sont en euros, hors taxes.{' '}
          <a href="/faq" className="text-blue-600 hover:underline">
            Des questions ? Consultez notre FAQ
          </a>
        </p>
      </div>
    </section>
  )
}
