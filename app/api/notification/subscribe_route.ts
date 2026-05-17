// app/api/notifications/subscribe/route.ts
// Handles push notification subscription from browser

import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const { subscription } = await req.json()

    if (!subscription?.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 })
    }

    // Save subscription to database
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys?.p256dh || "",
      auth: subscription.keys?.auth || "",
      device_type: "web"
    }, { onConflict: "user_id,endpoint" })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Push notifications enabled!" })

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
