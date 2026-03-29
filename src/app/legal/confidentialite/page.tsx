import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — JibhaExpress',
  description:
    'Politique de confidentialité et de protection des données personnelles de JibhaExpress, conforme au RGPD.',
};

export default function ConfidentialitePage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-slate-500 text-sm">
              Dernière mise à jour : 1er janvier 2025 &mdash; Conforme au RGPD (Règlement (UE)
              2016/679)
            </p>
          </div>

          {/* Intro */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
            <p className="text-blue-800 text-sm leading-relaxed">
              JibhaExpress Lda («&nbsp;JibhaExpress&nbsp;», «&nbsp;nous&nbsp;») s&apos;engage à
              protéger la vie privée de ses utilisateurs. Cette politique explique quelles données
              personnelles nous collectons, pourquoi, comment nous les utilisons et quels sont
              vos droits en tant que personne concernée.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-10 text-slate-700">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Responsable du traitement
              </h2>
              <p className="leading-relaxed">
                Le responsable du traitement de vos données personnelles est :
              </p>
              <div className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-5 text-sm text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-800">JibhaExpress Lda</span></p>
                <p>Rua Augusta 156, 1100-053 Lisbonne, Portugal</p>
                <p>NIPC : 514&nbsp;789&nbsp;123</p>
                <p>
                  E-mail DPO :{' '}
                  <a href="mailto:dpo@jibhaexpress.com" className="text-blue-600 hover:underline">
                    dpo@jibhaexpress.com
                  </a>
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Données personnelles collectées
              </h2>
              <p className="leading-relaxed mb-4">
                Nous collectons les catégories de données suivantes, selon les interactions avec
                notre service :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left px-4 py-3 font-semibold text-slate-800 rounded-tl-lg">
                        Catégorie
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-800 rounded-tr-lg">
                        Exemples
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Identification', 'Nom, prénom, date de naissance, CIN marocaine'],
                      ['Contact', 'Adresse e-mail, numéro de téléphone'],
                      ['Adresse', 'Adresse de livraison au Maroc'],
                      ['Données de transaction', 'Historique de commandes, montants, factures'],
                      ['Données de paiement', 'Derniers chiffres de carte (tokenisés via Stripe)'],
                      ['Données de navigation', 'Adresse IP, cookies, pages visitées, appareil'],
                    ].map(([cat, ex]) => (
                      <tr key={cat} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">{cat}</td>
                        <td className="px-4 py-3 text-slate-500">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Finalités et bases légales du traitement
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Exécution du contrat de service',
                    base: 'Art. 6(1)(b) RGPD',
                    desc: 'Gestion de votre compte, traitement des envois, facturation, service client.',
                  },
                  {
                    title: 'Obligations légales',
                    base: 'Art. 6(1)(c) RGPD',
                    desc: 'Conservation des données comptables et douanières conformément à la législation portugaise et européenne.',
                  },
                  {
                    title: 'Intérêt légitime',
                    base: 'Art. 6(1)(f) RGPD',
                    desc: 'Prévention de la fraude, amélioration de nos services, sécurité informatique.',
                  },
                  {
                    title: 'Consentement',
                    base: 'Art. 6(1)(a) RGPD',
                    desc: 'Envoi de communications marketing, newsletters, utilisation de cookies non essentiels.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {item.base}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Durée de conservation
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left px-4 py-3 font-semibold text-slate-800 rounded-tl-lg">
                        Type de données
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-800 rounded-tr-lg">
                        Durée de conservation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Données de compte actif', 'Durée de la relation contractuelle + 3 ans'],
                      ['Données comptables & factures', '10 ans (obligation légale portugaise)'],
                      ['Données douanières', '5 ans (obligation légale)'],
                      ['Données de navigation & cookies', '13 mois maximum'],
                      ['Candidatures non retenues', '2 ans après le dernier contact'],
                    ].map(([type, duree]) => (
                      <tr key={type} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">{type}</td>
                        <td className="px-4 py-3 text-slate-500">{duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Destinataires des données
              </h2>
              <p className="leading-relaxed mb-4">
                Vos données personnelles peuvent être communiquées aux catégories de destinataires
                suivantes, dans le strict cadre des finalités décrites ci-dessus :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                <li>Transporteurs partenaires (DHL, FedEx, UPS, LAST MILE EXPRESS) — pour la livraison</li>
                <li>Agents en douane — pour le dédouanement au Maroc</li>
                <li>
                  Prestataires de paiement (Stripe, PayPal) — pour le traitement sécurisé des
                  paiements
                </li>
                <li>Hébergeur (Vercel Inc.) — pour l&apos;hébergement de la Plateforme</li>
                <li>
                  Autorités douanières et fiscales — en cas d&apos;obligation légale ou
                  réglementaire
                </li>
              </ul>
              <p className="leading-relaxed mt-4 text-sm">
                Nous ne vendons pas vos données personnelles à des tiers. Tout transfert hors de
                l&apos;Espace Économique Européen (EEE) est encadré par des garanties appropriées
                (clauses contractuelles types de la Commission européenne).
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Vos droits (RGPD)
              </h2>
              <p className="leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous
                disposez des droits suivants concernant vos données personnelles :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { droit: 'Droit d\'accès', desc: 'Obtenir une copie de vos données.' },
                  { droit: 'Droit de rectification', desc: 'Corriger des données inexactes.' },
                  { droit: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données.' },
                  {
                    droit: 'Droit à la portabilité',
                    desc: 'Recevoir vos données dans un format structuré.',
                  },
                  {
                    droit: 'Droit d\'opposition',
                    desc: 'Vous opposer à un traitement basé sur l\'intérêt légitime.',
                  },
                  {
                    droit: 'Droit de limitation',
                    desc: 'Demander la suspension temporaire du traitement.',
                  },
                  {
                    droit: 'Retrait du consentement',
                    desc: 'À tout moment, sans affecter les traitements antérieurs.',
                  },
                  {
                    droit: 'Réclamation CNPD',
                    desc: 'Auprès de la Commission Nationale de Protection des Données (Portugal).',
                  },
                ].map((item) => (
                  <div
                    key={item.droit}
                    className="bg-slate-50 rounded-xl border border-slate-100 p-4"
                  >
                    <p className="font-semibold text-slate-800 text-sm mb-1">{item.droit}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed mt-4 text-sm">
                Pour exercer vos droits, contactez notre Délégué à la Protection des Données (DPO)
                à l&apos;adresse :{' '}
                <a href="mailto:dpo@jibhaexpress.com" className="text-blue-600 hover:underline font-medium">
                  dpo@jibhaexpress.com
                </a>
                . Nous nous engageons à répondre dans un délai d&apos;un mois à compter de la
                réception de votre demande.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Sécurité des données</h2>
              <p className="leading-relaxed">
                JibhaExpress met en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données contre toute destruction, perte, altération, divulgation
                ou accès non autorisé. Cela inclut notamment le chiffrement des communications
                (TLS/HTTPS), le contrôle d&apos;accès, la journalisation des accès et des audits
                de sécurité réguliers.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                8. Contact et DPO
              </h2>
              <p className="leading-relaxed">
                Pour toute question relative à cette politique ou pour exercer vos droits, vous
                pouvez contacter notre Délégué à la Protection des Données :
              </p>
              <div className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-5 text-sm text-slate-600 space-y-1">
                <p>
                  <span className="font-semibold text-slate-800">DPO — JibhaExpress Lda</span>
                </p>
                <p>Rua Augusta 156, 1100-053 Lisbonne, Portugal</p>
                <p>
                  E-mail :{' '}
                  <a href="mailto:dpo@jibhaexpress.com" className="text-blue-600 hover:underline">
                    dpo@jibhaexpress.com
                  </a>
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
