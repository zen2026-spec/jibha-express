'use client'

import { useEffect, useState } from 'react'
import { Package, Plus, X } from 'lucide-react'

interface Client { id: string; clientId: string; firstName: string; lastName: string }
interface Pkg {
  id: string
  reference: string
  description: string
  weight: number | null
  declaredValue: number | null
  status: string
  receivedAt: string
  user: { clientId: string; firstName: string; lastName: string }
}

const statuses = ['RECEIVED', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED']
const statusLabels: Record<string, string> = {
  RECEIVED: 'Reçu',
  READY_TO_SHIP: 'Prêt',
  SHIPPED: 'En transit',
  DELIVERED: 'Livré',
}
const statusColors: Record<string, string> = {
  RECEIVED: 'bg-yellow-100 text-yellow-700',
  READY_TO_SHIP: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
}

export default function AdminColisPage() {
  const [packages, setPackages] = useState<Pkg[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ userId: '', description: '', weight: '', declaredValue: '', notes: '' })
  const [error, setError] = useState('')

  const load = () => {
    fetch('/api/admin/packages').then(r => r.json()).then(d => setPackages(Array.isArray(d) ? d : []))
    fetch('/api/admin/clients').then(r => r.json()).then(d => setClients(Array.isArray(d) ? d : []))
  }
  useEffect(load, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.userId || !form.description) { setError('Client et description requis.'); return }
    setSubmitting(true); setError('')
    const res = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: form.userId,
        description: form.description,
        weight: form.weight ? parseFloat(form.weight) : undefined,
        declaredValue: form.declaredValue ? parseFloat(form.declaredValue) : undefined,
        notes: form.notes || undefined,
      }),
    })
    setSubmitting(false)
    if (res.ok) { setShowForm(false); setForm({ userId: '', description: '', weight: '', declaredValue: '', notes: '' }); load() }
    else { const d = await res.json(); setError(d.error || 'Erreur') }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/packages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colis</h1>
          <p className="text-gray-500 text-sm mt-1">{packages.length} colis enregistrés</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un colis
        </button>
      </div>

      {/* Add package modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Nouveau colis</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Client *</label>
                <select
                  value={form.userId}
                  onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.clientId})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Description *</label>
                <input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Ex: Chaussures Nike, téléphone..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Poids (kg)</label>
                  <input type="number" step="0.1" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Valeur (€)</label>
                  <input type="number" step="0.01" value={form.declaredValue} onChange={e => setForm(f => ({ ...f, declaredValue: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Notes</label>
                <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes optionnelles" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Annuler</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
                  {submitting ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {packages.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Aucun colis enregistré.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Référence</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Poids</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Reçu le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm font-mono text-blue-700">{pkg.reference}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {pkg.user.firstName} {pkg.user.lastName}
                      <span className="block text-xs text-gray-400">{pkg.user.clientId}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-900">{pkg.description}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{pkg.weight ? `${pkg.weight} kg` : '—'}</td>
                    <td className="px-5 py-4">
                      <select
                        value={pkg.status}
                        onChange={e => updateStatus(pkg.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer ${statusColors[pkg.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{new Date(pkg.receivedAt).toLocaleDateString('fr-FR')}</td>
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
