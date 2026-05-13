"use client"
import Link from "next/link"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

export default function Home() {
  return (
    <main style={{ background: "#fff", color: "#111827", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #F3F4F6", position: "sticky", top: 0, background: "#fff", zIndex: 100, width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>V</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap" as const }}>VellCare<span style={{ color: G }}>AI</span></div>
            <div style={{ fontSize: 7, color: "#9CA3AF", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>SUPER AI HEALTH ECOSYSTEM</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Link href="/login" style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid #E5E7EB", color: "#374151", background: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const }}>Sign In</Link>
          <Link href="/signup" style={{ padding: "8px 14px", borderRadius: 9, background: G, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const }}>Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "56px 20px 48px", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
        <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: GL, color: GD, border: `1px solid ${GB}`, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, marginBottom: 20 }}>
          SUPER AI HEALTH ECOSYSTEM · VCAI
        </div>
        <h1 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, maxWidth: 640, margin: "0 auto 16px" }}>
          Helping families care for<br />loved ones through<br /><span style={{ color: G }}>AI-powered health</span>
        </h1>
        <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#6B7280", margin: "0 auto 32px", lineHeight: 1.7, maxWidth: 500, padding: "0 8px" }}>
          Connect Apple Health, Samsung Health and any wearable. VellCareAI translates complex health data into simple insights for elderly parents and the families who love them.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" as const, padding: "0 16px" }}>
          <Link href="/signup" style={{ padding: "13px 28px", borderRadius: 12, background: G, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>Start Free Today</Link>
          <Link href="/signup" style={{ padding: "13px 28px", borderRadius: 12, border: `1.5px solid ${GB}`, color: GD, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-block", background: "transparent" }}>See How It Works</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, maxWidth: 400, margin: "0 auto", padding: "0 16px" }}>
          {[["50K+","Families protected"],["24/7","AI monitoring"],["10+","Devices supported"],["4.9★","App rating"]].map(([n,l]) => (
            <div key={l} style={{ background: "#FAFAFA", borderRadius: 12, padding: "14px 10px", textAlign: "center", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: G }}>{n}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "48px 20px", background: "#FAFAFA", width: "100%", overflowX: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>How It Works</div>
          <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, marginBottom: 10 }}>Simple for everyone</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 400, margin: "0 auto" }}>Sign up in 60 seconds. Connect your device. Let AI do the rest.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
          {[
            { num: "01", icon: "👤", title: "Sign up in 60 seconds", desc: "Email or Google login, phone OTP, then name, age and gender. Done in under a minute." },
            { num: "02", icon: "⌚", title: "Connect your devices", desc: "Link Apple Health, Samsung Health, Garmin, Fitbit or any wearable. Data syncs automatically." },
            { num: "03", icon: "🧠", title: "AI understands your health", desc: "Complex BPM, HRV and sleep data becomes simple language everyone can understand." },
            { num: "04", icon: "👨‍👩‍👧", title: "Family stays connected", desc: "Children monitor parents remotely. Instant SOS alerts via WhatsApp and SMS." },
          ].map(s => (
            <div key={s.num} style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 16, padding: 22, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: G, opacity: 0.2, marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOR ELDERLY */}
      <section style={{ padding: "48px 20px", width: "100%", overflowX: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>For Elderly Parents</div>
          <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, marginBottom: 14 }}>Simple. Clear. Reassuring.</h2>
          <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 24, lineHeight: 1.7, maxWidth: 500 }}>No confusing numbers. One big wellness score. Simple colours. Large text. Your parents will understand it immediately.</p>
          {["Large text designed for elderly eyes — no squinting required","Simple Good — Monitor — Warning traffic light system","Daily AI morning message in warm caring language","One-tap SOS button alerts the entire family instantly","Medication reminders with family notification if missed","Gentle hourly water and movement reminders"].map(f => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "#374151", alignItems: "flex-start" }}>
              <span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
            </div>
          ))}

          {/* ELDERLY MOCKUP */}
          <div style={{ background: "#FAFAFA", borderRadius: 20, padding: 24, border: "1px solid #E5E7EB", marginTop: 28, maxWidth: 380 }}>
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
            <button style={{ width: "100%", padding: 14, borderRadius: 12, background: "#EF4444", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>🆘 SOS — Call My Family</button>
          </div>
        </div>
      </section>

      {/* FOR FAMILIES */}
      <section style={{ padding: "48px 20px", background: "#FAFAFA", width: "100%", overflowX: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>For Adult Children</div>
          <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, marginBottom: 14 }}>Peace of mind, wherever you are.</h2>
          <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 24, lineHeight: 1.7, maxWidth: 500 }}>Monitor your parents health from anywhere. Get instant alerts when something needs attention — before it becomes an emergency.</p>

          {/* FAMILY DASHBOARD MOCKUP */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", maxWidth: 380, marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Family Health Dashboard</div>
            {[
              { name: "Mum — Wong Mei Ling", age: 68, score: 82, status: "Good", c: G, bg: GL, bdr: GB },
              { name: "Dad — Wong Ah Kow", age: 71, score: 71, status: "Monitor", c: "#F59E0B", bg: "#FFFBEB", bdr: "#FCD34D" },
              { name: "Grandma — Lim Ah Moi", age: 82, score: 58, status: "Warning", c: "#EF4444", bg: "#FEF2F2", bdr: "#FCA5A5" },
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
              <div style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", marginBottom: 4 }}>⚠ Alert — Grandma needs attention</div>
              <div style={{ fontSize: 12, color: "#991B1B" }}>Heart rate elevated at 98 BPM. Sleep only 4.5 hours.</div>
            </div>
          </div>

          {["Daily wellness summary for every family member","Instant SOS push notification, WhatsApp and SMS","Track health trends over weeks and months","AI explains what every reading means simply","Add unlimited family members — whole family dashboard","Customise alert thresholds for each member"].map(f => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "#374151", alignItems: "flex-start" }}>
              <span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
            </div>
          ))}
        </div>
      </section>

      {/* DEVICES */}
      <section style={{ padding: "48px 20px", textAlign: "center", width: "100%", overflowX: "hidden" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 12 }}>Device Integrations</div>
        <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, marginBottom: 10 }}>Works with every device they already own</h2>
        <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>No new hardware needed.</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10, justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
          {["Apple Health","Samsung Health","Google Fit","Garmin","Fitbit","Huawei Health","Whoop","Oura Ring","Manual Input"].map(d => (
            <div key={d} style={{ padding: "9px 16px", borderRadius: 20, background: "#fff", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 500 }}>{d}</div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "48px 20px", background: "#FAFAFA", width: "100%", overflowX: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, marginBottom: 10 }}>Simple. Honest. Affordable.</h2>
          <p style={{ fontSize: 15, color: "#6B7280" }}>Cancel anytime. No hidden fees.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: 960, margin: "0 auto" }}>
          {[
            { badge: "FREE", price: "RM 0", period: "forever", c: "#6B7280", bg: "#fff", bdr: "#E5E7EB", featured: false, dark: false, features: ["Health data tracking","3 AI Coach messages/day","3 meal advice/day","WellScore dashboard","SOS family alert","Apple & Samsung Health sync"], cta: "Get Started Free" },
            { badge: "PRO MONTHLY", price: "RM 9.90", period: "USD 2.99/month", c: G, bg: GL, bdr: G, featured: true, dark: false, features: ["UNLIMITED AI Health Coach","UNLIMITED meal planning","Family monitoring dashboard","SOS WhatsApp & SMS alerts","Community challenges & prizes","Referral reward program","All 9 device integrations","1 month health history"], cta: "Start 7-Day Free Trial" },
            { badge: "PRO ANNUAL — Save 58%", price: "RM 99", period: "USD 29/year", c: "#2196F3", bg: "#EFF6FF", bdr: "#2196F3", featured: false, dark: false, features: ["Everything in Pro Monthly","VIP community badge","Gym partner discounts","3 months health history","Early feature access"], cta: "Start 7-Day Free Trial" },
            { badge: "PLATINUM ELITE", price: "RM 299", period: "USD 69/month", c: "#6EE7B7", bg: "#0A0A0A", bdr: G, featured: false, dark: true, features: ["Private 1-on-1 health coach","Monthly blood test AI analysis","VellCare Watch gifted on signup","VIP health events access","24/7 concierge hotline","Family plan — 10 members"], cta: "Apply Now" },
          ].map(p => (
            <div key={p.badge} style={{ background: p.bg, border: p.featured ? `2px solid ${p.bdr}` : `1px solid ${p.bdr}`, borderRadius: 16, padding: 22, boxShadow: p.featured ? "0 4px 20px rgba(16,185,129,0.15)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: p.c, textTransform: "uppercase" as const, letterSpacing: 0.8, marginBottom: 10 }}>{p.badge}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: p.dark ? "#fff" : "#111827", marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: p.dark ? "#6B7280" : "#6B7280", marginBottom: 16 }}>{p.period}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: p.dark ? "#9CA3AF" : "#6B7280", alignItems: "flex-start" }}>
                  <span style={{ color: p.c, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
              <Link href="/signup" style={{ display: "block", textAlign: "center", marginTop: 16, padding: "11px 0", borderRadius: 10, background: p.dark ? G : p.c, color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "56px 20px", textAlign: "center", background: GD, width: "100%", overflowX: "hidden" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6EE7B7", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 16 }}>Start Today — Free</div>
        <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 700, color: "#fff", marginBottom: 12, maxWidth: 480, margin: "0 auto 12px" }}>Your parents deserve the best care.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>Sign up free in 60 seconds. No credit card required.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const, padding: "0 16px" }}>
          <Link href="/signup" style={{ padding: "13px 24px", borderRadius: 12, background: "#fff", color: GD, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free — No Credit Card</Link>
          <a href="mailto:hello@vellcareai.health" style={{ padding: "13px 24px", borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: 15, textDecoration: "none" }}>Contact Us</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "20px 20px", display: "flex", flexDirection: "column" as const, gap: 12, alignItems: "center", borderTop: "1px solid #F3F4F6", background: "#fff", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11 }}>V</div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>VellCare<span style={{ color: G }}>AI</span></span>
        </div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>2026 VellCareAI Health Sdn Bhd · Kuala Lumpur</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, justifyContent: "center" }}>
          {["Privacy","Terms","PDPA","Contact"].map(l => (
            <span key={l} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </main>
  )
}
