import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export const STRIPE_PLANS = {
  PREMIUM: {
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    amount: 1990, // €19.90 in cents
    name: 'Premium',
  },
  BUSINESS: {
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    amount: 4990, // €49.90 in cents
    name: 'Business Premium',
  },
}
