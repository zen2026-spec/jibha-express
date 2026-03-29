import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Target, Heart, Users, Package, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos — JibhaExpress',
  description:
    'Découvrez JibhaExpress : notre histoire, notre mission et notre équipe dédiée à vous connecter au e-commerce européen depuis le Portugal.',
};

const VALUES = [
  {
    icon: Target,
    title: 'Fiabilité',
    description:
      'Chaque colis est traité avec le plus grand soin. Nous nous engageons à vous offrir un suivi transparent à chaque étape de votre livraison.',
    color: 'blue',
  },
  {
    icon: Heart,
    title: 'Proximité',
    description:
      'Fondée par des Marocains pour des Marocains, JibhaExpress comprend vos besoins et parle votre langue — en français, en arabe ou en darija.',
    color: 'rose',
  },
  {
    icon: Globe,
    title: 'Accessibilité',
    description:
      "Nous croyons que chaque Marocain mérite d'accéder aux meilleures offres du e-commerce européen, sans barrières ni complications.",
    color: 'emerald',
  },
];

const TEAM = [
  { name: 'Youssef Benali', role: 'Co-fondateur & CEO', initials: 'YB' },
  { name: 'Fatima Zahra Idrissi', role: 'Co-fondatrice & COO', initials: 'FI' },
  { name: 'Adam Ouchene', role: 'Responsable Logistique', initials: 'AO' },
  { name: 'Sara Moussaoui', role: 'Responsable Clientèle', initials: 'SM' },
];

const STATS = [
  { value: '5 000+', label: 'clients actifs' },
  { value: '30 000+', label: 'colis expédiés' },
  { value: '98 %', label: 'de satisfaction' },
  { value: '2 pays', label: 'Portugal & Maroc' },
];

export default function AProposPage() {
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
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white" />
            <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-10 bg-white" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Package className="w-3.5 h-3.5" strokeWidth={2} />
              Notre histoire
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              À propos de
              <br />
              <span className="text-amber-300">JibhaExpress</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Nous rapprochons les Marocains du meilleur du e-commerce européen, depuis notre entrepôt
              au cœur de Lisbonne.
            </p>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────── */}
        <section className="bg-white py-16 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold text-blue-600 mb-1">{stat.value}</p>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTRE HISTOIRE ────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                  Notre histoire
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    JibhaExpress est née d&apos;une frustration partagée par des milliers de
                    Marocains : l&apos;impossibilité de commander sur les grandes plateformes
                    européennes comme Zalando, ASOS, Fnac, ou Cdiscount, faute d&apos;une adresse
                    de livraison en Europe.
                  </p>
                  <p>
                    Fondée en 2022 à Lisbonne par une équipe d&apos;entrepreneurs marocains,
                    JibhaExpress a été créée avec une idée simple : fournir à chaque Marocain une
                    adresse postale virtuelle au Portugal, et s&apos;occuper du reste — réception,
                    stockage, groupage et expédition directe à domicile au Maroc.
                  </p>
                  <p>
                    Depuis notre lancement, nous avons accompagné plus de 5 000 clients et expédié
                    plus de 30 000 colis. Notre entrepôt logistique est situé en plein centre de
                    Lisbonne, à deux pas de la Rua Augusta.
                  </p>
                </div>
              </div>

              {/* Map card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Notre bureau</p>
                    <p className="text-slate-500 text-sm">Lisbonne, Portugal</p>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-slate-400">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-blue-400" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">Rua Augusta 156</p>
                    <p className="text-xs text-slate-500">1100-053 Lisbonne, Portugal</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Rua+Augusta+156+Lisbonne+Portugal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Voir sur Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION ───────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Notre mission
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
              Éliminer les frontières logistiques entre l&apos;Europe et le Maroc pour rendre le
              commerce en ligne accessible à tous.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((val) => {
                const Icon = val.icon;
                const colorMap: Record<string, string> = {
                  blue: 'bg-blue-100 text-blue-600',
                  rose: 'bg-rose-100 text-rose-600',
                  emerald: 'bg-emerald-100 text-emerald-600',
                };
                return (
                  <div
                    key={val.title}
                    className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colorMap[val.color]}`}
                    >
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ÉQUIPE ────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Notre équipe
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Une équipe passionnée et multiculturelle, dédiée à vous offrir la meilleure
                expérience de réexpédition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.initials}</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                  <p className="text-slate-500 text-xs mt-1">{member.role}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-400 text-sm mt-8">
              Et toute une équipe opérationnelle au Portugal et au Maroc.
            </p>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Prêt à rejoindre l&apos;aventure ?
            </h2>
            <p className="text-slate-500 mb-8">
              Créez votre adresse virtuelle portugaise gratuitement en moins de 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/inscription"
                className="inline-block px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Créer mon compte gratuit
              </a>
              <a
                href="/tarifs"
                className="inline-block px-8 py-3.5 bg-slate-100 text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Voir les tarifs
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
