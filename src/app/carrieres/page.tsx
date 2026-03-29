import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock, Send, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Carrières — JibhaExpress',
  description:
    'Rejoignez l\'équipe JibhaExpress ! Découvrez nos offres d\'emploi et postulez pour faire partie d\'une startup logistique en pleine croissance.',
};

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Agent Logistique & Réception',
    location: 'Lisbonne, Portugal (présentiel)',
    type: 'CDI – Temps plein',
    department: 'Opérations',
    description:
      'Vous intégrez notre équipe entrepôt pour réceptionner, trier, peser et étiqueter les colis de nos clients. Vous êtes rigoureux, organisé et avez une première expérience en logistique ou en manutention.',
    skills: ['Expérience logistique souhaitée', 'Portugais ou français courant', 'Rigueur & ponctualité'],
  },
  {
    id: 2,
    title: 'Chargé(e) de Support Client Francophone',
    location: 'Télétravail (Maroc ou Portugal)',
    type: 'CDD – Temps plein',
    department: 'Service Client',
    description:
      'Vous êtes le premier point de contact de nos clients marocains. Vous traitez les demandes entrantes par e-mail et chat, résolvez les problèmes liés aux envois et contribuez à améliorer notre base de connaissances.',
    skills: ['Français excellent', 'Arabe ou darija apprécié', 'Empathie & sens du service', 'À l\'aise avec les outils digitaux'],
  },
];

const PERKS = [
  {
    icon: Zap,
    title: 'Startup dynamique',
    description: 'Rejoignez une équipe agile en forte croissance avec un impact direct sur le produit.',
  },
  {
    icon: MapPin,
    title: 'Présence internationale',
    description: 'Des équipes au Portugal et au Maroc, avec des opportunités de mobilité.',
  },
  {
    icon: Users,
    title: 'Culture bienveillante',
    description: 'Un environnement de travail inclusif, multiculturel et axé sur la collaboration.',
  },
];

export default function CarrieresPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ─────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-10 bg-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Briefcase className="w-3.5 h-3.5" strokeWidth={2} />
              On recrute !
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Nous recrutons&nbsp;!
              <br />
              <span className="text-amber-300">Rejoignez l&apos;équipe</span>
            </h1>
            <p className="text-emerald-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              JibhaExpress est en pleine expansion. Nous cherchons des talents passionnés pour
              construire avec nous le pont logistique entre l&apos;Europe et le Maroc.
            </p>
          </div>
        </section>

        {/* ── POURQUOI NOUS ─────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Pourquoi rejoindre JibhaExpress ?
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Nous construisons quelque chose de concret — une infrastructure qui change le
                quotidien de milliers de familles marocaines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PERKS.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-emerald-600" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── OFFRES D'EMPLOI ───────────────────── */}
        <section className="py-20 bg-slate-50" id="offres">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Postes ouverts
              </h2>
              <p className="text-slate-500 text-lg">
                {OPEN_POSITIONS.length} offre{OPEN_POSITIONS.length > 1 ? 's' : ''} disponible
                {OPEN_POSITIONS.length > 1 ? 's' : ''} en ce moment
              </p>
            </div>

            <div className="space-y-6">
              {OPEN_POSITIONS.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">
                        {job.department}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    </div>
                    <a
                      href={`mailto:jobs@jibhaexpress.com?subject=Candidature — ${job.title}`}
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      <Send className="w-4 h-4" strokeWidth={2} />
                      Postuler
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                      {job.type}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CANDIDATURE SPONTANÉE ─────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 text-center text-white">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-amber-300" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Votre profil ne correspond pas exactement ?
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Nous sommes toujours à la recherche de talents motivés. Envoyez-nous une
                candidature spontanée et nous vous contacterons si une opportunité se présente.
              </p>
              <a
                href="mailto:jobs@jibhaexpress.com?subject=Candidature spontanée — JibhaExpress"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-lg"
              >
                <Send className="w-5 h-5" strokeWidth={2} />
                jobs@jibhaexpress.com
              </a>
              <p className="text-slate-400 text-sm mt-4">
                Joignez votre CV et une lettre de motivation. Nous répondons à chaque candidature.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
