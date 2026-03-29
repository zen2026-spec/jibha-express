import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const addPackageSchema = z.object({
  userId: z.string(),
  description: z.string().min(1),
  weight: z.number().optional(),
  declaredValue: z.number().optional(),
  notes: z.string().optional(),
})

function generateReference(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `JBX-${ts}-${rand}`
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if ((session?.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const packages = await prisma.package.findMany({
    orderBy: { receivedAt: 'desc' },
    include: { user: { select: { clientId: true, firstName: true, lastName: true, email: true } } },
  })

  return NextResponse.json(packages)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if ((session?.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const body = await req.json()
  const data = addPackageSchema.parse(body)

  const pkg = await prisma.package.create({
    data: {
      reference: generateReference(),
      ...data,
    },
    include: { user: { select: { clientId: true, firstName: true, lastName: true } } },
  })

  return NextResponse.json(pkg, { status: 201 })
}
