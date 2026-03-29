'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  emoji: string;
  items: FaqItem[];
};

// ─────────────────────────────────────────────
// Single accordion item
// ─────────────────────────────────────────────

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  searchQuery,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
}) {
  // Highlight matching text in search results
  function highlight(text: string) {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 text-amber-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-blue-200 shadow-md shadow-blue-50'
          : 'border-slate-200 hover:border-blue-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
          isOpen ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
              isOpen
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`font-semibold text-sm leading-snug pr-4 ${
              isOpen ? 'text-blue-900' : 'text-slate-800'
            }`}
          >
            {highlight(item.q)}
          </span>
        </div>
        <span className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={2} />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-3 bg-white border-t border-blue-100">
          <p className="text-slate-600 text-sm leading-relaxed pl-10">
            {highlight(item.a)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main accordion with search
// ─────────────────────────────────────────────

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggle = (key: string) => setOpenKey((prev) => (prev === key ? null : key));

  // Filter logic
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            !query ||
            item.q.toLowerCase().includes(query) ||
            item.a.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery, activeCategory]);

  const totalResults = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const totalAll = categories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div>
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            strokeWidth={1.75}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenKey(null);
            }}
            placeholder="Rechercher une question..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
            >
              Effacer
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-slate-500 mt-2 text-center">
            {totalResults === 0 ? (
              <span className="text-slate-400">Aucun résultat pour &quot;{searchQuery}&quot;</span>
            ) : (
              <span>
                <strong className="text-blue-600">{totalResults}</strong> résultat
                {totalResults > 1 ? 's' : ''} pour &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => {
            setActiveCategory('all');
            setOpenKey(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          Toutes ({totalAll})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenKey(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label} ({cat.items.length})
          </button>
        ))}
      </div>

      {/* Results */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-slate-500 text-lg font-medium">Aucune question trouvée</p>
          <p className="text-slate-400 text-sm mt-1">
            Essayez avec d&apos;autres mots-clés ou{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              contactez-nous directement
            </a>
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredCategories.map((cat) => (
            <div key={cat.id}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.emoji}</span>
                <h2 className="text-xl font-bold text-slate-900">{cat.label}</h2>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                  {cat.items.length} question{cat.items.length > 1 ? 's' : ''}
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Items */}
              <div className="space-y-3">
                {cat.items.map((item, i) => {
                  const key = `${cat.id}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      index={i}
                      isOpen={openKey === key}
                      onToggle={() => toggle(key)}
                      searchQuery={searchQuery}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
