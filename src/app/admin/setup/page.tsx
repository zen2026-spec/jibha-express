'use client'

import { useState } from 'react'
import { Shield, CheckCircle } from 'lucide-react'

export default function AdminSetupPage() {
  const [email, setEmail] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, secretKey }),
    })
    setLoading(false)
    if (res.ok) setDone(true)
    else { const d = await res.json(); setError(d.error || 'Erreur') }
  }

  return (
    <div className="p-6 lg:p-8 max-w-md mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Configuration Admin</h1>
      </div>

      {done ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <p className="font-semibold text-green-800">Compte admin configuré !</p>
          <p className="text-sm text-green-600 mt-1">Connectez-vous avec cet email.</p>
          <a href="/connexion" className="inline-block mt-4 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700">
            Se connecter
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-6">
            Entrez l&apos;email d&apos;un compte existant et la clé secrète pour lui attribuer le rôle ADMIN.
          </p>
          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Email du compte</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Clé secrète admin</label>
              <input
                type="password"
                value={secretKey}
                onChange={e => setSecretKey(e.target.value)}
                required
                placeholder="Valeur de ADMIN_SETUP_KEY"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Traitement…' : 'Configurer comme admin'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
