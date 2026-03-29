'use client'

import { UserPlus, ShoppingBag, Package, Truck } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Créez votre compte',
    description:
      "Inscription gratuite en 2 minutes. Obtenez instantanément votre adresse virtuelle au Portugal, prête à l\u2019emploi.",
    color: 'from-blue-500 to-blue-600',
    lightColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    numberGradient: 'from-blue-500 to-blue-700',
  },
  {
    number: 2,
    icon: ShoppingBag,
    title: 'Faites vos achats',
    description:
      "Utilisez votre adresse portugaise sur tous les sites e-commerce europ\u00e9ens\u00a0: Amazon, Zara, IKEA, ASOS et bien d\u2019autres.",
    color: 'from-violet-500 to-violet-600',
    lightColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderColor: 'border-violet-100',
    numberGradient: 'from-violet-500 to-violet-700',
  },
  {
    number: 3,
    icon: Package,
    title: 'Nous consolidons',
    description:
      "Nous r\u00e9ceptionnons, v\u00e9rifions et regroupons tous vos colis dans notre entrep\u00f4t \u00e0 Lisbonne avant l\u2019exp\u00e9dition.",
    color: 'from-amber-500 to-orange-500',
    lightColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    numberGradient: 'from-amber-500 to-orange-600',
  },
  {
    number: 4,
    icon: Truck,
    title: 'Livraison au Maroc',
    description:
      'Vos colis sont expédiés, dédouanés et livrés à domicile partout au Maroc en 5 à 7 jours ouvrés.',
    color: 'from-emerald-500 to-green-600',
    lightColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    numberGradient: 'from-emerald-500 to-green-700',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4 border border-blue-100 tracking-wide uppercase">
            Simple &amp; rapide
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Comment ça{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #1a56db 0%, #7c3aed 100%)',
              }}
            >
              fonctionne&nbsp;?
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            De la création de votre compte à la livraison chez vous — quatre
            étapes simples suffisent.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line – desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 mx-auto"
            style={{
              width: 'calc(100% - 120px)',
              left: '60px',
              backgroundImage:
                'linear-gradient(90deg, #1a56db 0%, #7c3aed 40%, #f59e0b 70%, #10b981 100%)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Number circle */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-inner`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Step number badge */}
                    <span
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${step.numberGradient} text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-white`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full rounded-2xl border ${step.borderColor} ${step.lightColor} p-6 group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300`}
                  >
                    <h3 className="text-gray-900 font-bold text-lg mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile connector (except last) */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className="sm:hidden w-0.5 h-8 mt-2"
                      style={{
                        backgroundImage:
                          'linear-gradient(180deg, #1a56db, #7c3aed)',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-base mb-5">
            Prêt à commencer ? Créez votre compte gratuitement en 2 minutes.
          </p>
          <a
            href="/inscription"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            <UserPlus className="w-5 h-5" />
            Créer mon compte gratuitement
          </a>
        </div>
      </div>
    </section>
  )
}
