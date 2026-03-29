import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Package,
  MapPin,
  Clock,
  Shield,
  Truck,
  Bell,
  FileText,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réexpédition Portugal → Maroc | JibhaExpress',
  description:
    'Recevez vos colis sur votre adresse virtuelle au Portugal et faites-les expédier au Maroc en 5 à 7 jours. DHL, FedEx, UPS, Tawssil — suivi inclus, dédouanement géré.',
};

const CARRIERS = [
  { name: 'DHL', color: 'bg-yellow-400 text-yellow-900' },
  { name: 'FedEx', color: 'bg-violet-600 text-white' },
  { name: 'UPS', color: 'bg-amber-700 text-white' },
  { name: 'Tawssil', color: 'bg-green-600 text-white' },
];

const FEATURES = [
  {
    icon: MapPin,
    title: 'Adresse virtuelle portugaise',
    description:
      'Obtenez instantanément une adresse postale au Portugal pour recevoir tous vos achats européens.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Clock,
    title: 'Livraison en 5 à 7 jours',
    description:
      'Dès réception de votre colis dans notre entrepôt, expédition vers le Maroc sous 5 à 7 jours ouvrés.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Truck,
    title: 'Transporteurs de confiance',
    description:
      'Choisissez parmi DHL, FedEx, UPS et Tawssil selon votre budget et vos délais souhaités.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Bell,
    title: 'Notifications en temps réel',
    description:
      'Soyez alerté par e-mail dès l\'arrivée de chaque colis et à chaque étape de la livraison.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: FileText,
    title: 'Dédouanement géré',
    description:
      'Nous préparons tous les documents douaniers nécessaires pour que votre colis passe la frontière sans encombre.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Shield,
    title: 'Stockage gratuit 20 jours',
    description:
      'Vos colis sont conservés gratuitement jusqu\'à 20 jours dans notre entrepôt sécurisé à Lisbonne.',
    color: 'bg-teal-100 text-teal-600',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Créez votre compte',
    description: 'Inscription gratuite en moins de 2 minutes. Votre adresse portugaise est activée immédiatement.',
  },
  {
    step: '02',
    title: 'Achetez en Europe',
    description: 'Utilisez votre adresse JibhaExpress comme adresse de livraison sur n\'importe quel site européen.',
  },
  {
    step: '03',
    title: 'On reçoit votre colis',
    description: 'Dès l\'arrivée, vous êtes notifié et le colis apparaît dans votre espace client.',
  },
  {
    step: '04',
    title: 'Livraison au Maroc',
    description: 'Confirmez l\'envoi, choisissez votre transporteur, et recevez votre colis chez vous.',
  },
];

export default function ReexpeditionPage() {
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
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2 border-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Package className="w-3.5 h-3.5" strokeWidth={2} />
              Service principal
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Réexpédition
              <br />
              <span className="text-amber-300">Portugal → Maroc</span>
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Recevez vos achats européens sur votre adresse portugaise JibhaExpress,
              et faites-les livrer directement à votre domicile au Maroc.{' '}
              <strong className="text-white">Rapide, fiable et transparent.</strong>
            </p>

            {/* Carriers badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {CARRIERS.map((c) => (
                <span
                  key={c.name}
                  className={`${c.color} text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full`}
                >
                  {c.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl text-base transition-colors duration-200 shadow-lg"
              >
                Créer mon adresse gratuite
              </Link>
              <Link
                href="/tarifs"
                className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-2xl text-base transition-colors duration-200"
              >
                Voir les tarifs
              </Link>
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
                Un processus simple en 4 étapes, de l&apos;achat à la livraison chez vous.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s) => (
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
                Ce qui est inclus
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Tout ce dont vous avez besoin pour recevoir vos colis en toute sérénité.
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

        {/* ── TRACKING HIGHLIGHT ───────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                  Suivi en temps réel inclus
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Dès que votre colis quitte notre entrepôt, vous recevez un numéro de suivi
                  officiel du transporteur. Suivez chaque étape — départ de Lisbonne,
                  arrivée en douane, livraison finale — directement depuis votre espace client
                  ou sur le site du transporteur.
                </p>
                <ul className="space-y-3">
                  {[
                    'Numéro de suivi communiqué sous 24h',
                    'Notifications par e-mail à chaque étape',
                    'Interface de suivi dans l\'espace client',
                    'Support dédié en cas de retard',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-64 flex flex-col gap-4">
                {[
                  { label: 'Réception Lisbonne', status: 'Terminé', color: 'text-green-400' },
                  { label: 'En transit vers Maroc', status: 'En cours', color: 'text-amber-400' },
                  { label: 'Dédouanement Casablanca', status: 'En attente', color: 'text-slate-400' },
                  { label: 'Livraison à domicile', status: 'En attente', color: 'text-slate-400' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-slate-200">{row.label}</span>
                    <span className={`text-xs font-semibold ${row.color}`}>{row.status}</span>
                  </div>
                ))}
              </div>
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
              Prêt à recevoir vos premiers colis ?
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Inscription gratuite — adresse portugaise active en 2 minutes.
            </p>
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
