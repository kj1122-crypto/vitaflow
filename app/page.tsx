'use client'
import Link from 'next/link'

const green = '#10B981'
const greenLight = '#D1FAE5'
const greenBorder = '#6EE7B7'
const greenDark = '#065F46'

export default function Home() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif', color: '#111827' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 32px', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>V</div>
          <span style={{ fontSize: 17, fontWeight: 700 }}>VellCare<span style={{ color: green }}>AI</span></span>
          <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500, letterSpacing: 0.5 }}>VCAI</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['For Families', 'For Elderly', 'AI Coach', 'Plans'].map(l => (
            <span key={l} style={{ fontSize: 14, color: '#6B7280', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/login" style={{ padding: '8px 16px', borderRadius: 9, border: '1px solid #E5E7EB', color: '#374151', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Sign In</Link>
          <Link href="/signup" style={{ padding: '8px 16px', borderRadius: 9, background: green, color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '80px 20px 60px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: greenLight, color: greenDark, fontSize: 12, fontWeight: 600, border: '1px solid ' + greenBorder, marginBottom: 24, letterSpacing: 0.5 }}>
          AI PREVENTIVE HEALTHCARE PLATFORM
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, marginBottom: 18, color: '#111827' }}>
          Helping families care for<br />loved ones through<br /><span style={{ color: green }}>AI-powered health</span>
        </h1>
        <p style={{ fontSize: 18, color: '#6B7280', marginBottom: 36, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
          Connect Apple Health, Samsung Health, and any device. VellCareAI translates complex health data into simple insights — for elderly parents and the families who love them.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ padding: '14px 32px', borderRadius: 12, background: green, color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>Start Free Today</Link>
          <Link href="/signup" style={{ padding: '14px 32px', borderRadius: 12, border: '1px solid ' + greenBorder, color: greenDark, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>See How It Works</Link>
        </div>
        <p style={{ fontSize: 13, color: '#9CA3AF' }}>No credit card required. Works with Apple Health, Samsung Health, Garmin, Fitbit and more.</p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '48px 32px', background: '#FAFAFA', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>How It Works</div>
          <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 10 }}>One platform. The whole family.</h2>
          <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>Elderly parents get simple health insights. Adult children get peace of mind. Everyone stays connected.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, maxWidth: 860, margin: '0 auto' }}>
          {[
            { num: '01', title: 'Connect your devices', desc: 'Link Apple Health, Samsung Health, Garmin, Fitbit, or any wearable. Data flows in automatically.', color: '#2196F3' },
            { num: '02', title: 'AI translates the data', desc: 'Complex BPM, HRV, and sleep data becomes simple language your parents can understand.', color: green },
            { num: '03', title: 'Family stays informed', desc: 'Children receive daily wellness summaries and instant SOS alerts if something needs attention.', color: '#7C4DFF' },
            { num: '04', title: 'AI coaches daily health', desc: 'Personalized meal plans, movement tips, and emotional encouragement — every single morning.', color: '#F59E0B' },
          ].map(s => (
            <div key={s.num} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: 16, padding: 22, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color, marginBottom: 10, opacity: 0.3 }}>{s.num}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOR ELDERLY */}
      <section style={{ padding: '56px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>For Elderly Parents</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>Simple. Clear. Reassuring.</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 24, lineHeight: 1.7 }}>No confusing numbers. VellCareAI shows a simple wellness score in large, easy-to-read text. Green means good. Yellow means take care. Red means ask for help.</p>
            {[
              'Large text designed for elderly eyes',
              'Simple Good — Monitor — Warning system',
              'Daily AI health message every morning',
              'One-tap SOS to alert the whole family',
              'Gentle reminders for water, movement and rest',
            ].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: '#374151', alignItems: 'flex-start' }}>
                <span style={{ color: green, fontWeight: 700, flexShrink: 0 }}>ok</span>{f}
              </div>
            ))}
          </div>
          <div style={{ background: '#FAFAFA', borderRadius: 20, padding: 32, border: '1px solid #F3F4F6' }}>
            {/* Simple elderly UI mockup */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, textAlign: 'center', border: '1px solid #E5E7EB', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Today Wellness Score</div>
              <div style={{ fontSize: 72, fontWeight: 700, color: green, lineHeight: 1 }}>82</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: green, marginTop: 8 }}>Good</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 8 }}>Your health looks good today!</div>
            </div>
            <div style={{ background: greenLight, borderRadius: 12, padding: 16, border: '1px solid ' + greenBorder, marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: greenDark, fontWeight: 600, marginBottom: 4 }}>AI Morning Message</div>
              <div style={{ fontSize: 14, color: greenDark, lineHeight: 1.6 }}>"Good morning! Your heart rate is steady at 72. Your sleep was restful. Remember to drink water and take a short walk today."</div>
            </div>
            <button style={{ width: '100%', padding: 16, borderRadius: 12, background: '#EF4444', border: 'none', color: '#fff', fontSize: 18, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>SOS — Call Family</button>
          </div>
        </div>
      </section>

      {/* FOR FAMILIES */}
      <section style={{ padding: '56px 32px', background: '#FAFAFA', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: '#111827' }}>Family Dashboard</div>
            {[
              { name: 'Mum — Wong Mei Ling', score: 82, status: 'Good', color: green, bg: greenLight, time: '2 min ago' },
              { name: 'Dad — Wong Ah Kow', score: 71, status: 'Monitor', color: '#F59E0B', bg: '#FFFBEB', time: '5 min ago' },
              { name: 'Grandma — Lim Ah Moi', score: 58, status: 'Warning', color: '#EF4444', bg: '#FEF2F2', time: '1 min ago' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: p.bg, border: '2px solid ' + p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: p.color, flexShrink: 0 }}>{p.score}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{p.time}</div>
                </div>
                <div style={{ padding: '4px 12px', borderRadius: 20, background: p.bg, color: p.color, fontSize: 12, fontWeight: 600 }}>{p.status}</div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 12, background: '#FEF2F2', borderRadius: 10, border: '1px solid #FECACA' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#EF4444', marginBottom: 4 }}>Alert — Grandma needs attention</div>
              <div style={{ fontSize: 12, color: '#991B1B' }}>Heart rate elevated at 98 BPM for past 20 minutes. Consider calling her.</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>For Adult Children</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>Peace of mind, wherever you are.</h2>
            <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 24, lineHeight: 1.7 }}>Monitor your parents' health from anywhere. Get instant alerts when something needs your attention — before it becomes an emergency.</p>
            {[
              'Daily wellness summary for every family member',
              'Instant SOS notification to your phone',
              'WhatsApp and SMS emergency alerts',
              'Track trends over weeks and months',
              'AI explains what the data means simply',
            ].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: '#374151', alignItems: 'flex-start' }}>
                <span style={{ color: green, fontWeight: 700, flexShrink: 0 }}>ok</span>{f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVICE INTEGRATIONS */}
      <section style={{ padding: '56px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Device Integrations</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Works with every device they already own</h2>
        <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>No new hardware needed. Connect any wearable or health app your family already uses.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', maxWidth: 680, margin: '0 auto' }}>
          {['Apple Health', 'Samsung Health', 'Google Fit', 'Garmin', 'Fitbit', 'Huawei Health', 'Whoop', 'Oura Ring', 'Manual Input'].map(d => (
            <div key={d} style={{ padding: '10px 20px', borderRadius: 20, background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: 14, fontWeight: 500, color: '#374151' }}>{d}</div>
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section style={{ padding: '56px 32px', background: greenDark }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6EE7B7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>AI Intelligence</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Not just data. Understanding.</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto' }}>Our Claude AI does not show numbers. It explains what they mean in simple, caring language.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, maxWidth: 860, margin: '0 auto' }}>
          {[
            { title: 'AI Health Coach', desc: 'Daily personalized health advice, meal suggestions, and gentle movement reminders tailored to each person.' },
            { title: 'Emotional Support', desc: 'Encouraging morning messages, mood check-ins, and motivational coaching that feels warm and human.' },
            { title: 'Early Warning System', desc: 'AI detects declining trends in sleep, heart rate, and activity before they become serious health issues.' },
            { title: 'Family Communication', desc: 'AI generates simple weekly health reports parents can share with their children to stay connected.' },
            { title: 'Community Wellness', desc: 'Join family health challenges, elderly wellness groups, and community motivation programs.' },
            { title: 'SOS Intelligence', desc: 'AI monitors 24/7 and sends instant alerts to family members when health data shows concern.' },
          ].map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Pricing</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Simple family pricing</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>One subscription covers the whole family.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, maxWidth: 860, margin: '0 auto' }}>
          {[
            { name: 'Personal', price: 'Free', period: 'forever', features: ['1 user', '3 AI messages/day', 'Basic health tracking', 'Manual data entry'], color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB', cta: 'Start Free' },
            { name: 'Family', price: 'RM 29', period: '/month', features: ['Up to 5 family members', 'Unlimited AI coach', 'SOS alerts', 'Family dashboard', 'Device sync', 'Daily reports'], color: green, bg: greenLight, border: greenBorder, cta: 'Start 7-Day Trial', featured: true },
            { name: 'Family Pro', price: 'RM 59', period: '/month', features: ['Up to 10 members', 'Everything in Family', 'Priority AI coaching', 'WhatsApp alerts', '1 month history', 'Early feature access'], color: '#2196F3', bg: '#EFF6FF', border: '#BFDBFE', cta: 'Start 7-Day Trial' },
            { name: 'Platinum Elite', price: 'RM 499', period: '/month', features: ['Unlimited members', 'Private health coach', 'Blood test analysis', 'VIP health events', '24/7 hotline', 'Annual health report'], color: '#7C4DFF', bg: '#F5F3FF', border: '#DDD6FE', cta: 'Apply Now' },
          ].map(p => (
            <div key={p.name} style={{ background: p.featured ? p.bg : '#fff', border: '1.5px solid ' + p.border, borderRadius: 16, padding: 24, boxShadow: p.featured ? '0 4px 20px rgba(16,185,129,0.15)' : '0 1px 4px rgba(0,0,0,0.04)' }}>
              {p.featured && <div style={{ fontSize: 10, fontWeight: 700, color: greenDark, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Most Popular</div>}
              <div style={{ fontSize: 14, fontWeight: 600, color: p.color, marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 18 }}>{p.period}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 13, color: '#374151' }}>
                  <span style={{ color: p.color, fontWeight: 700 }}>ok</span>{f}
                </div>
              ))}
              <button style={{ width: '100%', padding: 11, borderRadius: 10, background: p.color, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '56px 32px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F3F4F6' }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 12 }}>Start caring smarter today</h2>
        <p style={{ fontSize: 16, color: '#6B7280', marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>Join thousands of families across Malaysia using VellCareAI to stay connected and healthy together.</p>
        <Link href="/signup" style={{ padding: '16px 40px', borderRadius: 12, background: green, color: '#fff', fontWeight: 700, fontSize: 17, textDecoration: 'none', display: 'inline-block' }}>Get Started Free</Link>
        <p style={{ marginTop: 14, fontSize: 13, color: '#9CA3AF' }}>Works with Apple Health, Samsung Health and 10+ other platforms</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '20px 32px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11 }}>V</div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>VellCare<span style={{ color: green }}>AI</span></span>
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF' }}>2026 VellCareAI Health Sdn Bhd · Kuala Lumpur, Malaysia</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'PDPA', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </main>
  )
}
