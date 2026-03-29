'use client';

import { useState } from 'react';
import { Copy, Check, MapPin, Phone, Mail, Building, User } from 'lucide-react';

interface VirtualAddressCardProps {
  firstName: string;
  lastName: string;
  clientId: string;
}

interface AddressField {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function VirtualAddressCard({
  firstName,
  lastName,
  clientId,
}: VirtualAddressCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const addressFields: AddressField[] = [
    {
      icon: <Building className="w-4 h-4" />,
      label: 'Société',
      value: 'JibhaExpress Portugal Lda',
    },
    {
      icon: <User className="w-4 h-4" />,
      label: 'À l\'attention de',
      value: `${firstName} ${lastName} - JBX${clientId}`,
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Adresse',
      value: 'Rua da Alfandega, 10',
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Ville',
      value: '1100-016 Lisboa, Portugal',
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Téléphone',
      value: '+351 21 000 0000',
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: 'Email entrepôt',
      value: 'warehouse@jibha-express.com',
    },
  ];

  const copyField = async (fieldLabel: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldLabel);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedField(fieldLabel);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const copyAllFields = async () => {
    const fullAddress = [
      'JibhaExpress Portugal Lda',
      `À l'attention de: ${firstName} ${lastName} - JBX${clientId}`,
      'Rua da Alfandega, 10',
      '1100-016 Lisboa, Portugal',
      'Tél: +351 21 000 0000',
      'Email: warehouse@jibha-express.com',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = fullAddress;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 60%, #1e3a8a 100%)',
      }}
    >
      {/* Card header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">
              Votre Adresse Virtuelle
            </h3>
            <p className="text-blue-200 text-xs">
              Utilisez cette adresse pour vos achats en Europe
            </p>
          </div>
        </div>

        {/* Client badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-semibold">
            JBX{clientId} — {firstName} {lastName}
          </span>
        </div>
      </div>

      {/* Address fields */}
      <div className="mx-4 mb-4 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
        {addressFields.map((field, index) => (
          <div
            key={field.label}
            className={`flex items-center justify-between px-4 py-3 gap-3 ${
              index < addressFields.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="text-blue-200 mt-0.5 flex-shrink-0">{field.icon}</span>
              <div className="min-w-0">
                <p className="text-blue-200 text-xs mb-0.5">{field.label}</p>
                <p className="text-white text-sm font-medium truncate">{field.value}</p>
              </div>
            </div>
            <button
              onClick={() => copyField(field.label, field.value)}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 transition-all duration-200 group"
              title={`Copier ${field.label}`}
              aria-label={`Copier ${field.label}`}
            >
              {copiedField === field.label ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors duration-150" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Copy all button */}
      <div className="px-4 pb-6">
        <button
          onClick={copyAllFields}
          className={`w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            copiedAll
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
              : 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5'
          }`}
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4" />
              Adresse copiée !
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copier l&apos;adresse complète
            </>
          )}
        </button>

        <p className="text-blue-200/70 text-xs text-center mt-3 leading-relaxed">
          🇵🇹 Entrepôt basé à Lisbonne, Portugal
        </p>
      </div>
    </div>
  );
}
