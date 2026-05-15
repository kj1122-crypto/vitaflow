"use client"
import { useState, useEffect, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import AiCoach from "./AiCoach"
import HealthLogModal from "./HealthLogModal"
import type { HealthEntry } from "./HealthLogModal"

const G = "#10B981", GL = "#D1FAE5", GB = "#6EE7B7", GD = "#065F46"
const RED = "#EF4444", BLUE = "#2196F3", PURPLE = "#7C4DFF", GOLD = "#F59E0B"

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #E5E7EB",
  borderRadius: 14, padding: 16, marginBottom: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
}
const cardGreen: React.CSSProperties = { ...card, background: GL, border: `1px solid ${GB}` }

// ── WELLSCORE STATUS ─────────────────────────────────────────
function getStatus(score: number) {
  if (score >= 75) return { label: "Good", color: G, bg: GL, border: GB }
  if (score >= 50) return { label: "Monitor", color: GOLD, bg: "#FFFBEB", border: "#FCD34D" }
  return { label: "Warning", color: RED, bg: "#FEF2F2", border: "#FCA5A5" }
}

// ── FAMILY TAB ───────────────────────────────────────────────
function FamilyTab({ userId }: { userId: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [family, setFamily] = useState<any[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [inviteLink, setInviteLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadFamily()
    generateInviteLink()
  }, [])

  async function loadFamily() {
    const { data } = await supabase
      .from("family_health_view")
      .select("*")
      .eq("user_id", userId)
    setFamily(data || [])
    setLoading(false)
  }

  async function generateInviteLink() {
    const { data: profile } = await supabase
      .from("profiles")
      .select("referral_code")
      .eq("id", userId)
      .single()
    if (profile?.referral_code) {
      setInviteLink(`https://vellcareai.com/signup?family=${profile.referral_code}`)
    }
  }

  function copyInvite() {
    navigator.clipboard.writeText(inviteLink).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>Loading family data...</div>
  )

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Family Health</div>

      {/* ALERT for Warning members */}
      {family.filter(m => getStatus(m.well_score || 0).label === "Warning").map(m => (
        <div key={m.member_id} style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: RED, marginBottom: 3 }}>⚠ Alert — {m.full_name} needs attention</div>
          <div style={{ fontSize: 12, color: "#991B1B", marginBottom: 8, lineHeight: 1.6 }}>
            WellScore is {m.well_score || 0} — health needs monitoring.
            {m.heart_rate && m.heart_rate > 90 ? ` Heart rate elevated at ${m.heart_rate} BPM.` : ""}
          </div>
          <button style={{ padding: "6px 14px", borderRadius: 8, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📞 Call Now</button>
        </div>
      ))}

      {/* FAMILY MEMBERS */}
      {family.length > 0 ? (
        <div style={card}>
          {family.map((m, idx) => {
            const status = getStatus(m.well_score || 0)
            const lastUpdated = m.health_updated_at
              ? new Date(m.health_updated_at).toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })
              : "No data yet"
            return (
              <div key={m.member_id}>
                <div onClick={() => setExpanded(expanded === m.member_id ? null : m.member_id)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: idx < family.length - 1 ? "1px solid #F9FAFB" : "none", cursor: "pointer" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: status.bg, border: `2px solid ${status.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17, color: status.color, flexShrink: 0 }}>
                    {m.well_score || "—"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{m.full_name}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                      {m.age ? `Age ${m.age} · ` : ""}Updated {lastUpdated}
                    </div>
                  </div>
                  <div style={{ padding: "4px 12px", borderRadius: 20, background: status.bg, color: status.color, fontSize: 12, fontWeight: 600, border: `1px solid ${status.border}` }}>
                    {status.label}
                  </div>
                </div>
                {expanded === m.member_id && (
                  <div style={{ paddingBottom: 12, paddingTop: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                      {[
                        { l: "Heart Rate", v: m.heart_rate ? `${m.heart_rate} BPM` : "—", c: RED, bg: "#FEF2F2" },
                        { l: "Steps Today", v: m.steps ? m.steps.toLocaleString() : "—", c: BLUE, bg: "#EFF6FF" },
                        { l: "Sleep", v: m.sleep_hours ? `${m.sleep_hours}h` : "—", c: PURPLE, bg: "#F5F3FF" }
                      ].map(mt => (
                        <div key={mt.l} style={{ background: mt.bg, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: mt.c }}>{mt.v}</div>
                          <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{mt.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["📞 Call", "💬 Message", "📊 History"].map(a => (
                        <button key={a} style={{ flex: 1, padding: 9, borderRadius: 9, background: a.includes("Call") ? G : a.includes("Message") ? GL : "#F9FAFB", border: a.includes("Message") ? `1px solid ${GB}` : "1px solid #E5E7EB", color: a.includes("Call") ? "#fff" : a.includes("Message") ? GD : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{a}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div style={{ ...card, textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍👩‍👧</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>No family connected yet</div>
          <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 24, lineHeight: 1.6, maxWidth: 280, margin: "0 auto 24px" }}>
            Invite your parents, grandparents or spouse to join your family health circle.
          </div>
          <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px", border: "1px solid #E5E7EB", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ flex: 1, fontSize: 12, color: "#6B7280", fontFamily: "monospace", wordBreak: "break-all" as const }}>{inviteLink || "Generating your invite link..."}</span>
          </div>
          <button onClick={copyInvite} style={{ width: "100%", padding: 12, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✓ Link Copied!" : "📋 Copy Invite Link"}
          </button>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 10 }}>Share this link with your family members so they can join</div>
        </div>
      )}

      {/* INVITE SECTION — always show if has family */}
      {family.length > 0 && (
        <div style={{ background: GD, borderRadius: 14, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Add more family members</div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", wordBreak: "break-all" as const }}>{inviteLink}</span>
          </div>
          <button onClick={copyInvite} style={{ width: "100%", padding: 10, borderRadius: 10, background: "#fff", border: "none", color: GD, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✓ Copied!" : "📋 Copy Invite Link"}
          </button>
        </div>
      )}
    </div>
  )
}

// ── DEVICES TAB ──────────────────────────────────────────────
function DevicesTab() {
  const [connected, setConnected] = useState(["Manual Input"])
  const devices = [
    { name: "Apple Health", desc: "iPhone and Apple Watch sync", icon: "🍎", comingSoon: true },
    { name: "Samsung Health", desc: "Galaxy Watch and Samsung phone", icon: "📱", comingSoon: true },
    { name: "Google Fit", desc: "Android health data", icon: "🔵", comingSoon: true },
    { name: "Garmin", desc: "All Garmin wearables", icon: "⌚", comingSoon: true },
    { name: "Fitbit", desc: "All Fitbit devices", icon: "💪", comingSoon: true },
    { name: "Huawei Health", desc: "Huawei Band and Watch", icon: "📲", comingSoon: true },
    { name: "Whoop", desc: "Whoop band", icon: "⚡", comingSoon: true },
    { name: "Oura Ring", desc: "Oura smart ring", icon: "💍", comingSoon: true },
    { name: "Manual Input", desc: "Enter health data manually", icon: "✍️", comingSoon: false },
  ]

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Connect Devices</div>
      <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 14 }}>Link your health apps and wearables to sync data automatically</div>

      <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>📱 Device sync coming soon</div>
        <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>Automatic device sync requires our mobile app. Download from Google Play Store when available. For now use Manual Input to log your health data.</div>
      </div>

      <div style={card}>
        {devices.map((d, i) => {
          const isConn = connected.includes(d.name)
          return (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: i < devices.length - 1 ? "1px solid #F9FAFB" : "none", opacity: d.comingSoon ? 0.6 : 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: isConn ? GL : "#F3F4F6", border: isConn ? `1px solid ${GB}` : "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{d.comingSoon ? "Coming soon with mobile app" : d.desc}</div>
              </div>
              {d.comingSoon ? (
                <div style={{ padding: "5px 10px", borderRadius: 8, background: "#F3F4F6", color: "#9CA3AF", fontSize: 11, fontWeight: 600 }}>Soon</div>
              ) : (
                <div style={{ padding: "5px 10px", borderRadius: 8, background: GL, border: `1px solid ${GB}`, color: GD, fontSize: 11, fontWeight: 600 }}>Active</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── COMMUNITY TAB ────────────────────────────────────────────
function CommunityTab({ userId, userSteps }: { userId: string; userSteps: number }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [leaders, setLeaders] = useState<any[]>([])
  const [referralCode, setReferralCode] = useState("")
  const [referralCount, setReferralCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [copied, setCopied] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const STEPS_GOAL = 5000
  const REF_GOAL = 10
  const STREAK_GOAL = 7

  useEffect(() => {
    loadData()
  }, [userSteps])

  async function loadData() {
    // Load leaderboard
    const { data: lb } = await supabase
      .from("community_leaderboard")
      .select("*")
      .limit(10)
    setLeaders(lb || [])

    // Load profile for referral code and streak
    const { data: profile } = await supabase
      .from("profiles")
      .select("referral_code, checkin_streak, last_checkin")
      .eq("id", userId)
      .single()

    if (profile) {
      setReferralCode(profile.referral_code || "")
      setStreak(profile.checkin_streak || 0)
      // Check if already checked in today
      const today = new Date().toISOString().split("T")[0]
      if (profile.last_checkin === today) setCheckedIn(true)
    }

    // Load referral count
    const { data: refs } = await supabase
      .from("referrals")
      .select("id")
      .eq("referrer_id", userId)
      .eq("status", "active")
    setReferralCount(refs?.length || 0)

    setLoading(false)
  }

  async function handleCheckin() {
    const today = new Date().toISOString().split("T")[0]
    const newStreak = streak + 1

    await supabase.from("profiles").update({
      checkin_streak: newStreak,
      last_checkin: today,
      updated_at: new Date().toISOString()
    }).eq("id", userId)

    await supabase.from("checkins").upsert({
      user_id: userId,
      checkin_date: today,
      steps: userSteps
    })

    setStreak(newStreak)
    setCheckedIn(true)
  }

  function copyLink() {
    const link = `https://vellcareai.com/signup?ref=${referralCode}`
    navigator.clipboard.writeText(link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pct = (v: number, g: number) => Math.min(Math.round(v / g * 100), 100)
  const totalPct = Math.round(((referralCount >= REF_GOAL ? 1 : 0) + (streak >= STREAK_GOAL ? 1 : 0) + (userSteps >= STEPS_GOAL ? 1 : 0)) / 3 * 100)

  // Find user's position in leaderboard
  const userRank = leaders.findIndex(l => l.id === userId) + 1

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: 1.5, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>VCAI Community</div>
      </div>

      {/* LEADERBOARD */}
      <div style={{ background: "#0A0A0A", borderRadius: 16, padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 }}>Weekly Challenge</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Step King of the Week</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>Top 3 win real prizes every Sunday</div>
          </div>
          <div style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 20, padding: "4px 10px", fontSize: 10, color: G, fontWeight: 700 }}>LIVE</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ pos: "1st", prize: "RM 50", sub: "Grab", c: GOLD }, { pos: "2nd", prize: "RM 30", sub: "TnG", c: "#9CA3AF" }, { pos: "3rd", prize: "RM 20", sub: "McDs", c: "#CD7F32" }].map(p => (
            <div key={p.pos} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, color: p.c, fontWeight: 700, marginBottom: 3 }}>{p.pos}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.c }}>{p.prize}</div>
              <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{p.sub}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "#555", fontSize: 13, padding: 20 }}>Loading leaderboard...</div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>No entries yet today</div>
            <div style={{ fontSize: 11, color: "#444" }}>Log your steps to appear on the leaderboard!</div>
          </div>
        ) : (
          leaders.slice(0, 5).map((u, i) => {
            const isUser = u.id === userId
            const rankColors = [GOLD, "#9CA3AF", "#CD7F32"]
            return (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width: 22, textAlign: "center", fontSize: 13, fontWeight: 700, color: i < 3 ? rankColors[i] : "#555" }}>{i + 1}</div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: isUser ? G : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: isUser ? "#fff" : "#888" }}>
                  {(u.full_name || "?").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: isUser ? 700 : 500, color: isUser ? G : "#ccc" }}>
                    {isUser ? "You" : u.full_name?.split(" ")[0] || "User"}
                  </div>
                  <div style={{ fontSize: 11, color: "#555" }}>{(u.steps_today || 0).toLocaleString()} steps</div>
                </div>
                {i < 3 && <div style={{ fontSize: 11, color: rankColors[i], fontWeight: 600 }}>{["RM 50", "RM 30", "RM 20"][i]}</div>}
              </div>
            )
          })
        )}

        {userRank === 0 && userSteps > 0 && (
          <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(16,185,129,0.08)", borderRadius: 8, fontSize: 12, color: G }}>
            You are not on the leaderboard yet. Log your steps daily to appear!
          </div>
        )}
      </div>

      {/* REFERRAL PROGRAM */}
      <div style={cardGreen}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Referral Reward Program</div>
        <div style={{ fontSize: 12, color: GD, marginBottom: 16, lineHeight: 1.6 }}>Complete all 3 missions to earn a <strong>RM 50 Aeon or KFC voucher</strong>!</div>

        {/* MISSION 1 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Mission 1 — Invite 10 Friends</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: referralCount >= REF_GOAL ? G : GOLD }}>{referralCount}/{REF_GOAL}</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", background: referralCount >= REF_GOAL ? G : GOLD, width: pct(referralCount, REF_GOAL) + "%", borderRadius: 3, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>Friend must be active for 7 days before referral counts</div>
          <div onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", borderRadius: 8, padding: "8px 10px", border: "1px solid #E5E7EB", cursor: "pointer", marginBottom: 8 }}>
            <span style={{ flex: 1, fontSize: 11, color: "#6B7280", fontFamily: "monospace", wordBreak: "break-all" as const }}>
              vellcareai.com/signup?ref={referralCode || "loading..."}
            </span>
            <span style={{ fontSize: 12, color: G, fontWeight: 700, flexShrink: 0 }}>{copied ? "Copied!" : "Copy"}</span>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 18, borderRadius: 4, background: i < referralCount ? G : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: i < referralCount ? "#fff" : "#9CA3AF", fontWeight: 700 }}>
                {i < referralCount ? "✓" : String(i + 1)}
              </div>
            ))}
          </div>
        </div>

        {/* MISSION 2 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Mission 2 — 7-Day Check-In</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: streak >= STREAK_GOAL ? G : GOLD }}>{streak}/{STREAK_GOAL} days</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", background: streak >= STREAK_GOAL ? G : GOLD, width: pct(streak, STREAK_GOAL) + "%", borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 26, borderRadius: 6, background: i < streak ? G : "#F3F4F6", marginBottom: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: i < streak ? "#fff" : "#9CA3AF", fontWeight: 600 }}>
                  {i < streak ? "✓" : ""}
                </div>
                <div style={{ fontSize: 9, color: "#9CA3AF" }}>{d}</div>
              </div>
            ))}
          </div>
          {!checkedIn ? (
            <button onClick={handleCheckin} style={{ width: "100%", padding: 8, borderRadius: 8, background: G, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Check In Today
            </button>
          ) : (
            <div style={{ textAlign: "center", fontSize: 12, color: G, fontWeight: 700 }}>✓ Checked in today! Streak: {streak} days</div>
          )}
        </div>

        {/* MISSION 3 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Mission 3 — Walk 5,000 Steps</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: userSteps >= STEPS_GOAL ? G : GOLD }}>{userSteps.toLocaleString()}/{STEPS_GOAL.toLocaleString()}</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", background: userSteps >= STEPS_GOAL ? G : GOLD, width: pct(userSteps, STEPS_GOAL) + "%", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>
            {userSteps === 0 ? "Log your steps today using the Health tab" : `You have walked ${userSteps.toLocaleString()} steps today!`}
          </div>
        </div>

        {/* REWARD */}
        <div style={{ background: GD, borderRadius: 12, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Complete all 3 to unlock</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 8 }}>
            {["RM 50 Aeon Voucher", "RM 50 KFC Voucher", "VCAI Elite Badge"].map(r => (
              <div key={r} style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.1)", fontSize: 11, color: "#6EE7B7" }}>{r}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Overall progress: {totalPct}% complete</div>
        </div>
      </div>

      {/* MOTIVATION */}
      <div style={cardGreen}>
        <div style={{ fontSize: 10, color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 6 }}>Daily Motivation</div>
        <div style={{ fontSize: 14, color: GD, lineHeight: 1.7, fontStyle: "italic" }}>"Every step you take today is an investment in your future self. A 10-minute walk now is worth more than any medicine later."</div>
        <div style={{ fontSize: 11, color: G, fontWeight: 600, marginTop: 8 }}>— VellCare AI Daily Motivation</div>
      </div>
    </div>
  )
}

// ── PLANS TAB ────────────────────────────────────────────────
function PlansTab({ plan }: { plan: string }) {
  async function subscribe(p: string) {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: p })
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 4 }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>VellCareAI Plans</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>Simple pricing. Cancel anytime.</div>
      </div>

      {plan !== "free" && (
        <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>✓ You are on {plan.charAt(0).toUpperCase() + plan.slice(1)} plan</div>
          <div style={{ fontSize: 12, color: G, marginTop: 4 }}>Thank you for supporting VellCareAI!</div>
        </div>
      )}

      <div style={card}>
        <div style={{ display: "inline-block", background: "#F3F4F6", color: "#6B7280", fontSize: 10, padding: "2px 8px", borderRadius: 20, marginBottom: 8, fontWeight: 700 }}>FREE FOREVER</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>Starter</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>No credit card needed</div></div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>RM 0</div>
        </div>
        {["3 AI Coach messages per day", "3 meal advice per day", "Manual health data logging", "WellScore dashboard", "SOS family alert button", "Basic community access"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#6B7280", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: G, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
      </div>

      <div style={{ ...card, border: `1.5px solid ${G}` }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div style={{ background: GL, color: GD, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>MONTHLY</div>
          <div style={{ background: "#FEF2F2", color: RED, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>Most Popular</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Monthly</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>Unlimited everything</div></div>
          <div style={{ textAlign: "right" as const }}><div style={{ fontSize: 24, fontWeight: 700 }}>RM 9.90</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>USD 2.99/month</div></div>
        </div>
        {["UNLIMITED AI Health Coach", "UNLIMITED meal planning", "Family monitoring dashboard", "SOS WhatsApp and SMS alerts", "Community challenges and prizes", "Referral reward program", "1 month health history"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#374151", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: G, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <button onClick={() => subscribe("monthly")} style={{ width: "100%", padding: 12, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>
          Start 7-Day Free Trial
        </button>
      </div>

      <div style={{ ...card, border: "1.5px solid #2196F3" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>ANNUAL</div>
          <div style={{ background: "#EAF3DE", color: "#3B6D11", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>Save 58%</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Annual</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>RM 99/year</div></div>
          <div style={{ textAlign: "right" as const }}><div style={{ fontSize: 24, fontWeight: 700 }}>RM 8.25</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>per month</div></div>
        </div>
        {["Everything in Pro Monthly", "VIP badge", "3 months history", "Gym discounts", "Early features"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#374151", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: BLUE, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <button onClick={() => subscribe("annual")} style={{ width: "100%", padding: 12, borderRadius: 12, background: BLUE, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>
          Start 7-Day Free Trial
        </button>
      </div>

      <div style={{ background: "#0A0A0A", border: `1.5px solid ${G}`, borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ background: G, color: "#fff", fontSize: 10, padding: "2px 10px", borderRadius: 20, fontWeight: 700, display: "inline-block", marginBottom: 12 }}>PLATINUM ELITE</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Concierge Health Program</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ l: "Monthly", rm: "RM 299" }, { l: "Quarterly", rm: "RM 799" }, { l: "Annual", rm: "RM 2,499" }].map(p => (
            <div key={p.l} style={{ background: "rgba(16,185,129,0.1)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 3 }}>{p.l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: G }}>{p.rm}</div>
            </div>
          ))}
        </div>
        {["Private 1-on-1 health coach", "Blood test AI analysis", "VellCare Watch gifted", "VIP health events", "24/7 concierge hotline", "Family plan 10 members"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 7, display: "flex", gap: 8 }}><span style={{ color: G, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <a href="mailto:hello@vellcareai.com?subject=Platinum Elite Enquiry" style={{ display: "block", width: "100%", padding: 14, borderRadius: 12, background: `linear-gradient(135deg,${G},#059669)`, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 14, textAlign: "center", textDecoration: "none" }}>
          Apply for Platinum Elite
        </a>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [healthData, setHealthData] = useState<Partial<HealthEntry>>({})
  const [tab, setTab] = useState("home")
  const [sosOpen, setSosOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/login"); return }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    const profile = data || {
      id: user.id,
      full_name: user.email?.split("@")[0] || "Member",
      subscription_plan: "free",
      latest_well_score: 0,
      latest_steps: 0
    }

    setProfile(profile)

    // Load today's health data
    const today = new Date().toISOString().split("T")[0]
    const { data: hd } = await supabase
      .from("health_data")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (hd) {
      setHealthData({
        steps: hd.steps,
        heart_rate: hd.heart_rate,
        sleep_hours: hd.sleep_hours,
        weight: hd.weight,
        spo2: hd.spo2,
        calories: hd.calories,
        water_glasses: hd.water_glasses,
        stress_level: hd.stress_level,
        well_score: profile.latest_well_score
      })
    }
  }

  function handleHealthSaved(data: HealthEntry) {
    setHealthData(data)
    setProfile((p: any) => ({ ...p, latest_well_score: data.well_score, latest_steps: data.steps }))
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!profile) return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, color: G, fontWeight: 700, marginBottom: 8 }}>VellCareAI</div>
        <div style={{ color: "#9CA3AF", fontSize: 13 }}>Loading your health dashboard...</div>
      </div>
    </div>
  )

  const name = (profile.full_name || "Member").split(" ")[0]
  const wellScore = healthData.well_score ?? profile.latest_well_score ?? 0
  const steps = healthData.steps ?? profile.latest_steps ?? 0
  const hasData = wellScore > 0 || steps > 0

  const status = getStatus(wellScore)

  const nb = (t: string): React.CSSProperties => ({
    flex: 1, padding: "9px 2px", background: "none", border: "none",
    borderBottom: tab === t ? `2px solid ${G}` : "2px solid transparent",
    color: tab === t ? G : "#9CA3AF",
    fontSize: 9, cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    textTransform: "uppercase", letterSpacing: 0.5,
  })

  const tabs = [
    { id: "home", icon: "🏠", label: "Health" },
    { id: "ai", icon: "🧠", label: "AI Coach" },
    { id: "family", icon: "👨‍👩‍👧", label: "Family" },
    { id: "devices", icon: "⌚", label: "Devices" },
    { id: "community", icon: "🏆", label: "Community" },
    { id: "plans", icon: "💳", label: "Plans" },
  ]

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", color: "#111827", overflowX: "hidden", width: "100%" }}>

      {/* SOS MODAL */}
      {sosOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 380, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🆘</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: RED, marginBottom: 8 }}>SOS Alert Sent!</div>
            <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>Your family members have been notified via WhatsApp and SMS.</div>
            <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "left" as const }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GD, marginBottom: 6 }}>Alerts sent to your family</div>
              <div style={{ fontSize: 13, color: GD }}>All connected family members notified</div>
            </div>
            <button onClick={() => setSosOpen(false)} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>I am OK — Cancel Alert</button>
            <button onClick={() => setSosOpen(false)} style={{ width: "100%", padding: 10, borderRadius: 12, background: "none", border: "none", color: "#9CA3AF", fontSize: 13, cursor: "pointer" }}>Keep alert active</button>
          </div>
        </div>
      )}

      {/* HEALTH LOG MODAL */}
      {logOpen && (
        <HealthLogModal
          userId={profile.id}
          onSaved={handleHealthSaved}
          onClose={() => setLogOpen(false)}
        />
      )}

      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 8px", background: "#fff", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>V</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>VellCare<span style={{ color: G }}>AI</span></div>
              <div style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSosOpen(true)} style={{ padding: "6px 14px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5", color: RED, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🆘 SOS</button>
            <button onClick={logout} style={{ padding: "6px 10px", borderRadius: 8, background: "none", border: "1px solid #E5E7EB", color: "#9CA3AF", fontSize: 11, cursor: "pointer" }}>Sign out</button>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ display: "flex", padding: "0 4px", background: "#fff", borderBottom: "1px solid #F3F4F6", position: "sticky", top: 0, zIndex: 100 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={nb(t.id)}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: 16 }}>

          {/* HOME TAB */}
          {tab === "home" && (
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{new Date().toDateString()}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Good morning, <span style={{ color: G }}>{name}</span> 👋</div>

              {/* NO DATA STATE */}
              {!hasData && (
                <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 14, padding: 20, marginBottom: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>Log your first health data!</div>
                  <div style={{ fontSize: 13, color: "#92400E", marginBottom: 16, lineHeight: 1.6 }}>Enter your health information to see your personalised WellScore and get AI health insights.</div>
                  <button onClick={() => setLogOpen(true)} style={{ padding: "12px 24px", borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Log Today Health Data +
                  </button>
                </div>
              )}

              {/* SCORE CARDS */}
              {hasData && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    <div style={{ background: status.bg, border: `1px solid ${status.border}`, borderRadius: 16, padding: "18px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: status.color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 6 }}>WellScore</div>
                      <div style={{ fontSize: 52, fontWeight: 700, color: status.color === G ? GD : status.color, lineHeight: 1 }}>{wellScore}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: status.color, marginTop: 6 }}>{status.label}</div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>
                        {status.label === "Good" ? "Your health looks great!" : status.label === "Monitor" ? "Keep an eye on your health" : "Please take care of yourself"}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ ...card, marginBottom: 0, textAlign: "center", padding: "12px 10px" }}>
                        <div style={{ fontSize: 9, color: G, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 }}>Steps Today</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: BLUE }}>{steps.toLocaleString()}</div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>of 5,000 goal</div>
                      </div>
                      <div style={{ ...card, marginBottom: 0, textAlign: "center", padding: "12px 10px" }}>
                        <div style={{ fontSize: 9, color: RED, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 }}>Heart Rate</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: RED }}>{healthData.heart_rate || "—"}</div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>BPM</div>
                      </div>
                    </div>
                  </div>

                  {/* AI MESSAGE */}
                  <div style={cardGreen}>
                    <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, marginBottom: 6 }}>AI Health Summary</div>
                    <div style={{ fontSize: 14, color: GD, lineHeight: 1.7 }}>
                      {wellScore >= 75
                        ? `Your WellScore is ${wellScore} — great job! Keep up your healthy habits today.`
                        : wellScore >= 50
                          ? `Your WellScore is ${wellScore}. Focus on improving your sleep and increasing your daily steps.`
                          : `Your WellScore is ${wellScore}. Please make sure to rest well, drink plenty of water, and take a short walk.`
                      }
                      {healthData.sleep_hours ? ` You slept ${healthData.sleep_hours} hours last night.` : ""}
                    </div>
                  </div>

                  {/* METRICS GRID */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                    {[
                      { l: "Sleep", v: healthData.sleep_hours ? `${healthData.sleep_hours}h` : "—", c: PURPLE, bg: "#F5F3FF" },
                      { l: "Calories", v: healthData.calories ? healthData.calories.toLocaleString() : "—", c: GOLD, bg: "#FFFBEB" },
                      { l: "SpO2", v: healthData.spo2 ? `${healthData.spo2}%` : "—", c: G, bg: GL },
                      { l: "Weight", v: healthData.weight ? `${healthData.weight}kg` : "—", c: "#FF6B35", bg: "#FFF7ED" },
                      { l: "Water", v: healthData.water_glasses ? `${healthData.water_glasses}/8` : "—", c: BLUE, bg: "#EFF6FF" },
                      { l: "Stress", v: healthData.stress_level || "—", c: G, bg: GL },
                    ].map(m => (
                      <div key={m.l} style={{ background: m.bg, borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid #F3F4F6" }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: m.c }}>{m.v}</div>
                        <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* LOG BUTTON */}
              <button onClick={() => setLogOpen(true)} style={{ width: "100%", padding: 14, borderRadius: 14, background: hasData ? "#F9FAFB" : G, border: hasData ? "1.5px dashed #E5E7EB" : "none", color: hasData ? "#374151" : "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {hasData ? "✏️ Update Today Health Data" : "📋 Log Today Health Data +"}
              </button>

              {/* HEALTH TIPS */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 0.8, margin: "4px 0 10px" }}>Today Health Tips</div>
              {[
                { emoji: "💧", tip: "Drink a glass of water now", sub: `You have had ${healthData.water_glasses || 0} of 8 glasses today`, id: "t1" },
                { emoji: "🚶", tip: "Time for a short walk", sub: "20 minutes after lunch is ideal for digestion", id: "t2" },
                { emoji: "🌙", tip: "Wind down at 10pm tonight", sub: "Good sleep keeps your heart healthy", id: "t3" },
              ].map(t => (
                <div key={t.id} style={{ ...card, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: GL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>{t.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{t.tip}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{t.sub}</div>
                  </div>
                  <div onClick={() => setChecks(c => ({ ...c, [t.id]: !c[t.id] }))} style={{ width: 26, height: 26, borderRadius: "50%", border: checks[t.id] ? "none" : "1.5px solid #E5E7EB", background: checks[t.id] ? G : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, color: "#fff", flexShrink: 0 }}>
                    {checks[t.id] ? "✓" : ""}
                  </div>
                </div>
              ))}

              {/* SOS */}
              <button onClick={() => setSosOpen(true)} style={{ width: "100%", padding: 16, borderRadius: 14, background: RED, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                🆘 SOS — Alert My Family Now
              </button>
              <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>Sends instant WhatsApp and SMS to all family members</div>
            </div>
          )}

          {tab === "ai" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: 14, background: GL, borderRadius: 14, border: `1px solid ${GB}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, color: "#fff", fontWeight: 700 }}>AI</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: GD }}>VellCare AI Coach</div>
                  <div style={{ fontSize: 11, color: G, marginTop: 2 }}>Powered by Claude · Your personal health guardian</div>
                </div>
                <div style={{ background: G, borderRadius: 20, padding: "3px 8px", fontSize: 10, color: "#fff", fontWeight: 700 }}>LIVE</div>
              </div>
              <AiCoach name={name} />
            </div>
          )}

          {tab === "family" && <FamilyTab userId={profile.id} />}
          {tab === "devices" && <DevicesTab />}
          {tab === "community" && <CommunityTab userId={profile.id} userSteps={steps} />}
          {tab === "plans" && <PlansTab plan={profile.subscription_plan || "free"} />}

        </div>
      </div>
    </div>
  )
}
