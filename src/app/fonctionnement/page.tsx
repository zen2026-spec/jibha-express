import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus, MapPin, ShoppingCart, PackageCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comment ça marche | JibhaExpress',
  description:
    'Découvrez comment JibhaExpress fonctionne en 4 étapes simples : créez votre compte, obtenez une adresse portugaise, commandez en Europe et recevez vos colis au Maroc.',
};

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    color: 'blue',
    title: 'Créer un compte',
    subtitle: 'Inscription gratuite en 2 minutes',
    description:
      "Inscrivez-vous gratuitement sur JibhaExpress. Renseignez votre nom, e-mail et numéro de téléphone marocain. Aucune carte bancaire requise pour commencer.",
    details: [
      'Inscription 100 % gratuite',
      'Adresse virtuelle activée immédiatement',
      'Espace client sécurisé',
      'Support disponible 7j/7',
    ],
  },
  {
    number: '02',
    icon: MapPin,
    color: 'amber',
    title: 'Obtenir une adresse',
    subtitle: 'Votre adresse portugaise personnelle',
    description:
      "Dès votre inscription, vous recevez une adresse postale unique à Lisbonne, Portugal. Utilisez-la comme adresse de livraison sur toutes les boutiques en ligne européennes.",
    details: [
      'Adresse réelle à Lisbonne',
      'Identifiant client unique',
      'Compatible avec tous les e-commerçants',
      'Notifications à chaque réception',
    ],
  },
  {
    number: '03',
    icon: ShoppingCart,
    color: 'green',
    title: 'Commander en Europe',
    subtitle: "Shopping sans frontières sur 1000+ boutiques",
    description:
      "Faites vos achats sur Amazon.fr, Zara, ASOS, Fnac et toutes vos boutiques européennes préférées. Saisissez votre adresse JibhaExpress comme adresse de livraison.",
    details: [
      'Accès à toutes les boutiques EU',
      'Regroupement de plusieurs colis',
      'Photos de vos colis sur demande',
      'Vérification du contenu disponible',
    ],
  },
  {
    number: '04',
    icon: PackageCheck,
    color: 'purple',
    title: 'Recevoir au Maroc',
    subtitle: 'Livraison à domicile partout au Maroc',
    description:
      "Nous prenons en charge l'emballage, les formalités douanières et l'expédition. Votre colis arrive chez vous en 10 à 15 jours ouvrés via DHL, FedEx ou Tawssil.",
    details: [
      'Dédouanement géré par nos soins',
      'Livraison partout au Maroc',
      'Suivi en temps réel',
      'Partenaires : DHL, FedEx, Tawssil',
    ],
  },
];

const COLOR_MAP: Record<string, { badge: string; icon: string; number: string; bullet: string }> = {
  blue: {
    badge: 'bg-blue-100 text-blue-700',
    icon: 'bg-blue-100 text-blue-600',
    number: 'text-blue-200',
    bullet: 'text-blue-500',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700',
    icon: 'bg-amber-100 text-amber-600',
    number: 'text-amber-200',
    bullet: 'text-amber-500',
  },
  green: {
    badge: 'bg-green-100 text-green-700',
    icon: 'bg-green-100 text-green-600',
    number: 'text-green-200',
    bullet: 'text-green-500',
  },
  purple: {
    badge: 'bg-purple-100 text-purple-700',
    icon: 'bg-purple-100 text-purple-600',
    number: 'text-purple-200',
    bullet: 'text-purple-500',
  },
};

export default function FonctionnementPage() {
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
              <PackageCheck className="w-3.5 h-3.5" strokeWidth={2} />
              Guide étape par étape
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Comment ça
              <br />
              <span className="text-amber-300">marche ?</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              JibhaExpress simplifie la réexpédition de colis depuis l&apos;Europe vers le Maroc en{' '}
              <strong className="text-white">4 étapes simples</strong>. Du compte à la livraison,
              nous gérons tout.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={2} />
                Inscription gratuite
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={2} />
                Adresse au Portugal
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={2} />
                Livraison en 10–15 jours
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Le processus en détail
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Chaque étape est conçue pour être rapide, transparente et sans surprise.
              </p>
            </div>

            <div className="space-y-12">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const colors = COLOR_MAP[step.color];
                const isEven = index % 2 === 1;

                return (
                  <div
                    key={step.number}
                    className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                  >
                    {/* Card */}
                    <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
                      {/* Background step number */}
                      <span
                        className={`absolute top-4 right-6 text-7xl font-black opacity-40 select-none ${colors.number}`}
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>

                      <div className="relative">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${colors.icon}`}>
                          <Icon className="w-7 h-7" strokeWidth={1.75} />
                        </div>
                        <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${colors.badge}`}>
                          Étape {step.number}
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-sm font-medium text-slate-500 mb-4">{step.subtitle}</p>
                        <p className="text-slate-600 leading-relaxed mb-6">{step.description}</p>

                        <ul className="space-y-2">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-2.5 text-sm text-slate-700">
                              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${colors.bullet}`} strokeWidth={2} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Connector arrow (hidden on mobile) */}
                    <div className="hidden md:flex flex-col items-center justify-center w-12 flex-shrink-0">
                      {index < STEPS.length - 1 && (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-px h-8 bg-slate-300" />
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                          </div>
                          <div className="w-px h-8 bg-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Spacer on even rows to balance flex layout */}
                    <div className="hidden md:block flex-1" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Créez votre compte gratuitement et obtenez votre adresse portugaise en moins de
              2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                <UserPlus className="w-5 h-5" strokeWidth={2} />
                Créer mon compte gratuit
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Voir les tarifs
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
