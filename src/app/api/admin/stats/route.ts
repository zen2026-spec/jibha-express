import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if ((session?.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const [totalClients, totalPackages, pendingPackages, totalRevenue] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.package.count(),
    prisma.package.count({ where: { status: 'RECEIVED' } }),
    prisma.payment.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true },
    }),
  ])

  return NextResponse.json({
    totalClients,
    totalPackages,
    pendingPackages,
    totalRevenue: totalRevenue._sum.amount ?? 0,
  })
}
