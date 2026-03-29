import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, secretKey } = await req.json()

  if (!process.env.ADMIN_SETUP_KEY || secretKey !== process.env.ADMIN_SETUP_KEY) {
    return NextResponse.json({ error: 'Clé secrète invalide.' }, { status: 403 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Aucun compte trouvé avec cet email.' }, { status: 404 })
  }

  await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } })

  return NextResponse.json({ success: true })
}
