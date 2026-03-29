import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Landmark,
  FileCheck,
  Calculator,
  UserCheck,
  ShieldCheck,
  HeadphonesIcon,
  CheckCircle,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dédouanement Maroc — DDP | JibhaExpress',
  description:
    'Service de dédouanement complet pour le Maroc. Delivered Duty Paid (DDP) — frais transparents, agents certifiés, inclus dans tous les plans JibhaExpress.',
};

const FEATURES = [
  {
    icon: FileCheck,
    title: 'Documents préparés par nos soins',
    description:
      'Facture commerciale, déclaration de valeur, liste de colisage — nos équipes préparent tous les justificatifs requis par la douane marocaine.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: UserCheck,
    title: 'Agents en douane certifiés',
    description:
      'Nous travaillons avec des transitaires agréés par l\'Administration des Douanes et Impôts Indirects du Maroc (ADII), garantissant un traitement conforme.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Calculator,
    title: 'Frais transparents à l\'avance',
    description:
      'Avant toute expédition, vous recevez une estimation détaillée des droits de douane, TVA (20%) et frais fixes applicables. Aucune mauvaise surprise.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Inclus dans tous les plans',
    description:
      'Le service de dédouanement de base est inclus dans tous les abonnements JibhaExpress, sans frais de gestion supplémentaires de notre part.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suivi en cas de blocage',
    description:
      'Si la douane marocaine retient votre colis, notre agent vous contacte immédiatement et gère les démarches de régularisation en votre nom.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Landmark,
    title: 'Conformité réglementaire totale',
    description:
      'Opérant dans le respect des réglementations douanières portugaises et marocaines, JibhaExpress vous garantit des importations 100% légales.',
    color: 'bg-teal-100 text-teal-600',
  },
];

const TAX_CATEGORIES = [
  { categorie: 'Vêtements & chaussures', douane: '25–40%', tva: '20%', note: '' },
  { categorie: 'Électronique (téléphones, tablettes)', douane: '2.5–10%', tva: '20%', note: 'Variable selon code SH' },
  { categorie: 'Livres & papeterie', douane: '0%', tva: '0%', note: 'Exonérés en général' },
  { categorie: 'Cosmétiques & parfums', douane: '25–40%', tva: '20%', note: '' },
  { categorie: 'Articles de sport', douane: '17.5–25%', tva: '20%', note: '' },
  { categorie: 'Jouets', douane: '25%', tva: '20%', note: '' },
];

const DDP_STEPS = [
  {
    step: '01',
    title: 'Déclaration préalable',
    description: 'Nous collectons les informations nécessaires (valeur, nature, CIN) et préparons la déclaration douanière avant l\'envoi.',
  },
  {
    step: '02',
    title: 'Dépôt en douane',
    description: 'À l\'arrivée au Maroc, nos transitaires déposent le dossier auprès de l\'ADII et assurent le suivi du traitement.',
  },
  {
    step: '03',
    title: 'Paiement des taxes',
    description: 'Les droits de douane et la TVA calculés sont réglés par vos soins (débités sur votre compte JibhaExpress ou facturés séparément).',
  },
  {
    step: '04',
    title: 'Mainlevée et livraison',
    description: 'Dès validation douanière, votre colis est remis au transporteur pour livraison finale à votre adresse au Maroc.',
  },
];

export default function DedouanementPage() {
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
              <Landmark className="w-3.5 h-3.5" strokeWidth={2} />
              Dédouanement officiel
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Dédouanement
              <br />
              <span className="text-amber-300">au Maroc</span>
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Service de dédouanement complet, conforme et transparent.{' '}
              <strong className="text-white">Delivered Duty Paid (DDP)</strong> — vos colis arrivent
              dédouanés, sans blocage ni mauvaise surprise.
            </p>

            {/* DDP badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 mb-10">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" strokeWidth={2} />
              <span className="text-sm text-blue-100">
                Inclus dans <strong className="text-white">tous les plans</strong> — aucun frais de
                gestion supplémentaire
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl text-base transition-colors duration-200 shadow-lg"
              >
                Créer mon compte gratuitement
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

        {/* ── WHAT IS DDP ──────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <Info className="w-7 h-7 text-blue-600" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                  Qu&apos;est-ce que le DDP (Delivered Duty Paid) ?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Le terme DDP (Livraison Droits Acquittés) signifie que l&apos;expéditeur — ici JibhaExpress
                  — se charge de toutes les formalités douanières et du paiement des taxes d&apos;importation
                  avant la livraison finale. Vous recevez votre colis chez vous, entièrement dédouané,
                  sans avoir à vous déplacer en douane ni à gérer de paperasse.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  C&apos;est l&apos;Incoterm le plus confortable pour l&apos;acheteur final, car il transfère toute
                  la responsabilité logistique et administrative sur JibhaExpress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS STEPS ────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Notre processus de dédouanement
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Chaque envoi passe par un processus rigoureux géré par nos transitaires certifiés.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DDP_STEPS.map((s) => (
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
                Pourquoi choisir JibhaExpress pour le dédouanement ?
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Un service complet, transparent et sécurisé.
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

        {/* ── TAX TABLE ────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Taux de droits par catégorie
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Estimations indicatives selon le Tarif des Droits de l&apos;Importation (TDI) marocain.
                Les taux exacts dépendent du code SH de chaque produit.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Catégorie</th>
                    <th className="text-left px-6 py-4 font-semibold">Droits de douane</th>
                    <th className="text-left px-6 py-4 font-semibold">TVA Maroc</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-300">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {TAX_CATEGORIES.map((row, i) => (
                    <tr
                      key={row.categorie}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.categorie}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{row.douane}</td>
                      <td className="px-6 py-4 text-slate-700">{row.tva}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{row.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Base de calcul :</strong> Les droits s&apos;appliquent sur la valeur CIF
                  (valeur du produit + frais de transport + assurance). Un forfait fixe de{' '}
                  <strong>3,00 USD</strong> par envoi est perçu par l&apos;ADII. Utilisez le simulateur
                  dans votre espace client pour une estimation personnalisée.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── INCLUDED IN ALL PLANS ────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-6 text-center">
                Inclus dans tous les plans JibhaExpress
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    plan: 'Standard',
                    color: 'border-slate-600',
                    items: ['Déclaration douanière', 'Agent en douane certifié', 'Suivi du dossier'],
                  },
                  {
                    plan: 'Premium',
                    color: 'border-blue-500',
                    items: ['Tout le Standard', 'Estimation des taxes avant envoi', 'Gestion des blocages prioritaire'],
                  },
                  {
                    plan: 'Business',
                    color: 'border-amber-400',
                    items: ['Tout le Premium', 'Déclarations groupées', 'Rapport mensuel douanier'],
                  },
                ].map((p) => (
                  <div key={p.plan} className={`border ${p.color} rounded-2xl p-5`}>
                    <h4 className="font-bold text-white mb-4">{p.plan}</h4>
                    <ul className="space-y-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" strokeWidth={2} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/tarifs"
                  className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Comparer tous les plans
                </Link>
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
              Importez l&apos;Europe sans stress douanier.
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              JibhaExpress gère intégralement le dédouanement de vos colis au Maroc.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-blue-200">
              {['DDP garanti', 'Agents certifiés ADII', '100% légal et conforme'].map((item) => (
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
