import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Bell, ShoppingBag, Package, Plane, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | JibhaExpress',
  description:
    'Conseils shopping Europe, astuces douane, guides expat Maroc — le blog JibhaExpress arrive bientôt.',
};

const UPCOMING_TOPICS = [
  {
    icon: ShoppingBag,
    color: 'blue',
    title: 'Conseils shopping Europe',
    description:
      'Meilleures boutiques, soldes à saisir, comparatifs prix — comment acheter malin depuis le Maroc.',
  },
  {
    icon: Package,
    color: 'amber',
    title: 'Astuces douane & taxes',
    description:
      'Comprendre les droits de douane marocains, exonérations, déclarations : tout ce qu\'il faut savoir.',
  },
  {
    icon: Plane,
    color: 'green',
    title: 'Guides expat Maroc',
    description:
      'Vous vivez à l\'étranger ou revenez au Maroc ? Nos guides pratiques pour la réexpédition longue distance.',
  },
  {
    icon: Users,
    color: 'purple',
    title: 'Communauté & retours d\'expérience',
    description:
      'Témoignages de clients, cas concrets, questions fréquentes répondues par notre équipe.',
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; ring: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'ring-blue-200' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  ring: 'ring-amber-200' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  ring: 'ring-green-200' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-200' },
};

export default function BlogPage() {
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
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
              Blog JibhaExpress
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Notre blog
              <br />
              <span className="text-amber-300">arrive bientôt</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Conseils shopping Europe, astuces douane, guides expat Maroc — nous préparons
              du contenu utile et pratique, rien que pour vous.
            </p>
          </div>
        </section>

        {/* ── COMING SOON CONTENT ──────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Empty state illustration */}
            <div className="flex flex-col items-center text-center mb-20">
              <div className="relative mb-8">
                <div className="w-28 h-28 rounded-3xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-14 h-14 text-blue-500" strokeWidth={1.25} />
                </div>
                {/* Ping badge */}
                <span className="absolute -top-2 -right-2 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-400 items-center justify-center">
                    <Bell className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Les articles arrivent très bientôt
              </h2>
              <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                Notre équipe rédige actuellement les premiers articles du blog JibhaExpress.
                Revenez nous voir prochainement !
              </p>
            </div>

            {/* Upcoming topics */}
            <div className="mb-16">
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">
                Au programme
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {UPCOMING_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const colors = COLOR_MAP[topic.color];

                  return (
                    <div
                      key={topic.title}
                      className={`bg-white rounded-2xl border border-slate-200 p-6 flex gap-5 items-start hover:shadow-md transition-shadow duration-200 ring-1 ring-transparent hover:${colors.ring}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                        <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1.5">{topic.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notification nudge */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
              <Bell className="w-10 h-10 text-amber-500 mx-auto mb-4" strokeWidth={1.75} />
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Ne ratez pas nos premiers articles
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                Créez un compte JibhaExpress pour être notifié dès la publication de nos premiers
                guides et conseils.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/inscription"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  <Bell className="w-4 h-4" strokeWidth={2} />
                  Être notifié
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Consulter la FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-500">
              En attendant le blog, découvrez{' '}
              <Link href="/fonctionnement" className="text-blue-600 hover:underline font-semibold">
                comment fonctionne JibhaExpress
              </Link>{' '}
              ou parcourez nos{' '}
              <Link href="/boutiques" className="text-blue-600 hover:underline font-semibold">
                boutiques européennes compatibles
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
