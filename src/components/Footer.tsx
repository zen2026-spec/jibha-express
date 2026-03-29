'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package2, Mail, Phone, MapPin, Send } from 'lucide-react';

// Inline SVG social icons (lucide-react does not ship brand icons)
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconXTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const services = [
  { label: 'Réexpédition', href: '/services/reexpedition' },
  { label: 'Consolidation', href: '/services/consolidation' },
  { label: 'Achat assisté', href: '/services/achat-assiste' },
  { label: 'Dédouanement', href: '/services/dedouanement' },
];

const entreprise = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Carrières', href: '/carrieres' },
  { label: 'Presse', href: '/presse' },
];

const legal = [
  { label: 'CGU', href: '/legal/cgu' },
  { label: 'Confidentialité', href: '/legal/confidentialite' },
  { label: 'Cookies', href: '/legal/cookies' },
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
];

const socialLinks = [
  {
    icon: IconFacebook,
    href: 'https://facebook.com/jibhaexpress',
    label: 'Facebook',
    color: 'hover:bg-blue-600',
  },
  {
    icon: IconInstagram,
    href: 'https://instagram.com/jibhaexpress',
    label: 'Instagram',
    color: 'hover:bg-pink-600',
  },
  {
    icon: IconLinkedin,
    href: 'https://linkedin.com/company/jibhaexpress',
    label: 'LinkedIn',
    color: 'hover:bg-sky-600',
  },
  {
    icon: IconXTwitter,
    href: 'https://x.com/jibhaexpress',
    label: 'X / Twitter',
    color: 'hover:bg-gray-700',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate async subscription
    await new Promise((res) => setTimeout(res, 800));
    setSubscribed(true);
    setLoading(false);
    setEmail('');
  };

  return (
    <footer style={{ backgroundColor: '#111827' }} className="text-white">
      {/* Top wave divider */}
      <div className="w-full overflow-hidden leading-none" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12"
          style={{ display: 'block' }}
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z"
            fill="#f9fafb"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column — wider */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit" aria-label="JibhaExpress">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200"
                style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
              >
                <Package2 className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Jibha<span style={{ color: '#3b82f6' }}>Express</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Votre passerelle entre l&apos;Europe et le Maroc.
              <br />
              Livraisons fiables, rapides et abordables depuis le Portugal jusqu&apos;à votre porte.
            </p>

            {/* Flag badges */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-gray-300">
                <span className="text-base">🇵🇹</span> Portugal
              </span>
              <span className="text-gray-600">→</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-gray-300">
                <span className="text-base">🇲🇦</span> Maroc
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-all duration-200 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 group-hover:bg-blue-400 transition-colors duration-150 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-2.5">
              {entreprise.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 group-hover:bg-blue-400 transition-colors duration-150 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 mt-8">
              Légal
            </h3>
            <ul className="flex flex-col gap-2.5">
              {legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 group-hover:bg-blue-400 transition-colors duration-150 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Nous contacter
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="https://maps.google.com/?q=Lisbon+Portugal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 group"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-blue-400 text-gray-500" strokeWidth={1.75} />
                    <span>
                      Rua Augusta 156,
                      <br />
                      1100-053 Lisbonne,
                      <br />
                      Portugal
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@jibhaexpress.com"
                    className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 group"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 group-hover:text-blue-400 text-gray-500" strokeWidth={1.75} />
                    contact@jibhaexpress.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+351210000000"
                    className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-150 group"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0 group-hover:text-blue-400 text-gray-500" strokeWidth={1.75} />
                    +351 21 000 0000
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Newsletter
              </h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Recevez nos offres et actualités directement dans votre boîte mail.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Merci pour votre inscription !
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-150"
                    aria-label="Adresse e-mail pour la newsletter"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-70 hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0"
                    style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
                  >
                    {loading ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" strokeWidth={2} />
                        S&apos;abonner
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} JibhaExpress. Tous droits réservés.
            </p>
            <p className="flex items-center gap-1.5">
              Fait avec
              <svg className="w-3.5 h-3.5 text-red-500 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              au Portugal
              <span className="ml-1">🇵🇹</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
