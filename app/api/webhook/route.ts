import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const plan = session.metadata?.plan
    if (userId && plan) {
      await supabase.from("profiles").update({
        subscription_plan: plan,
        stripe_customer_id: session.customer as string,
        updated_at: new Date().toISOString()
      }).eq("id", userId)
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription
    const { data } = await supabase.from("profiles").select("id").eq("stripe_customer_id", sub.customer as string).single()
    if (data) {
      await supabase.from("profiles").update({ subscription_plan: "free", updated_at: new Date().toISOString() }).eq("id", data.id)
    }
  }

  return NextResponse.json({ received: true })
}
