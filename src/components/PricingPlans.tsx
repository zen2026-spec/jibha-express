'use client'

import { Check, Star, Zap, Building2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Which features are included (true) or excluded (false) — order matches JSON arrays
const STANDARD_INCLUDED = [true, true, true, true, true, true, true, false, false, false]
const PREMIUM_INCLUDED   = [true, true, true, true, true, true, true, true, false, false]
const BUSINESS_INCLUDED  = [true, true, true, true, true, true, true, true, true, true]

export default function PricingPlans() {
  const t = useTranslations('plans')

  const standardFeatures = (t.raw('standard.features') as string[]).map((text, i) => ({
    text,
    included: STANDARD_INCLUDED[i] ?? false,
  }))
  const premiumFeatures = (t.raw('premium.features') as string[]).map((text, i) => ({
    text,
    included: PREMIUM_INCLUDED[i] ?? false,
  }))
  const businessFeatures = (t.raw('business.features') as string[]).map((text, i) => ({
    text,
    included: BUSINESS_INCLUDED[i] ?? false,
  }))

  const PLANS = [
    {
      id: 'standard',
      name: t('standard.name'),
      price: null,
      priceLabel: t('standard.priceLabel'),
      priceSubtitle: t('standard.priceSubtitle'),
      icon: Star,
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-100',
      badge: null,
      badgeColor: '',
      description: t('standard.description'),
      features: standardFeatures,
      ctaLabel: t('standard.cta'),
      ctaHref: '/inscription',
      ctaNote: t('standard.noCard'),
      highlighted: false,
      cardClass: 'bg-white border border-slate-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
      ctaClass: 'bg-slate-800 hover:bg-slate-700 text-white',
    },
    {
      id: 'premium',
      name: t('premium.name'),
      price: t('premium.price'),
      priceLabel: null,
      priceSubtitle: t('premium.priceSubtitle'),
      icon: Zap,
      iconColor: 'text-white',
      iconBg: 'bg-white/20',
      badge: t('popular'),
      badgeColor: 'bg-amber-400 text-amber-900',
      description: t('premium.description'),
      features: premiumFeatures,
      ctaLabel: t('premium.cta'),
      ctaHref: '/inscription?plan=premium',
      ctaNote: t('premium.noCommitment'),
      highlighted: true,
      cardClass: 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 hover:-translate-y-2 hover:shadow-blue-500/50 scale-105',
      ctaClass: 'bg-white text-blue-700 hover:bg-blue-50',
    },
    {
      id: 'business',
      name: t('business.name'),
      price: t('business.price'),
      priceLabel: null,
      priceSubtitle: t('business.priceSubtitle'),
      icon: Building2,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badge: null,
      badgeColor: '',
      description: t('business.description'),
      features: businessFeatures,
      ctaLabel: t('business.cta'),
      ctaHref: '/contact?plan=business',
      ctaNote: t('business.quote'),
      highlighted: false,
      cardClass: 'bg-white border border-blue-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
      ctaClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  ]

  return (
    <section className="py-20 bg-slate-50" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t('title')}{' '}
            <span className="text-blue-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">{t('subtitle')}</p>
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
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${plan.badgeColor}`}>
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
                  <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                        {plan.priceSubtitle}
                      </span>
                    </div>
                  ) : (
                    <div className={`text-3xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      {plan.priceLabel}
                      <span className={`block text-sm font-normal mt-0.5 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                        {plan.priceSubtitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Divider */}
                <div className={`border-t mb-6 ${plan.highlighted ? 'border-white/20' : 'border-slate-100'}`} />

                {/* Features */}
                <ul className="flex-1 space-y-0.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 py-1.5">
                      <span
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? plan.highlighted ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'
                            : plan.highlighted ? 'bg-white/10 text-white/30' : 'bg-slate-50 text-slate-300'
                        }`}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span
                        className={`text-sm leading-snug ${
                          feature.included
                            ? plan.highlighted ? 'text-blue-50' : 'text-slate-700'
                            : plan.highlighted ? 'text-blue-300/60 line-through' : 'text-slate-300 line-through'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.ctaHref}
                  className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-100 shadow-sm ${plan.ctaClass}`}
                >
                  {plan.ctaLabel}
                </a>

                {/* Note */}
                <p className={`text-center text-xs mt-3 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                  {plan.ctaNote}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-slate-400 mt-10">
          {t('noTax')}{' '}
          <a href="/faq" className="text-blue-600 hover:underline">
            {t('faqCta')}
          </a>
        </p>
      </div>
    </section>
  )
}
