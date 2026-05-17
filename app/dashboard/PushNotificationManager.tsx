"use client"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

interface Props {
  userId: string
}

export default function PushNotificationManager({ userId }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkinTime, setCheckinTime] = useState("09:00")
  const [prefs, setPrefs] = useState({
    checkin_reminder: true,
    health_tips: true,
    step_reminder: true,
    family_alerts: true
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
      if (Notification.permission === "granted") {
        checkExistingSubscription()
      }
    }
    loadPreferences()
  }, [])

  async function checkExistingSubscription() {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      setSubscribed(!!sub)
    } catch {
      setSubscribed(false)
    }
  }

  async function loadPreferences() {
    const { data } = await supabase
      .from("profiles")
      .select("notif_checkin_reminder, notif_checkin_time, notif_health_tips, notif_step_reminder, notif_family_alerts")
      .eq("id", userId)
      .single()

    if (data) {
      setPrefs({
        checkin_reminder: data.notif_checkin_reminder ?? true,
        health_tips: data.notif_health_tips ?? true,
        step_reminder: data.notif_step_reminder ?? true,
        family_alerts: data.notif_family_alerts ?? true
      })
      setCheckinTime(data.notif_checkin_time || "09:00")
    }
  }

  async function enableNotifications() {
    setLoading(true)
    try {
      // Request browser permission
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result !== "granted") {
        setLoading(false)
        return
      }

      // Register service worker
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.register("/sw.js")
        await navigator.serviceWorker.ready

        // Subscribe to push
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        })

        // Save to database
        await fetch("/api/notifications/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription: sub.toJSON() })
        })

        setSubscribed(true)

        // Show welcome notification immediately
        new Notification("VellCareAI Notifications Enabled! 🎉", {
          body: "You will now receive daily health reminders and family alerts.",
          icon: "/icon-192.png",
          badge: "/icon-192.png"
        })
      }
    } catch (error) {
      console.error("Error enabling notifications:", error)
    }
    setLoading(false)
  }

  async function disableNotifications() {
    setLoading(true)
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await sub.unsubscribe()
      }
      setSubscribed(false)
    } catch (error) {
      console.error("Error disabling:", error)
    }
    setLoading(false)
  }

  async function savePreferences() {
    await supabase.from("profiles").update({
      notif_checkin_reminder: prefs.checkin_reminder,
      notif_checkin_time: checkinTime,
      notif_health_tips: prefs.health_tips,
      notif_step_reminder: prefs.step_reminder,
      notif_family_alerts: prefs.family_alerts,
      updated_at: new Date().toISOString()
    }).eq("id", userId)

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Send test notification
  function sendTestNotification() {
    if (permission === "granted") {
      new Notification("VellCareAI Health Reminder 💚", {
        body: "Good morning! Remember to log your health data and drink a glass of water.",
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: "test-notification"
      })
    }
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: value ? G : "#E5E7EB", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: value ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  )

  const NotifRow = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: () => void }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F9FAFB" }}>
      <div style={{ flex: 1, marginRight: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label}</div>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{desc}</div>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  )

  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Push Notifications</div>
      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>Stay on top of your health with daily reminders</div>

      {/* ENABLE/DISABLE BLOCK */}
      <div style={{ background: subscribed ? GL : "#F9FAFB", border: subscribed ? `1px solid ${GB}` : "1px solid #E5E7EB", borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: subscribed ? 12 : 0 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: subscribed ? G : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
            {subscribed ? "🔔" : "🔕"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: subscribed ? GD : "#374151" }}>
              {subscribed ? "Notifications Active" : "Notifications Off"}
            </div>
            <div style={{ fontSize: 12, color: subscribed ? G : "#6B7280", marginTop: 2 }}>
              {subscribed ? "You will receive daily reminders and family alerts" : "Enable to get health reminders and family alerts"}
            </div>
          </div>
        </div>

        {!subscribed ? (
          <button onClick={enableNotifications} disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 10, background: G, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Enabling..." : "🔔 Enable Notifications"}
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={sendTestNotification} style={{ flex: 1, padding: 10, borderRadius: 10, background: "#fff", border: `1px solid ${GB}`, color: GD, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Send Test
            </button>
            <button onClick={disableNotifications} disabled={loading} style={{ flex: 1, padding: 10, borderRadius: 10, background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {loading ? "..." : "Disable"}
            </button>
          </div>
        )}
      </div>

      {/* NOTIFICATION PREFERENCES */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Notification Types</div>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 14 }}>Choose which notifications you want to receive</div>

        <NotifRow
          label="Daily Check-In Reminder"
          desc="Reminder to log your health data every day"
          value={prefs.checkin_reminder}
          onChange={() => setPrefs(p => ({ ...p, checkin_reminder: !p.checkin_reminder }))}
        />

        {prefs.checkin_reminder && (
          <div style={{ padding: "10px 0", borderBottom: "1px solid #F9FAFB" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
              Reminder time
            </label>
            <input
              type="time"
              value={checkinTime}
              onChange={e => setCheckinTime(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 9, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#111827", fontSize: 14, outline: "none" }}
            />
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>
              You will be reminded at {checkinTime} every day
            </div>
          </div>
        )}

        <NotifRow
          label="Daily Health Tips"
          desc="Receive one personalised health tip every morning"
          value={prefs.health_tips}
          onChange={() => setPrefs(p => ({ ...p, health_tips: !p.health_tips }))}
        />

        <NotifRow
          label="Step Goal Reminder"
          desc="Reminder at 6pm if you have not reached 5,000 steps"
          value={prefs.step_reminder}
          onChange={() => setPrefs(p => ({ ...p, step_reminder: !p.step_reminder }))}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Family Health Alerts</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Alert when family member WellScore drops to Warning</div>
          </div>
          <Toggle value={prefs.family_alerts} onChange={() => setPrefs(p => ({ ...p, family_alerts: !p.family_alerts }))} />
        </div>
      </div>

      {/* EXAMPLE NOTIFICATIONS */}
      <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 }}>What Notifications Look Like</div>
        {[
          { time: "9:00 AM", title: "VellCareAI Daily Check-In 📋", body: "Good morning! Time to log your health data for today." },
          { time: "6:00 PM", title: "Step Goal Reminder 🚶", body: "You need 1,760 more steps to reach your 5,000 step goal today!" },
          { time: "8:00 AM", title: "Daily Health Tip 💚", body: "Drink a glass of water before breakfast to kickstart your metabolism." },
          { time: "Any time", title: "Family Alert ⚠️", body: "Mum's WellScore has dropped to Warning level. Please check on her." },
        ].map(n => (
          <div key={n.time} style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>{n.time}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{n.body}</div>
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button onClick={savePreferences} style={{ width: "100%", padding: 13, borderRadius: 12, background: saved ? "#059669" : G, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.3s" }}>
        {saved ? "✓ Preferences Saved!" : "Save Notification Preferences"}
      </button>
    </div>
  )
}
