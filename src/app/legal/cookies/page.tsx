import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de cookies — JibhaExpress',
  description:
    'Politique de gestion des cookies de JibhaExpress : types de cookies utilisés, finalités et comment gérer vos préférences.',
};

const COOKIE_TYPES = [
  {
    type: 'Essentiels',
    required: true,
    color: 'green',
    description:
      'Ces cookies sont strictement nécessaires au fonctionnement de la Plateforme. Sans eux, vous ne pouvez pas naviguer sur le site ni utiliser ses fonctionnalités de base. Ils ne nécessitent pas votre consentement.',
    examples: [
      { name: 'session_id', purpose: 'Maintien de la session utilisateur', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Protection contre les attaques CSRF', duration: 'Session' },
      { name: 'lang_pref', purpose: 'Mémorisation de la langue choisie', duration: '1 an' },
      { name: 'cookie_consent', purpose: 'Mémorisation de vos préférences cookies', duration: '1 an' },
    ],
  },
  {
    type: 'Analytiques',
    required: false,
    color: 'blue',
    description:
      'Ces cookies nous permettent de mesurer l\'audience du site et de comprendre comment les visiteurs interagissent avec nos pages. Les données collectées sont agrégées et anonymisées. Nous utilisons Plausible Analytics, un outil respectueux de la vie privée qui ne crée pas de profil utilisateur.',
    examples: [
      { name: '_plausible', purpose: 'Mesure d\'audience anonymisée (Plausible)', duration: '1 an' },
      { name: 'page_views', purpose: 'Comptage des visites par page', duration: '30 jours' },
    ],
  },
  {
    type: 'Marketing',
    required: false,
    color: 'amber',
    description:
      'Ces cookies sont utilisés pour diffuser des publicités personnalisées et mesurer leur efficacité. Ils permettent également de limiter le nombre d\'affichages d\'une même publicité. Ces cookies ne sont activés qu\'avec votre consentement explicite.',
    examples: [
      { name: '_fbp', purpose: 'Pixel Facebook — suivi des conversions', duration: '90 jours' },
      {
        name: 'google_ads_id',
        purpose: 'Google Ads — mesure des conversions',
        duration: '90 jours',
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
              Document légal
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Politique de cookies
            </h1>
            <p className="text-slate-500 text-sm">
              Dernière mise à jour : 1er janvier 2025
            </p>
          </div>

          {/* Intro */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
            <p className="text-amber-900 text-sm leading-relaxed">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
              smartphone) lors de votre visite sur notre Plateforme. Cette page explique quels
              cookies nous utilisons, pourquoi, et comment vous pouvez gérer vos préférences.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-10 text-slate-700">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p className="leading-relaxed">
                Les cookies sont de petits fichiers enregistrés sur votre appareil par votre
                navigateur à la demande d&apos;un site internet. Ils permettent au site de
                mémoriser vos actions et préférences (langue, connexion, panier, etc.) sur une
                période de temps, de sorte que vous n&apos;avez pas à les redonner à chaque
                nouvelle visite.
              </p>
              <p className="leading-relaxed mt-3">
                Les cookies peuvent être «&nbsp;de session&nbsp;» (supprimés à la fermeture du
                navigateur) ou «&nbsp;persistants&nbsp;» (conservés pendant une durée définie sur
                votre appareil).
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 2 — Types de cookies */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                2. Types de cookies utilisés
              </h2>

              <div className="space-y-8">
                {COOKIE_TYPES.map((cat) => {
                  const colorMap: Record<string, { badge: string; tag: string; header: string }> = {
                    green: {
                      badge: 'bg-green-100 text-green-700',
                      tag: 'bg-green-50 border-green-200 text-green-600',
                      header: 'bg-green-50 border-green-200',
                    },
                    blue: {
                      badge: 'bg-blue-100 text-blue-700',
                      tag: 'bg-blue-50 border-blue-200 text-blue-600',
                      header: 'bg-blue-50 border-blue-200',
                    },
                    amber: {
                      badge: 'bg-amber-100 text-amber-700',
                      tag: 'bg-amber-50 border-amber-200 text-amber-600',
                      header: 'bg-amber-50 border-amber-200',
                    },
                  };
                  const c = colorMap[cat.color];

                  return (
                    <div
                      key={cat.type}
                      className="rounded-2xl border border-slate-200 overflow-hidden"
                    >
                      {/* Header */}
                      <div className={`px-6 py-4 border-b flex items-center justify-between ${c.header}`}>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-slate-900">
                            Cookies {cat.type.toLowerCase()}
                          </h3>
                          {cat.required ? (
                            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${c.badge}`}>
                              Toujours actifs
                            </span>
                          ) : (
                            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${c.tag}`}>
                              Optionnel — consentement requis
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="px-6 py-5">
                        <p className="text-sm text-slate-600 leading-relaxed mb-5">
                          {cat.description}
                        </p>

                        {/* Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50">
                                <th className="text-left px-3 py-2 font-semibold text-slate-700 rounded-tl-lg">
                                  Nom
                                </th>
                                <th className="text-left px-3 py-2 font-semibold text-slate-700">
                                  Finalité
                                </th>
                                <th className="text-left px-3 py-2 font-semibold text-slate-700 rounded-tr-lg">
                                  Durée
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {cat.examples.map((ex) => (
                                <tr key={ex.name} className="hover:bg-slate-50">
                                  <td className="px-3 py-2.5 font-mono text-slate-700 font-medium">
                                    {ex.name}
                                  </td>
                                  <td className="px-3 py-2.5 text-slate-500">{ex.purpose}</td>
                                  <td className="px-3 py-2.5 text-slate-500">{ex.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Gestion de vos préférences
              </h2>
              <p className="leading-relaxed mb-4">
                Lors de votre première visite, une bannière de consentement vous permet
                d&apos;accepter ou de refuser les cookies optionnels (analytiques et marketing).
                Vous pouvez modifier vos préférences à tout moment via le lien
                «&nbsp;Gestion des cookies&nbsp;» disponible en bas de chaque page.
              </p>
              <p className="leading-relaxed mb-4">
                Vous pouvez également configurer votre navigateur pour refuser tout ou partie
                des cookies. Voici comment procéder selon votre navigateur :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                <li>
                  <span className="font-medium text-slate-700">Google Chrome</span> —
                  Paramètres &gt; Confidentialité et sécurité &gt; Cookies
                </li>
                <li>
                  <span className="font-medium text-slate-700">Mozilla Firefox</span> —
                  Paramètres &gt; Vie privée et sécurité &gt; Cookies et données de site
                </li>
                <li>
                  <span className="font-medium text-slate-700">Safari</span> —
                  Préférences &gt; Confidentialité &gt; Cookies et données de sites web
                </li>
                <li>
                  <span className="font-medium text-slate-700">Microsoft Edge</span> —
                  Paramètres &gt; Cookies et autorisations du site
                </li>
              </ul>
              <p className="leading-relaxed mt-4 text-sm text-slate-500">
                Attention : le refus des cookies essentiels peut affecter le fonctionnement de
                la Plateforme. Certaines fonctionnalités peuvent ne plus être disponibles.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Transferts de données via cookies
              </h2>
              <p className="leading-relaxed">
                Certains cookies tiers (Facebook Pixel, Google Ads) peuvent entraîner un transfert
                de données hors de l&apos;Union européenne. Ces transferts sont encadrés par les
                mécanismes appropriés prévus par le RGPD (décision d&apos;adéquation ou clauses
                contractuelles types).
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Contact</h2>
              <p className="leading-relaxed">
                Pour toute question relative à notre politique de cookies, vous pouvez nous
                contacter à l&apos;adresse :{' '}
                <a
                  href="mailto:dpo@jibhaexpress.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  dpo@jibhaexpress.com
                </a>
                .
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
