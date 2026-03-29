'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Star, Quote, Shield, Clock, Package, CheckCircle } from 'lucide-react'

type Testimonial = {
  id: number
  name: string
  city: string
  flag: string
  rating: number
  quote: string
  initials: string
  avatarColor: string
  date: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Fatima Benali',
    city: 'Casablanca',
    flag: '🇲🇦',
    rating: 5,
    quote:
      'JibhaExpress a changé ma façon de faire mes achats en ligne. J\'ai commandé sur Zara et ASOS, et mes colis sont arrivés en seulement 6 jours. Le service est impeccable et le suivi en temps réel est vraiment rassurant.',
    initials: 'FB',
    avatarColor: 'from-pink-500 to-rose-600',
    date: 'Février 2025',
  },
  {
    id: 2,
    name: 'Youssef El Mansouri',
    city: 'Rabat',
    flag: '🇲🇦',
    rating: 5,
    quote:
      'Excellent service ! J\'ai acheté un ordinateur portable sur Amazon.fr et il est arrivé parfaitement emballé et dédouané sans aucun problème. Les frais sont très transparents, aucune mauvaise surprise.',
    initials: 'YM',
    avatarColor: 'from-blue-500 to-indigo-600',
    date: 'Janvier 2025',
  },
  {
    id: 3,
    name: 'Khadija Ouhssain',
    city: 'Marrakech',
    flag: '🇲🇦',
    rating: 5,
    quote:
      'Je recommande vivement JibhaExpress. J\'ai pu enfin commander sur Sephora et Lookfantastic depuis le Maroc. L\'adresse portugaise fonctionne parfaitement, et le support répond en moins d\'une heure.',
    initials: 'KO',
    avatarColor: 'from-violet-500 to-purple-600',
    date: 'Mars 2025',
  },
  {
    id: 4,
    name: 'Omar Tazi',
    city: 'Fès',
    flag: '🇲🇦',
    rating: 4,
    quote:
      'J\'utilisais d\'autres services avant, mais JibhaExpress est bien supérieur. La consolidation de colis m\'a permis d\'économiser beaucoup sur les frais de livraison. Je suis client Premium et ça vaut vraiment le prix.',
    initials: 'OT',
    avatarColor: 'from-amber-500 to-orange-600',
    date: 'Décembre 2024',
  },
  {
    id: 5,
    name: 'Nadia Cherkaoui',
    city: 'Tanger',
    flag: '🇲🇦',
    rating: 5,
    quote:
      'Parfait de A à Z. Inscription en 2 minutes, commande sur Zalando, réception chez moi à Tanger en 5 jours. Le processus de dédouanement a été géré entièrement par JibhaExpress. Je n\'ai rien eu à faire.',
    initials: 'NC',
    avatarColor: 'from-teal-500 to-emerald-600',
    date: 'Novembre 2024',
  },
  {
    id: 6,
    name: 'Hamza Benkirane',
    city: 'Agadir',
    flag: '🇲🇦',
    rating: 5,
    quote:
      'Je commande régulièrement du matériel sportif sur Decathlon et Nike. Avec JibhaExpress, je paie moins cher qu\'en achetant localement et je reçois des produits authentiques. Service 7j/7 vraiment disponible et réactif.',
    initials: 'HB',
    avatarColor: 'from-cyan-500 to-blue-600',
    date: 'Octobre 2024',
  },
]

const TRUST_BADGES = [
  {
    icon: Shield,
    label: 'Paiement sécurisé',
    description: 'SSL & 3D Secure',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Clock,
    label: 'Support 7j/7',
    description: 'Réponse en < 1h',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: Package,
    label: 'Dédouanement inclus',
    description: 'Géré par nos soins',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: CheckCircle,
    label: 'Livraison assurée',
    description: 'Remboursement garanti',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none">
      {/* Quote icon + stars */}
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Quote className="w-4 h-4 text-blue-500" />
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span>{testimonial.flag}</span>
            <span>{testimonial.city}</span>
            <span className="text-gray-200">·</span>
            <span>{testimonial.date}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSlides = TESTIMONIALS.length

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides)
  }, [totalSlides])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, totalSlides])

  return (
    <section id="temoignages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-amber-100">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Avis clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Ce que disent{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #1a56db 0%, #7c3aed 100%)' }}
            >
              nos clients
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Des milliers de Marocains nous font confiance chaque mois pour recevoir leurs commandes européennes.
          </p>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-2 mt-4 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900 text-sm">4.9/5</span>
            <span className="text-gray-400 text-sm">·</span>
            <span className="text-gray-500 text-sm">+2 500 avis vérifiés</span>
          </div>
        </div>

        {/* Desktop grid (lg+) — show all 6 */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Tablet grid (md) — show 2 columns */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 mb-14">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          className="md:hidden mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="min-w-full px-1">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Avis ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'bg-blue-600 w-5 h-2'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_BADGES.map(({ icon: Icon, label, description, color, bg, border }) => (
            <div
              key={label}
              className={`flex items-center gap-3 ${bg} border ${border} rounded-2xl p-4`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white border ${border} flex items-center justify-center shadow-sm`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-tight">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
