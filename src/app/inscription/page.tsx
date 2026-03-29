'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VirtualAddressCard from '@/components/VirtualAddressCard';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  ArrowRight,
  Package,
} from 'lucide-react';

// ─── Moroccan cities ──────────────────────────────────────────────────────────
const moroccanCities = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Safi',
  'El Jadida',
  'Nador',
  'Beni Mellal',
  'Autre',
];

// ─── Password strength ────────────────────────────────────────────────────────
function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Très faible', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Faible', color: 'bg-orange-500' };
  if (score === 3) return { score, label: 'Moyen', color: 'bg-yellow-500' };
  if (score === 4) return { score, label: 'Fort', color: 'bg-blue-500' };
  return { score, label: 'Très fort', color: 'bg-green-500' };
}

// ─── Benefits list (left panel) ───────────────────────────────────────────────
const benefits = [
  {
    icon: <Package className="w-5 h-5" />,
    title: 'Adresse virtuelle gratuite',
    desc: 'Recevez une adresse au Portugal immédiatement après inscription.',
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    title: 'Expédition express',
    desc: 'Vos colis livrés au Maroc en 5 à 10 jours ouvrables.',
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Suivi en temps réel',
    desc: 'Suivez chaque étape de votre colis depuis votre espace client.',
  },
  {
    icon: <Copy className="w-5 h-5" />,
    title: 'Consolidation de colis',
    desc: 'Regroupez plusieurs achats en un seul envoi pour économiser.',
  },
];

// ─── Form field types ─────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
  acceptCGU?: string;
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function InscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+212 ',
    city: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [clientId, setClientId] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const passwordStrength = getPasswordStrength(formData.password);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères.';
    }
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 11) {
      newErrors.phone = 'Veuillez saisir un numéro de téléphone valide.';
    }
    if (!formData.city) {
      newErrors.city = 'Veuillez sélectionner votre ville.';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    if (!formData.acceptCGU) {
      newErrors.acceptCGU = 'Vous devez accepter les CGU pour continuer.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Une erreur est survenue.');
        setIsSubmitting(false);
        return;
      }

      setClientId(data.clientId);
      setRegistered(true);

      // Auto sign-in after registration
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
    } catch {
      setServerError('Erreur de connexion. Veuillez réessayer.');
    }

    setIsSubmitting(false);
  };

  // ── Input change helpers ───────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Copy full address ──────────────────────────────────────────────────────
  const copyFullAddress = async () => {
    const fullAddress = [
      'JibhaExpress Portugal Lda',
      `À l'attention de: ${formData.firstName} ${formData.lastName} - JBX${clientId}`,
      'Rua da Alfandega, 10',
      '1100-016 Lisboa, Portugal',
      'Tél: +351 21 000 0000',
      'Email: warehouse@jibha-express.com',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(fullAddress);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = fullAddress;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // ─── Registered: show virtual address ─────────────────────────────────────
  if (registered) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-2xl">
            {/* Success header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue, {formData.firstName} !
              </h1>
              <p className="text-gray-500 text-base">
                Votre compte a été créé avec succès. Voici votre adresse virtuelle au Portugal.
              </p>
            </div>

            {/* Virtual address card */}
            <VirtualAddressCard
              firstName={formData.firstName}
              lastName={formData.lastName}
              clientId={clientId}
            />

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyFullAddress}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
                  copiedAddress
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-blue-600 bg-white text-blue-700 hover:bg-blue-50'
                }`}
              >
                {copiedAddress ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Adresse copiée !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier l&apos;adresse complète
                  </>
                )}
              </button>
              <Link
                href="/espace-client"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
              >
                Accéder à mon espace client
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              Un email de confirmation a été envoyé à{' '}
              <span className="font-medium text-gray-600">{formData.email}</span>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Registration form ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        {/* ── Left panel: blue gradient with benefits ── */}
        <div
          className="hidden lg:flex lg:w-5/12 xl:w-2/5 flex-col justify-between p-10 xl:p-14 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a56db 0%, #1e40af 50%, #1e3a8a 100%)',
          }}
        >
          {/* Background decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3" />

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
              Commandez en Europe,<br />
              <span className="text-blue-200">recevez au Maroc.</span>
            </h2>
            <p className="text-blue-100/80 text-base mb-10 leading-relaxed">
              Rejoignez des milliers de clients qui font confiance à JibhaExpress
              pour leurs achats depuis l&apos;Europe.
            </p>

            {/* Benefits list */}
            <div className="flex flex-col gap-5">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-white">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{b.title}</p>
                    <p className="text-blue-100/70 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom flag badges */}
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

        {/* ── Right panel: white form ── */}
        <div className="flex-1 flex items-center justify-center bg-white px-4 py-10 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                Créer mon compte
              </h1>
              <p className="text-gray-500 text-sm">
                Déjà inscrit ?{' '}
                <Link
                  href="/connexion"
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-150"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            {serverError && (
              <div className="mb-2 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Prénom + Nom */}
              <div className="grid grid-cols-2 gap-3">
                {/* Prénom */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Yassine"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                        errors.firstName
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>

                {/* Nom */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="lastName" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Benali"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                        errors.lastName
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

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
                    placeholder="yassine@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
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

              {/* Téléphone */}
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Téléphone (Maroc)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+212 6XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                      errors.phone
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Ville */}
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Ville
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2.5 rounded-xl border text-sm outline-none appearance-none cursor-pointer transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                      errors.city
                        ? 'border-red-400 bg-red-50 text-gray-900 focus:border-red-500'
                        : formData.city
                        ? 'border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:bg-white'
                        : 'border-gray-200 bg-gray-50 text-gray-400 focus:border-blue-500 focus:bg-white'
                    }`}
                  >
                    <option value="" disabled>
                      Sélectionner une ville
                    </option>
                    {moroccanCities.map((city) => (
                      <option key={city} value={city} className="text-gray-900">
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 8 caractères"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
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

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-1.5">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength.score
                              ? passwordStrength.color
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Force :{' '}
                      <span
                        className={`font-semibold ${
                          passwordStrength.score <= 2
                            ? 'text-red-500'
                            : passwordStrength.score === 3
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirmer mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Confirmer mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Répéter le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/20 ${
                      errors.confirmPassword
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-400 bg-green-50 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    aria-label={showConfirm ? 'Masquer' : 'Afficher'}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Les mots de passe correspondent.
                    </p>
                  )}
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* CGU checkbox */}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      id="acceptCGU"
                      name="acceptCGU"
                      type="checkbox"
                      checked={formData.acceptCGU}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        formData.acceptCGU
                          ? 'border-blue-600 bg-blue-600'
                          : errors.acceptCGU
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-300 bg-white group-hover:border-blue-400'
                      }`}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, acceptCGU: !prev.acceptCGU }));
                        if (errors.acceptCGU) {
                          setErrors((prev) => ({ ...prev, acceptCGU: undefined }));
                        }
                      }}
                    >
                      {formData.acceptCGU && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed select-none">
                    J&apos;accepte les{' '}
                    <Link
                      href="/legal/cgu"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      CGU
                    </Link>{' '}
                    et la{' '}
                    <Link
                      href="/legal/confidentialite"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      politique de confidentialité
                    </Link>
                  </span>
                </label>
                {errors.acceptCGU && (
                  <p className="text-xs text-red-500 ml-8">{errors.acceptCGU}</p>
                )}
              </div>

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
                    Création en cours…
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              En créant un compte, vous acceptez nos conditions d&apos;utilisation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
