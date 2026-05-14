"use client"
import Link from "next/link"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"
const RED = "#EF4444"

export default function Home() {
  const s = {
    page: { background: "#fff", color: "#111827", minHeight: "100vh", overflowX: "hidden" as const, width: "100%" },
    nav: { display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, padding: "14px 20px", borderBottom: "1px solid #F3F4F6", position: "sticky" as const, top: 0, background: "#fff", zIndex: 100, width: "100%" },
    lmark: { width: 30, height: 30, borderRadius: 8, background: G, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, color: "#fff", fontWeight: 500, fontSize: 14 },
    badge: { display: "inline-block", padding: "5px 14px", borderRadius: 20, background: GL, color: GD, border: `1px solid ${GB}`, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, marginBottom: 20 },
    sec: { padding: "52px 20px", width: "100%", overflowX: "hidden" as const },
    h2: { fontSize: "clamp(22px,5vw,30px)", fontWeight: 600, marginBottom: 10 },
    sub: { fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginBottom: 24, maxWidth: 480 },
    card: { background: "#fff", border: "1px solid #F3F4F6", borderRadius: 16, padding: 22, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
    check: (color: string) => ({ display: "flex" as const, gap: 10, marginBottom: 10, fontSize: 14, color: "#374151", alignItems: "flex-start" as const }),
  }

  return (
    <main style={s.page}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={s.lmark}>V</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>VellCare<span style={{ color: G }}>AI</span></div>
            <div style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/login" style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid #E5E7EB", color: "#374151", fontSize: 13, fontWeight: 600 }}>Sign In</Link>
          <Link href="/signup" style={{ padding: "8px 14px", borderRadius: 9, background: G, color: "#fff", fontSize: 13, fontWeight: 600 }}>Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ ...s.sec, textAlign: "center", padding: "60px 20px 52px", background: "#fff" }}>
        <div style={s.badge}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
        <h1 style={{ fontSize: "clamp(28px,6vw,48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, maxWidth: 640, margin: "0 auto 16px" }}>
          Helping families care for<br />loved ones through<br /><span style={{ color: G }}>AI-powered health</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,3vw,18px)", color: "#6B7280", margin: "0 auto 32px", lineHeight: 1.7, maxWidth: 500, padding: "0 8px" }}>
          Connect Apple Health, Samsung Health and any wearable. VellCareAI translates complex health data into simple insights for elderly parents and the families who love them.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 44, flexWrap: "wrap" as const, padding: "0 16px" }}>
          <Link href="/signup" style={{ padding: "13px 28px", borderRadius: 12, background: G, color: "#fff", fontWeight: 700, fontSize: 15 }}>Start Free Today →</Link>
          <Link href="/signup" style={{ padding: "13px 28px", borderRadius: 12, border: `1.5px solid ${GB}`, color: GD, fontWeight: 600, fontSize: 15 }}>See How It Works</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, maxWidth: 380, margin: "0 auto", padding: "0 16px" }}>
          {[["50K+","Families protected"],["24/7","AI monitoring"],["10+","Devices supported"],["4.9★","App rating"]].map(([n,l]) => (
            <div key={l} style={{ background: "#FAFAFA", borderRadius: 12, padding: 16, textAlign: "center", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: G }}>{n}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...s.sec, background: "#FAFAFA" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>How It Works</div>
          <h2 style={s.h2}>Simple for everyone in the family</h2>
          <p style={{ ...s.sub, margin: "0 auto", textAlign: "center" }}>Sign up in 60 seconds. Connect your device. Let AI do the rest.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
          {[
            { n: "01", icon: "👤", t: "Sign up in 60 seconds", d: "Email or Google, phone OTP verification, then name, age and gender. Done." },
            { n: "02", icon: "⌚", t: "Connect your devices", d: "Link Apple Health, Samsung Health, Garmin, Fitbit or any wearable. Auto-sync." },
            { n: "03", icon: "🧠", t: "AI understands your health", d: "Complex BPM, HRV and sleep data becomes simple language everyone can read." },
            { n: "04", icon: "👨‍👩‍👧", t: "Family stays connected", d: "Children monitor parents remotely. Instant SOS alerts via WhatsApp and SMS." },
          ].map(s2 => (
            <div key={s2.n} style={s.card}>
              <div style={{ fontSize: 28, fontWeight: 700, color: G, opacity: 0.2, marginBottom: 8 }}>{s2.n}</div>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{s2.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s2.t}</div>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{s2.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOR ELDERLY */}
      <section style={s.sec}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>For Elderly Parents</div>
          <h2 style={s.h2}>Simple. Clear. Reassuring.</h2>
          <p style={s.sub}>No confusing numbers. One big wellness score. Large text. Your parents understand it immediately.</p>
          {["Large text designed for elderly eyes — no squinting","Simple Good — Monitor — Warning traffic light system","Daily AI morning message in warm caring language","One-tap SOS button alerts the entire family instantly","Medication reminders with family alert if dose is missed","Gentle hourly water and movement reminders"].map(f => (
            <div key={f} style={s.check(G)}><span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</div>
          ))}
          <div style={{ background: "#FAFAFA", borderRadius: 20, padding: 24, border: "1px solid #E5E7EB", marginTop: 28, maxWidth: 360 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, textAlign: "center", border: "1px solid #E5E7EB", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8 }}>Today Wellness Score</div>
              <div style={{ fontSize: 64, fontWeight: 700, color: G, lineHeight: 1 }}>82</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: G, marginTop: 8 }}>Good</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>Your health looks good today!</div>
            </div>
            <div style={{ background: GL, borderRadius: 12, padding: 14, border: `1px solid ${GB}`, marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: G, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" as const }}>AI Morning Message</div>
              <div style={{ fontSize: 13, color: GD, lineHeight: 1.7 }}>Good morning! Your heart rate is steady at 72. Sleep was restful. Remember to drink water and take a short walk today!</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[{ v: "72", u: "BPM", c: "#E24B4A", bg: "#FEF2F2" }, { v: "7.4h", u: "Sleep", c: "#7C4DFF", bg: "#F5F3FF" }, { v: "98%", u: "SpO2", c: G, bg: GL }].map(m => (
                <div key={m.u} style={{ background: m.bg, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: m.c }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: m.c, marginTop: 2 }}>{m.u}</div>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", padding: 14, borderRadius: 12, background: RED, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>🆘 SOS — Call My Family</button>
          </div>
        </div>
      </section>

      {/* FOR FAMILIES */}
      <section style={{ ...s.sec, background: "#FAFAFA" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>For Adult Children</div>
          <h2 style={s.h2}>Peace of mind, wherever you are.</h2>
          <p style={s.sub}>Monitor your parents from anywhere. Get instant alerts before something becomes an emergency.</p>
          <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", maxWidth: 360, marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Family Health Dashboard</div>
            {[
              { name: "Mum — Wong Mei Ling", age: 68, score: 82, status: "Good", c: G, bg: GL, bdr: GB },
              { name: "Dad — Wong Ah Kow", age: 71, score: 71, status: "Monitor", c: "#F59E0B", bg: "#FFFBEB", bdr: "#FCD34D" },
              { name: "Grandma — Lim Ah Moi", age: 82, score: 58, status: "Warning", c: RED, bg: "#FEF2F2", bdr: "#FCA5A5" },
            ].map((p, i) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 2 ? "1px solid #F9FAFB" : "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.bg, border: `2px solid ${p.c}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: p.c, flexShrink: 0 }}>{p.score}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Age {p.age}</div>
                </div>
                <div style={{ padding: "4px 10px", borderRadius: 20, background: p.bg, color: p.c, fontSize: 11, fontWeight: 600, border: `1px solid ${p.bdr}`, flexShrink: 0 }}>{p.status}</div>
              </div>
            ))}
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: 12, marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: RED, marginBottom: 4 }}>⚠ Alert — Grandma needs attention</div>
              <div style={{ fontSize: 12, color: "#991B1B" }}>Heart rate elevated at 98 BPM. Sleep only 4.5 hours.</div>
            </div>
          </div>
          {["Daily wellness summary for every family member in one screen","Instant SOS notification, WhatsApp and SMS to all family","Track health trends over weeks and months with simple charts","AI explains what every reading means in plain language","Add unlimited family members — whole family in one dashboard"].map(f => (
            <div key={f} style={s.check(G)}><span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</div>
          ))}
        </div>
      </section>

      {/* DEVICES */}
      <section style={{ ...s.sec, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>Device Integrations</div>
        <h2 style={s.h2}>Works with every device they already own</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>No new hardware needed. Connect any wearable or health app.</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10, justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
          {["Apple Health","Samsung Health","Google Fit","Garmin","Fitbit","Huawei Health","Whoop","Oura Ring","Manual Input"].map(d => (
            <div key={d} style={{ padding: "9px 16px", borderRadius: 20, background: "#fff", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 500 }}>{d}</div>
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section style={{ ...s.sec, background: GD }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6EE7B7", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>AI Intelligence</div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Not just data. Understanding.</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 420, margin: "0 auto" }}>Claude AI translates complex health numbers into simple caring language — and acts when something is wrong.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, maxWidth: 860, margin: "0 auto" }}>
          {[
            { icon: "🧠", t: "AI Health Coach", d: "Daily personalised advice, meal plans and movement reminders for your age, gender and goals." },
            { icon: "💚", t: "Emotional Support", d: "Daily mood check-ins and warm motivational coaching that feels genuinely caring and human." },
            { icon: "⚠️", t: "Early Warning System", d: "AI detects declining trends in sleep, heart rate and activity before they become serious." },
            { icon: "🆘", t: "SOS Emergency Alert", d: "Instant alerts via app, WhatsApp and SMS to all family when health data shows concern." },
            { icon: "💊", t: "Medication Reminders", d: "Set medicine name, time and dosage. Family notified if a dose is missed." },
            { icon: "🛡️", t: "Preventive Intelligence", d: "AI learns your unique health baseline and detects risks months before symptoms appear." },
          ].map(f => (
            <div key={f.t} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{f.t}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ ...s.sec, background: "#FAFAFA" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>Pricing</div>
          <h2 style={s.h2}>Simple. Honest. Affordable.</h2>
          <p style={{ fontSize: 14, color: "#6B7280" }}>One subscription covers the whole family. Cancel anytime.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 960, margin: "0 auto" }}>
          {[
            { badge: "FREE", price: "RM 0", period: "forever", c: "#6B7280", bg: "#fff", bdr: "#E5E7EB", featured: false, dark: false, features: ["Health data tracking","3 AI Coach messages/day","3 meal advice/day","WellScore dashboard","SOS family alert","Apple and Samsung sync"], cta: "Get Started Free" },
            { badge: "PRO MONTHLY", price: "RM 9.90", period: "USD 2.99/month", c: G, bg: GL, bdr: G, featured: true, dark: false, features: ["UNLIMITED AI Health Coach","UNLIMITED meal planning","Family monitoring dashboard","SOS WhatsApp and SMS alerts","Community challenges and prizes","Referral reward program","All 9 device integrations","1 month health history"], cta: "Start 7-Day Free Trial" },
            { badge: "PRO ANNUAL — Save 58%", price: "RM 99", period: "USD 29/year", c: "#2196F3", bg: "#EFF6FF", bdr: "#2196F3", featured: false, dark: false, features: ["Everything in Pro Monthly","VIP community badge","Gym partner discounts","3 months health history","Early feature access"], cta: "Start 7-Day Free Trial" },
            { badge: "PLATINUM ELITE", price: "RM 299", period: "USD 69/month", c: "#6EE7B7", bg: "#0A0A0A", bdr: G, featured: false, dark: true, features: ["Private 1-on-1 health coach","Monthly blood test AI analysis","VellCare Watch gifted on signup","VIP health events access","24/7 concierge hotline","Family plan — 10 members"], cta: "Apply Now" },
          ].map(p => (
            <div key={p.badge} style={{ background: p.bg, border: p.featured ? `2px solid ${p.bdr}` : `1px solid ${p.bdr}`, borderRadius: 16, padding: 22, boxShadow: p.featured ? "0 4px 20px rgba(16,185,129,0.15)" : "none" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: p.c, textTransform: "uppercase" as const, letterSpacing: 0.8, marginBottom: 10 }}>{p.badge}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: p.dark ? "#fff" : "#111827", marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: p.dark ? "#6B7280" : "#6B7280", marginBottom: 16 }}>{p.period}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: p.dark ? "#9CA3AF" : "#6B7280", alignItems: "flex-start" }}>
                  <span style={{ color: p.dark ? "#6EE7B7" : p.c, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
              <Link href="/signup" style={{ display: "block", textAlign: "center", marginTop: 16, padding: "11px 0", borderRadius: 10, background: p.dark ? G : p.c, color: "#fff", fontWeight: 700, fontSize: 13 }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...s.sec, background: GD, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6EE7B7", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 16 }}>Start Today — Free</div>
        <h2 style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>Your parents deserve the best care.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Sign up free in 60 seconds. No credit card required.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          <Link href="/signup" style={{ padding: "13px 28px", borderRadius: 12, background: "#fff", color: GD, fontWeight: 700, fontSize: 15 }}>Start Free — No Credit Card →</Link>
          <a href="mailto:hello@vellcareai.health" style={{ padding: "13px 28px", borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: 15 }}>Contact Us</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "24px 20px", display: "flex", flexDirection: "column" as const, gap: 10, alignItems: "center", borderTop: "1px solid #F3F4F6", background: "#fff", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11 }}>V</div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>VellCare<span style={{ color: G }}>AI</span></span>
        </div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>2026 VellCareAI Health Sdn Bhd · Kuala Lumpur, Malaysia</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, justifyContent: "center" }}>
          {["Privacy","Terms","PDPA","Contact"].map(l => <span key={l} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>)}
        </div>
      </footer>
    </main>
  )
}
