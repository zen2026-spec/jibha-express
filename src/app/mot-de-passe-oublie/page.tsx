'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, ArrowRight, Package, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

// ─── Left panel features ──────────────────────────────────────────────────────
const features = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Réinitialisation sécurisée',
    desc: 'Un lien de réinitialisation vous est envoyé directement sur votre adresse email.',
  },
  {
    icon: <KeyRound className="w-5 h-5" />,
    title: 'Lien valide 24h',
    desc: 'Le lien de réinitialisation expire après 24 heures pour votre sécurité.',
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: 'Accès restauré rapidement',
    desc: 'Récupérez l\'accès à vos colis et à votre espace client en quelques minutes.',
  },
];

// ─── Form types ───────────────────────────────────────────────────────────────
interface FormErrors {
  email?: string;
  general?: string;
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Mock API delay
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        {/* ── Left panel ── */}
        <div
          className="hidden lg:flex lg:w-5/12 xl:w-2/5 flex-col justify-between p-10 xl:p-14 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a56db 0%, #1e40af 50%, #1e3a8a 100%)',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/5" />

          <div className="relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-12 group w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-200">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Jibha<span className="text-blue-200">Express</span>
              </span>
            </Link>

            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
              Mot de passe<br />
              <span className="text-blue-200">oublié ?</span>
            </h2>
            <p className="text-blue-100/80 text-base mb-10 leading-relaxed">
              Pas de panique. Renseignez votre adresse email et nous vous enverrons
              un lien pour réinitialiser votre mot de passe.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-white">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{f.title}</p>
                    <p className="text-blue-100/70 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom flags */}
          <div className="relative z-10 flex items-center gap-3 mt-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium">
              <span className="text-base">🇵🇹</span> Portugal
            </div>
            <span className="text-blue-200/60">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium">
              <span className="text-base">🇲🇦</span> Maroc
            </div>
          </div>
        </div>

        {/* ── Right panel: forgot password form ── */}
        <div className="flex-1 flex items-center justify-center bg-white px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">

            {isSuccess ? (
              /* ── Success state ── */
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mx-auto mb-6">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Email envoyé !
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  Si un compte existe pour{' '}
                  <span className="font-semibold text-gray-700">{email}</span>,
                  vous recevrez un lien de réinitialisation dans quelques minutes.
                </p>
                <p className="text-gray-400 text-xs mb-8">
                  Pensez à vérifier vos spams si vous ne le trouvez pas.
                </p>
                <Link
                  href="/connexion"
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                    Réinitialiser le mot de passe
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Vous vous souvenez de votre mot de passe ?{' '}
                    <Link
                      href="/connexion"
                      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-150"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>

                {/* General error */}
                {errors.general && (
                  <div className="mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                          errors.email
                            ? 'border-red-400 bg-red-50 focus:border-red-500'
                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed -mt-1">
                    Saisissez l&apos;adresse email associée à votre compte. Nous vous enverrons
                    un lien pour créer un nouveau mot de passe.
                  </p>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 disabled:cursor-not-allowed transition-all duration-200 mt-1"
                    style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer le lien de réinitialisation
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to login */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <Link
                    href="/connexion"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-150"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la connexion
                  </Link>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Vos données sont protégées et ne sont jamais partagées.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
