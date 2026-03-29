import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Lock, ArrowRight } from 'lucide-react';

export default function EspaceClientPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 bg-gray-50">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card top accent */}
            <div
              className="h-2 w-full"
              style={{ background: 'linear-gradient(90deg, #1a56db 0%, #1e40af 100%)' }}
            />

            <div className="px-8 py-10 text-center">
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
              >
                <Lock className="w-9 h-9 text-white" />
              </div>

              {/* Brand */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
                >
                  <Package className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">
                  Jibha<span className="text-blue-600">Express</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Votre espace client<br />
                <span className="text-blue-600">arrive bientôt</span>
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Nous préparons votre tableau de bord pour suivre vos colis, gérer vos
                réexpéditions et accéder à votre adresse virtuelle au Portugal.
                <br className="hidden sm:block" />
                <span className="inline-block mt-1 font-medium text-gray-600">
                  Connectez-vous ou créez un compte pour être notifié dès l&apos;ouverture.
                </span>
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {[
                  '📦 Suivi des colis',
                  '🏠 Adresse virtuelle',
                  '🚚 Réexpéditions',
                  '📄 Factures',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/connexion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
                >
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/inscription"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-blue-700 text-sm border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Créer un compte
                </Link>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="text-base">🇵🇹</span>
                <span>Portugal</span>
                <span className="text-gray-300 mx-1">→</span>
                <span className="text-base">🇲🇦</span>
                <span>Maroc</span>
              </div>
              <span className="text-gray-200 hidden sm:inline">|</span>
              <p className="text-xs text-gray-400">
                Vos données sont protégées et sécurisées.
              </p>
            </div>
          </div>

          {/* Below card link */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Besoin d&apos;aide ?{' '}
            <Link
              href="/contact"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
