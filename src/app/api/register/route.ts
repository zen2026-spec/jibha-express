import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  city: z.string().min(1),
  password: z.string().min(8),
})

function generateClientId(): string {
  const digits = Math.floor(10000 + Math.random() * 90000)
  return `JBX${digits}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(data.password, 12)

    // Generate unique clientId
    let clientId = generateClientId()
    let attempts = 0
    while (await prisma.user.findUnique({ where: { clientId } })) {
      clientId = generateClientId()
      if (++attempts > 10) throw new Error('Could not generate unique clientId')
    }

    const user = await prisma.user.create({
      data: {
        clientId,
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        city: data.city,
      },
    })

    return NextResponse.json({
      id: user.id,
      clientId: user.clientId,
      email: user.email,
      firstName: user.firstName,
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })
    }
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
