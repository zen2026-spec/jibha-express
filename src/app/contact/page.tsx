'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageCircle } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: Mail,
    color: 'blue',
    label: 'E-mail',
    value: 'contact@jibhaexpress.com',
    href: 'mailto:contact@jibhaexpress.com',
    note: 'Réponse sous 24h ouvrées',
  },
  {
    icon: Phone,
    color: 'green',
    label: 'Téléphone',
    value: '+351 21 000 00 00',
    href: 'tel:+351210000000',
    note: 'Lun – Ven, 9h – 18h (Lisbonne)',
  },
  {
    icon: MapPin,
    color: 'amber',
    label: 'Adresse',
    value: 'Rua Augusta 156\n1100-053 Lisbonne, Portugal',
    href: 'https://maps.google.com/?q=Rua+Augusta+156+Lisbonne+Portugal',
    note: 'Entrepôt & siège social',
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600' },
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Votre nom est requis.';
    if (!form.email.trim()) {
      newErrors.email = 'Votre adresse e-mail est requise.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Adresse e-mail invalide.';
    }
    if (!form.message.trim()) newErrors.message = 'Votre message est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate async submission — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

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
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
              Nous contacter
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              On est là
              <br />
              <span className="text-amber-300">pour vous aider</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Une question sur votre colis, un devis, ou simplement envie d&apos;en savoir plus ?
              Notre équipe vous répond sous{' '}
              <strong className="text-white">24 heures ouvrées</strong>.
            </p>
          </div>
        </section>

        {/* ── CONTACT INFO ─────────────────────── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const colors = COLOR_MAP[item.color];

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Adresse' ? '_blank' : undefined}
                    rel={item.label === 'Adresse' ? 'noopener noreferrer' : undefined}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-slate-900 text-sm whitespace-pre-line group-hover:text-blue-600 transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-auto">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                      {item.note}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ─────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Envoyez-nous un message
              </h2>
              <p className="text-slate-500">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs
                délais.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  Message envoyé avec succès !
                </h3>
                <p className="text-slate-500 mb-6">
                  Merci de nous avoir contactés. Notre équipe vous répondra dans les 24 heures
                  ouvrées.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      autoComplete="name"
                      className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name
                          ? 'border-red-400 bg-red-50'
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Adresse e-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="vous@exemple.com"
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email
                          ? 'border-red-400 bg-red-50'
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-400"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="suivi-colis">Suivi de colis</option>
                    <option value="tarifs">Tarifs & devis</option>
                    <option value="douane">Douane & taxes</option>
                    <option value="compte">Mon compte</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Décrivez votre demande en détail..."
                    className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.message
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                  )}
                  <p className="mt-1.5 text-xs text-slate-400">
                    {form.message.length} / 1000 caractères
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" strokeWidth={2} />
                      Envoyer le message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Vous préférez la FAQ ?{' '}
                  <Link href="/faq" className="text-blue-600 hover:underline font-medium">
                    Consultez nos réponses fréquentes
                  </Link>
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
