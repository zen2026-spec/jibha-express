import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Newspaper, Download, Mail, FileText, Image, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Presse — JibhaExpress',
  description:
    'Ressources presse JibhaExpress : kit presse, logos, visuels et contact médias pour les journalistes et blogueurs.',
};

const PRESS_MENTIONS = [
  {
    outlet: 'Médias 24',
    date: 'Mars 2024',
    title: 'JibhaExpress facilite l\'accès au e-commerce européen pour les Marocains',
    url: '#',
  },
  {
    outlet: 'TelQuel',
    date: 'Novembre 2023',
    title: 'La startup qui veut démocratiser les achats en ligne depuis l\'Europe',
    url: '#',
  },
  {
    outlet: 'Jornal Económico (PT)',
    date: 'Septembre 2023',
    title: 'Startup portuguesa serve comunidade marroquina com reencaminhamento de encomendas',
    url: '#',
  },
];

const KIT_ITEMS = [
  {
    icon: Image,
    title: 'Logotypes JibhaExpress',
    description: 'Versions couleur, noir et blanc, fond transparent — PNG & SVG',
    tag: 'ZIP · ~2 Mo',
    available: false,
  },
  {
    icon: FileText,
    title: 'Dossier de presse',
    description: 'Présentation de l\'entreprise, chiffres clés, biographies des fondateurs',
    tag: 'PDF · ~1,5 Mo',
    available: false,
  },
  {
    icon: Image,
    title: 'Visuels & photos produit',
    description: 'Photos haute résolution de nos entrepôts, équipe et interface client',
    tag: 'ZIP · ~15 Mo',
    available: false,
  },
];

const KEY_FIGURES = [
  { value: '2022', label: 'Année de création' },
  { value: '5 000+', label: 'Clients actifs' },
  { value: '30 000+', label: 'Colis expédiés' },
  { value: 'Lisbonne', label: 'Siège social' },
];

export default function PressePage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ─────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-10 bg-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-3.5 h-3.5" strokeWidth={2} />
              Espace Presse
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Espace
              <br />
              <span className="text-amber-300">Presse</span>
            </h1>
            <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Retrouvez toutes les ressources pour les journalistes et blogueurs : kit presse,
              logos, visuels et contact médias.
            </p>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ─────────────────────── */}
        <section className="bg-white py-16 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {KEY_FIGURES.map((fig) => (
                <div key={fig.label}>
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{fig.value}</p>
                  <p className="text-slate-500 text-sm font-medium">{fig.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KIT PRESSE ────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Kit presse
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Téléchargez nos ressources officielles pour vos articles, reportages et contenus.
                Respectez les chartes d&apos;utilisation incluses dans chaque archive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {KIT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col"
                  >
                    <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-indigo-600" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                      {item.description}
                    </p>
                    <span className="text-xs text-slate-400 font-medium mb-4">{item.tag}</span>
                    {item.available ? (
                      <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                        <Download className="w-4 h-4" strokeWidth={2} />
                        Télécharger
                      </button>
                    ) : (
                      <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-400 text-sm font-semibold rounded-xl cursor-not-allowed">
                        <AlertCircle className="w-4 h-4" strokeWidth={2} />
                        Bientôt disponible
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-slate-400 text-sm mt-8">
              Les ressources seront disponibles au téléchargement très prochainement. En attendant,
              contactez notre équipe presse.
            </p>
          </div>
        </section>

        {/* ── MENTIONS PRESSE ───────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                JibhaExpress dans les médias
              </h2>
            </div>

            <div className="space-y-4">
              {PRESS_MENTIONS.map((mention, index) => (
                <a
                  key={index}
                  href={mention.url}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <Newspaper className="w-6 h-6 text-indigo-600" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-indigo-600 text-sm">{mention.outlet}</span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-slate-400 text-xs">{mention.date}</span>
                    </div>
                    <p className="text-slate-800 font-medium text-sm group-hover:text-indigo-600 transition-colors">
                      {mention.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT PRESSE ────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 text-center text-white">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-amber-300" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Contact presse
              </h2>
              <p className="text-slate-300 text-lg mb-2 leading-relaxed">
                Pour toute demande d&apos;interview, de partenariat éditorial ou d&apos;information
                complémentaire, contactez notre responsable communication.
              </p>
              <p className="text-slate-400 text-sm mb-8">
                Délai de réponse garanti sous 48 heures ouvrées.
              </p>
              <a
                href="mailto:presse@jibhaexpress.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-lg"
              >
                <Mail className="w-5 h-5" strokeWidth={2} />
                presse@jibhaexpress.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
