'use client'

import { useState } from 'react'
import { ExternalLink, ShoppingBag, Filter } from 'lucide-react'

type Shop = {
  name: string
  domain: string
  url: string
  color: string
  textColor: string
}

type Category = {
  id: string
  label: string
  emoji: string
  shops: Shop[]
}

const CATEGORIES: Category[] = [
  {
    id: 'mode',
    label: 'Mode & Vêtements',
    emoji: '👗',
    shops: [
      { name: 'Zara', domain: 'zara.com', url: 'https://www.zara.com', color: 'bg-black', textColor: 'text-white' },
      { name: 'H&M', domain: 'hm.com', url: 'https://www.hm.com', color: 'bg-red-600', textColor: 'text-white' },
      { name: 'ASOS', domain: 'asos.com', url: 'https://www.asos.com', color: 'bg-slate-900', textColor: 'text-white' },
      { name: 'Mango', domain: 'mango.com', url: 'https://www.mango.com', color: 'bg-amber-700', textColor: 'text-white' },
      { name: 'Nike', domain: 'nike.com', url: 'https://www.nike.com', color: 'bg-gray-900', textColor: 'text-white' },
      { name: 'Adidas', domain: 'adidas.com', url: 'https://www.adidas.com', color: 'bg-blue-900', textColor: 'text-white' },
      { name: 'Shein', domain: 'shein.com', url: 'https://www.shein.com', color: 'bg-rose-500', textColor: 'text-white' },
      { name: 'Zalando', domain: 'zalando.fr', url: 'https://www.zalando.fr', color: 'bg-orange-500', textColor: 'text-white' },
    ],
  },
  {
    id: 'electronique',
    label: 'Électronique',
    emoji: '💻',
    shops: [
      { name: 'Amazon', domain: 'amazon.fr', url: 'https://www.amazon.fr', color: 'bg-amber-500', textColor: 'text-white' },
      { name: 'eBay', domain: 'ebay.fr', url: 'https://www.ebay.fr', color: 'bg-yellow-400', textColor: 'text-gray-900' },
      { name: 'Cdiscount', domain: 'cdiscount.com', url: 'https://www.cdiscount.com', color: 'bg-red-500', textColor: 'text-white' },
      { name: 'Fnac', domain: 'fnac.com', url: 'https://www.fnac.com', color: 'bg-yellow-600', textColor: 'text-white' },
      { name: 'Boulanger', domain: 'boulanger.com', url: 'https://www.boulanger.com', color: 'bg-blue-600', textColor: 'text-white' },
      { name: 'MediaMarkt', domain: 'mediamarkt.es', url: 'https://www.mediamarkt.es', color: 'bg-red-600', textColor: 'text-white' },
    ],
  },
  {
    id: 'beaute',
    label: 'Beauté & Santé',
    emoji: '💄',
    shops: [
      { name: 'Sephora', domain: 'sephora.fr', url: 'https://www.sephora.fr', color: 'bg-black', textColor: 'text-white' },
      { name: 'Nocibé', domain: 'nocibe.fr', url: 'https://www.nocibe.fr', color: 'bg-purple-700', textColor: 'text-white' },
      { name: 'Lookfantastic', domain: 'lookfantastic.fr', url: 'https://www.lookfantastic.fr', color: 'bg-pink-600', textColor: 'text-white' },
      { name: 'Douglas', domain: 'douglas.fr', url: 'https://www.douglas.fr', color: 'bg-fuchsia-700', textColor: 'text-white' },
      { name: 'Yves Rocher', domain: 'yvesrocher.fr', url: 'https://www.yves-rocher.fr', color: 'bg-green-700', textColor: 'text-white' },
    ],
  },
  {
    id: 'maison',
    label: 'Maison & Déco',
    emoji: '🏠',
    shops: [
      { name: 'IKEA', domain: 'ikea.com', url: 'https://www.ikea.com', color: 'bg-blue-700', textColor: 'text-white' },
      { name: 'Maisons du Monde', domain: 'maisonsdumonde.com', url: 'https://www.maisonsdumonde.com', color: 'bg-teal-700', textColor: 'text-white' },
      { name: 'La Redoute', domain: 'laredoute.fr', url: 'https://www.laredoute.fr', color: 'bg-rose-600', textColor: 'text-white' },
      { name: 'Westwing', domain: 'westwing.fr', url: 'https://www.westwing.fr', color: 'bg-stone-700', textColor: 'text-white' },
    ],
  },
  {
    id: 'sport',
    label: 'Sport & Outdoor',
    emoji: '⚽',
    shops: [
      { name: 'Decathlon', domain: 'decathlon.com', url: 'https://www.decathlon.com', color: 'bg-blue-600', textColor: 'text-white' },
      { name: 'Sport 2000', domain: 'sport2000.fr', url: 'https://www.sport2000.fr', color: 'bg-orange-600', textColor: 'text-white' },
      { name: 'Go Sport', domain: 'gosport.fr', url: 'https://www.gosport.fr', color: 'bg-green-600', textColor: 'text-white' },
    ],
  },
  {
    id: 'enfants',
    label: 'Enfants',
    emoji: '🧸',
    shops: [
      { name: 'Orchestra', domain: 'orchestra.eu', url: 'https://www.orchestra.eu', color: 'bg-purple-600', textColor: 'text-white' },
      { name: 'Vertbaudet', domain: 'vertbaudet.fr', url: 'https://www.vertbaudet.fr', color: 'bg-green-500', textColor: 'text-white' },
      { name: 'Petit Bateau', domain: 'petit-bateau.fr', url: 'https://www.petit-bateau.fr', color: 'bg-sky-600', textColor: 'text-white' },
      { name: 'Jacadi', domain: 'jacadi.fr', url: 'https://www.jacadi.fr', color: 'bg-indigo-600', textColor: 'text-white' },
    ],
  },
]

const ALL_ID = 'all'

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function ShopCard({ shop }: { shop: Shop }) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return (
    <div className="relative group">
      <a
        href={shop.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        aria-label={`Visiter ${shop.name}`}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onFocus={() => setTooltipVisible(true)}
        onBlur={() => setTooltipVisible(false)}
      >
        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-xl ${shop.color} ${shop.textColor} flex items-center justify-center font-black text-lg shadow-md select-none flex-shrink-0`}
        >
          {getInitials(shop.name)}
        </div>

        {/* Name & domain */}
        <div className="text-center min-w-0 w-full">
          <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
            {shop.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{shop.domain}</p>
        </div>

        {/* External link icon */}
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors duration-150 flex-shrink-0" />
      </a>

      {/* Tooltip */}
      {tooltipVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <p className="font-semibold mb-0.5">Comment acheter&nbsp;?</p>
            <p className="text-gray-300">Utilisez votre adresse JibhaExpress au Portugal</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-gray-900 rotate-45 -mt-1" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function MarketplacesSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_ID)

  const filteredShops =
    activeCategory === ALL_ID
      ? CATEGORIES.flatMap((c) => c.shops)
      : CATEGORIES.find((c) => c.id === activeCategory)?.shops ?? []

  return (
    <section id="boutiques" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">
            <ShoppingBag className="w-3.5 h-3.5" />
            Boutiques européennes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Commandez depuis{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #1a56db 0%, #7c3aed 100%)' }}
            >
              toute l&apos;Europe
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Accédez aux plus grandes boutiques européennes grâce à votre adresse JibhaExpress au Portugal. Commandez, nous récupérons et livrons au Maroc.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-sm text-blue-700">
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Comment acheter&nbsp;?</strong> Utilisez votre adresse JibhaExpress au Portugal comme adresse de livraison sur ces sites.
            </span>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory(ALL_ID)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeCategory === ALL_ID
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Toutes les boutiques
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Shop count indicator */}
        <p className="text-center text-sm text-gray-400 mb-6">
          {filteredShops.length} boutique{filteredShops.length > 1 ? 's' : ''} disponible{filteredShops.length > 1 ? 's' : ''}
        </p>

        {/* Shops grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredShops.map((shop) => (
            <ShopCard key={`${shop.domain}-${shop.name}`} shop={shop} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-8 py-6 shadow-xl shadow-blue-500/20">
            <div className="text-white text-left">
              <p className="font-bold text-lg leading-tight">Votre boutique n&apos;est pas listée&nbsp;?</p>
              <p className="text-blue-100 text-sm mt-1">
                Nous livrons depuis n&apos;importe quel site européen qui livre au Portugal.
              </p>
            </div>
            <a
              href="/inscription"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-150 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Créer mon adresse
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
