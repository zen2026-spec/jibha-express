'use client'

import { useEffect, useState } from 'react'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  type: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  description: string | null
  paidAt: string | null
  createdAt: string
}

const statusConfig = {
  PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  PAID: { label: 'Payé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  FAILED: { label: 'Échoué', color: 'bg-red-100 text-red-700', icon: XCircle },
  REFUNDED: { label: 'Remboursé', color: 'bg-gray-100 text-gray-600', icon: XCircle },
}

const typeLabel: Record<string, string> = {
  SHIPPING: 'Expédition',
  SUBSCRIPTION: 'Abonnement',
  SERVICE: 'Service',
}

export default function PaiementsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/payments')
      .then(r => r.json())
      .then(data => { setPayments(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const totalPaid = payments
    .filter(p => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payments
    .filter(p => p.status === 'PENDING')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
        <p className="text-gray-500 text-sm mt-1">Historique de vos paiements</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <p className="text-3xl font-bold text-green-700">€{totalPaid.toFixed(2)}</p>
          <p className="text-sm text-green-600 mt-1">Total payé</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
          <p className="text-3xl font-bold text-yellow-700">€{totalPending.toFixed(2)}</p>
          <p className="text-sm text-yellow-600 mt-1">En attente</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Aucun paiement pour le moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map(p => {
                  const s = statusConfig[p.status]
                  const Icon = s.icon
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {p.description || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {typeLabel[p.type] ?? p.type}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        €{p.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${s.color}`}>
                          <Icon className="w-3 h-3" />
                          {s.label}
                        </span>
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
