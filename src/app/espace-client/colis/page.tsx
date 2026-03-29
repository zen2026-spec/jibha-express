'use client'

import { useEffect, useState } from 'react'
import { Package, Clock, Truck, CheckCircle } from 'lucide-react'

interface Pkg {
  id: string
  reference: string
  description: string
  weight: number | null
  declaredValue: number | null
  status: 'RECEIVED' | 'READY_TO_SHIP' | 'SHIPPED' | 'DELIVERED'
  notes: string | null
  receivedAt: string
}

const statusConfig = {
  RECEIVED: { label: 'Reçu au warehouse', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  READY_TO_SHIP: { label: 'Prêt à expédier', color: 'bg-blue-100 text-blue-700', icon: Package },
  SHIPPED: { label: 'En transit', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Livré', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export default function ColisPage() {
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')

  useEffect(() => {
    fetch('/api/packages')
      .then(r => r.json())
      .then(data => { setPackages(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'ALL' ? packages : packages.filter(p => p.status === filter)

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes colis</h1>
        <p className="text-gray-500 text-sm mt-1">Suivi de tous vos colis reçus au warehouse</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: 'ALL', label: 'Tous' },
          { value: 'RECEIVED', label: 'Au warehouse' },
          { value: 'READY_TO_SHIP', label: 'Prêts' },
          { value: 'SHIPPED', label: 'En transit' },
          { value: 'DELIVERED', label: 'Livrés' },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Aucun colis trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Référence</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Poids</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Valeur</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reçu le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(pkg => {
                  const s = statusConfig[pkg.status]
                  const Icon = s.icon
                  return (
                    <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-blue-700 font-medium">{pkg.reference}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{pkg.description}</p>
                        {pkg.notes && <p className="text-xs text-gray-400 mt-0.5">{pkg.notes}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {pkg.weight ? `${pkg.weight} kg` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {pkg.declaredValue ? `€${pkg.declaredValue}` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${s.color}`}>
                          <Icon className="w-3 h-3" />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(pkg.receivedAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
