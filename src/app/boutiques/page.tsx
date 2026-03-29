import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Store, ExternalLink, ShoppingBag, Tag, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Boutiques européennes | JibhaExpress',
  description:
    'Commandez depuis les meilleures boutiques en ligne européennes — Amazon, Zara, ASOS, Zalando, Fnac et plus — et recevez vos achats directement au Maroc via JibhaExpress.',
};

type ShopCategory = {
  label: string;
  emoji: string;
  shops: Shop[];
};

type Shop = {
  name: string;
  url: string;
  country: string;
  flag: string;
  description: string;
  tag?: string;
};

const SHOP_CATEGORIES: ShopCategory[] = [
  {
    label: 'Généralistes',
    emoji: '🛒',
    shops: [
      {
        name: 'Amazon.fr',
        url: 'https://www.amazon.fr',
        country: 'France',
        flag: '🇫🇷',
        description: 'Millions de produits, livraison rapide à votre adresse JibhaExpress.',
        tag: 'Populaire',
      },
      {
        name: 'Cdiscount',
        url: 'https://www.cdiscount.com',
        country: 'France',
        flag: '🇫🇷',
        description: "Électronique, électroménager, mode et bien plus à prix cassés.",
      },
      {
        name: 'Fnac',
        url: 'https://www.fnac.com',
        country: 'France',
        flag: '🇫🇷',
        description: 'High-tech, livres, musique, jeux vidéo et culture.',
      },
      {
        name: 'El Corte Inglés',
        url: 'https://www.elcorteingles.es',
        country: 'Espagne',
        flag: '🇪🇸',
        description: "Grand magasin espagnol : mode, maison, alimentation et plus.",
      },
    ],
  },
  {
    label: 'Mode & Vêtements',
    emoji: '👗',
    shops: [
      {
        name: 'Zara',
        url: 'https://www.zara.com',
        country: 'Espagne',
        flag: '🇪🇸',
        description: 'Mode tendance femme, homme et enfant du groupe Inditex.',
        tag: 'Tendance',
      },
      {
        name: 'ASOS',
        url: 'https://www.asos.com',
        country: 'Royaume-Uni',
        flag: '🇬🇧',
        description: 'Plus de 850 marques de mode et vêtements livraison internationale.',
        tag: 'Populaire',
      },
      {
        name: 'Zalando',
        url: 'https://www.zalando.fr',
        country: 'Allemagne',
        flag: '🇩🇪',
        description: 'Chaussures, vêtements et accessoires — le géant européen de la mode.',
      },
      {
        name: 'H&M',
        url: 'https://www.hm.com',
        country: 'Suède',
        flag: '🇸🇪',
        description: 'Mode accessible et tendance pour toute la famille.',
      },
      {
        name: 'Mango',
        url: 'https://www.mango.com',
        country: 'Espagne',
        flag: '🇪🇸',
        description: 'Collections mode femme, homme et enfant de la marque barcelonaise.',
      },
      {
        name: 'Vinted',
        url: 'https://www.vinted.fr',
        country: 'France',
        flag: '🇫🇷',
        description: "Achats de seconde main : vêtements, chaussures et accessoires d'occasion.",
      },
    ],
  },
  {
    label: 'Sport & Sneakers',
    emoji: '👟',
    shops: [
      {
        name: 'Nike',
        url: 'https://www.nike.com',
        country: 'Europe',
        flag: '🇪🇺',
        description: 'Chaussures, vêtements et équipements sportifs Nike officiels.',
        tag: 'Tendance',
      },
      {
        name: 'Adidas',
        url: 'https://www.adidas.fr',
        country: 'Allemagne',
        flag: '🇩🇪',
        description: 'Produits sportifs, sneakers et collections lifestyle Adidas.',
      },
      {
        name: 'Decathlon',
        url: 'https://www.decathlon.fr',
        country: 'France',
        flag: '🇫🇷',
        description: 'Équipements sportifs pour plus de 80 sports à prix accessibles.',
      },
      {
        name: 'FootLocker',
        url: 'https://www.footlocker.eu',
        country: 'Europe',
        flag: '🇪🇺',
        description: 'Sneakers et streetwear des plus grandes marques mondiales.',
      },
    ],
  },
  {
    label: 'High-Tech & Électronique',
    emoji: '💻',
    shops: [
      {
        name: 'Boulanger',
        url: 'https://www.boulanger.com',
        country: 'France',
        flag: '🇫🇷',
        description: "Électroménager, informatique, TV, téléphonie et son.",
      },
      {
        name: 'Darty',
        url: 'https://www.darty.com',
        country: 'France',
        flag: '🇫🇷',
        description: 'Électroménager et high-tech avec garanties réparabilité.',
      },
      {
        name: 'LDLC',
        url: 'https://www.ldlc.com',
        country: 'France',
        flag: '🇫🇷',
        description: "Matériel informatique, composants PC et périphériques.",
      },
      {
        name: 'MediaMarkt',
        url: 'https://www.mediamarkt.es',
        country: 'Espagne',
        flag: '🇪🇸',
        description: "Électronique grand public, le géant du high-tech en Europe.",
      },
    ],
  },
  {
    label: 'Maison & Déco',
    emoji: '🏠',
    shops: [
      {
        name: 'IKEA',
        url: 'https://www.ikea.com/fr',
        country: 'Suède',
        flag: '🇸🇪',
        description: 'Meubles, décoration et accessoires maison design à prix abordables.',
      },
      {
        name: 'La Redoute',
        url: 'https://www.laredoute.fr',
        country: 'France',
        flag: '🇫🇷',
        description: 'Mobilier, literie, décoration et mode pour toute la maison.',
      },
      {
        name: 'Maisons du Monde',
        url: 'https://www.maisonsdumonde.com',
        country: 'France',
        flag: '🇫🇷',
        description: 'Meubles et objets de déco aux styles variés.',
      },
    ],
  },
  {
    label: 'Beauté & Santé',
    emoji: '💄',
    shops: [
      {
        name: 'Sephora',
        url: 'https://www.sephora.fr',
        country: 'France',
        flag: '🇫🇷',
        description: 'Maquillage, parfums, soins visage et corps des plus grandes marques.',
        tag: 'Populaire',
      },
      {
        name: 'Nocibé',
        url: 'https://www.nocibe.fr',
        country: 'France',
        flag: '🇫🇷',
        description: 'Parfumerie et cosmétiques avec de nombreuses exclusivités.',
      },
      {
        name: 'Lookfantastic',
        url: 'https://www.lookfantastic.fr',
        country: 'Royaume-Uni',
        flag: '🇬🇧',
        description: 'Beauté premium et produits capillaires de marques prestige.',
      },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  Populaire: 'bg-blue-100 text-blue-700',
  Tendance: 'bg-amber-100 text-amber-700',
};

export default function BoutiquesPage() {
  const totalShops = SHOP_CATEGORIES.reduce((acc, cat) => acc + cat.shops.length, 0);

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ─────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1a56db 50%, #2563eb 100%)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-10 bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5 border-2 border-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Store className="w-3.5 h-3.5" strokeWidth={2} />
              Répertoire boutiques
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Boutiques
              <br />
              <span className="text-amber-300">européennes</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Commandez depuis vos{' '}
              <strong className="text-white">{totalShops}+ boutiques</strong> préférées en Europe
              et recevez vos achats directement au Maroc grâce à votre adresse JibhaExpress.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-blue-200">
              {SHOP_CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={`#${cat.label.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '')}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── INFO BANNER ──────────────────────── */}
        <section className="bg-amber-50 border-y border-amber-200 py-5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-amber-800 text-center">
              <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" strokeWidth={1.75} />
              <p>
                <strong>Astuce :</strong> Utilisez votre adresse JibhaExpress (Rua Augusta 156,
                Lisbonne) comme adresse de livraison sur n&apos;importe laquelle de ces boutiques.
                Nous nous occupons du reste !
              </p>
            </div>
          </div>
        </section>

        {/* ── SHOP GRID ────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {SHOP_CATEGORIES.map((category) => (
                <div
                  key={category.label}
                  id={category.label.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '')}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-2xl" aria-hidden="true">{category.emoji}</span>
                    <h2 className="text-xl font-extrabold text-slate-900">{category.label}</h2>
                    <span className="ml-auto text-sm text-slate-400 font-medium">
                      {category.shops.length} boutique{category.shops.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {category.shops.map((shop) => (
                      <a
                        key={shop.name}
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl" aria-hidden="true">{shop.flag}</span>
                            <div>
                              <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                {shop.name}
                              </p>
                              <p className="text-xs text-slate-400">{shop.country}</p>
                            </div>
                          </div>
                          <ExternalLink
                            className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-3">
                          {shop.description}
                        </p>

                        {/* Tag */}
                        {shop.tag && (
                          <span
                            className={`self-start inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_STYLES[shop.tag] ?? 'bg-slate-100 text-slate-600'}`}
                          >
                            <Tag className="w-3 h-3" strokeWidth={2} />
                            {shop.tag}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="w-14 h-14 text-blue-600 mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Votre boutique préférée n&apos;est pas dans la liste ?
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              JibhaExpress est compatible avec{' '}
              <strong className="text-slate-700">toutes les boutiques en ligne européennes</strong>.
              Si elles livrent au Portugal, nous pouvons réexpédier au Maroc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Créer mon compte gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
