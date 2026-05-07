import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()
    const priceId = plan === 'annual' ? process.env.STRIPE_ANNUAL_PRICE_ID! : process.env.STRIPE_MONTHLY_PRICE_ID!
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: process.env.NEXT_PUBLIC_APP_URL + '/dashboard?subscribed=true',
      cancel_url: process.env.NEXT_PUBLIC_APP_URL + '/pricing',
    })
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
