import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShoppingCart,
  CreditCard,
  Globe,
  Search,
  MessageSquare,
  ReceiptText,
  BadgeCheck,
  CheckCircle,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Achat assisté depuis l\'Europe | JibhaExpress',
  description:
    'Nous achetons pour vous sur les sites européens qui n\'acceptent pas les cartes marocaines. Service premium JibhaExpress — commandez sans frontières.',
};

const FEATURES = [
  {
    icon: CreditCard,
    title: 'Paiement avec carte européenne',
    description:
      'Beaucoup de sites européens refusent les cartes étrangères ou les cartes MasterCard/Visa marocaines. Nous utilisons nos moyens de paiement locaux pour acheter à votre place.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Globe,
    title: 'Accès à tous les sites européens',
    description:
      'Amazon.de, Zalando, FNAC, Decathlon, Zara, Mango, MediaMarkt et des milliers d\'autres boutiques — accessibles pour vous sans restriction géographique.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Search,
    title: 'Vérification avant achat',
    description:
      'Nous vérifions la disponibilité, la taille, la couleur et les conditions de retour avant de valider votre commande pour éviter toute mauvaise surprise.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: MessageSquare,
    title: 'Communication directe',
    description:
      'Un agent dédié vous répond sous 2h pour confirmer les détails de votre commande, la disponibilité et le coût total estimé avant tout engagement.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: ReceiptText,
    title: 'Facture officielle incluse',
    description:
      'Vous recevez la facture officielle du vendeur européen, indispensable pour le dédouanement au Maroc et pour vos démarches de garantie.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: BadgeCheck,
    title: 'Suivi de commande complet',
    description:
      'De la passation de commande jusqu\'à la livraison à votre porte, vous suivez chaque étape dans votre espace client JibhaExpress.',
    color: 'bg-teal-100 text-teal-600',
  },
];

const POPULAR_SITES = [
  'Amazon.de', 'Amazon.fr', 'Amazon.es', 'Zalando', 'FNAC',
  'Decathlon', 'Zara', 'Mango', 'MediaMarkt', 'IKEA',
  'H&M', 'Nike EU', 'Adidas EU', 'Leroy Merlin', 'Cdiscount',
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Envoyez votre demande',
    description: 'Partagez le lien du produit, la quantité, la taille ou toute option souhaitée via votre espace client.',
  },
  {
    step: '02',
    title: 'On vous confirme le prix',
    description: 'Notre agent calcule le coût total (produit + frais de service + transport estimé) et vous l\'envoie pour validation.',
  },
  {
    step: '03',
    title: 'Vous validez et payez',
    description: 'Vous approuvez le devis et réglez le montant du produit en avance via votre espace client.',
  },
  {
    step: '04',
    title: 'On achète et expédie',
    description: 'Nous passons la commande, réceptionnons le colis en Portugal et l\'expédions vers vous au Maroc.',
  },
];

export default function AchatAssistePage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ─────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2 border-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            {/* Premium badge */}
            <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-amber-300" strokeWidth={0} />
              Service Premium
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Achat assisté
              <br />
              <span className="text-amber-300">en Europe</span>
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Votre carte marocaine est refusée sur un site européen ?{' '}
              <strong className="text-white">On achète pour vous.</strong> Accédez à tous les sites
              européens sans restriction — nous nous occupons de tout.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl text-base transition-colors duration-200 shadow-lg"
              >
                Soumettre une demande d&apos;achat
              </Link>
              <Link
                href="/tarifs"
                className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-2xl text-base transition-colors duration-200"
              >
                Voir les frais de service
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY NEEDED ───────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 text-center">
                Pourquoi ce service est-il nécessaire ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {[
                  {
                    emoji: '🚫',
                    title: 'Cartes refusées',
                    desc: 'De nombreux sites européens rejettent les cartes bancaires marocaines pour des raisons de politique de paiement.',
                  },
                  {
                    emoji: '🌍',
                    title: 'Restrictions géographiques',
                    desc: 'Certains marchands ne livrent ou ne vendent qu\'aux résidents européens, excluant les clients marocains.',
                  },
                  {
                    emoji: '💱',
                    title: 'Limites de change',
                    desc: 'Les réglementations sur les transferts en devises peuvent bloquer certains paiements internationaux depuis le Maroc.',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4">
                    <span className="text-4xl block mb-3">{item.emoji}</span>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-slate-600">
                Le service Achat assisté JibhaExpress contourne toutes ces barrières.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Un processus transparent, de la demande à la réception.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map((s) => (
                <div
                  key={s.step}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="inline-block text-4xl font-extrabold text-blue-100 mb-4 leading-none">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Ce que comprend le service
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Un accompagnement complet pour vos achats depuis l&apos;Europe.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── POPULAR SITES ────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Sites populaires compatibles
              </h2>
              <p className="text-slate-500">
                Et des milliers d&apos;autres boutiques européennes sur demande.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {POPULAR_SITES.map((site) => (
                <span
                  key={site}
                  className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
                >
                  {site}
                </span>
              ))}
              <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                + beaucoup d&apos;autres
              </span>
            </div>
          </div>
        </section>

        {/* ── PRICING NOTE ─────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center gap-6">
              <ShoppingCart className="w-16 h-16 text-slate-400 shrink-0" strokeWidth={1.5} />
              <div className="flex-1 text-center sm:text-left">
                <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Service Premium
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                  Frais de service transparents
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Le service d&apos;achat assisté est disponible à partir du plan Standard. Des frais de
                  service s&apos;appliquent selon le montant de votre commande. Consultez la page tarifs
                  pour le détail complet.
                </p>
              </div>
              <Link
                href="/tarifs"
                className="shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section
          className="py-24"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
          }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Votre prochain achat européen vous attend.
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Créez votre compte et soumettez votre première demande d&apos;achat assisté dès aujourd&apos;hui.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-blue-200">
              {['Réponse sous 2h', 'Devis gratuit', 'Paiement sécurisé'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/inscription"
              className="inline-block px-10 py-5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl text-lg transition-colors duration-200 shadow-xl"
            >
              Créer mon compte gratuitement
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
