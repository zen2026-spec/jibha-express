'use client'

import { useEffect, useState } from 'react'
import { Users, Package, Clock, TrendingUp } from 'lucide-react'

interface Stats {
  totalClients: number
  totalPackages: number
  pendingPackages: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const cards = [
    { label: 'Clients inscrits', value: stats?.totalClients ?? '—', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total colis', value: stats?.totalPackages ?? '—', icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'En attente d\'expédition', value: stats?.pendingPackages ?? '—', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Revenus encaissés', value: stats ? `€${stats.totalRevenue.toFixed(2)}` : '—', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de JibhaExpress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <a href="/admin/colis" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700 transition-colors">
              <Package className="w-4 h-4 text-gray-400" />
              Ajouter un colis reçu
            </a>
            <a href="/admin/clients" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700 transition-colors">
              <Users className="w-4 h-4 text-gray-400" />
              Voir tous les clients
            </a>
            <a href="/admin/paiements" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700 transition-colors">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              Gérer les paiements
            </a>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-2">Liens utiles</h2>
          <p className="text-sm text-gray-400 mb-4">Raccourcis vers les sections importantes</p>
          <div className="space-y-2 text-sm">
            <a href="/" className="flex items-center gap-2 text-blue-600 hover:underline">→ Voir le site public</a>
            <a href="/admin/setup" className="flex items-center gap-2 text-blue-600 hover:underline">→ Configurer un compte admin</a>
          </div>
        </div>
      </div>
    </div>
  )
}
