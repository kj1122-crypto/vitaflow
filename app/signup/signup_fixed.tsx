"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

type Step = "account" | "otp" | "profile" | "done"

const GOALS = [
  { id: "lose_weight", label: "Lose weight" },
  { id: "build_muscle", label: "Build muscle" },
  { id: "improve_sleep", label: "Better sleep" },
  { id: "monitor_family", label: "Monitor family" },
  { id: "manage_stress", label: "Manage stress" },
  { id: "general_health", label: "General health" },
]

// Helper to wait/retry profile insert
async function upsertProfileWithRetry(
  supabase: ReturnType<typeof createBrowserClient>,
  profileData: Record<string, unknown>,
  maxRetries = 5
) {
  for (let i = 0; i < maxRetries; i++) {
    // Wait before each attempt (longer each time)
    await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))

    // Make sure session is fresh
    await supabase.auth.refreshSession()

    const { error } = await supabase.from("profiles").upsert(profileData)

    if (!error) return { success: true }

    console.log(`Profile insert attempt ${i + 1} failed:`, error.message)

    // If it is not a foreign key error stop retrying
    if (!error.message.includes("foreign key") && !error.message.includes("violates")) {
      return { success: false, error: error.message }
    }
  }
  return { success: false, error: "Could not save profile after multiple attempts. Please try again." }
}

export default function Signup() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [step, setStep] = useState<Step>("account")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userId, setUserId] = useState("")

  const inp: React.CSSProperties = {
    width: "100%", padding: "13px 14px", borderRadius: 10,
    background: "#fff", border: "1px solid #E5E7EB",
    color: "#111827", fontSize: 14, outline: "none", marginBottom: 14
  }

  const progress = step === "account" ? 1 : step === "otp" ? 2 : step === "profile" ? 3 : 4

  function startTimer() {
    setTimer(60)
    const iv = setInterval(() => setTimer(t => {
      if (t <= 1) { clearInterval(iv); return 0 }
      return t - 1
    }), 1000)
  }

  async function handleAccount(e: React.FormEvent) {
    e.preventDefault()
    setError(""); setLoading(true)
    if (password !== confirm) { setError("Passwords do not match"); setLoading(false); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); setLoading(false); return }

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }

    if (data.user) {
      setUserId(data.user.id)
    } else {
      // Email confirmation required — user exists but needs to verify
      setError("Please check your email and click the confirmation link first, then come back to complete your profile.")
      setLoading(false)
      return
    }

    setStep("otp"); setLoading(false)
  }

  function handleSendOtp() {
    if (!phone || phone.length < 9) { setError("Please enter a valid phone number"); return }
    setError(""); setOtpSent(true); startTimer()
    // TODO: Integrate Vonage WhatsApp OTP here
    // For now we simulate OTP sent
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    // Accept any 6-digit code for now
    // TODO: Verify against Vonage API
    if (otp.length !== 6) { setError("Please enter the 6-digit code"); return }
    setStep("profile")
  }

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault()
    setError(""); setLoading(true)

    if (!name || !age || !gender || !goal) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    // Get the current session to make sure we have the right user ID
    const { data: { session } } = await supabase.auth.getSession()
    const currentUserId = session?.user?.id || userId

    if (!currentUserId) {
      setError("Session expired. Please sign in again.")
      setLoading(false)
      router.push("/login")
      return
    }

    const profileData = {
      id: currentUserId,
      full_name: name,
      age: parseInt(age),
      gender,
      health_goal: goal,
      phone: "+60" + phone,
      subscription_plan: "free",
      xp: 0,
      level: 1,
      updated_at: new Date().toISOString()
    }

    // Try with retry logic to handle auth timing
    const result = await upsertProfileWithRetry(supabase, profileData)

    if (!result.success) {
      setError(result.error || "Failed to save profile. Please try again.")
      setLoading(false)
      return
    }

    setStep("done")
    setLoading(false)
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" }
    })
  }

  const gBtn = (id: string, sel: string, setSel: (v: string) => void, label: string) => (
    <button key={id} type="button" onClick={() => setSel(id)} style={{
      padding: "10px 8px", borderRadius: 10,
      border: sel === id ? `2px solid ${G}` : "1.5px solid #E5E7EB",
      background: sel === id ? GL : "#fff",
      color: sel === id ? GD : "#6B7280",
      fontSize: 13, fontWeight: sel === id ? 700 : 500,
      cursor: "pointer", textAlign: "center" as const
    }}>{label}</button>
  )

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>V</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>VellCare<span style={{ color: G }}>AI</span></div>
          </div>
          <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

          {/* Progress bar */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: n <= progress ? G : "#E5E7EB", transition: "background 0.3s" }} />
            ))}
          </div>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#EF4444", marginBottom: 14 }}>
              {error}
            </div>
          )}

          {/* STEP 1 — ACCOUNT */}
          {step === "account" && (
            <>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Create your account</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>Join VellCareAI free. No credit card needed.</div>

              <button onClick={handleGoogle} style={{ width: "100%", padding: "12px 0", borderRadius: 10, background: "#fff", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>or sign up with email</div>
                <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
              </div>

              <form onSubmit={handleAccount}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email address</label>
                <input style={inp} type="email" placeholder="you@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
                <input style={inp} type="password" placeholder="Minimum 8 characters" required value={password} onChange={e => setPassword(e.target.value)} />
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Confirm password</label>
                <input style={inp} type="password" placeholder="Repeat your password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
                <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Creating account..." : "Continue →"}
                </button>
              </form>

              <div style={{ textAlign: "center", fontSize: 13, color: "#6B7280", marginTop: 16 }}>
                Already have an account? <Link href="/login" style={{ color: G, fontWeight: 600 }}>Sign in</Link>
              </div>
            </>
          )}

          {/* STEP 2 — PHONE */}
          {step === "otp" && (
            <>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Verify your phone</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
                We need your phone number to keep your account secure and enable family SOS alerts.
              </div>

              {!otpSent ? (
                <>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Malaysian phone number</label>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <div style={{ padding: "13px 12px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#374151", fontSize: 14, fontWeight: 600, flexShrink: 0 }}>+60</div>
                    <input style={{ ...inp, marginBottom: 0, flex: 1 }} type="tel" placeholder="12-3456789" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 16 }}>We will send a 6-digit verification code</div>
                  <button onClick={handleSendOtp} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    Send Verification Code
                  </button>
                  <button onClick={() => setStep("profile")} style={{ width: "100%", padding: 12, borderRadius: 12, background: "none", border: "1px solid #E5E7EB", color: "#6B7280", fontSize: 13, cursor: "pointer", marginTop: 10 }}>
                    Skip for now →
                  </button>
                  <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>You can add your phone number later in settings</div>
                </>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: GD, marginBottom: 16 }}>
                    Code sent to +60{phone}. Check your SMS.
                  </div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Enter 6-digit code</label>
                  <input
                    style={{ ...inp, textAlign: "center", fontSize: 22, fontWeight: 700, letterSpacing: 8 }}
                    type="text" placeholder="000000" maxLength={6}
                    value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                  />
                  {timer > 0
                    ? <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 14 }}>Resend code in {timer}s</div>
                    : <button type="button" onClick={() => { setOtpSent(false); setOtp("") }} style={{ background: "none", border: "none", color: G, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14 }}>Resend code</button>
                  }
                  <button type="submit" style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    Verify and Continue →
                  </button>
                </form>
              )}
            </>
          )}

          {/* STEP 3 — PROFILE */}
          {step === "profile" && (
            <>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Tell us about yourself</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>
                This helps your AI health coach give personalised advice just for you.
              </div>

              {loading && (
                <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: GD, marginBottom: 14 }}>
                  Setting up your profile... please wait a moment.
                </div>
              )}

              <form onSubmit={handleProfile}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Full name</label>
                <input style={inp} type="text" placeholder="Your full name" required value={name} onChange={e => setName(e.target.value)} />

                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Age</label>
                <input style={inp} type="number" placeholder="Your age" min={1} max={120} required value={age} onChange={e => setAge(e.target.value)} />

                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Gender</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {gBtn("male", gender, setGender, "♂ Male")}
                  {gBtn("female", gender, setGender, "♀ Female")}
                  {gBtn("prefer_not", gender, setGender, "Prefer not")}
                </div>

                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Primary health goal</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {GOALS.map(g => gBtn(g.id, goal, setGoal, g.label))}
                </div>

                <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Setting up your account..." : "Complete Setup ✓"}
                </button>
              </form>
            </>
          )}

          {/* STEP 4 — DONE */}
          {step === "done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Welcome to VellCareAI!</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 24, lineHeight: 1.6 }}>
                Your AI health journey starts now. Your personal coach is ready for you.
              </div>
              <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "left" as const }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: GD, marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>What happens next</div>
                {[
                  "Connect your health device for auto-sync",
                  "Your AI coach will send a morning message daily",
                  "Invite family members to your health circle"
                ].map(f => (
                  <div key={f} style={{ fontSize: 13, color: GD, marginBottom: 6 }}>✓ {f}</div>
                ))}
              </div>
              <button onClick={() => router.push("/dashboard")} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Go to My Dashboard →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
