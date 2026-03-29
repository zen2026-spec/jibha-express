'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Package, CreditCard, Home, LogOut, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/espace-client', label: 'Vue d\'ensemble', icon: Home, exact: true },
  { href: '/espace-client/colis', label: 'Mes colis', icon: Package, exact: false },
  { href: '/espace-client/paiements', label: 'Paiements', icon: CreditCard, exact: false },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const user = session?.user as { name?: string; email?: string; clientId?: string; plan?: string } | undefined

  const planBadge: Record<string, { label: string; color: string }> = {
    STANDARD: { label: 'Standard', color: 'bg-gray-100 text-gray-600' },
    PREMIUM: { label: 'Premium', color: 'bg-blue-100 text-blue-700' },
    BUSINESS: { label: 'Business', color: 'bg-purple-100 text-purple-700' },
  }
  const plan = planBadge[user?.plan ?? 'STANDARD'] ?? planBadge.STANDARD

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-gray-100 fixed top-0 left-0 h-full z-30">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}>
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Jibha<span className="text-blue-600">Express</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100">
              <User className="w-4 h-4 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.clientId}</p>
            </div>
          </div>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${plan.color}`}>
            Plan {plan.label}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}>
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm">Jibha<span className="text-blue-600">Express</span></span>
        </Link>
        <button onClick={() => setMobileOpen(v => !v)} className="p-2 rounded-lg hover:bg-gray-100">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-white pt-16">
          <nav className="p-4 space-y-1">
            {navItems.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
