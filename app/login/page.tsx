"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

export default function Login() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const inp: React.CSSProperties = {
    width: "100%", padding: "13px 14px", borderRadius: 10,
    background: "#fff", border: "1px solid #E5E7EB",
    color: "#111827", fontFamily: "inherit", fontSize: 14, outline: "none",
    marginBottom: 14
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
    router.refresh()
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" }
    })
  }

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "-apple-system,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>V</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>VellCare<span style={{ color: G }}>AI</span></div>
          </div>
          <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Welcome back</div>
          <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Sign in to your health dashboard</div>

          {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#EF4444", marginBottom: 14 }}>{error}</div>}

          <button onClick={handleGoogle} style={{ width: "100%", padding: "12px 0", borderRadius: 10, background: "#fff", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginBottom: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>or sign in with email</div>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          </div>

          <form onSubmit={handleLogin}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email address</label>
            <input style={inp} type="email" placeholder="you@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
            <input style={inp} type="password" placeholder="Your password" required value={password} onChange={e => setPassword(e.target.value)} />
            <div style={{ textAlign: "right", marginTop: -10, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: G, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: "#6B7280", marginTop: 16 }}>
          No account? <Link href="/signup" style={{ color: G, fontWeight: 600, textDecoration: "none" }}>Sign up free</Link>
        </div>
      </div>
    </div>
  )
}
