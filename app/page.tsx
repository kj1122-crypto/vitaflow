'use client'
import Link from 'next/link'

const green = '#10B981'
const greenLight = '#D1FAE5'
const greenBorder = '#6EE7B7'
const greenDark = '#065F46'

export default function Home() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif', color: '#111827' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>V</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>VellCare<span style={{ color: green }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/login" style={{ padding: '8px 18px', borderRadius: 10, color: '#6B7280', border: '1px solid #E5E7EB', textDecoration: 'none', fontSize: 14 }}>Sign In</Link>
          <Link href="/signup" style={{ padding: '8px 18px', borderRadius: 10, background: green, color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Start Free</Link>
        </div>
      </nav>
      <section style={{ textAlign: 'center', padding: '80px 20px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, background: greenLight, color: greenDark, fontSize: 13, marginBottom: 24, border: '1px solid ' + greenBorder, fontWeight: 500 }}>Super AI Health App - VCAI</div>
        <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, marginBottom: 20, color: '#111827' }}>
          Your health, powered by<br /><span style={{ color: green }}>intelligent care</span>
        </h1>
        <p style={{ fontSize: 18, color: '#6B7280', marginBottom: 40, lineHeight: 1.7 }}>VellCareAI combines AI health coaching, real-time body tracking, gamified quests, and premium concierge care - all in one fresh, intelligent platform.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ padding: '16px 36px', borderRadius: 14, background: green, color: '#fff', fontWeight: 700, fontSize: 17, textDecoration: 'none' }}>Start Free Today</Link>
          <Link href="/pricing" style={{ padding: '16px 36px', borderRadius: 14, border: '1px solid ' + greenBorder, color: greenDark, fontWeight: 600, fontSize: 17, textDecoration: 'none' }}>See Plans</Link>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#9CA3AF' }}>No credit card required - 7-day free trial on Pro</p>
      </section>
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          {[
            { icon: 'brain', title: 'AI Health Coach', desc: 'Claude-powered AI that knows your biometrics and gives truly personalized health advice, meal plans, and workout guidance.' },
            { icon: 'quest', title: 'Gamified Quests', desc: 'Earn XP by completing health goals. Level up, hit streaks, and compete on the leaderboard for real prizes every week.' },
            { icon: 'food', title: 'Smart Meal Plans', desc: 'AI generates daily meal plans tailored to your macros, allergies, fitness goals, and body type.' },
          ].map(f => (
            <div key={f.title} style={{ padding: 24, borderRadius: 16, background: '#fff', border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, border: '1px solid ' + greenBorder }}>
                <span style={{ fontSize: 20, color: green }}>+</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: '#111827' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
