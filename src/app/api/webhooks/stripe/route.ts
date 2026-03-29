import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalide' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object
    await prisma.payment.updateMany({
      where: { stripePaymentIntentId: intent.id },
      data: { status: 'PAID', stripeStatus: 'succeeded', paidAt: new Date() },
    })
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object
    await prisma.payment.updateMany({
      where: { stripePaymentIntentId: intent.id },
      data: { status: 'FAILED', stripeStatus: 'failed' },
    })
  }

  return NextResponse.json({ received: true })
}
