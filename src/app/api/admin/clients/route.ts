import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if ((session?.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const clients = await prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      clientId: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      city: true,
      plan: true,
      createdAt: true,
      _count: { select: { packages: true, payments: true } },
    },
  })

  return NextResponse.json(clients)
}
