"use client"
import { useState, useEffect, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"
const RED = "#EF4444"
const BLUE = "#2196F3"
const PURPLE = "#7C4DFF"
const GOLD = "#F59E0B"

// ─── STYLES ────────────────────────────────────────────────
const card: React.CSSProperties = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }
const cardGreen: React.CSSProperties = { ...card, background: GL, border: `1px solid ${GB}` }

// ─── AI COACH COMPONENT ─────────────────────────────────────
function AiCoach({ name }: { name: string }) {
  const [msgs, setMsgs] = useState([{ role: "assistant" as const, content: `Good morning ${name}! I have reviewed your health data. Your WellScore is 82 and heart rate is steady. How can I help you today?` }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs])

  const chips = ["How is my health today?", "Best meal for fat loss", "Slim my waist fast", "I feel tired today", "Help me sleep better", "Build muscle fast", "I feel lonely today", "Lower my stress"]

  async function send() {
    if (!input.trim() || loading) return
    const txt = input.trim(); setInput("")
    const next = [...msgs, { role: "user" as const, content: txt }]
    setMsgs(next); setLoading(true)
    try {
      const res = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) })
      const data = await res.json()
      setMsgs(m => [...m, { role: "assistant", content: data.reply || "Please try again." }])
    } catch {
      setMsgs(m => [...m, { role: "assistant", content: "Connection error. Please try again." }])
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 12 }}>
        {chips.map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: "6px 12px", borderRadius: 20, background: GL, border: `1px solid ${GB}`, fontSize: 12, color: GD, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>{q}</button>
        ))}
      </div>
      <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16, height: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ maxWidth: "88%", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && <div style={{ fontSize: 10, color: G, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>VELLCARE AI</div>}
            <div style={{ padding: "12px 16px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 14, lineHeight: 1.6, background: m.role === "user" ? G : "#fff", color: m.role === "user" ? "#fff" : "#1F2937", border: m.role === "assistant" ? "1px solid #E5E7EB" : "none" }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic" }}>VellCare AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask your AI health coach anything..." style={{ flex: 1, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "12px 16px", color: "#1F2937", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
        <button onClick={send} style={{ width: 46, height: 46, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 20, cursor: "pointer", flexShrink: 0 }}>↑</button>
      </div>
      <div style={{ ...card, marginTop: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Body Targeting Guide</div>
        {[
          { area: "Slim waist", sports: "Swimming, Pilates, Yoga", gym: "Cable crunches, Russian twists, Planks" },
          { area: "Tone thighs", sports: "Cycling, Running, Badminton", gym: "Squats, Lunges, Leg press" },
          { area: "Build upper body", sports: "Swimming, Rock climbing", gym: "Bench press, Pull-ups, Rows" },
          { area: "Flat belly", sports: "Swimming, HIIT, Tennis", gym: "Planks, Deadlifts, Leg raises" },
        ].map(b => (
          <div key={b.area} style={{ padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{b.area}</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Sports: {b.sports}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>Gym: {b.gym}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FAMILY TAB ─────────────────────────────────────────────
function FamilyTab() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const members = [
    { id: "m1", name: "Mum — Wong Mei Ling", age: 68, score: 82, status: "Good", c: G, bg: GL, bdr: GB, bpm: 72, steps: 3200, sleep: 7.2, alert: false },
    { id: "m2", name: "Dad — Wong Ah Kow", age: 71, score: 71, status: "Monitor", c: GOLD, bg: "#FFFBEB", bdr: "#FCD34D", bpm: 88, steps: 1800, sleep: 5.8, alert: false },
    { id: "m3", name: "Grandma — Lim Ah Moi", age: 82, score: 58, status: "Warning", c: RED, bg: "#FEF2F2", bdr: "#FCA5A5", bpm: 98, steps: 620, sleep: 4.5, alert: true },
  ]
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Family Health</div>
      {members.find(m => m.alert) && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: RED, marginBottom: 3 }}>⚠ Alert — Grandma needs attention</div>
          <div style={{ fontSize: 12, color: "#991B1B", marginBottom: 8, lineHeight: 1.6 }}>Heart rate elevated at 98 BPM for 20 minutes. Sleep was only 4.5 hours last night.</div>
          <button style={{ padding: "6px 14px", borderRadius: 8, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📞 Call Now</button>
        </div>
      )}
      <div style={card}>
        {members.map((p, idx) => (
          <div key={p.id}>
            <div onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: idx < members.length - 1 ? "1px solid #F9FAFB" : "none", cursor: "pointer" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: p.bg, border: `2px solid ${p.c}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17, color: p.c, flexShrink: 0 }}>{p.score}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Age {p.age} · Updated 2 min ago</div>
              </div>
              <div style={{ padding: "4px 12px", borderRadius: 20, background: p.bg, color: p.c, fontSize: 12, fontWeight: 600, border: `1px solid ${p.bdr}` }}>{p.status}</div>
            </div>
            {expanded === p.id && (
              <div style={{ paddingBottom: 12, paddingTop: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {[{ l: "Heart Rate", v: `${p.bpm} BPM`, c: RED, bg: "#FEF2F2" }, { l: "Steps Today", v: p.steps.toLocaleString(), c: BLUE, bg: "#EFF6FF" }, { l: "Sleep", v: `${p.sleep}h`, c: PURPLE, bg: "#F5F3FF" }].map(m => (
                    <div key={m.l} style={{ background: m.bg, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: m.c }}>{m.v}</div>
                      <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["📞 Call", "💬 Message", "📊 History"].map(a => (
                    <button key={a} style={{ flex: 1, padding: 9, borderRadius: 9, background: a.includes("Call") ? G : a.includes("Message") ? GL : "#F9FAFB", border: a.includes("Message") ? `1px solid ${GB}` : "1px solid #E5E7EB", color: a.includes("Call") ? "#fff" : a.includes("Message") ? GD : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{a}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: GD, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>Add family member</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Invite parents to join your health circle</div>
        </div>
        <button style={{ padding: "8px 16px", borderRadius: 9, background: "#fff", border: "none", color: GD, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>Invite</button>
      </div>
    </div>
  )
}

// ─── DEVICES TAB ────────────────────────────────────────────
function DevicesTab() {
  const [connected, setConnected] = useState(["Apple Health", "Samsung Health"])
  const devices = [
    { name: "Apple Health", desc: "iPhone and Apple Watch sync", icon: "🍎" },
    { name: "Samsung Health", desc: "Galaxy Watch and Samsung phone", icon: "📱" },
    { name: "Google Fit", desc: "Android health data", icon: "🔵" },
    { name: "Garmin", desc: "All Garmin wearables", icon: "⌚" },
    { name: "Fitbit", desc: "All Fitbit devices", icon: "💪" },
    { name: "Huawei Health", desc: "Huawei Band and Watch", icon: "📲" },
    { name: "Whoop", desc: "Whoop band", icon: "⚡" },
    { name: "Oura Ring", desc: "Oura smart ring", icon: "💍" },
    { name: "Manual Input", desc: "Enter health data manually", icon: "✍️" },
  ]
  const toggle = (name: string) => setConnected(c => c.includes(name) ? c.filter(x => x !== name) : [...c, name])

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Connect Devices</div>
      <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>Link your health apps and wearables to sync data automatically</div>
      <div style={card}>
        {devices.map((d, i) => {
          const isConn = connected.includes(d.name)
          return (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: i < devices.length - 1 ? "1px solid #F9FAFB" : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: isConn ? GL : "#F3F4F6", border: isConn ? `1px solid ${GB}` : "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{d.desc}</div>
              </div>
              <button onClick={() => toggle(d.name)} style={{ padding: "6px 14px", borderRadius: 8, background: isConn ? "#FEF2F2" : GL, border: isConn ? "1px solid #FCA5A5" : `1px solid ${GB}`, color: isConn ? RED : GD, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                {isConn ? "Disconnect" : "Connect"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── COMMUNITY TAB ──────────────────────────────────────────
function CommunityTab() {
  const [copied, setCopied] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const REF = 4; const STREAK = 5; const STEPS = 3240
  const REF_GOAL = 10; const STREAK_GOAL = 7; const STEPS_GOAL = 5000

  function copyLink() {
    navigator.clipboard.writeText("https://vellcareai.health/ref/VCAIABCD").catch(() => {})
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const leaders = [
    { rank: 1, name: "FitKing_Razif", steps: 12840, prize: "RM 50 Grab", c: GOLD },
    { rank: 2, name: "HealthQueenSiti", steps: 10220, prize: "RM 30 TnG", c: "#9CA3AF" },
    { rank: 3, name: "RunnerJosh_KL", steps: 9870, prize: "RM 20 McDs", c: "#CD7F32" },
    { rank: 4, name: "You", steps: STEPS, prize: "", c: G },
    { rank: 5, name: "HealthyMom88", steps: 3100, prize: "", c: "#E5E7EB" },
  ]

  const missionPct = (v: number, g: number) => Math.min(Math.round(v / g * 100), 100)
  const totalPct = Math.round(((REF >= REF_GOAL ? 1 : 0) + (STREAK >= STREAK_GOAL ? 1 : 0) + (STEPS >= STEPS_GOAL ? 1 : 0)) / 3 * 100)

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: 1.5, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500, marginTop: 2 }}>VCAI Community</div>
      </div>

      {/* WEEKLY CHALLENGE */}
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
          {[{ pos: "1st", prize: "RM 50", sub: "Grab voucher", c: GOLD }, { pos: "2nd", prize: "RM 30", sub: "Touch n Go", c: "#9CA3AF" }, { pos: "3rd", prize: "RM 20", sub: "McDonalds", c: "#CD7F32" }].map(p => (
            <div key={p.pos} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, color: p.c, fontWeight: 700, marginBottom: 3 }}>{p.pos}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.c }}>{p.prize}</div>
              <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{p.sub}</div>
            </div>
          ))}
        </div>
        {leaders.map(u => (
          <div key={u.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width: 22, textAlign: "center", fontSize: 13, fontWeight: 700, color: u.rank <= 3 ? u.c : "#444" }}>{u.rank}</div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: u.name === "You" ? G : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: u.name === "You" ? "#fff" : "#888" }}>{u.name.slice(0, 2)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: u.name === "You" ? 700 : 500, color: u.name === "You" ? G : "#ccc" }}>{u.name === "You" ? "You" : u.name}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{u.steps.toLocaleString()} steps</div>
            </div>
            {u.prize && <div style={{ fontSize: 11, color: u.c, fontWeight: 600 }}>{u.prize}</div>}
          </div>
        ))}
        <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(16,185,129,0.08)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.15)" }}>
          <div style={{ fontSize: 12, color: G, fontWeight: 600, marginBottom: 4 }}>You need {(leaders[2].steps - STEPS + 1).toLocaleString()} more steps to reach 3rd place!</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: G, width: missionPct(STEPS, STEPS_GOAL) + "%", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>{STEPS.toLocaleString()} / {STEPS_GOAL.toLocaleString()} steps today</div>
        </div>
      </div>

      {/* REFERRAL PROGRAM */}
      <div style={{ ...cardGreen, marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Referral Reward Program</div>
        <div style={{ fontSize: 12, color: GD, marginBottom: 16, lineHeight: 1.6 }}>Complete all 3 missions to earn a <strong>RM 50 Aeon or KFC voucher</strong>!</div>

        {/* MISSION 1 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Mission 1 — Invite 10 Friends</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: REF >= REF_GOAL ? G : GOLD }}>{REF}/{REF_GOAL}</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", background: REF >= REF_GOAL ? G : GOLD, width: missionPct(REF, REF_GOAL) + "%", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 10 }}>Share your referral link. Referred friend must be active 7 days to count.</div>
          <div onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", borderRadius: 8, padding: "8px 10px", border: "1px solid #E5E7EB", cursor: "pointer", marginBottom: 8 }}>
            <span style={{ flex: 1, fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>vellcareai.health/ref/VCAIABCD</span>
            <span style={{ fontSize: 12, color: G, fontWeight: 700 }}>{copied ? "Copied!" : "Copy"}</span>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 18, borderRadius: 4, background: i < REF ? G : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: i < REF ? "#fff" : "#9CA3AF", fontWeight: 700 }}>
                {i < REF ? "✓" : String(i + 1)}
              </div>
            ))}
          </div>
        </div>

        {/* MISSION 2 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Mission 2 — 7-Day Check-In</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: STREAK >= STREAK_GOAL ? G : GOLD }}>{STREAK}/{STREAK_GOAL} days</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", background: STREAK >= STREAK_GOAL ? G : GOLD, width: missionPct(STREAK, STREAK_GOAL) + "%", borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 26, borderRadius: 6, background: i < STREAK ? G : "#F3F4F6", marginBottom: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: i < STREAK ? "#fff" : "#9CA3AF", fontWeight: 600 }}>
                  {i < STREAK ? "✓" : ""}
                </div>
                <div style={{ fontSize: 9, color: "#9CA3AF" }}>{d}</div>
              </div>
            ))}
          </div>
          {!checkedIn && (
            <button onClick={() => setCheckedIn(true)} style={{ width: "100%", padding: 8, borderRadius: 8, background: G, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 10 }}>Check In Today</button>
          )}
          {checkedIn && <div style={{ marginTop: 8, fontSize: 12, color: G, fontWeight: 700, textAlign: "center" }}>✓ Checked in today!</div>}
        </div>

        {/* MISSION 3 */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, border: `1px solid ${GB}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Mission 3 — Walk 5,000 Steps</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: STEPS >= STEPS_GOAL ? G : GOLD }}>{STEPS.toLocaleString()}/{STEPS_GOAL.toLocaleString()}</div>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", background: STEPS >= STEPS_GOAL ? G : GOLD, width: missionPct(STEPS, STEPS_GOAL) + "%", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>Synced automatically from your connected device</div>
        </div>

        {/* REWARD */}
        <div style={{ background: GD, borderRadius: 12, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Complete all 3 to unlock</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 10 }}>
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
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
      </div>
    </div>
  )
}

// ─── PLANS TAB ──────────────────────────────────────────────
function PlansTab() {
  async function subscribe(plan: string) {
    const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px 0 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 4 }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>VellCareAI Plans</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>Simple pricing. Real value. Cancel anytime.</div>
      </div>

      <div style={card}>
        <div style={{ display: "inline-block", background: "#F3F4F6", color: "#6B7280", fontSize: 10, padding: "2px 8px", borderRadius: 20, marginBottom: 8, fontWeight: 700 }}>FREE FOREVER</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>Starter</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>No credit card needed</div></div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>RM 0</div>
        </div>
        {["Health data tracking — BPM, sleep, steps, calories", "3 AI Coach messages per day", "3 meal advice per day", "WellScore dashboard", "SOS family alert button", "Apple Health and Samsung Health sync"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#6B7280", marginBottom: 6, display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: G, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}</div>
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
        {["UNLIMITED AI Health Coach", "UNLIMITED meal planning and advice", "Family monitoring dashboard", "SOS WhatsApp and SMS alerts", "Community challenges and prizes", "Referral reward program", "All 9 device integrations", "1 month health history"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#374151", marginBottom: 6, display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: G, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <button onClick={() => subscribe("monthly")} style={{ width: "100%", padding: 12, borderRadius: 12, background: G, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>Start 7-Day Free Trial</button>
      </div>

      <div style={{ ...card, border: "1.5px solid #2196F3" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>ANNUAL</div>
          <div style={{ background: "#EAF3DE", color: "#3B6D11", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>Save 58%</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Annual</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>RM 99 billed once per year</div></div>
          <div style={{ textAlign: "right" as const }}><div style={{ fontSize: 24, fontWeight: 700 }}>RM 8.25</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>USD 2.08/mo · USD 29/yr</div></div>
        </div>
        {["Everything in Pro Monthly", "VIP community badge", "Gym partner discounts", "3 months health history", "Early feature access"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#374151", marginBottom: 6, display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: BLUE, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <button onClick={() => subscribe("annual")} style={{ width: "100%", padding: 12, borderRadius: 12, background: BLUE, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>Start 7-Day Free Trial</button>
      </div>

      <div style={{ background: "#0A0A0A", border: `1.5px solid ${G}`, borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ background: G, color: "#fff", fontSize: 10, padding: "2px 10px", borderRadius: 20, fontWeight: 700, display: "inline-block", marginBottom: 12, letterSpacing: 0.5 }}>PLATINUM ELITE</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Concierge Health Program</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[{ label: "Monthly", rm: "RM 299", usd: "USD 69" }, { label: "Quarterly", rm: "RM 799", usd: "USD 189" }, { label: "Annual", rm: "RM 2,499", usd: "USD 599" }].map(p => (
            <div key={p.label} style={{ background: "rgba(16,185,129,0.1)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 3 }}>{p.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: G }}>{p.rm}</div>
              <div style={{ fontSize: 10, color: "#555" }}>{p.usd}</div>
            </div>
          ))}
        </div>
        {["Private 1-on-1 health coach monthly call", "Monthly blood test AI analysis", "Exclusive VellCare Watch gifted on annual signup", "VIP health events access", "Unlimited AI coaching 24/7", "24/7 health concierge hotline", "Annual comprehensive health report", "Personal onboarding with health expert", "Family plan up to 10 members"].map(f => (
          <div key={f} style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 7, display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: G, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}</div>
        ))}
        <button style={{ width: "100%", padding: 14, borderRadius: 12, background: `linear-gradient(135deg,${G},#059669)`, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 14 }}>Apply for Platinum Elite</button>
        <div style={{ textAlign: "center", fontSize: 10, color: "#555", marginTop: 8 }}>Limited spots available</div>
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD ─────────────────────────────────────────
export default function Dashboard() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null)
  const [tab, setTab] = useState("home")
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const [sosOpen, setSosOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
        setProfile(data ?? { full_name: "Member", level: 1, xp: 0, subscription_plan: "free" })
      })
    })
  }, [])

  async function logout() { await supabase.auth.signOut(); router.push("/") }

  if (!profile) return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system,sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, color: G, fontWeight: 700, marginBottom: 8 }}>VellCareAI</div>
        <div style={{ color: "#9CA3AF", fontSize: 13 }}>Loading your health dashboard...</div>
      </div>
    </div>
  )

  const name = String(profile.full_name ?? "Member").split(" ")[0]

  const nb = (t: string): React.CSSProperties => ({
    flex: 1, padding: "9px 2px", background: "none", border: "none",
    borderBottom: tab === t ? `2px solid ${G}` : "2px solid transparent",
    color: tab === t ? G : "#9CA3AF",
    fontFamily: "inherit", fontSize: 9, cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    textTransform: "uppercase", letterSpacing: 0.5,
  })

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: "#111827" }}>

      {/* SOS MODAL */}
      {sosOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 380, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🆘</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: RED, marginBottom: 8 }}>SOS Alert Sent!</div>
            <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>All your family members have been notified via WhatsApp and SMS with your current location.</div>
            <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GD, marginBottom: 6 }}>Alerts sent to</div>
              <div style={{ fontSize: 13, color: GD }}>Mum — +60 12-345 6789</div>
              <div style={{ fontSize: 13, color: GD, marginTop: 2 }}>Dad — +60 12-987 6543</div>
            </div>
            <button onClick={() => setSosOpen(false)} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>I am OK — Cancel Alert</button>
            <button onClick={() => setSosOpen(false)} style={{ width: "100%", padding: 10, borderRadius: 12, background: "none", border: "none", color: "#9CA3AF", fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>Keep alert active</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 8px", background: "#fff", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>V</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>VellCare<span style={{ color: G }}>AI</span></div>
              <div style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSosOpen(true)} style={{ padding: "6px 14px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5", color: RED, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>🆘 SOS</button>
            <button onClick={logout} style={{ padding: "6px 10px", borderRadius: 8, background: "none", border: "1px solid #E5E7EB", color: "#9CA3AF", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Sign out</button>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ display: "flex", padding: "0 8px", background: "#fff", borderBottom: "1px solid #F3F4F6", position: "sticky", top: 0, zIndex: 100 }}>
          {(["home","ai","family","devices","community","plans"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={nb(t)}>
              <span style={{ fontSize: 16 }}>{t === "home" ? "🏠" : t === "ai" ? "🧠" : t === "family" ? "👨‍👩‍👧" : t === "devices" ? "⌚" : t === "community" ? "🏆" : "💳"}</span>
              {t === "home" ? "Health" : t === "ai" ? "AI Coach" : t === "family" ? "Family" : t === "devices" ? "Devices" : t === "community" ? "Community" : "Plans"}
            </button>
          ))}
        </nav>

        <div style={{ padding: 16 }}>

          {/* HOME TAB */}
          {tab === "home" && (
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{new Date().toDateString()}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>Good morning, <span style={{ color: G }}>{name}</span> 👋</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 16, padding: "18px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: G, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 6 }}>WellScore</div>
                  <div style={{ fontSize: 52, fontWeight: 700, color: GD, lineHeight: 1 }}>82</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: G, marginTop: 6 }}>Good</div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>Your health looks great!</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ ...card, marginBottom: 0, textAlign: "center", padding: "12px 10px" }}>
                    <div style={{ fontSize: 9, color: G, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 }}>Recovery</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#059669" }}>78%</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>Strong</div>
                  </div>
                  <div style={{ ...card, marginBottom: 0, textAlign: "center", padding: "12px 10px" }}>
                    <div style={{ fontSize: 9, color: RED, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 }}>Heart Rate</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: RED }}>72</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>BPM · Normal</div>
                  </div>
                </div>
              </div>

              <div style={cardGreen}>
                <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, marginBottom: 6 }}>AI Morning Message</div>
                <div style={{ fontSize: 14, color: GD, lineHeight: 1.7 }}>Good morning! Your sleep was restful at 7.4 hours and your heart rate is steady. Today I recommend a 20-minute walk after lunch. Remember to drink 8 glasses of water. You are doing great!</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                {[
                  { l: "Sleep", v: "7.4", u: "hrs", c: PURPLE, bg: "#F5F3FF" },
                  { l: "Steps", v: "3,240", u: "steps", c: BLUE, bg: "#EFF6FF" },
                  { l: "Calories", v: "1,420", u: "kcal", c: GOLD, bg: "#FFFBEB" },
                  { l: "SpO2", v: "98", u: "%", c: G, bg: GL },
                  { l: "Weight", v: "68.2", u: "kg", c: "#FF6B35", bg: "#FFF7ED" },
                  { l: "Stress", v: "Low", u: "", c: G, bg: GL },
                ].map(m => (
                  <div key={m.l} style={{ background: m.bg, borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid #F3F4F6" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: m.c, opacity: 0.7 }}>{m.u}</div>
                    <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 0.8, margin: "14px 0 10px" }}>Today Health Tips</div>
              {[
                { emoji: "💧", tip: "Drink a glass of water now", sub: "You have had 3 of 8 glasses today", id: "t1" },
                { emoji: "🚶", tip: "Time for a short walk", sub: "20 minutes after lunch is ideal", id: "t2" },
                { emoji: "🌙", tip: "Wind down reminder at 10pm", sub: "Good sleep keeps your heart healthy", id: "t3" },
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

              <button onClick={() => setSosOpen(true)} style={{ width: "100%", padding: 16, borderRadius: 14, background: RED, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
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

          {tab === "family" && <FamilyTab />}
          {tab === "devices" && <DevicesTab />}
          {tab === "community" && <CommunityTab />}
          {tab === "plans" && <PlansTab />}

        </div>
      </div>
    </div>
  )
}
