import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Check,
  Star,
  Zap,
  Building2,
  Package,
  Camera,
  Scale,
  FileText,
  ShoppingCart,
  RefreshCw,
  ClipboardList,
  Plane,
  AlertCircle,
  MapPin,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tarifs transparents | JibhaExpress — Réexpédition Europe → Maroc',
  description:
    'Consultez tous nos tarifs : abonnements, services optionnels, frais de transport, dédouanement Maroc et livraison locale. Aucune surprise.',
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    price: null,
    priceLabel: 'Gratuit',
    priceNote: 'Pour toujours',
    icon: Star,
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100',
    badge: null,
    badgeColor: '',
    description: 'Idéal pour commencer vos achats en Europe sans frais fixes.',
    features: [
      { text: 'Adresse virtuelle au Portugal', ok: true },
      { text: 'Réception de colis illimitée', ok: true },
      { text: 'Stockage gratuit 20 jours', ok: true },
      { text: '€1,50 HT/colis/jour au-delà', ok: true },
      { text: 'Suivi en temps réel', ok: true },
      { text: 'Notifications e-mail', ok: true },
      { text: 'Paiement PayPal & carte', ok: true },
      { text: 'Achat assisté en Europe', ok: false },
      { text: 'Photos colis incluses', ok: false },
      { text: 'Consolidation de colis', ok: false },
    ],
    cta: 'Commencer gratuitement',
    ctaHref: '/inscription',
    highlighted: false,
    cardClass: 'bg-white border border-slate-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
    ctaClass: 'bg-slate-800 hover:bg-slate-700 text-white',
    textClass: 'text-slate-900',
    subTextClass: 'text-slate-500',
    dividerClass: 'border-slate-100',
    noteClass: 'text-slate-400',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '€19,90',
    priceLabel: '€19,90',
    priceNote: 'par mois, HT',
    icon: Zap,
    iconColor: 'text-white',
    iconBg: 'bg-white/20',
    badge: 'POPULAIRE',
    badgeColor: 'bg-amber-400 text-amber-900',
    description: 'Pour les acheteurs réguliers qui veulent le meilleur service.',
    features: [
      { text: 'Tout le plan Standard inclus', ok: true },
      { text: 'Crédits services assistés mensuel', ok: true },
      { text: 'Achat assisté en Europe', ok: true },
      { text: 'Ouverture & vérification + 5 photos', ok: true },
      { text: 'Consolidation de colis (groupage)', ok: true },
      { text: 'Extraction de facture originale', ok: true },
      { text: 'Support prioritaire 24h', ok: true },
      { text: 'Calcul droits & taxes Maroc', ok: true },
      { text: 'Responsable compte dédié', ok: false },
      { text: 'Tarifs transport négociés', ok: false },
    ],
    cta: 'Choisir Premium',
    ctaHref: '/inscription?plan=premium',
    highlighted: true,
    cardClass:
      'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 hover:-translate-y-2 scale-105',
    ctaClass: 'bg-white text-blue-700 hover:bg-blue-50',
    textClass: 'text-white',
    subTextClass: 'text-blue-100',
    dividerClass: 'border-white/20',
    noteClass: 'text-blue-200',
  },
  {
    id: 'business',
    name: 'Business Premium',
    price: '€49,90',
    priceLabel: '€49,90',
    priceNote: 'par mois, HT',
    icon: Building2,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    badge: null,
    badgeColor: '',
    description: 'Pour les entreprises et les vendeurs à volume élevé.',
    features: [
      { text: 'Tout le plan Premium inclus', ok: true },
      { text: 'Volume illimité', ok: true },
      { text: 'Responsable de compte dédié', ok: true },
      { text: 'Tarifs de livraison négociés', ok: true },
      { text: 'Dédouanement express prioritaire', ok: true },
      { text: 'Facturation mensuelle consolidée', ok: true },
      { text: 'Intégration API & webhooks', ok: true },
      { text: 'Rapports analytiques détaillés', ok: true },
      { text: 'SLA garanti contractuellement', ok: true },
      { text: 'Formation & onboarding inclus', ok: true },
    ],
    cta: 'Contacter les ventes',
    ctaHref: '/contact?plan=business',
    highlighted: false,
    cardClass: 'bg-white border border-blue-200 shadow-md hover:-translate-y-1 hover:shadow-xl',
    ctaClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    textClass: 'text-slate-900',
    subTextClass: 'text-slate-500',
    dividerClass: 'border-slate-100',
    noteClass: 'text-slate-400',
  },
];

const OPTIONAL_SERVICES = [
  {
    icon: Camera,
    label: 'Photos du colis',
    description: 'Recevez des photos de votre colis tel qu\'il est arrivé dans notre entrepôt.',
    price: '€2,00 HT',
    unit: 'par colis',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Package,
    label: 'Ouverture + vérification + 5 photos',
    description: 'Ouverture du colis, vérification du contenu et envoi de 5 photos détaillées.',
    price: '€5,00 HT',
    unit: 'par colis',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Scale,
    label: 'Mesure & pesée',
    description: 'Pesée précise et mesure des dimensions pour un calcul exact du transport.',
    price: '€2,00 HT',
    unit: 'par colis',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: RefreshCw,
    label: 'Groupage de colis',
    description: 'Regroupement de plusieurs colis en un seul envoi pour réduire les frais.',
    price: '€3,00 HT',
    unit: '+ €1,00/colis supp.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: FileText,
    label: 'Extraction de facture',
    description: 'Récupération de la facture originale dans le colis pour la déclaration douanière.',
    price: '€2,00 HT',
    unit: 'par colis',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: ShoppingCart,
    label: 'Achat assisté',
    description: 'Nous effectuons l\'achat à votre place sur les boutiques en ligne européennes.',
    price: '8% de la valeur',
    unit: 'min. €10,00 HT',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Package,
    label: 'Réemballage protection',
    description: 'Remballage sécurisé avec matériaux de protection pour éviter la casse.',
    price: '€4,00 HT',
    unit: 'par colis',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: ClipboardList,
    label: 'Déclaration personnalisée',
    description: 'Rédaction d\'une déclaration douanière détaillée selon vos instructions.',
    price: '€3,00 HT',
    unit: 'par envoi',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
];

const TRANSPORT_RATES = [
  { weight: '0,5 kg', price: '€18 HT', note: 'Envois légers (bijoux, accessoires...)' },
  { weight: '1 kg', price: '€22 HT', note: 'Livres, petits vêtements' },
  { weight: '2 kg', price: '€28 HT', note: 'Chaussures, textiles' },
  { weight: '3 kg', price: '€35 HT', note: 'Vêtements, petits appareils' },
  { weight: '5 kg', price: '€50 HT', note: 'Appareils électroniques légers' },
  { weight: '10 kg', price: '€85 HT', note: 'Petits équipements' },
  { weight: '20 kg', price: '€150 HT', note: 'Colis volumineux', highlight: true },
];

const CUSTOMS_FEES = [
  {
    label: 'Frais de dédouanement',
    value: '€3,00 USD',
    sub: 'par commande / envoi',
    note: 'Frais fixes perçus par les douanes marocaines',
    color: 'bg-blue-50 border-blue-100',
    labelColor: 'text-blue-900',
    valueColor: 'text-blue-700',
  },
  {
    label: 'TVA Maroc',
    value: '20%',
    sub: 'sur valeur + transport',
    note: 'Taxe sur la valeur ajoutée appliquée à la base imposable',
    color: 'bg-orange-50 border-orange-100',
    labelColor: 'text-orange-900',
    valueColor: 'text-orange-700',
  },
  {
    label: 'Droits de douane',
    value: '0 – 40%',
    sub: 'variable selon produit',
    note: 'Dépend de la catégorie du produit et de sa valeur déclarée',
    color: 'bg-red-50 border-red-100',
    labelColor: 'text-red-900',
    valueColor: 'text-red-700',
  },
];

const LOCAL_DELIVERY = [
  {
    icon: MapPin,
    label: 'Livraison standard',
    price: 'À partir de 30 MAD',
    desc: 'Livraison sous 2–4 jours ouvrés après dédouanement.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Zap,
    label: 'Livraison express',
    price: 'À partir de 50 MAD',
    desc: 'Livraison sous 24–48h après dédouanement. Disponible dans les grandes villes.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

const TARIFS_FAQ = [
  {
    q: 'Les prix affichés incluent-ils la TVA ?',
    a: 'Non, tous les prix affichés sur cette page sont hors taxes (HT). La TVA applicable dans votre pays de résidence peut s\'ajouter selon la réglementation en vigueur.',
  },
  {
    q: 'Comment est calculé le poids pour le transport ?',
    a: 'Le poids retenu est le plus élevé entre le poids réel et le poids volumétrique (L × l × H en cm / 5000). Cela est standard dans le transport aérien international.',
  },
  {
    q: 'Puis-je grouper des colis de différentes commandes ?',
    a: 'Oui, le groupage (consolidation) vous permet de regrouper plusieurs colis en un seul envoi et d\'économiser sur les frais de transport. Frais : €3,00 HT + €1,00 HT par colis supplémentaire.',
  },
  {
    q: 'Les droits de douane sont-ils inclus dans vos tarifs ?',
    a: 'Non. Les droits de douane et la TVA marocaine sont des taxes gouvernementales que vous payez directement aux douanes du Maroc. Nous pouvons vous aider à estimer ces frais à l\'avance.',
  },
  {
    q: 'Y a-t-il des frais cachés ?',
    a: 'Non. Notre politique de transparence totale signifie que tous les frais sont détaillés ici. Vous verrez toujours le détail complet avant de confirmer un envoi.',
  },
  {
    q: 'Comment calculer le coût total d\'un envoi ?',
    a: 'Coût total = Abonnement (si Premium/Business) + Services optionnels choisis + Frais de transport selon poids + Frais de dédouanement Maroc (€3 USD) + TVA Maroc (20%) + Droits de douane (0–40%) + Livraison locale (à partir de 30 MAD).',
  },
];

// ─────────────────────────────────────────────
// Sub-components (pure, no client hooks)
// ─────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  iconColor,
  iconBg,
  badge,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-12">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${iconBg} mb-4`}>
        <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.75} />
      </div>
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
        {badge}
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">{title}</h2>
      <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function TarifsPage() {
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
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2 border-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Tarification transparente
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Tarifs transparents,
              <br />
              <span className="text-amber-300">sans surprises</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Tous nos tarifs sont affichés clairement. Stockage, transport, dédouanement, livraison locale
              — vous savez exactement ce que vous payez avant de commander.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/faq"
                className="px-8 py-4 bg-white/15 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-all duration-200 backdrop-blur-sm"
              >
                Voir la FAQ
              </Link>
            </div>
          </div>
        </section>

        {/* ── PLAN COMPARISON ──────────────────── */}
        <section className="py-20 bg-slate-50" id="abonnements">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Zap}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              badge="Abonnements"
              title={
                <>
                  Choisissez votre{' '}
                  <span className="text-blue-600">plan</span>
                </>
              }
              subtitle="Commencez gratuitement. Passez à Premium ou Business quand vous en avez besoin. Sans engagement, résiliez à tout moment."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
              {PLANS.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.cardClass}`}
                  >
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

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.iconBg}`}>
                        <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                      </div>
                      <h3 className={`text-xl font-bold ${plan.textClass}`}>{plan.name}</h3>
                    </div>

                    <div className="mb-4">
                      {plan.price ? (
                        <div className="flex items-end gap-1">
                          <span className={`text-4xl font-extrabold ${plan.textClass}`}>{plan.priceLabel}</span>
                          <span className={`text-sm mb-1.5 ${plan.subTextClass}`}>{plan.priceNote}</span>
                        </div>
                      ) : (
                        <div>
                          <span className={`text-3xl font-extrabold ${plan.textClass}`}>Gratuit</span>
                          <span className={`block text-sm mt-0.5 ${plan.subTextClass}`}>{plan.priceNote}</span>
                        </div>
                      )}
                    </div>

                    <p className={`text-sm mb-6 ${plan.subTextClass}`}>{plan.description}</p>

                    <div className={`border-t mb-6 ${plan.dividerClass}`} />

                    <ul className="flex-1 space-y-1.5 mb-8">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 py-1">
                          <span
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              f.ok
                                ? plan.highlighted
                                  ? 'bg-white/20 text-white'
                                  : 'bg-green-50 text-green-600'
                                : plan.highlighted
                                ? 'bg-white/10 text-white/30'
                                : 'bg-slate-50 text-slate-300'
                            }`}
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span
                            className={`text-sm leading-snug ${
                              f.ok
                                ? plan.highlighted
                                  ? 'text-blue-50'
                                  : 'text-slate-700'
                                : plan.highlighted
                                ? 'text-blue-300/50 line-through'
                                : 'text-slate-300 line-through'
                            }`}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.ctaHref}
                      className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-sm ${plan.ctaClass}`}
                    >
                      {plan.cta}
                    </Link>

                    <p className={`text-center text-xs mt-3 ${plan.noteClass}`}>
                      {plan.id === 'standard'
                        ? 'Aucune carte requise'
                        : plan.id === 'business'
                        ? 'Devis personnalisé disponible'
                        : 'Sans engagement · Résiliez à tout moment'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STORAGE FEES ─────────────────────── */}
        <section className="py-20 bg-white" id="stockage">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Package}
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
              badge="Stockage"
              title={
                <>
                  Frais de{' '}
                  <span className="text-blue-600">stockage</span>
                </>
              }
              subtitle="Vos colis sont stockés gratuitement pendant 20 jours. Au-delà, des frais journaliers s'appliquent."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
                </div>
                <div className="text-4xl font-extrabold text-green-700 mb-2">GRATUIT</div>
                <div className="text-lg font-semibold text-green-800 mb-2">20 premiers jours</div>
                <p className="text-green-700 text-sm leading-relaxed">
                  Dès réception de votre colis dans notre entrepôt au Portugal, vous bénéficiez de{' '}
                  <strong>20 jours de stockage gratuit</strong> pour organiser votre envoi.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-600" strokeWidth={1.75} />
                </div>
                <div className="text-4xl font-extrabold text-orange-700 mb-2">€1,50 HT</div>
                <div className="text-lg font-semibold text-orange-800 mb-2">par colis / par jour</div>
                <p className="text-orange-700 text-sm leading-relaxed">
                  À partir du <strong>21e jour</strong>, des frais de stockage de{' '}
                  <strong>€1,50 HT</strong> par colis et par jour commencent à s'accumuler.
                  Envoyez vos colis rapidement pour éviter ces frais.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-sm text-blue-800">
                <strong>Conseil :</strong> Utilisez la fonctionnalité de groupage pour regrouper plusieurs colis
                en un seul envoi et optimiser vos frais de stockage et de transport.{' '}
                <Link href="/faq#consolidation" className="underline hover:text-blue-600">
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── OPTIONAL SERVICES ────────────────── */}
        <section className="py-20 bg-slate-50" id="services-optionnels">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={ClipboardList}
              iconColor="text-violet-600"
              iconBg="bg-violet-50"
              badge="Services optionnels"
              title={
                <>
                  Services{' '}
                  <span className="text-blue-600">à la carte</span>
                </>
              }
              subtitle="Des services supplémentaires disponibles sur demande pour personnaliser votre expérience."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {OPTIONAL_SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.label}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col"
                  >
                    <div className={`w-12 h-12 ${svc.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${svc.color}`} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{svc.label}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">{svc.description}</p>
                    <div className="mt-auto">
                      <div className={`text-xl font-extrabold ${svc.color}`}>{svc.price}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{svc.unit}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full detailed table */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-900">Récapitulatif complet — Services optionnels</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-6 py-3 text-slate-500 font-semibold">Service</th>
                      <th className="text-right px-6 py-3 text-slate-500 font-semibold">Prix HT</th>
                      <th className="text-right px-6 py-3 text-slate-500 font-semibold hidden sm:table-cell">Unité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {OPTIONAL_SERVICES.map((svc) => (
                      <tr key={svc.label} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3.5 font-medium text-slate-800">{svc.label}</td>
                        <td className="px-6 py-3.5 text-right font-bold text-blue-700">{svc.price}</td>
                        <td className="px-6 py-3.5 text-right text-slate-400 hidden sm:table-cell">{svc.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRANSPORT RATES ──────────────────── */}
        <section className="py-20 bg-white" id="transport">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Plane}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              badge="Transport aérien"
              title={
                <>
                  Frais de transport{' '}
                  <span className="text-blue-600">aérien</span>
                </>
              }
              subtitle="Consolidation aérienne hebdomadaire Portugal → Maroc. Tarifs par poids réel ou volumétrique (le plus élevé est retenu)."
            />

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center gap-3">
                <Plane className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Portugal → Maroc · Envois hebdomadaires</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Vol consolidé chaque semaine. Délai estimé : 5–8 jours ouvrés après enlèvement.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-6 py-3 text-slate-500 font-semibold">Poids</th>
                      <th className="text-right px-6 py-3 text-slate-500 font-semibold">Prix HT</th>
                      <th className="text-left px-6 py-3 text-slate-400 font-normal hidden md:table-cell">Exemples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {TRANSPORT_RATES.map((row) => (
                      <tr
                        key={row.weight}
                        className={`hover:bg-blue-50/50 transition-colors ${
                          row.highlight ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 text-base">{row.weight}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-extrabold text-blue-700 text-lg">{row.price}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs hidden md:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500 flex items-start gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" strokeWidth={1.75} />
                  Pour les colis de plus de 20 kg, contactez-nous pour un devis personnalisé. Les tarifs
                  s'entendent hors frais de dédouanement et de livraison locale.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Fréquence', value: 'Chaque semaine', icon: '📅' },
                { label: 'Délai moyen', value: '5–8 jours ouvrés', icon: '⏱️' },
                { label: 'Compagnies', value: 'DHL · FedEx · UPS', icon: '✈️' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 bg-slate-50 rounded-xl border border-slate-100 px-5 py-4"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    <div className="font-bold text-slate-900 text-sm">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOMS FEES ─────────────────────── */}
        <section className="py-20 bg-slate-50" id="douane">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={ClipboardList}
              iconColor="text-red-600"
              iconBg="bg-red-50"
              badge="Douanes Maroc"
              title={
                <>
                  Frais douane{' '}
                  <span className="text-blue-600">Maroc</span>
                </>
              }
              subtitle="Les frais douaniers sont des taxes gouvernementales indépendantes de JibhaExpress. Nous vous aidons à les anticiper."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {CUSTOMS_FEES.map((fee) => (
                <div
                  key={fee.label}
                  className={`rounded-2xl border p-6 ${fee.color}`}
                >
                  <div className={`text-sm font-semibold mb-2 ${fee.labelColor}`}>{fee.label}</div>
                  <div className={`text-3xl font-extrabold mb-1 ${fee.valueColor}`}>{fee.value}</div>
                  <div className={`text-xs font-medium mb-3 ${fee.labelColor} opacity-70`}>{fee.sub}</div>
                  <p className={`text-xs leading-relaxed ${fee.labelColor} opacity-80`}>{fee.note}</p>
                </div>
              ))}
            </div>

            {/* Customs process explanation */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                Comment le calcul douanier fonctionne-t-il ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Base imposable</div>
                  <p className="text-slate-500 text-xs">
                    Valeur commerciale du produit + frais de transport international + frais d'assurance (si applicable).
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Exemple de calcul</div>
                  <div className="bg-slate-50 rounded-lg p-3 text-xs font-mono space-y-1">
                    <div>Produit : 100 € → 1 100 MAD</div>
                    <div>Transport : 28 € → 308 MAD</div>
                    <div>Base : 1 408 MAD</div>
                    <div>Droits (10%) : 140,80 MAD</div>
                    <div>TVA 20% : 309,76 MAD</div>
                    <div className="border-t border-slate-200 pt-1 font-bold">Total taxes : ~450,56 MAD</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Franchise personnelle</div>
                  <p className="text-slate-500 text-xs">
                    Les voyageurs bénéficient d'une franchise de 2 000 MAD. Pour les envois postaux, cette franchise ne s'applique pas automatiquement.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Articles interdits / réglementés</div>
                  <p className="text-slate-500 text-xs">
                    Certains produits (médicaments, alcool, tabac, produits électroniques sans homologation) sont soumis à des restrictions supplémentaires au Maroc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCAL DELIVERY ───────────────────── */}
        <section className="py-20 bg-white" id="livraison-maroc">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={MapPin}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              badge="Livraison locale"
              title={
                <>
                  Livraison au{' '}
                  <span className="text-blue-600">Maroc</span>
                </>
              }
              subtitle="Nous livrons dans toutes les villes du Maroc grâce à nos partenaires logistiques locaux de confiance."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {LOCAL_DELIVERY.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${item.color}`} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{item.label}</h3>
                    <div className={`text-2xl font-extrabold ${item.color} mb-3`}>{item.price}</div>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Coverage */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-bold">Couverture nationale</h3>
                  <p className="text-slate-400 text-sm">Toutes les villes du Royaume</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Casablanca', 'Rabat', 'Marrakech', 'Fès',
                  'Tanger', 'Agadir', 'Meknès', 'Oujda',
                  'Kenitra', 'Tétouan', 'Safi', '+ toutes villes',
                ].map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-1.5 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TARIFS FAQ ───────────────────────── */}
        <section className="py-20 bg-slate-50" id="faq-tarifs">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={FileText}
              iconColor="text-slate-600"
              iconBg="bg-slate-100"
              badge="Questions fréquentes"
              title={
                <>
                  FAQ sur les{' '}
                  <span className="text-blue-600">tarifs</span>
                </>
              }
              subtitle="Vous avez des questions sur notre grille tarifaire ? Retrouvez les réponses ci-dessous."
            />

            <div className="space-y-4">
              {TARIFS_FAQ.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                  <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-slate-500 mb-4">Une autre question sur nos tarifs ?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/faq"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Voir toute la FAQ
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────── */}
        <section
          className="py-20"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)' }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Inscrivez-vous gratuitement et obtenez votre adresse portugaise en moins de 2 minutes.
            </p>
            <Link
              href="/inscription"
              className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 text-lg"
            >
              Créer mon compte gratuitement
            </Link>
            <p className="text-blue-200 text-sm mt-4">Aucune carte bancaire requise · Résiliez à tout moment</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
