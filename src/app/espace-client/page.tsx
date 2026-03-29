'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Package, Clock, Truck, CheckCircle, MapPin, Copy } from 'lucide-react'

interface Pkg {
  id: string
  reference: string
  description: string
  weight: number | null
  status: 'RECEIVED' | 'READY_TO_SHIP' | 'SHIPPED' | 'DELIVERED'
  receivedAt: string
}

const statusConfig = {
  RECEIVED: { label: 'Reçu au warehouse', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  READY_TO_SHIP: { label: 'Prêt à expédier', color: 'bg-blue-100 text-blue-700', icon: Package },
  SHIPPED: { label: 'En transit', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Livré', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const user = session?.user as { name?: string; clientId?: string; plan?: string } | undefined

  useEffect(() => {
    fetch('/api/packages')
      .then(r => r.json())
      .then(data => { setPackages(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const stats = {
    total: packages.length,
    received: packages.filter(p => p.status === 'RECEIVED').length,
    shipped: packages.filter(p => p.status === 'SHIPPED').length,
    delivered: packages.filter(p => p.status === 'DELIVERED').length,
  }

  const copyAddress = async () => {
    const addr = `JibhaExpress Portugal Lda\nÀ l'attention de: ${user?.name} - ${user?.clientId}\nRua da Alfandega, 10\n1100-016 Lisboa, Portugal`
    try { await navigator.clipboard.writeText(addr) } catch { /* ignore */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Voici l&apos;état de votre compte JibhaExpress</p>
      </div>

      {/* Virtual address card */}
      <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 flex-shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Votre adresse au Portugal</p>
            <p className="text-sm text-gray-700 font-medium">
              {user?.name} — <span className="text-blue-700 font-bold">{user?.clientId}</span>
            </p>
            <p className="text-sm text-gray-500">Rua da Alfandega, 10 — 1100-016 Lisboa 🇵🇹</p>
          </div>
        </div>
        <button
          onClick={copyAddress}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
            copied ? 'border-green-500 bg-green-50 text-green-700' : 'border-blue-200 bg-white text-blue-700 hover:border-blue-400'
          }`}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total colis', value: stats.total, color: 'text-gray-900', bg: 'bg-white' },
          { label: 'Au warehouse', value: stats.received, color: 'text-yellow-700', bg: 'bg-yellow-50' },
          { label: 'En transit', value: stats.shipped, color: 'text-purple-700', bg: 'bg-purple-50' },
          { label: 'Livrés', value: stats.delivered, color: 'text-green-700', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-gray-100`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent packages */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Colis récents</h2>
          <a href="/espace-client/colis" className="text-sm text-blue-600 hover:underline">Voir tous</a>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : packages.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucun colis pour le moment.</p>
            <p className="text-gray-400 text-xs mt-1">Vos colis apparaîtront ici dès leur réception au warehouse.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {packages.slice(0, 5).map(pkg => {
              const s = statusConfig[pkg.status]
              const Icon = s.icon
              return (
                <div key={pkg.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pkg.description}</p>
                      <p className="text-xs text-gray-400">{pkg.reference}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
