import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const userId = (session.user as { id: string }).id

  const packages = await prisma.package.findMany({
    where: { userId },
    orderBy: { receivedAt: 'desc' },
    include: { shipment: true },
  })

  return NextResponse.json(packages)
}
