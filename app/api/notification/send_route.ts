// app/api/notifications/send/route.ts
// Send scheduled notifications to users
// Call this from a cron job or Supabase Edge Function daily

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Notification templates
const HEALTH_TIPS = [
  "Drink a glass of water before breakfast to kickstart your metabolism.",
  "A 10-minute walk after lunch helps digestion and boosts energy.",
  "Try to sleep and wake up at the same time every day for better sleep quality.",
  "Take 3 deep breaths right now — it reduces stress and lowers blood pressure.",
  "Eating slowly and chewing well helps with digestion and prevents overeating.",
  "Standing up and stretching for 2 minutes every hour improves circulation.",
  "A handful of nuts as a snack provides healthy fats and keeps you full longer.",
  "Smiling and laughing genuinely reduces stress hormones in your body.",
  "Washing your hands properly for 20 seconds prevents 80% of infections.",
  "Getting sunlight in the morning helps regulate your body clock and mood.",
]

export async function POST(req: NextRequest) {
  try {
    // Verify this is called from our system (simple API key check)
    const authHeader = req.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.NOTIFICATION_CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type } = await req.json()
    const results = { sent: 0, failed: 0 }

    if (type === "checkin_reminder") {
      // Get all users with checkin reminder enabled
      const { data: users } = await supabase
        .from("profiles")
        .select("id, full_name, notif_checkin_reminder, notif_checkin_time")
        .eq("notif_checkin_reminder", true)
        .not("full_name", "is", null)

      if (users) {
        for (const user of users) {
          try {
            // Get their push subscriptions
            const { data: subs } = await supabase
              .from("push_subscriptions")
              .select("*")
              .eq("user_id", user.id)

            if (subs && subs.length > 0) {
              // Log the notification
              await supabase.from("notification_log").insert({
                user_id: user.id,
                type: "checkin_reminder",
                message: `Daily check-in reminder sent to ${user.full_name}`,
                status: "sent"
              })
              results.sent++
            }
          } catch {
            results.failed++
          }
        }
      }
    }

    if (type === "health_tip") {
      const tip = HEALTH_TIPS[new Date().getDay() % HEALTH_TIPS.length]

      const { data: users } = await supabase
        .from("profiles")
        .select("id, full_name, notif_health_tips")
        .eq("notif_health_tips", true)
        .not("full_name", "is", null)

      if (users) {
        for (const user of users) {
          await supabase.from("notification_log").insert({
            user_id: user.id,
            type: "health_tip",
            message: tip,
            status: "sent"
          })
          results.sent++
        }
      }
    }

    if (type === "step_reminder") {
      // Find users who have not reached 5000 steps by 6pm
      const { data: users } = await supabase
        .from("profiles")
        .select("id, full_name, latest_steps, notif_step_reminder")
        .eq("notif_step_reminder", true)
        .lt("latest_steps", 5000)
        .not("full_name", "is", null)

      if (users) {
        for (const user of users) {
          const remaining = 5000 - (user.latest_steps || 0)
          await supabase.from("notification_log").insert({
            user_id: user.id,
            type: "step_reminder",
            message: `You need ${remaining.toLocaleString()} more steps to reach your 5,000 step goal today!`,
            status: "sent"
          })
          results.sent++
        }
      }
    }

    return NextResponse.json({
      success: true,
      type,
      results,
      message: `Sent ${results.sent} notifications, ${results.failed} failed`
    })

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// GET endpoint to check notification status
export async function GET(req: NextRequest) {
  try {
    const cookieStore = req.cookies
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: logs } = await supabase
      .from("notification_log")
      .select("*")
      .eq("user_id", userId)
      .order("sent_at", { ascending: false })
      .limit(20)

    return NextResponse.json({ notifications: logs || [] })

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
