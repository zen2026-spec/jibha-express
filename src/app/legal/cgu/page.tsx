import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — JibhaExpress",
  description:
    "Consultez les Conditions Générales d'Utilisation (CGU) du service JibhaExpress.",
};

export default function CguPage() {
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
              Conditions Générales d&apos;Utilisation
            </h1>
            <p className="text-slate-500 text-sm">
              Dernière mise à jour : 1er janvier 2025 &mdash; Version 1.2
            </p>
          </div>

          {/* Body */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

            {/* Article 1 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Article 1 — Objet</h2>
              <p className="leading-relaxed">
                Les présentes Conditions Générales d&apos;Utilisation (ci-après «&nbsp;CGU&nbsp;»)
                ont pour objet de définir les modalités et conditions dans lesquelles
                JibhaExpress Lda (ci-après «&nbsp;JibhaExpress&nbsp;» ou «&nbsp;la
                Société&nbsp;»), société de droit portugais, immatriculée sous le numéro
                514&nbsp;789&nbsp;123 au registre commercial de Lisbonne, dont le siège social est
                situé Rua Augusta 156, 1100-053 Lisbonne, Portugal, met à disposition ses services
                de réexpédition de colis à destination du Maroc.
              </p>
              <p className="leading-relaxed mt-3">
                L&apos;accès et l&apos;utilisation du site internet{' '}
                <span className="font-medium">jibhaexpress.com</span> ainsi que de toute
                application mobile associée (ci-après «&nbsp;la Plateforme&nbsp;») impliquent
                l&apos;acceptation pleine et entière des présentes CGU. Si vous n&apos;acceptez
                pas ces conditions, veuillez ne pas utiliser la Plateforme.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 2 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 2 — Accès au service
              </h2>
              <p className="leading-relaxed">
                Le service JibhaExpress est accessible à toute personne physique majeure ou
                personne morale légalement constituée, disposant d&apos;une connexion internet.
                JibhaExpress se réserve le droit de refuser l&apos;accès à son service à toute
                personne qui ne respecterait pas les présentes CGU ou qui fournirait des
                informations inexactes lors de son inscription.
              </p>
              <p className="leading-relaxed mt-3">
                La Plateforme est accessible 24h/24 et 7j/7, sauf interruptions pour maintenance
                technique ou force majeure. JibhaExpress ne pourra être tenu responsable des
                interruptions temporaires de service liées à des opérations de maintenance
                planifiées ou à des événements imprévisibles.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 3 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 3 — Compte utilisateur
              </h2>
              <p className="leading-relaxed">
                Pour accéder aux services de JibhaExpress, l&apos;utilisateur doit créer un compte
                personnel en renseignant les informations suivantes : nom, prénom, adresse
                e-mail, numéro de téléphone et adresse de livraison au Maroc. L&apos;utilisateur
                s&apos;engage à fournir des informations exactes, complètes et à les maintenir
                à jour.
              </p>
              <p className="leading-relaxed mt-3">
                Les identifiants de connexion (adresse e-mail et mot de passe) sont strictement
                personnels et confidentiels. L&apos;utilisateur est seul responsable de leur
                conservation et de toute utilisation faite depuis son compte. En cas de suspicion
                de compromission, l&apos;utilisateur doit en informer immédiatement JibhaExpress
                à l&apos;adresse{' '}
                <a
                  href="mailto:securite@jibhaexpress.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  securite@jibhaexpress.com
                </a>
                .
              </p>
              <p className="leading-relaxed mt-3">
                Un seul compte personnel est autorisé par utilisateur. La création de comptes
                multiples destinés à contourner les règles du service est prohibée et peut
                entraîner la suspension immédiate de l&apos;ensemble des comptes concernés.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 4 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 4 — Obligations et responsabilités de l&apos;utilisateur
              </h2>
              <p className="leading-relaxed">
                L&apos;utilisateur s&apos;engage à utiliser la Plateforme et le service de
                réexpédition dans le respect des lois et règlements en vigueur, notamment la
                législation douanière portugaise et marocaine. Il est expressément interdit :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
                <li>
                  D&apos;expédier des marchandises prohibées (armes, drogues, contrefaçons,
                  matières dangereuses, etc.)
                </li>
                <li>
                  De fournir de fausses déclarations de valeur ou de nature de marchandises
                </li>
                <li>
                  D&apos;utiliser le service à des fins de fraude douanière ou fiscale
                </li>
                <li>
                  De porter atteinte à la sécurité informatique de la Plateforme
                </li>
                <li>
                  De revendre ou céder son accès à des tiers sans autorisation préalable de
                  JibhaExpress
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                En cas de manquement à ces obligations, JibhaExpress se réserve le droit de
                suspendre ou résilier le compte de l&apos;utilisateur sans préavis ni
                indemnité, et de signaler les faits aux autorités compétentes le cas échéant.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 5 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 5 — Responsabilité de JibhaExpress
              </h2>
              <p className="leading-relaxed">
                JibhaExpress s&apos;engage à mettre en œuvre tous les moyens raisonnables pour
                assurer la sécurité et la fiabilité de ses services. Toutefois, la responsabilité
                de JibhaExpress ne saurait être engagée en cas de :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
                <li>
                  Retards ou pertes imputables aux transporteurs partenaires ou aux
                  administrations douanières
                </li>
                <li>
                  Dommages causés par des marchandises dont l&apos;expédition était prohibée
                  et non déclarée par l&apos;utilisateur
                </li>
                <li>
                  Interruptions du service liées à des cas de force majeure (grèves,
                  catastrophes naturelles, pannes d&apos;infrastructures, etc.)
                </li>
                <li>
                  Décisions unilatérales des autorités douanières marocaines
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                La responsabilité totale de JibhaExpress au titre d&apos;un envoi ne pourra
                excéder la valeur déclarée du colis concerné, dans la limite du plafond
                d&apos;assurance souscrit.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 6 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 6 — Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                L&apos;ensemble des éléments constituant la Plateforme (logos, textes, graphismes,
                interfaces, logiciels, bases de données) est la propriété exclusive de
                JibhaExpress ou de ses concédants, et est protégé par le droit portugais et
                européen de la propriété intellectuelle.
              </p>
              <p className="leading-relaxed mt-3">
                Toute reproduction, représentation, modification, publication, adaptation ou
                exploitation de tout ou partie des éléments de la Plateforme, par quelque moyen
                ou procédé que ce soit, est interdite sauf autorisation écrite préalable de
                JibhaExpress.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 7 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 7 — Modification des CGU
              </h2>
              <p className="leading-relaxed">
                JibhaExpress se réserve le droit de modifier les présentes CGU à tout moment.
                Les utilisateurs seront informés des modifications par e-mail ou par notification
                dans leur espace client au moins 15 jours avant leur entrée en vigueur. La
                poursuite de l&apos;utilisation du service après l&apos;entrée en vigueur des
                nouvelles CGU vaut acceptation de celles-ci.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Article 8 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Article 8 — Droit applicable et juridiction compétente
              </h2>
              <p className="leading-relaxed">
                Les présentes CGU sont régies et interprétées conformément au droit portugais.
                En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des
                présentes CGU, et après tentative de résolution amiable, les tribunaux de
                Lisbonne seront seuls compétents, sauf disposition légale impérative contraire.
              </p>
              <p className="leading-relaxed mt-3">
                Pour toute question relative aux présentes CGU, vous pouvez contacter
                JibhaExpress à l&apos;adresse :{' '}
                <a
                  href="mailto:legal@jibhaexpress.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  legal@jibhaexpress.com
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
