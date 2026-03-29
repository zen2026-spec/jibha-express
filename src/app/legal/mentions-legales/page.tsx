import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mentions légales — JibhaExpress',
  description:
    'Mentions légales obligatoires de JibhaExpress : éditeur, hébergeur, directeur de publication et informations réglementaires.',
};

export default function MentionsLegalesPage() {
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
              Mentions légales
            </h1>
            <p className="text-slate-500 text-sm">
              Conformément aux articles L.111-1 et suivants du Code de la consommation et aux
              dispositions du droit portugais applicables aux services de la société de
              l&apos;information.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-10 text-slate-700">

            {/* Section 1 — Éditeur */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Dénomination sociale
                    </p>
                    <p className="font-semibold text-slate-900">JibhaExpress Lda</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Forme juridique
                    </p>
                    <p className="text-slate-700">
                      Sociedade por Quotas (Lda) — droit portugais
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Numéro d&apos;identification (NIPC)
                    </p>
                    <p className="text-slate-700">514&nbsp;789&nbsp;123</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Numéro TVA intracommunautaire
                    </p>
                    <p className="text-slate-700">PT&nbsp;514789123</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Capital social
                    </p>
                    <p className="text-slate-700">5 000,00 €</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Registre commercial
                    </p>
                    <p className="text-slate-700">Conservatória do Registo Comercial de Lisboa</p>
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Siège social
                  </p>
                  <p className="text-slate-700">
                    Rua Augusta 156<br />
                    1100-053 Lisbonne<br />
                    Portugal
                  </p>
                </div>

                <hr className="border-slate-200" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Téléphone
                    </p>
                    <p className="text-slate-700">+351 21 000 0000</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      E-mail de contact
                    </p>
                    <a
                      href="mailto:contact@jibhaexpress.com"
                      className="text-blue-600 hover:underline"
                    >
                      contact@jibhaexpress.com
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 2 — Directeur de publication */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                2. Directeur de la publication
              </h2>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-sm space-y-2">
                <p>
                  <span className="font-semibold text-slate-800">Youssef Benali</span>
                  <span className="text-slate-500 ml-2">— Co-fondateur & Directeur Général</span>
                </p>
                <p>
                  <a
                    href="mailto:direction@jibhaexpress.com"
                    className="text-blue-600 hover:underline"
                  >
                    direction@jibhaexpress.com
                  </a>
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 3 — Hébergement */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Hébergement</h2>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Hébergeur
                    </p>
                    <p className="font-semibold text-slate-900">Vercel Inc.</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Forme juridique
                    </p>
                    <p className="text-slate-700">Corporation — droit américain (Delaware)</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Adresse
                    </p>
                    <p className="text-slate-700">
                      440 N Barranca Ave #4133<br />
                      Covina, CA 91723<br />
                      États-Unis
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Site web
                    </p>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      vercel.com
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 4 — Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed text-sm">
                L&apos;ensemble du contenu présent sur le site{' '}
                <span className="font-medium">jibhaexpress.com</span> — textes, images, logos,
                graphismes, icônes, sons, logiciels et tout autre élément — est la propriété
                exclusive de JibhaExpress Lda, sauf mentions contraires, et est protégé par les
                lois portugaises et européennes en vigueur relatives à la propriété intellectuelle
                et au droit d&apos;auteur.
              </p>
              <p className="leading-relaxed text-sm mt-3">
                Toute reproduction, représentation, modification, publication ou adaptation,
                totale ou partielle, de l&apos;un quelconque de ces éléments, quel que soit le
                moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable
                de JibhaExpress.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 5 — Protection des données */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Protection des données personnelles
              </h2>
              <p className="leading-relaxed text-sm">
                JibhaExpress traite des données à caractère personnel dans le respect du
                Règlement Général sur la Protection des Données (RGPD — Règlement (UE) 2016/679)
                et de la loi portugaise n°&nbsp;58/2019 du 8 août 2019.
              </p>
              <p className="leading-relaxed text-sm mt-3">
                Pour en savoir plus sur la collecte et le traitement de vos données, veuillez
                consulter notre{' '}
                <a href="/legal/confidentialite" className="text-blue-600 hover:underline font-medium">
                  Politique de confidentialité
                </a>
                .
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 6 — Cookies */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Cookies</h2>
              <p className="leading-relaxed text-sm">
                Le site utilise des cookies pour son fonctionnement et afin d&apos;améliorer
                l&apos;expérience utilisateur. Pour en savoir plus sur les cookies utilisés et
                gérer vos préférences, consultez notre{' '}
                <a href="/legal/cookies" className="text-blue-600 hover:underline font-medium">
                  Politique de cookies
                </a>
                .
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 7 — Liens hypertextes */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Liens hypertextes</h2>
              <p className="leading-relaxed text-sm">
                Le site jibhaexpress.com peut contenir des liens vers des sites tiers. Ces liens
                sont fournis à titre informatif uniquement. JibhaExpress n&apos;exerce aucun
                contrôle sur le contenu de ces sites externes et n&apos;est pas responsable
                des dommages pouvant résulter de leur consultation.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 8 — Droit applicable */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                8. Droit applicable et juridiction
              </h2>
              <p className="leading-relaxed text-sm">
                Les présentes mentions légales sont régies par le droit portugais. En cas de
                litige, et après tentative de résolution amiable, les tribunaux de Lisbonne
                seront seuls compétents.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 9 — Contact */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact</h2>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-sm space-y-2">
                <p className="text-slate-600">
                  Pour toute question relative au site ou à ces mentions légales :
                </p>
                <p>
                  <a
                    href="mailto:legal@jibhaexpress.com"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    legal@jibhaexpress.com
                  </a>
                </p>
                <p className="text-slate-500 text-xs">
                  JibhaExpress Lda — Rua Augusta 156, 1100-053 Lisbonne, Portugal
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
