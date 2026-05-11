const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created: ' + filePath);
}

// New landing page - AI Family Healthcare Platform
write('app/page.tsx', `'use client'
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
`);

// New Dashboard - Family Healthcare Platform
write('app/dashboard/page.tsx', `'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const green = '#10B981'
const greenLight = '#D1FAE5'
const greenBorder = '#6EE7B7'
const greenDark = '#065F46'

function AiCoach({ userName }: { userName: string }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Good morning ' + userName + '! I have reviewed your health data. Your heart rate is steady and your sleep was good last night. Today I recommend a 20-minute gentle walk after lunch and remember to drink 8 glasses of water. How are you feeling today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const txt = input.trim(); setInput('')
    const msgs = [...messages, { role: 'user', content: txt }]
    setMessages(msgs); setLoading(true)
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: msgs }) })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'I am here to help. Please try again.' }])
    } catch { setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.' }]) }
    setLoading(false)
  }

  const chips = ['How is my health today?', 'What should I eat today?', 'I feel tired', 'My heart is beating fast', 'Help me sleep better', 'I feel lonely today']

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {chips.map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: '6px 12px', borderRadius: 20, background: greenLight, border: '1px solid ' + greenBorder, fontSize: 12, color: greenDark, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>{q}</button>
        ))}
      </div>
      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, height: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ maxWidth: '88%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && <div style={{ fontSize: 10, color: green, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>VELLCARE AI</div>}
            <div style={{ padding: '12px 16px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: 14, lineHeight: 1.6, background: m.role === 'user' ? green : '#fff', color: m.role === 'user' ? '#fff' : '#1F2937', border: m.role === 'assistant' ? '1px solid #E5E7EB' : 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>VellCare AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask your AI health companion anything..." style={{ flex: 1, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '12px 16px', color: '#1F2937', fontFamily: 'inherit', fontSize: 14, outline: 'none' }} />
        <button onClick={send} style={{ width: 46, height: 46, borderRadius: 12, background: green, border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', flexShrink: 0 }}>up</button>
      </div>
    </div>
  )
}

function FamilyTab() {
  const family = [
    { name: 'Mum — Wong Mei Ling', age: 68, score: 82, status: 'Good', color: green, bg: greenLight, border: greenBorder, bpm: 72, steps: 3200, sleep: 7.2, alert: false },
    { name: 'Dad — Wong Ah Kow', age: 71, score: 71, status: 'Monitor', color: '#F59E0B', bg: '#FFFBEB', border: '#FCD34D', bpm: 88, steps: 1800, sleep: 5.8, alert: false },
    { name: 'Grandma — Lim Ah Moi', age: 82, score: 58, status: 'Warning', color: '#EF4444', bg: '#FEF2F2', border: '#FCA5A5', bpm: 98, steps: 620, sleep: 4.5, alert: true },
  ]
  const [selected, setSelected] = useState<any>(null)
  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 16, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#111827' }}>Family Health</div>
      {family[2].alert && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: '12px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', marginBottom: 3 }}>Alert — Grandma needs attention</div>
          <div style={{ fontSize: 12, color: '#991B1B' }}>Heart rate elevated at 98 BPM for 20 minutes. Sleep was only 4.5 hours. Consider calling her.</div>
          <button style={{ marginTop: 8, padding: '6px 14px', borderRadius: 8, background: '#EF4444', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Call Now</button>
        </div>
      )}
      {family.map(p => (
        <div key={p.name} onClick={() => setSelected(selected?.name === p.name ? null : p)} style={{ ...card, cursor: 'pointer', border: selected?.name === p.name ? '1.5px solid ' + p.color : '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: p.bg, border: '2px solid ' + p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: p.color, flexShrink: 0 }}>{p.score}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Age {p.age} · Updated 2 min ago</div>
            </div>
            <div style={{ padding: '5px 12px', borderRadius: 20, background: p.bg, color: p.color, fontSize: 12, fontWeight: 600, border: '1px solid ' + p.border }}>{p.status}</div>
          </div>
          {selected?.name === p.name && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 12 }}>
                {[{ l: 'Heart Rate', v: p.bpm + ' BPM', c: '#E24B4A' }, { l: 'Steps Today', v: p.steps.toLocaleString(), c: '#2196F3' }, { l: 'Sleep', v: p.sleep + ' hrs', c: '#7C4DFF' }].map(m => (
                  <div key={m.l} style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: 9, borderRadius: 9, background: green, border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Call</button>
                <button style={{ flex: 1, padding: 9, borderRadius: 9, background: greenLight, border: '1px solid ' + greenBorder, color: greenDark, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message</button>
                <button style={{ flex: 1, padding: 9, borderRadius: 9, background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#374151', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>History</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{ ...card, background: greenDark }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>Add family member</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Invite parents or grandparents to join your family health circle</div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 9, background: '#fff', border: 'none', color: greenDark, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Invite</button>
        </div>
      </div>
    </div>
  )
}

function ConnectTab() {
  const [connected, setConnected] = useState(['Apple Health', 'Samsung Health'])
  const devices = [
    { name: 'Apple Health', icon: 'A', desc: 'iPhone health data', color: '#374151' },
    { name: 'Samsung Health', icon: 'S', desc: 'Galaxy watch and phone', color: '#1E40AF' },
    { name: 'Google Fit', icon: 'G', desc: 'Android health data', color: '#DC2626' },
    { name: 'Garmin', icon: 'G', desc: 'Garmin wearables', color: '#1E3A8A' },
    { name: 'Fitbit', icon: 'F', desc: 'Fitbit devices', color: '#0891B2' },
    { name: 'Huawei Health', icon: 'H', desc: 'Huawei Band and Watch', color: '#DC2626' },
    { name: 'Whoop', icon: 'W', desc: 'Whoop band', color: '#111827' },
    { name: 'Oura Ring', icon: 'O', desc: 'Oura smart ring', color: '#7C3AED' },
    { name: 'Manual Input', icon: 'M', desc: 'Enter data manually', color: '#059669' },
  ]
  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#111827' }}>Connect Devices</div>
      <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Link your health apps and wearables to sync data automatically</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Connected ({connected.length})</div>
      {devices.map(d => {
        const isConnected = connected.includes(d.name)
        return (
          <div key={d.name} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: isConnected ? greenLight : '#F3F4F6', border: isConnected ? '1px solid ' + greenBorder : '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: isConnected ? greenDark : '#9CA3AF', flexShrink: 0 }}>{d.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{d.name}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{d.desc}</div>
            </div>
            <button onClick={() => setConnected(c => isConnected ? c.filter(x => x !== d.name) : [...c, d.name])} style={{ padding: '6px 14px', borderRadius: 8, background: isConnected ? '#FEF2F2' : greenLight, border: isConnected ? '1px solid #FCA5A5' : '1px solid ' + greenBorder, color: isConnected ? '#EF4444' : greenDark, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

function CommunityTab() {
  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 16, marginBottom: 10 }
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#111827' }}>Community</div>
      <div style={{ ...card, background: greenDark, marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Weekly Family Challenge</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Walk 70,000 steps this week as a family</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}><span>Family progress</span><span>42,400 / 70,000 steps</span></div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#6EE7B7', width: '61%', borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Wellness Groups</div>
      {[
        { name: 'Elderly Morning Walkers KL', members: 248, activity: 'Daily 7am walk reminder', joined: true },
        { name: 'Healthy Seniors Malaysia', members: 1420, activity: 'Weekly health tips', joined: true },
        { name: 'Family Care Network', members: 892, activity: 'Share caregiving advice', joined: false },
        { name: 'Heart Health Community', members: 567, activity: 'Heart health motivation', joined: false },
      ].map(g => (
        <div key={g.name} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>ok</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{g.name}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{g.members.toLocaleString()} members · {g.activity}</div>
          </div>
          <button style={{ padding: '5px 12px', borderRadius: 8, background: g.joined ? greenLight : '#F9FAFB', border: g.joined ? '1px solid ' + greenBorder : '1px solid #E5E7EB', color: g.joined ? greenDark : '#6B7280', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{g.joined ? 'Joined' : 'Join'}</button>
        </div>
      ))}
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, margin: '16px 0 10px' }}>Motivation Today</div>
      <div style={{ ...card, background: greenLight, border: '1px solid ' + greenBorder }}>
        <div style={{ fontSize: 13, color: greenDark, lineHeight: 1.7, fontStyle: 'italic' }}>"Every small step counts. A 10-minute walk today is better than no walk. Your family is proud of you."</div>
        <div style={{ fontSize: 11, color: green, fontWeight: 600, marginTop: 8 }}>— VellCare AI Daily Motivation</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [tab, setTab] = useState('home')
  const [showSos, setShowSos] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile(data || { full_name: 'Member', level: 1, xp: 0, subscription_plan: 'free' })
      })
    })
  }, [])

  async function logout() { await supabase.auth.signOut(); router.push('/') }
  async function subscribe(plan: string) {
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  const name = profile?.full_name?.split(' ')[0] || 'there'
  const wellScore = 82
  const recoveryScore = 78

  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }
  const nb = (active: boolean) => ({
    flex: 1, padding: '8px 2px', background: 'none', border: 'none',
    borderBottom: active ? '2px solid ' + green : '2px solid transparent',
    color: active ? green : '#9CA3AF',
    fontFamily: 'inherit', fontSize: 9, cursor: 'pointer',
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center' as const, gap: 3,
    textTransform: 'uppercase' as const, letterSpacing: '0.5px'
  })

  if (!profile) return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: green, fontWeight: 700, marginBottom: 8 }}>VellCareAI</div>
        <div style={{ color: '#9CA3AF', fontSize: 13 }}>Loading your health dashboard...</div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif', color: '#111827' }}>
      {showSos && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '90%', maxWidth: 380, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>sos</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444', marginBottom: 8 }}>SOS Alert Sent!</div>
            <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20, lineHeight: 1.6 }}>Your family members have been notified. Emergency contacts are being alerted via WhatsApp and SMS.</div>
            <div style={{ fontSize: 13, color: greenDark, background: greenLight, padding: '10px 14px', borderRadius: 10, marginBottom: 20, border: '1px solid ' + greenBorder }}>Your AI health coach has also noted this event and will follow up with your family.</div>
            <button onClick={() => setShowSos(false)} style={{ width: '100%', padding: 14, borderRadius: 12, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>I am OK — Cancel Alert</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px', background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>V</div>
            <span style={{ fontSize: 16, fontWeight: 700 }}>VellCare<span style={{ color: green }}>AI</span></span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowSos(true)} style={{ padding: '6px 14px', borderRadius: 8, background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#EF4444', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>SOS</button>
            <button onClick={logout} style={{ padding: '6px 12px', borderRadius: 8, background: 'none', border: '1px solid #E5E7EB', color: '#9CA3AF', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Out</button>
          </div>
        </div>

        <nav style={{ display: 'flex', padding: '0 8px', background: '#fff', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 100 }}>
          {([['home', 'Health'], ['ai', 'AI Coach'], ['family', 'Family'], ['connect', 'Devices'], ['community', 'Community']] as [string,string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={nb(tab === t)}><span style={{ fontSize: 16 }}>+</span>{label}</button>
          ))}
        </nav>

        <div style={{ padding: '16px 16px' }}>

          {tab === 'home' && (
            <div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 3 }}>{new Date().toDateString()}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>Good morning, <span style={{ color: green }}>{name}</span></div>

              {/* HERO SCORES */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div style={{ background: greenLight, border: '1px solid ' + greenBorder, borderRadius: 16, padding: '18px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: green, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Well Score</div>
                  <div style={{ fontSize: 52, fontWeight: 700, color: greenDark, lineHeight: 1 }}>{wellScore}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: green, marginTop: 6 }}>Good</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Your health looks good today</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '12px 10px' }}>
                    <div style={{ fontSize: 9, color: '#10b981', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Recovery</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#059669' }}>{recoveryScore}%</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>Strong</div>
                  </div>
                  <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '12px 10px' }}>
                    <div style={{ fontSize: 9, color: '#7C4DFF', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Heart Rate</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#E24B4A' }}>72</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>BPM · Normal</div>
                  </div>
                </div>
              </div>

              {/* AI MORNING MESSAGE */}
              <div style={{ ...card, background: greenLight, border: '1px solid ' + greenBorder }}>
                <div style={{ fontSize: 10, color: green, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>AI Morning Message</div>
                <div style={{ fontSize: 14, color: greenDark, lineHeight: 1.7 }}>Good morning! Your sleep was restful at 7.4 hours. Your heart rate is steady. Today I recommend a gentle 20-minute walk and drink 8 glasses of water. You are doing great!</div>
              </div>

              {/* METRICS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
                {[
                  { l: 'Sleep', v: '7.4', u: 'hrs', c: '#7C4DFF', bg: '#F5F3FF' },
                  { l: 'Steps', v: '3,240', u: 'steps', c: '#2196F3', bg: '#EFF6FF' },
                  { l: 'Calories', v: '1,420', u: 'kcal', c: '#F59E0B', bg: '#FFFBEB' },
                  { l: 'SpO2', v: '98', u: '%', c: green, bg: greenLight },
                  { l: 'Weight', v: '68.2', u: 'kg', c: '#FF6B35', bg: '#FFF7ED' },
                  { l: 'Stress', v: 'Low', u: '', c: green, bg: greenLight },
                ].map(m => (
                  <div key={m.l} style={{ background: m.bg, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: m.c, opacity: 0.7 }}>{m.u}</div>
                    <div style={{ fontSize: 9, color: '#6B7280', marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              {/* DAILY TIPS */}
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, margin: '14px 0 10px' }}>Today Health Tips</div>
              {[
                { emoji: 'water', tip: 'Drink a glass of water now', sub: 'You have had 3 of 8 glasses today', color: '#2196F3', bg: '#EFF6FF' },
                { emoji: 'walk', tip: 'Time for a short walk', sub: '20 minutes after lunch is ideal', color: green, bg: greenLight },
                { emoji: 'rest', tip: 'Rest reminder at 10pm', sub: 'Good sleep keeps your heart healthy', color: '#7C4DFF', bg: '#F5F3FF' },
              ].map(t => (
                <div key={t.tip} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>ok</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{t.tip}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{t.sub}</div>
                  </div>
                </div>
              ))}

              {/* SOS BUTTON */}
              <button onClick={() => setShowSos(true)} style={{ width: '100%', padding: 16, borderRadius: 14, background: '#EF4444', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>
                SOS — Alert My Family Now
              </button>
              <div style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 8 }}>Sends instant alert to all family members via WhatsApp and SMS</div>
            </div>
          )}

          {tab === 'ai' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 14, background: greenLight, borderRadius: 14, border: '1px solid ' + greenBorder }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, color: '#fff', fontWeight: 700 }}>AI</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: greenDark }}>VellCare AI Companion</div>
                  <div style={{ fontSize: 11, color: green, marginTop: 2 }}>Powered by Claude · Your personal health guardian</div>
                </div>
                <div style={{ background: green, borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#fff', fontWeight: 600 }}>LIVE</div>
              </div>
              <AiCoach userName={name} />
            </div>
          )}

          {tab === 'family' && <FamilyTab />}
          {tab === 'connect' && <ConnectTab />}
          {tab === 'community' && <CommunityTab />}

        </div>
      </div>
    </div>
  )
}
`);

// Update AI route with family healthcare context
write('app/api/ai/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: 'You are VellCare AI, a warm and caring AI health companion for VellCareAI app. You help elderly users and their families with health questions. Always speak in simple, warm, encouraging language. Never use medical jargon. If someone feels unwell, always suggest they rest, drink water, and if serious, contact their family or doctor. Give practical, caring advice. You can also provide emotional support and motivation. Keep responses concise and easy to understand for elderly users.',
      messages: messages.map((m: Message) => ({ role: m.role, content: m.content })),
    })
    const reply = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
`);

console.log('All files created!');
console.log('Run: git add . && git commit -m "pivot to AI family healthcare platform" && git push');
