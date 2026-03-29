'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

interface Client {
  id: string
  clientId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  plan: string
  createdAt: string
  _count: { packages: number; payments: number }
}

const planColors: Record<string, string> = {
  STANDARD: 'bg-gray-100 text-gray-600',
  PREMIUM: 'bg-blue-100 text-blue-700',
  BUSINESS: 'bg-purple-100 text-purple-700',
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/clients')
      .then(r => r.json())
      .then(d => { setClients(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = clients.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.clientId}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 text-sm mt-1">{clients.length} clients inscrits</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un client…"
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 w-full sm:w-64"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Aucun client trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Ville</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Colis</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Inscrit le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{c.firstName} {c.lastName}</p>
                      <p className="text-xs text-blue-600 font-mono">{c.clientId}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{c.email}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{c.city}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[c.plan] ?? 'bg-gray-100 text-gray-600'}`}>
                        {c.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{c._count.packages}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
