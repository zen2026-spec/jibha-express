'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Package2 } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Fonctionnement', href: '/fonctionnement' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Boutiques', href: '/boutiques' },
];

const languages = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'ar', label: 'AR', flag: '🇲🇦', name: 'العربية' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
];

function getLocaleFromCookie(): string {
  if (typeof document === 'undefined') return 'fr';
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  return match ? match[1] : 'fr';
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getLocaleFromCookie());
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangSelect = (code: string) => {
    document.cookie = `locale=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setCurrentLang(code);
    setLangOpen(false);
    window.location.reload();
  };

  const activeLang = languages.find((l) => l.code === currentLang) ?? languages[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="JibhaExpress - Accueil"
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
            >
              <Package2 className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span
              className={`font-bold text-lg tracking-tight transition-colors duration-200 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Jibha<span style={{ color: '#1a56db' }}>Express</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                  scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  scrolled
                    ? 'border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 bg-white'
                    : 'border-white/30 text-white hover:bg-white/20 bg-white/10'
                }`}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span>{activeLang.flag}</span>
                <span>{activeLang.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700 ${
                        lang.code === currentLang
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700'
                      }`}
                      role="option"
                      aria-selected={lang.code === currentLang}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            <Link
              href="/connexion"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                scrolled
                  ? 'border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-700 bg-white'
                  : 'border-white/40 text-white hover:bg-white/20 bg-transparent'
              }`}
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
            }`}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl px-4 pt-3 pb-6">
          {/* Mobile nav links */}
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <hr className="border-gray-200 mb-4" />

          {/* Mobile language switcher */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
              Langue
            </p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    lang.code === currentLang
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile auth buttons */}
          <div className="flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-700 transition-colors duration-150"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-150 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
