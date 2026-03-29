import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Boxes,
  PackageOpen,
  Weight,
  PiggyBank,
  CalendarClock,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Consolidation de colis | JibhaExpress',
  description:
    'Regroupez plusieurs colis en un seul envoi vers le Maroc et économisez jusqu\'à 60% sur vos frais de transport. Stockage gratuit 20 jours inclus.',
};

const BENEFITS = [
  {
    icon: PiggyBank,
    title: 'Jusqu\'à 60% d\'économies',
    description:
      'En combinant plusieurs petits colis en un seul envoi, vous payez un seul frais de transport au lieu de plusieurs.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: CalendarClock,
    title: 'Stockage gratuit 20 jours',
    description:
      'Tous vos colis sont conservés gratuitement dans notre entrepôt sécurisé pendant 20 jours pour que vous puissiez les regrouper.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Weight,
    title: 'Tarif au poids réel',
    description:
      'Après consolidation, vous ne payez que pour le poids volumétrique combiné du colis final, sans frais cachés.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: PackageOpen,
    title: 'Réemballage soigné',
    description:
      'Nos équipes retirent les emballages volumineux inutiles et repackent vos articles de façon optimale pour réduire le volume.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: ShieldCheck,
    title: 'Protection renforcée',
    description:
      'Chaque colis consolidé bénéficie d\'un réemballage protecteur avec calage adapté pour prévenir tout dommage durant le transport.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Boxes,
    title: 'Jusqu\'à 20 colis groupés',
    description:
      'Regroupez jusqu\'à 20 colis distincts en un seul envoi. Idéal pour les acheteurs réguliers qui commandent souvent en Europe.',
    color: 'bg-teal-100 text-teal-600',
  },
];

const EXAMPLE_SAVINGS = [
  { colis: 1, poids: '0,8 kg', coutSepare: '€ 14,00', coutGroupe: '€ 14,00', economie: '—' },
  { colis: 2, poids: '1,6 kg', coutSepare: '€ 28,00', coutGroupe: '€ 16,50', economie: '€ 11,50' },
  { colis: 3, poids: '2,4 kg', coutSepare: '€ 42,00', coutGroupe: '€ 19,00', economie: '€ 23,00' },
  { colis: 5, poids: '4,0 kg', coutSepare: '€ 70,00', coutGroupe: '€ 25,00', economie: '€ 45,00' },
];

const STEPS = [
  {
    step: '01',
    title: 'Vos colis arrivent',
    description: 'Chaque colis reçu dans notre entrepôt est enregistré dans votre espace client avec notification immédiate.',
  },
  {
    step: '02',
    title: 'Vous choisissez',
    description: 'Sélectionnez les colis à regrouper depuis votre espace client. Le reste peut attendre (dans la limite des 20 jours).',
  },
  {
    step: '03',
    title: 'On consolide',
    description: 'Nos équipes réemballent vos articles dans un seul colis optimisé sous 24–48h ouvrées.',
  },
  {
    step: '04',
    title: 'Expédition unique',
    description: 'Un seul envoi, un seul numéro de suivi, un seul frais de transport — directement à votre porte au Maroc.',
  },
];

export default function ConsolidationPage() {
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
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Boxes className="w-3.5 h-3.5" strokeWidth={2} />
              Économisez sur vos envois
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Consolidation
              <br />
              <span className="text-amber-300">de colis</span>
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Regroupez plusieurs achats européens en un seul envoi vers le Maroc.
              Stockage gratuit 20 jours, réemballage optimisé et{' '}
              <strong className="text-white">jusqu&apos;à 60% d&apos;économies</strong> sur le transport.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl text-base transition-colors duration-200 shadow-lg"
              >
                Commencer à grouper mes colis
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

        {/* ── SAVINGS TABLE ────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Combien pouvez-vous économiser ?
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Exemple concret pour des colis de 0,8 kg chacun vers le Maroc.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Nombre de colis</th>
                    <th className="text-left px-6 py-4 font-semibold">Poids total</th>
                    <th className="text-left px-6 py-4 font-semibold">Coût séparé</th>
                    <th className="text-left px-6 py-4 font-semibold">Coût groupé</th>
                    <th className="text-left px-6 py-4 font-semibold text-green-400">Économie</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLE_SAVINGS.map((row, i) => (
                    <tr
                      key={row.colis}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">{row.colis} colis</td>
                      <td className="px-6 py-4 text-slate-600">{row.poids}</td>
                      <td className="px-6 py-4 text-slate-600">{row.coutSepare}</td>
                      <td className="px-6 py-4 text-slate-800 font-semibold">{row.coutGroupe}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{row.economie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mt-3 text-center">
              Tarifs indicatifs. Frais de consolidation : €3,00 HT + €1,00 HT par colis supplémentaire.
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Processus de consolidation
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Simple et entièrement géré depuis votre espace client.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <div key={s.step} className="flex gap-3 lg:flex-col lg:gap-0">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex-1">
                    <span className="inline-block text-4xl font-extrabold text-blue-100 mb-4 leading-none">
                      {s.step}
                    </span>
                    <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center absolute" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ─────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Avantages inclus
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                La consolidation est disponible sur tous les plans JibhaExpress.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className={`w-12 h-12 ${b.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STORAGE BANNER ───────────────────── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center gap-6">
              <CalendarClock className="w-16 h-16 text-blue-200 shrink-0" strokeWidth={1.5} />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                  20 jours de stockage gratuit
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Tous vos colis sont stockés gratuitement pendant 20 jours à compter de leur arrivée
                  dans notre entrepôt. Prenez le temps de grouper vos achats avant de lancer l&apos;expédition.
                  Au-delà : €1,50 HT / colis / jour.
                </p>
              </div>
              <Link
                href="/inscription"
                className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Commencer <ArrowRight className="w-4 h-4" />
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
              Groupez, économisez, recevez.
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Créez votre compte gratuitement et commencez à consolider vos colis dès aujourd&apos;hui.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-blue-200">
              {['Inscription gratuite', 'Stockage 20j offert', 'Aucun engagement'].map((item) => (
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
