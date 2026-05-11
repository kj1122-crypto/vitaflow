'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const green = '#10B981'

export default function Login() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handle(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) { setError(error.message); setLoading(false) } else { router.push('/dashboard'); router.refresh() }
  }

  const inp = { width: '100%', padding: '12px 14px', borderRadius: 10, background: '#fff', border: '1px solid #E5E7EB', color: '#111827', fontFamily: 'inherit', fontSize: 14, outline: 'none' }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system,sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>V</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>VellCare<span style={{ color: green }}>AI</span></div>
          </div>
          <div style={{ fontSize: 14, color: '#6B7280' }}>Welcome back</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input style={inp} type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input style={inp} type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            {error && <div style={{ fontSize: 13, color: '#EF4444', background: '#FEF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ padding: 13, borderRadius: 12, background: green, border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 16 }}>No account? <Link href="/signup" style={{ color: green, textDecoration: 'none', fontWeight: 500 }}>Sign up free</Link></p>
      </div>
    </div>
  )
}
