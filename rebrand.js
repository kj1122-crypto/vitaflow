const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created: ' + filePath);
}

// New brand colors
// Primary green: #10B981 (emerald)
// Light green: #D1FAE5
// Border green: #6EE7B7
// Dark text: #064E3B
// Background: #FAFAFA
// White: #FFFFFF
// Accent dark: #065F46

write('app/dashboard/page.tsx', `'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const green = '#10B981'
const greenLight = '#D1FAE5'
const greenBorder = '#6EE7B7'
const greenDark = '#065F46'
const bg = '#FAFAFA'

function AiCoach({ userName }: { userName: string }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello ' + userName + '! I am your VellCareAI Health Coach powered by Claude AI. I have reviewed your health data and I am ready to guide you. What would you like to work on today?' }
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
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Sorry, please try again.' }])
    } catch { setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.' }]) }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {['Best meal for fat loss', 'Slim my waist fast', 'Marathon training plan', 'Improve my sleep', 'Build muscle fast', 'Reduce body fat'].map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: '5px 12px', borderRadius: 20, background: greenLight, border: '1px solid ' + greenBorder, fontSize: 11, color: greenDark, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>{q}</button>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 14, height: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && <div style={{ fontSize: 9, color: green, fontWeight: 600, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>VellCare AI</div>}
            <div style={{ padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.6, background: m.role === 'user' ? green : '#F9FAFB', color: m.role === 'user' ? '#fff' : '#1F2937', border: m.role === 'assistant' ? '1px solid #E5E7EB' : 'none' }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>VellCare AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask your AI health coach anything..." style={{ flex: 1, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '12px 14px', color: '#1F2937', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} />
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: 12, background: green, border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', flexShrink: 0 }}>up</button>
      </div>
    </div>
  )
}

function ChatTab() {
  const friends = [
    { id: '1', name: 'Sarah Lim', initials: 'SL', status: 'online', lastMsg: 'Great workout today!', time: '2m', unread: 2 },
    { id: '2', name: 'Mike Tan', initials: 'MT', status: 'online', lastMsg: 'Did you hit your steps goal?', time: '15m', unread: 0 },
    { id: '3', name: 'Priya K', initials: 'PK', status: 'offline', lastMsg: 'See you at marathon!', time: '1h', unread: 0 },
  ]
  const [active, setActive] = useState<any>(null)
  const [chatInput, setChatInput] = useState('')
  const [msgs, setMsgs] = useState([
    { role: 'them', text: 'Hey! How was your workout today?' },
    { role: 'me', text: 'Amazing! Hit a new PR on bench press' },
    { role: 'them', text: 'That is awesome! Keep it up!' },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const [sent, setSent] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, active])

  function sendMsg() {
    if (!chatInput.trim()) return
    setMsgs(m => [...m, { role: 'me', text: chatInput.trim() }])
    setChatInput('')
    setTimeout(() => setMsgs(m => [...m, { role: 'them', text: 'That is awesome! Keep pushing!' }]), 1000)
  }

  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14 }

  if (active) return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 0 16px', borderBottom: '1px solid #F3F4F6' }}>
        <button onClick={() => setActive(null)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 16, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>Back</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: greenLight, border: '1px solid ' + greenBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: greenDark }}>{active.initials}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{active.name}</div>
          <div style={{ fontSize: 11, color: active.status === 'online' ? green : '#9CA3AF' }}>{active.status}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8, background: bg }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 14, fontSize: 13, alignSelf: m.role === 'me' ? 'flex-end' : 'flex-start', background: m.role === 'me' ? green : '#fff', color: m.role === 'me' ? '#fff' : '#1F2937', border: m.role === 'them' ? '1px solid #E5E7EB' : 'none' }}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: '1px solid #E5E7EB', background: '#fff', fontFamily: 'inherit', fontSize: 13, outline: 'none', color: '#1F2937' }} />
        <button onClick={sendMsg} style={{ width: 40, height: 40, borderRadius: 10, background: green, border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>up</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Friends</div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '7px 14px', borderRadius: 10, background: green, border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add Friend</button>
      </div>
      {showAdd && (
        <div style={{ ...card, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: '#111827' }}>Send Friend Request</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter email or username..." style={{ flex: 1, padding: '9px 12px', borderRadius: 10, border: '1px solid #E5E7EB', background: '#fff', fontFamily: 'inherit', fontSize: 13, outline: 'none', color: '#1F2937' }} />
            <button onClick={() => { setSent(true); setTimeout(() => { setShowAdd(false); setSent(false); setSearch('') }, 2000) }} style={{ padding: '9px 14px', borderRadius: 10, background: green, border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{sent ? 'Sent!' : 'Send'}</button>
          </div>
        </div>
      )}
      <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Messages</div>
      {friends.map(f => (
        <div key={f.id} onClick={() => setActive(f)} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: greenLight, border: '1px solid ' + greenBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: greenDark }}>{f.initials}</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: f.status === 'online' ? green : '#D1D5DB', border: '2px solid #fff' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{f.name}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>{f.time}</div>
            </div>
            <div style={{ fontSize: 12, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.lastMsg}</div>
          </div>
          {f.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{f.unread}</div>}
        </div>
      ))}
      <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Friend Requests</div>
      <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#6B7280', flexShrink: 0 }}>JW</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>James Wong</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>Wants to be your friend</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ padding: '6px 12px', borderRadius: 8, background: green, border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Accept</button>
          <button style={{ padding: '6px 12px', borderRadius: 8, background: '#F3F4F6', border: 'none', color: '#6B7280', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Decline</button>
        </div>
      </div>
    </div>
  )
}

function HealthHistory() {
  const [range, setRange] = useState('7D')
  const bpm = [71, 74, 68, 76, 72, 70, 72]
  const sleep = [7.2, 6.8, 7.5, 6.5, 7.4, 8.0, 7.4]
  const steps = [8200, 6500, 9100, 7200, 7432, 10200, 8800]
  const cal = [1580, 1720, 1640, 1800, 1640, 1550, 1700]
  const labels = ['1', '2', '3', '4', '5', '6', '7']
  const maxBpm = Math.max(...bpm), maxSleep = Math.max(...sleep), maxSteps = Math.max(...steps), maxCal = Math.max(...cal)

  const BarCard = ({ title, avg, color, data, max, unit }: any) => (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 14, marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{title}</div>
        <div style={{ fontSize: 13, color, fontWeight: 600 }}>Avg: {avg} {unit}</div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50 }}>
        {data.map((v: number, i: number) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', background: color, borderRadius: '3px 3px 0 0', height: (v / max * 44) + 'px', opacity: 0.75 }} />
            <div style={{ fontSize: 9, color: '#9CA3AF' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Health History</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['7D', '2W', '1M'].map(t => (
            <button key={t} onClick={() => setRange(t)} style={{ padding: '5px 10px', borderRadius: 8, background: range === t ? green : '#F3F4F6', border: 'none', color: range === t ? '#fff' : '#6B7280', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
          ))}
        </div>
      </div>
      <BarCard title="Heart Rate" avg={Math.round(bpm.reduce((a, b) => a + b) / bpm.length)} color="#E24B4A" data={bpm} max={maxBpm} unit="BPM" />
      <BarCard title="Sleep Duration" avg={(sleep.reduce((a, b) => a + b) / sleep.length).toFixed(1)} color="#7C4DFF" data={sleep} max={maxSleep} unit="hrs" />
      <BarCard title="Daily Steps" avg={Math.round(steps.reduce((a, b) => a + b) / steps.length).toLocaleString()} color={green} data={steps} max={maxSteps} unit="" />
      <BarCard title="Calories Burned" avg={Math.round(cal.reduce((a, b) => a + b) / cal.length).toLocaleString()} color="#F59E0B" data={cal} max={maxCal} unit="kcal" />
      <div style={{ background: greenLight, border: '1px solid ' + greenBorder, borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: greenDark }}>VellCare Watch</div>
          <div style={{ fontSize: 11, color: green, fontWeight: 500 }}>Connected</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ l: 'Heart Rate', v: '72 BPM', c: '#E24B4A' }, { l: 'Active Time', v: '1h 24m', c: green }, { l: 'Weather', v: '31C Cloudy', c: '#2196F3' }, { l: 'Location', v: 'KL, Malaysia', c: greenDark }].map(m => (
            <div key={m.l} style={{ background: '#fff', borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}>{m.l}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: m.c }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PdpaModal({ onAgree }: { onAgree: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480, maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Data Privacy Agreement</div>
        <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.8, marginBottom: 20 }}>
          In accordance with PDPA, VellCareAI collects: heart rate, calories, sleep, steps, weight, SpO2, GPS during workouts, and connected device data. Your data is encrypted, never sold, and deletable anytime upon request.
        </div>
        <button onClick={onAgree} style={{ width: '100%', padding: 14, borderRadius: 12, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>I Agree and Continue</button>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF' }}>Withdraw consent anytime in Settings</div>
      </div>
    </div>
  )
}

function OnboardingGuide({ step, onClose, onNext }: { step: number, onClose: () => void, onNext: () => void }) {
  const steps = [
    { title: 'Welcome to VellCareAI', desc: 'Your Super AI Health companion. Track health, earn rewards, and connect with friends on your wellness journey.', icon: 'home' },
    { title: 'AI Health Coach', desc: 'Chat with Claude AI anytime. Personalized meal plans, workout advice, and body slimming tips.', icon: 'brain' },
    { title: 'Earn XP and Rewards', desc: 'Complete daily quests. Redeem XP for smart watches, vouchers, and exclusive prizes!', icon: 'quest' },
    { title: 'Friends and Chat', desc: 'Add friends, share progress, and motivate each other on your health journey.', icon: 'chat' },
    { title: 'Health Tracking', desc: 'Connect your smartwatch to auto-sync BPM, calories, sleep and more. Up to 1 month history.', icon: 'watch' },
  ]
  const s = steps[step] || steps[0]
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid ' + greenBorder }}>
            <span style={{ fontSize: 28 }}>+</span>
          </div>
          <div style={{ fontSize: 11, color: green, fontWeight: 600, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Step {step + 1} of {steps.length}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{s.title}</div>
          <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{s.desc}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
          {steps.map((_, i) => (<div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? green : '#E5E7EB', transition: 'all 0.3s' }} />))}
        </div>
        <button onClick={onNext} style={{ width: '100%', padding: 14, borderRadius: 12, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
          {step < steps.length - 1 ? 'Next' : 'Get Started!'}
        </button>
        <button onClick={onClose} style={{ width: '100%', padding: 10, borderRadius: 12, background: 'none', border: 'none', color: '#9CA3AF', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Skip tour</button>
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
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const [showGuide, setShowGuide] = useState(false)
  const [guideStep, setGuideStep] = useState(0)
  const [showPdpa, setShowPdpa] = useState(false)
  const [pdpaAgreed, setPdpaAgreed] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile(data || { full_name: 'Member', level: 1, xp: 2480, subscription_plan: 'free' })
        setShowGuide(true)
      })
    })
  }, [])

  async function logout() { await supabase.auth.signOut(); router.push('/') }
  async function subscribe(plan: string) {
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  const isPro = profile?.subscription_plan === 'monthly' || profile?.subscription_plan === 'annual' || profile?.subscription_plan === 'platinum'
  const name = profile?.full_name?.split(' ')[0] || 'Member'
  const userXp = profile?.xp || 2480
  const level = profile?.level || 1
  const wellScore = 82
  const recoveryScore = 78
  const wellAge = 29

  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }
  const greenCardStyle = { background: greenLight, border: '1px solid ' + greenBorder, borderRadius: 16, padding: 16, marginBottom: 12 }

  const nb = (active: boolean) => ({
    flex: 1, padding: '8px 2px', background: 'none', border: 'none',
    borderBottom: active ? '2px solid ' + green : '2px solid transparent',
    color: active ? green : '#9CA3AF',
    fontFamily: 'inherit', fontSize: 9, cursor: 'pointer',
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center' as const, gap: 3,
    textTransform: 'uppercase' as const, letterSpacing: '0.5px'
  })

  const REWARDS = [
    { name: 'VellCare Watch', xp: 50000, unlocked: userXp >= 50000 },
    { name: 'Smart Scale', xp: 20000, unlocked: userXp >= 20000 },
    { name: 'KFC RM50', xp: 5000, unlocked: userXp >= 5000 },
    { name: 'McDonalds RM50', xp: 5000, unlocked: userXp >= 5000 },
    { name: 'Marathon Entry', xp: 8000, unlocked: userXp >= 8000 },
    { name: 'Earbuds', xp: 15000, unlocked: userXp >= 15000 },
  ]

  if (!profile) return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system,sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, color: green, fontWeight: 700, marginBottom: 8 }}>VellCareAI</div>
        <div style={{ color: '#9CA3AF', fontSize: 13 }}>Loading your health dashboard...</div>
      </div>
    </div>
  )

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif', color: '#111827' }}>
      {showPdpa && <PdpaModal onAgree={() => { setPdpaAgreed(true); setShowPdpa(false) }} />}
      {showGuide && <OnboardingGuide step={guideStep} onClose={() => setShowGuide(false)} onNext={() => { if (guideStep < 4) setGuideStep(g => g + 1); else setShowGuide(false) }} />}

      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 80 }}>

        {/* TOP BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px', background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>V</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>VellCare<span style={{ color: green }}>AI</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isPro && <div style={{ background: greenLight, border: '1px solid ' + greenBorder, borderRadius: 20, padding: '3px 10px', fontSize: 10, color: greenDark, fontWeight: 600 }}>PRO</div>}
            <button onClick={logout} style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: 8, padding: '5px 10px', color: '#9CA3AF', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>Sign out</button>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ display: 'flex', padding: '0 8px', background: '#fff', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 100 }}>
          {([['home', 'Home'], ['ai', 'AI Coach'], ['health', 'History'], ['chat', 'Friends'], ['pro', 'Plans']] as [string, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={nb(tab === t)}><span style={{ fontSize: 16 }}>+</span>{label}</button>
          ))}
        </nav>

        <div style={{ padding: tab === 'chat' ? '16px' : '20px 16px' }}>

          {/* HOME */}
          {tab === 'home' && (
            <div>
              <div style={{ marginBottom: 4, fontSize: 12, color: '#9CA3AF' }}>{new Date().toDateString()}</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
                Good morning, <span style={{ color: green }}>{name}</span> 
              </div>

              {/* HERO SCORES */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div style={{ ...greenCardStyle, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: green, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>WellScore</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: greenDark, lineHeight: 1 }}>{wellScore}</div>
                  <div style={{ fontSize: 10, color: '#6B7280', marginTop: 4 }}>out of 100</div>
                </div>
                <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: '#10b981', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Recovery</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#059669', lineHeight: 1 }}>{recoveryScore}%</div>
                  <div style={{ fontSize: 10, color: '#6B7280', marginTop: 4 }}>Strong</div>
                </div>
                <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: '#7C4DFF', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>WellAge</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#7C4DFF', lineHeight: 1 }}>{wellAge}</div>
                  <div style={{ fontSize: 10, color: '#6B7280', marginTop: 4 }}>bio age</div>
                </div>
              </div>

              {/* XP BAR */}
              <div style={{ ...card, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Level {level} Wellness Warrior</div>
                  <div style={{ fontSize: 11, color: green, fontWeight: 600 }}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,' + green + ',#059669)', width: Math.min((userXp / 3000) * 100, 100) + '%', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 5 }}>{userXp.toLocaleString()} / 3,000 XP to Level {level + 1}</div>
              </div>

              {/* BIOMETRICS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
                {[
                  { l: 'Heart Rate', v: '72', u: 'BPM', c: '#E24B4A', bg: '#FEF2F2' },
                  { l: 'Sleep', v: '7.4', u: 'hrs', c: '#7C4DFF', bg: '#F5F3FF' },
                  { l: 'Steps', v: '7,432', u: 'steps', c: '#2196F3', bg: '#EFF6FF' },
                  { l: 'Calories', v: '1,640', u: 'kcal', c: '#D97706', bg: '#FFFBEB' },
                  { l: 'SpO2', v: '98', u: '%', c: green, bg: greenLight },
                  { l: 'Weight', v: '68.2', u: 'kg', c: '#FF6B35', bg: '#FFF7ED' },
                ].map(m => (
                  <div key={m.l} style={{ background: m.bg, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: m.c, opacity: 0.7 }}>{m.u}</div>
                    <div style={{ fontSize: 9, color: '#6B7280', marginTop: 3 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              {/* TODAY PLAN */}
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Today Plan</div>
              {[
                { title: 'Grilled Salmon Bowl', sub: 'Lunch - 480 kcal - 42g protein', id: 'm1' },
                { title: 'Upper Body Strength', sub: '5:30 PM - 45 min - 320 kcal', id: 'w1' },
                { title: 'Quinoa Veggie Stir-fry', sub: 'Dinner - 390 kcal', id: 'm2' },
              ].map(item => (
                <div key={item.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, color: green, fontWeight: 700 }}>+</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>{item.sub}</div>
                  </div>
                  <div onClick={() => setChecks(c => ({ ...c, [item.id]: !c[item.id] }))} style={{ width: 26, height: 26, borderRadius: '50%', border: checks[item.id] ? 'none' : '1.5px solid #E5E7EB', background: checks[item.id] ? green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, color: '#fff', flexShrink: 0 }}>{checks[item.id] ? 'ok' : ''}</div>
                </div>
              ))}

              {/* CAMPAIGNS */}
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Active Campaigns</div>
              {[
                { name: 'KL Marathon 2026', date: 'Jun 15 - Earn 2,000 XP', color: '#2196F3', bg: '#EFF6FF' },
                { name: 'Badminton Tournament', date: 'Jul 8 - Earn 1,500 XP', color: green, bg: greenLight },
                { name: 'Pickleball Open', date: 'Jul 22 - Earn 1,500 XP', color: '#FF6B35', bg: '#FFF7ED' },
              ].map(c2 => (
                <div key={c2.name} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: c2.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>+</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>{c2.name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>{c2.date}</div>
                  </div>
                  <button style={{ padding: '5px 12px', borderRadius: 8, background: c2.bg, border: 'none', color: c2.color, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Join</button>
                </div>
              ))}

              {/* DEVICE */}
              <div style={{ background: greenDark, borderRadius: 16, padding: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Connect VellCare Watch</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Auto-sync BPM, calories, sleep and GPS</div>
                </div>
                <button onClick={() => { if (!pdpaAgreed) setShowPdpa(true) }} style={{ padding: '8px 14px', borderRadius: 10, background: '#fff', border: 'none', color: greenDark, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Connect</button>
              </div>
              {pdpaAgreed && <div style={{ fontSize: 11, color: green, marginTop: -8, marginBottom: 12, paddingLeft: 4 }}>PDPA agreed - Ready to sync</div>}
            </div>
          )}

          {/* AI COACH */}
          {tab === 'ai' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 14, ...greenCardStyle, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, color: '#fff', fontWeight: 700 }}>AI</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: greenDark }}>VellCare AI Coach</div>
                  <div style={{ fontSize: 11, color: green, marginTop: 2 }}>Powered by Claude - Personalized to you</div>
                </div>
                <div style={{ background: green, borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#fff', fontWeight: 600 }}>LIVE</div>
              </div>
              <AiCoach userName={name} />
              <div style={{ ...card, marginTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: '#374151' }}>Body Targeting Guide</div>
                {[
                  { area: 'Slim waist', sports: 'Swimming, Pilates, Yoga', gym: 'Cable crunches, Russian twists' },
                  { area: 'Tone thighs', sports: 'Cycling, Badminton, Running', gym: 'Squats, Lunges, Leg press' },
                  { area: 'Flat belly', sports: 'Swimming, HIIT, Tennis', gym: 'Planks, Deadlifts, Leg raises' },
                ].map(b => (
                  <div key={b.area} style={{ padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3 }}>{b.area}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>Sports: {b.sports}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>Gym: {b.gym}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'health' && <HealthHistory />}
          {tab === 'chat' && <ChatTab />}

          {/* PLANS */}
          {tab === 'pro' && (
            <div>
              <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: '1px solid ' + greenBorder }}>
                  <span style={{ fontSize: 24, color: green }}>+</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>VellCareAI Plans</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Choose your health journey</div>
              </div>

              <div style={card}>
                <div style={{ display: 'inline-block', background: '#F3F4F6', color: '#6B7280', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>FREE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Starter</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>Forever free</div></div>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>$0</div>
                </div>
                {['Basic health tracking', '3 AI messages/day', 'XP quests and leaderboard', 'Friends and chat'].map(f => <div key={f} style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: green }}>ok</span>{f}</div>)}
              </div>

              <div style={{ ...card, border: '1.5px solid ' + green }}>
                <div style={{ display: 'inline-block', background: greenLight, color: greenDark, fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>MONTHLY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>Per month</div></div>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>$9.99</div>
                </div>
                {['Unlimited AI coach', 'Advanced analytics', 'Workout video library', 'Smart device sync', 'Custom meal plans', 'Health history 1 month'].map(f => <div key={f} style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: green }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('monthly')} style={{ width: '100%', padding: 12, borderRadius: 12, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ ...card, border: '1.5px solid #059669' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: greenLight, color: greenDark, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>ANNUAL</div>
                  <div style={{ display: 'inline-block', background: greenLight, color: greenDark, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Save 40%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Annual</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>$71.88 billed yearly</div></div>
                  <div><div style={{ fontSize: 26, fontWeight: 700 }}>$5.99</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>/mo</div></div>
                </div>
                {['All Pro Monthly features', 'Gym partner discounts', 'Priority AI coaching', 'Full nutrition plans', 'Early feature access'].map(f => <div key={f} style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: green }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('annual')} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#059669', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ background: greenDark, borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid #047857' }}>
                <div style={{ display: 'inline-block', background: '#fff', color: greenDark, fontSize: 10, padding: '2px 10px', borderRadius: 20, marginBottom: 12, fontWeight: 700 }}>PLATINUM ELITE</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Concierge Health Program</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[{ label: 'Monthly', price: '$199' }, { label: 'Quarterly', price: '$499' }, { label: 'Annual', price: '$1,399' }].map(p => (
                    <div key={p.label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{p.price}</div>
                    </div>
                  ))}
                </div>
                {['Private 1-on-1 health coach monthly', 'Monthly blood test analysis', 'Exclusive VellCare Watch gifted', 'VIP marathon and sports event access', 'Unlimited AI nutrition and health coaching', '24/7 health concierge support hotline', 'Annual comprehensive health report', 'Priority personal onboarding call'].map(f => (
                  <div key={f} style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 7, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#6EE7B7', flexShrink: 0 }}>ok</span>{f}</div>
                ))}
                <button style={{ width: '100%', padding: 14, borderRadius: 12, background: '#fff', border: 'none', color: greenDark, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 14 }}>Apply for Platinum Elite</button>
                <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>Limited spots - Personal onboarding call included</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
`);

// Also update the landing page
write('app/page.tsx', `'use client'
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
`);

// Update signup page
write('app/signup/page.tsx', `'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const green = '#10B981'
const greenLight = '#D1FAE5'
const greenDark = '#065F46'

export default function Signup() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handle(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.name }, emailRedirectTo: window.location.origin + '/dashboard' } })
    if (error) { setError(error.message); setLoading(false) } else { router.push('/dashboard') }
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
          <div style={{ fontSize: 14, color: '#6B7280' }}>Create your health profile</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input style={inp} placeholder="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input style={inp} type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input style={inp} type="password" placeholder="Password (min 8 chars)" required minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            {error && <div style={{ fontSize: 13, color: '#EF4444', background: '#FEF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ padding: 13, borderRadius: 12, background: green, border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 16 }}>Already have an account? <Link href="/login" style={{ color: green, textDecoration: 'none', fontWeight: 500 }}>Sign in</Link></p>
      </div>
    </div>
  )
}
`);

// Update login page
write('app/login/page.tsx', `'use client'
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
`);

console.log('\nAll done! Now run:');
console.log('git add .');
console.log('git commit -m "rebrand to VellCareAI white green design"');
console.log('git push');
