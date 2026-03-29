'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Package, ShieldCheck } from 'lucide-react';

// ─── Left panel features ──────────────────────────────────────────────────────
const features = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Espace client sécurisé',
    desc: 'Accédez à vos colis, factures et adresse virtuelle en toute sécurité.',
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: 'Suivi de vos colis',
    desc: 'Visualisez l\'état de chaque envoi en temps réel.',
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    title: 'Gestion simplifiée',
    desc: 'Demandez des réexpéditions, consolidations et devis en un clic.',
  },
];

// ─── Google SVG icon ──────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Facebook SVG icon ────────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// ─── Form types ───────────────────────────────────────────────────────────────
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function ConnexionPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Veuillez saisir votre mot de passe.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Mock login delay
    await new Promise((res) => setTimeout(res, 1000));
    setIsSubmitting(false);
    // In a real app: redirect or handle auth error
    setErrors({ general: 'Identifiants incorrects. Veuillez réessayer.' });
  };

  // ── Input change ───────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
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
              Bon retour<br />
              <span className="text-blue-200">parmi nous !</span>
            </h2>
            <p className="text-blue-100/80 text-base mb-10 leading-relaxed">
              Connectez-vous pour accéder à votre espace client, suivre vos colis
              et gérer vos réexpéditions.
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

        {/* ── Right panel: login form ── */}
        <div className="flex-1 flex items-center justify-center bg-white px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                Se connecter
              </h1>
              <p className="text-gray-500 text-sm">
                Pas encore de compte ?{' '}
                <Link
                  href="/inscription"
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-150"
                >
                  S&apos;inscrire gratuitement
                </Link>
              </p>
            </div>

            {/* Social login buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow"
              >
                <GoogleIcon />
                Continuer avec Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow"
              >
                <FacebookIcon />
                Continuer avec Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
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
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
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

              {/* Mot de passe */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Mot de passe
                  </label>
                  <Link
                    href="/mot-de-passe-oublie"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-10 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                      errors.password
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                      formData.rememberMe
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 bg-white group-hover:border-blue-400'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))
                    }
                  >
                    {formData.rememberMe && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 select-none">
                  Se souvenir de moi
                </span>
              </label>

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
                    Connexion en cours…
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom register link */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Pas encore de compte ?{' '}
                <Link
                  href="/inscription"
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-150"
                >
                  Créer un compte gratuitement
                </Link>
              </p>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Vos données sont protégées et ne sont jamais partagées.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
