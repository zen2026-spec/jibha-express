import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const userId = (session.user as { id: string }).id
  const { paymentId } = await req.json()

  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, userId, status: 'PENDING' },
  })

  if (!payment) {
    return NextResponse.json({ error: 'Paiement introuvable' }, { status: 404 })
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(payment.amount * 100),
    currency: payment.currency.toLowerCase(),
    metadata: { paymentId: payment.id, userId },
  })

  await prisma.payment.update({
    where: { id: payment.id },
    data: { stripePaymentIntentId: paymentIntent.id, stripeStatus: paymentIntent.status },
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
