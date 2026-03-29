import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion, { type FaqCategory } from './FaqAccordion';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes | JibhaExpress',
  description:
    'Toutes les réponses à vos questions sur JibhaExpress : réexpédition, dédouanement, colis, paiements, livraison au Maroc et bien plus.',
};

// ─────────────────────────────────────────────
// FAQ Data
// ─────────────────────────────────────────────

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    label: 'Général',
    emoji: '🌐',
    items: [
      {
        q: "Qu'est-ce que JibhaExpress ?",
        a: "JibhaExpress est un service de réexpédition de colis basé au Portugal. Nous vous fournissons une adresse postale virtuelle portugaise que vous pouvez utiliser pour acheter sur les boutiques en ligne européennes — puis nous regroupons et expédions vos colis directement à votre domicile au Maroc. Grâce à notre réseau de partenaires logistiques (DHL, FedEx, UPS, LAST MILE EXPRESS), nous garantissons des livraisons fiables, rapides et abordables depuis l'Europe jusqu'à votre porte.",
      },
      {
        q: 'Comment fonctionne la réexpédition ?',
        a: "Le processus est simple en 4 étapes : (1) Créez votre compte gratuit et obtenez votre adresse virtuelle au Portugal. (2) Faites vos achats sur n'importe quelle boutique en ligne européenne en utilisant votre adresse JibhaExpress comme adresse de livraison. (3) Dès réception, nous vous notifions par e-mail et votre colis apparaît dans votre espace client. (4) Vous choisissez vos options (photos, groupage, etc.) et confirmez l'envoi vers le Maroc. Nous nous occupons du reste : conditionnement, formalités douanières et livraison.",
      },
      {
        q: "Est-ce légal d'acheter en Europe et de recevoir au Maroc ?",
        a: "Oui, c'est tout à fait légal. Les achats personnels en ligne depuis des pays étrangers sont autorisés au Maroc dans le cadre de la réglementation douanière en vigueur. Les colis sont dédouanés selon la législation marocaine — vous payez les droits et taxes applicables (TVA 20% + droits de douane variables selon la catégorie du produit). JibhaExpress opère en totale conformité avec les réglementations douanières portugaises et marocaines.",
      },
      {
        q: 'Quels sont les délais de livraison ?',
        a: "Les délais varient selon plusieurs facteurs. Le transport aérien consolidé Portugal → Maroc prend 5 à 8 jours ouvrés après le départ de notre entrepôt. Les vols consolidés partent chaque semaine. Ajoutez 1 à 3 jours pour la procédure douanière marocaine et 1 à 4 jours pour la livraison locale selon votre ville. Au total, comptez en général 10 à 15 jours ouvrés depuis la réception de votre colis chez nous. Des délais express sont disponibles sur demande.",
      },
      {
        q: "Quelles sont vos heures d'ouverture ?",
        a: "Notre entrepôt au Portugal est opérationnel du lundi au vendredi de 9h à 18h (heure de Lisbonne). Notre support client est disponible 7j/7 via l'espace client et par e-mail (contact@jibhaexpress.com). Les abonnés Premium bénéficient d'un support prioritaire avec un délai de réponse garanti sous 24h. Notre chatbot répond aux questions courantes 24h/24.",
      },
    ],
  },
  {
    id: 'compte',
    label: 'Mon compte',
    emoji: '👤',
    items: [
      {
        q: 'Comment créer mon compte ?',
        a: "Créer un compte JibhaExpress est gratuit et prend moins de 2 minutes. Rendez-vous sur jibhaexpress.com/register, renseignez votre nom, adresse e-mail, numéro de téléphone marocain et choisissez un mot de passe sécurisé. Confirmez votre adresse e-mail via le lien reçu dans votre boîte mail, et votre adresse virtuelle portugaise est immédiatement activée. Aucune carte bancaire n'est requise pour le plan Standard gratuit.",
      },
      {
        q: 'Comment obtenir mon adresse virtuelle au Portugal ?',
        a: "Votre adresse virtuelle est créée automatiquement lors de votre inscription. Elle prend le format : [Votre Prénom] [Votre Nom] / [Votre ID Client] — Rua Augusta 156, 1100-053 Lisbonne, Portugal. Cette adresse est unique et personnelle. Utilisez-la exactement telle qu'elle apparaît dans votre espace client comme adresse de livraison lors de vos achats en ligne.",
      },
      {
        q: 'Puis-je avoir plusieurs adresses ?',
        a: "Par défaut, chaque compte dispose d'une seule adresse virtuelle au Portugal. Les abonnés Business Premium peuvent bénéficier de sous-comptes avec des adresses distinctes, utile pour séparer les commandes professionnelles des commandes personnelles. Si vous avez des besoins spécifiques, contactez notre équipe commerciale pour discuter d'une solution adaptée.",
      },
      {
        q: 'Comment modifier mes informations personnelles ?',
        a: "Connectez-vous à votre espace client, puis rendez-vous dans la section 'Mon profil' ou 'Paramètres du compte'. Vous pouvez y modifier votre nom, numéro de téléphone, adresse de livraison au Maroc et vos préférences de notification. La modification de votre adresse e-mail nécessite une vérification supplémentaire pour des raisons de sécurité. En cas de difficultés, notre support est disponible pour vous assister.",
      },
      {
        q: 'Comment supprimer mon compte ?',
        a: "Pour supprimer votre compte, rendez-vous dans 'Paramètres' → 'Confidentialité' → 'Supprimer mon compte'. Attention : la suppression est irréversible et entraîne la perte de tout l'historique de vos envois et de vos données. Assurez-vous d'abord qu'aucun colis n'est en attente dans notre entrepôt et que tous vos paiements sont soldés. Nous conservons certaines données comptables pendant 5 ans conformément à la réglementation en vigueur.",
      },
    ],
  },
  {
    id: 'colis',
    label: 'Colis & Livraison',
    emoji: '📦',
    items: [
      {
        q: 'Quels types de colis acceptez-vous ?',
        a: "Nous acceptons la grande majorité des colis commerciaux : vêtements, chaussures, accessoires, électronique grand public (téléphones, tablettes, ordinateurs), livres, cosmétiques, articles de sport, jouets, articles de maison, etc. Vos colis peuvent peser jusqu'à 30 kg par unité. Pour les objets fragiles, nous recommandons le service de réemballage protection (€4,00 HT) pour maximiser la sécurité durant le transport.",
      },
      {
        q: 'Quels articles sont interdits ?',
        a: "Les articles suivants sont strictement interdits : armes et munitions, explosifs et matières dangereuses (lithium en grande quantité, aérosols pressurisés sous certaines conditions), drogues et stupéfiants, médicaments sur ordonnance sans documentation médicale, tabac et alcool en quantités dépassant les franchises légales, devises et métaux précieux non déclarés, articles contrefaits, nourriture périssable. En cas de doute sur un produit spécifique, contactez-nous avant votre achat.",
      },
      {
        q: 'Combien de temps puis-je stocker mes colis ?',
        a: "Chaque colis bénéficie de 20 jours de stockage gratuit à compter de sa réception dans notre entrepôt. Passé ce délai, des frais de €1,50 HT par colis et par jour commencent à s'accumuler. Nous vous envoyons une notification par e-mail à J+15 (5 jours avant la fin du stockage gratuit) pour vous rappeler de procéder à l'envoi. En cas de circonstances exceptionnelles, contactez-nous pour discuter d'un arrangement.",
      },
      {
        q: 'Comment grouper plusieurs colis ?',
        a: "La consolidation (groupage) vous permet de regrouper plusieurs colis en un seul envoi, ce qui réduit significativement vos frais de transport. Pour demander un groupage, connectez-vous à votre espace client, sélectionnez les colis concernés dans votre inventaire et cliquez sur 'Grouper et expédier'. Les frais de groupage sont de €3,00 HT + €1,00 HT par colis supplémentaire (après le premier). Le poids total du groupage détermine le tarif de transport applicable.",
      },
      {
        q: 'Puis-je voir des photos de mes colis ?',
        a: "Oui, nous proposons deux options photos : (1) Photos standard (€2,00 HT) — des photos extérieures du colis tel qu'il est arrivé ; (2) Ouverture + vérification + 5 photos (€5,00 HT) — nous ouvrons le colis, vérifions le contenu par rapport à votre commande et vous envoyons 5 photos détaillées de l'intérieur. Ces services sont particulièrement utiles pour les articles de valeur ou les achats auprès de vendeurs inconnus.",
      },
      {
        q: "Comment demander l'envoi de mes colis ?",
        a: "Connectez-vous à votre espace client et allez dans 'Mes colis en entrepôt'. Sélectionnez les colis à envoyer, choisissez vos services optionnels (groupage, photos, etc.), vérifiez le récapitulatif des frais et confirmez votre adresse de livraison au Maroc. Procédez au paiement en ligne (carte bancaire ou PayPal). Nous traitons votre demande sous 24–48h ouvrées. Vous recevrez le numéro de suivi dès que votre colis est remis au transporteur.",
      },
      {
        q: "Que se passe-t-il si mon colis est endommagé ?",
        a: "Si votre colis arrive endommagé, prenez immédiatement des photos et contactez notre support dans les 48h suivant la réception. Nous examinons chaque réclamation sérieusement. Si le dommage s'est produit dans notre entrepôt ou pendant le transport sous notre responsabilité, nous déclenchons une procédure d'indemnisation auprès de l'assurance transporteur. Si le colis était déjà endommagé à l'arrivée chez nous (dommage expéditeur), nous vous en informons immédiatement avec photos à l'appui.",
      },
      {
        q: "Puis-je retourner un colis à l'expéditeur ?",
        a: "Oui, nous proposons un service de retour. Si vous souhaitez retourner un article à un vendeur européen, contactez-nous avec les informations du retour (adresse de retour, transporteur souhaité, numéro de retour RMA si applicable). Nous nous chargeons du réemballage si nécessaire et de l'expédition. Les frais de retour (transport + manutention €3,00 HT) sont à votre charge. Notez que certains vendeurs ne proposent pas de retours internationaux.",
      },
    ],
  },
  {
    id: 'dedouanement',
    label: 'Dédouanement Maroc',
    emoji: '🏛️',
    items: [
      {
        q: 'Comment fonctionne le dédouanement ?',
        a: "Lorsque vos colis arrivent au Maroc, ils sont soumis au contrôle douanier obligatoire. JibhaExpress prépare tous les documents nécessaires : facture commerciale, déclaration de valeur, liste de colisage. Nous travaillons avec des agents en douane certifiés qui traitent vos dossiers en priorité. Les frais de dédouanement fixes sont de 3,00 USD par envoi (perçus par l'Administration des Douanes et Impôts Indirects du Maroc). En cas de contrôle approfondi, votre agent dédié vous contacte.",
      },
      {
        q: 'Quels droits et taxes vais-je payer ?',
        a: "Trois types de taxes s'appliquent généralement sur les importations au Maroc : (1) Les droits de douane (0% à 40% selon la nature du produit et son code tarifaire harmonisé) ; (2) La TVA marocaine à 20% calculée sur la valeur des marchandises + frais de transport ; (3) Les frais de dédouanement fixes à 3,00 USD. La base de calcul est la valeur CIF (Cost, Insurance, Freight) : valeur de la marchandise + frais de transport + assurance éventuelle.",
      },
      {
        q: "Y a-t-il une franchise douanière au Maroc ?",
        a: "Les voyageurs résidents marocains bénéficient d'une franchise personnelle de 2 000 MAD sur les achats effectués à l'étranger lors de leurs déplacements. Cependant, cette franchise ne s'applique pas aux envois postaux ou commerciaux. Pour les colis reçus via un service de réexpédition comme JibhaExpress, les droits et taxes sont dus dès le premier dirham. Certains produits de faible valeur peuvent faire l'objet d'une tolérance administrative, mais cela n'est pas garanti.",
      },
      {
        q: 'Quelles informations avez-vous besoin pour le dédouanement ?',
        a: "Pour traiter votre dédouanement efficacement, nous avons besoin : de votre CIN (Carte d'Identité Nationale) marocaine ou votre passeport, de votre numéro de téléphone marocain actif, de la facture d'achat originale (nous proposons le service d'extraction de facture à €2,00 HT si elle se trouve dans votre colis), d'une description précise du contenu (nature, quantité, valeur), et de votre adresse de livraison complète au Maroc. Ces informations sont à renseigner dans votre espace client.",
      },
      {
        q: "Que se passe-t-il si mes colis sont bloqués en douane ?",
        a: "En cas de blocage douanier, notre agent en douane vous contacte immédiatement pour vous expliquer la raison et les démarches à suivre. Les blocages peuvent être dus à une déclaration incomplète, à un contrôle physique aléatoire, ou à un article nécessitant une autorisation spéciale. Dans la plupart des cas, la situation se régularise rapidement avec les documents complémentaires requis. En dernier recours, si l'article est confisqué, nous vous assistons dans les démarches de réclamation.",
      },
      {
        q: 'Comment estimer mes droits et taxes ?',
        a: "Utilisez notre simulateur de coûts disponible dans votre espace client : renseignez la valeur du produit, sa catégorie et le poids estimé, et le simulateur calcule une estimation des droits de douane et TVA applicables. Vous pouvez également consulter le Tarif des Droits de Douane (TDI) sur le site officiel de l'Administration des Douanes marocaine (douane.gov.ma). Notre équipe reste disponible pour vous aider à estimer ces frais avant votre achat.",
      },
    ],
  },
  {
    id: 'paiement',
    label: 'Paiement',
    emoji: '💳',
    items: [
      {
        q: 'Quels modes de paiement acceptez-vous ?',
        a: "Nous acceptons les moyens de paiement suivants : cartes bancaires internationales (Visa, Mastercard, American Express), PayPal, virement bancaire SEPA (pour les abonnements Business), et paiement en dirhams marocains via CIH Money, CashPlus et Wafacash (pour les clients résidant au Maroc). Les paiements en crypto-monnaies ne sont pas acceptés. Tous les paiements sont traités via des plateformes sécurisées (Stripe/PayPal) avec chiffrement SSL.",
      },
      {
        q: 'Quand dois-je payer ?',
        a: "Le paiement s'effectue au moment où vous confirmez l'envoi de vos colis depuis votre espace client. Vous payez les frais de transport, les services optionnels sélectionnés et les frais de dédouanement d'avance. Les frais de stockage (si applicables au-delà de 20 jours) sont facturés lors de la demande d'envoi. Pour les abonnements Premium et Business, la mensualité est prélevée automatiquement chaque mois à la date d'anniversaire de votre souscription.",
      },
      {
        q: 'Puis-je payer en MAD (dirhams) ?',
        a: "Oui, les clients résidant au Maroc peuvent effectuer certains paiements en dirhams marocains via nos partenaires de paiement locaux : CIH Money, CashPlus et Wafacash. La conversion est effectuée au taux de change du jour. Notez que le taux appliqué peut légèrement différer du taux officiel Bank Al-Maghrib en raison des frais de conversion. Pour les montants importants, le paiement par carte internationale en euros est souvent plus avantageux.",
      },
      {
        q: 'Comment obtenir une facture ?',
        a: "Toutes vos factures sont disponibles dans votre espace client, section 'Historique des paiements' ou 'Factures'. Vous pouvez les télécharger en PDF à tout moment. Les factures incluent le détail de tous les frais : transport, services optionnels, stockage et abonnement. Pour les entreprises ayant besoin de factures avec numéro de TVA intracommunautaire, activez l'option 'Facturation professionnelle' dans les paramètres de votre compte.",
      },
      {
        q: 'Politique de remboursement',
        a: "Nos remboursements sont traités au cas par cas selon les circonstances. Remboursement complet garanti si : votre colis est perdu sous notre responsabilité ou si une erreur de notre part entraîne un surcoût. Remboursement partiel possible si : le colis arrive endommagé (selon degré de responsabilité établi). Pas de remboursement sur : les services déjà rendus (photos prises, groupage réalisé), les frais douaniers (taxes gouvernementales), les frais de stockage légitimement engagés. Délai de traitement des remboursements : 5 à 10 jours ouvrés.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Page (Server Component)
// ─────────────────────────────────────────────

export default function FaqPage() {
  const totalQuestions = FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

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
              <HelpCircle className="w-3.5 h-3.5" strokeWidth={2} />
              Centre d&apos;aide
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Questions
              <br />
              <span className="text-amber-300">fréquentes</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Retrouvez les réponses aux{' '}
              <strong className="text-white">{totalQuestions} questions</strong> les plus posées sur
              JibhaExpress. Organisées par thème pour vous aider rapidement.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {FAQ_CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center gap-1.5 text-blue-200">
                  <span>{cat.emoji}</span>
                  <span>
                    {cat.label} ({cat.items.length})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION ────────────────────── */}
        <section className="py-20 bg-slate-50" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FaqAccordion categories={FAQ_CATEGORIES} />
          </div>
        </section>

        {/* ── CONTACT CTA ──────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Vous n&apos;avez pas trouvé votre réponse ?
              </h2>
              <p className="text-slate-500">
                Notre équipe est disponible pour répondre à toutes vos questions personnalisées.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live chat */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-blue-600" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Chat en direct</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Réponse instantanée via le chat de votre espace client.
                </p>
                <Link
                  href="/inscription"
                  className="inline-block px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Ouvrir le chat
                </Link>
              </div>

              {/* Email */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-green-600" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">E-mail</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Réponse garantie sous 24h ouvrées (sous 4h pour les abonnés Premium).
                </p>
                <a
                  href="mailto:contact@jibhaexpress.com"
                  className="inline-block px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Envoyer un e-mail
                </a>
              </div>

              {/* Phone */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-violet-600" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Téléphone</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Disponible du lundi au vendredi, 9h–18h (heure de Lisbonne).
                </p>
                <a
                  href="tel:+351210000000"
                  className="inline-block px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
                >
                  +351 21 000 0000
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Pages utiles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Voir les tarifs', href: '/tarifs', emoji: '💰' },
                  { label: 'Comment ça marche', href: '/fonctionnement', emoji: '⚙️' },
                  { label: 'Créer un compte', href: '/inscription', emoji: '✨' },
                  { label: 'Nous contacter', href: '/contact', emoji: '📩' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors duration-200"
                  >
                    <span>{link.emoji}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
