'use client'

import { useEffect, useState } from 'react'
import { CreditCard } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  type: string
  status: string
  description: string | null
  createdAt: string
  user: { clientId: string; firstName: string; lastName: string; email: string }
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
}
const typeLabels: Record<string, string> = {
  SHIPPING: 'Expédition',
  SUBSCRIPTION: 'Abonnement',
  SERVICE: 'Service',
}

export default function AdminPaiementsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/payments')
      .then(r => r.json())
      .then(d => { setPayments(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const total = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
        <p className="text-gray-500 text-sm mt-1">Total encaissé : <span className="font-bold text-green-600">€{total.toFixed(2)}</span></p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Aucun paiement enregistré.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Montant</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{p.user.firstName} {p.user.lastName}</p>
                      <p className="text-xs text-gray-400">{p.user.email}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{typeLabels[p.type] ?? p.type}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">€{p.amount.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[p.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {p.status}
                      </span>
                    </td>
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
