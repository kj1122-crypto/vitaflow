const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created: ' + filePath);
}

write('app/dashboard/page.tsx', `'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

function AiCoach({ userName }: { userName: string }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello ' + userName + '. I have analysed your biometrics. Your recovery is strong today at 78%. Want a workout plan or nutrition advice?' }
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {['Best meal for fat loss', 'Slim my waist fast', 'Marathon training plan', 'Improve my sleep', 'Build muscle fast', 'Reduce body fat'].map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)', fontSize: 11, color: '#D4A017', cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
        ))}
      </div>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 14, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, minHeight: 260 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && <div style={{ fontSize: 9, color: '#D4A017', fontWeight: 600, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>VitaCore AI</div>}
            <div style={{ padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.6, background: m.role === 'user' ? '#D4A017' : 'rgba(255,255,255,0.06)', color: m.role === 'user' ? '#000' : '#e0e0e0', border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>VitaCore AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask your AI health coach anything..." style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 14px', color: '#fff', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} />
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: 12, background: '#D4A017', border: 'none', color: '#000', fontSize: 18, cursor: 'pointer', flexShrink: 0, fontWeight: 700 }}>up</button>
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

  const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14 }

  if (active) return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => setActive(null)} style={{ background: 'none', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer', padding: 0 }}>back</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#D4A017' }}>{active.initials}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{active.name}</div>
          <div style={{ fontSize: 11, color: active.status === 'online' ? '#10b981' : '#555' }}>{active.status}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 14, fontSize: 13, alignSelf: m.role === 'me' ? 'flex-end' : 'flex-start', background: m.role === 'me' ? '#D4A017' : 'rgba(255,255,255,0.06)', color: m.role === 'me' ? '#000' : '#e0e0e0' }}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontFamily: 'inherit', fontSize: 13, outline: 'none', color: '#fff' }} />
        <button onClick={sendMsg} style={{ width: 40, height: 40, borderRadius: 10, background: '#D4A017', border: 'none', color: '#000', fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>up</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Friends</div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '7px 14px', borderRadius: 10, background: '#D4A017', border: 'none', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add Friend</button>
      </div>
      {showAdd && (
        <div style={{ ...card, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: '#fff' }}>Send Friend Request</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter email or username..." style={{ flex: 1, padding: '9px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontFamily: 'inherit', fontSize: 13, outline: 'none', color: '#fff' }} />
            <button onClick={() => { setSent(true); setTimeout(() => { setShowAdd(false); setSent(false); setSearch('') }, 2000) }} style={{ padding: '9px 14px', borderRadius: 10, background: '#D4A017', border: 'none', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{sent ? 'Sent!' : 'Send'}</button>
          </div>
        </div>
      )}
      <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Messages</div>
      {friends.map(f => (
        <div key={f.id} onClick={() => setActive(f)} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginBottom: 8, cursor: 'pointer' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#D4A017' }}>{f.initials}</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: f.status === 'online' ? '#10b981' : '#333', border: '2px solid #111' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{f.name}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{f.time}</div>
            </div>
            <div style={{ fontSize: 12, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.lastMsg}</div>
          </div>
          {f.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#000', fontWeight: 700, flexShrink: 0 }}>{f.unread}</div>}
        </div>
      ))}
      <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Friend Requests</div>
      <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#888', flexShrink: 0 }}>JW</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>James Wong</div>
          <div style={{ fontSize: 11, color: '#555' }}>Wants to be your friend</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ padding: '6px 12px', borderRadius: 8, background: '#D4A017', border: 'none', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Accept</button>
          <button style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: 'none', color: '#888', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Decline</button>
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

  const Card = ({ title, avg, color, data, max, unit }: any) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>{title}</div>
        <div style={{ fontSize: 13, color, fontWeight: 600 }}>Avg: {avg} {unit}</div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50 }}>
        {data.map((v: number, i: number) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', background: color, borderRadius: '3px 3px 0 0', height: (v / max * 44) + 'px', opacity: 0.8 }} />
            <div style={{ fontSize: 9, color: '#444' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Health History</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['7D', '2W', '1M'].map(t => (
            <button key={t} onClick={() => setRange(t)} style={{ padding: '5px 10px', borderRadius: 8, background: range === t ? '#D4A017' : 'rgba(255,255,255,0.06)', border: 'none', color: range === t ? '#000' : '#666', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
          ))}
        </div>
      </div>
      <Card title="Heart Rate" avg={Math.round(bpm.reduce((a, b) => a + b) / bpm.length)} color="#E24B4A" data={bpm} max={maxBpm} unit="BPM" />
      <Card title="Sleep Duration" avg={(sleep.reduce((a, b) => a + b) / sleep.length).toFixed(1)} color="#7C4DFF" data={sleep} max={maxSleep} unit="hrs" />
      <Card title="Daily Steps" avg={Math.round(steps.reduce((a, b) => a + b) / steps.length).toLocaleString()} color="#2196F3" data={steps} max={maxSteps} unit="" />
      <Card title="Calories Burned" avg={Math.round(cal.reduce((a, b) => a + b) / cal.length).toLocaleString()} color="#D4A017" data={cal} max={maxCal} unit="kcal" />
      <div style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>VitaCore Watch</div>
          <div style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>Connected</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ l: 'Heart Rate', v: '72 BPM', c: '#E24B4A' }, { l: 'Active Time', v: '1h 24m', c: '#10b981' }, { l: 'Weather', v: '31C Cloudy', c: '#2196F3' }, { l: 'Location', v: 'KL, Malaysia', c: '#D4A017' }].map(m => (
            <div key={m.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 2 }}>{m.l}</div>
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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#161616', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480, maxHeight: '80vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Data Privacy Agreement</div>
        <div style={{ fontSize: 13, color: '#888', lineHeight: 1.8, marginBottom: 20 }}>
          In accordance with PDPA, VitaCore collects: heart rate, calories, sleep, steps, weight, SpO2, GPS during workouts, and connected device data. Your data is encrypted, never sold, and deletable anytime.
        </div>
        <button onClick={onAgree} style={{ width: '100%', padding: 14, borderRadius: 12, background: '#D4A017', border: 'none', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>I Agree and Continue</button>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#444' }}>Withdraw consent anytime in Settings</div>
      </div>
    </div>
  )
}

function OnboardingGuide({ step, onClose, onNext }: { step: number, onClose: () => void, onNext: () => void }) {
  const steps = [
    { title: 'Welcome to VitaCore', desc: 'Your premium AI health companion. Track health, earn rewards, and connect with friends.', icon: 'home' },
    { title: 'AI Health Coach', desc: 'Chat with Claude AI anytime. Personalized meal plans, workouts, and body slimming tips.', icon: 'brain' },
    { title: 'Earn XP and Rewards', desc: 'Complete daily quests. Redeem XP for smart watches, vouchers, and exclusive prizes!', icon: 'quest' },
    { title: 'Friends and Chat', desc: 'Add friends, share progress, and motivate each other on your health journey.', icon: 'chat' },
    { title: 'Health Tracking', desc: 'Connect your smartwatch to auto-sync BPM, calories, sleep and more.', icon: 'watch' },
  ]
  const s = steps[step] || steps[0]
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#161616', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>star</div>
          <div style={{ fontSize: 11, color: '#D4A017', fontWeight: 600, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Step {step + 1} of {steps.length}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</div>
          <div style={{ fontSize: 14, color: '#888', lineHeight: 1.7 }}>{s.desc}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
          {steps.map((_, i) => (<div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? '#D4A017' : '#333', transition: 'all 0.3s' }} />))}
        </div>
        <button onClick={onNext} style={{ width: '100%', padding: 14, borderRadius: 12, background: '#D4A017', border: 'none', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
          {step < steps.length - 1 ? 'Next' : 'Get Started!'}
        </button>
        <button onClick={onClose} style={{ width: '100%', padding: 10, borderRadius: 12, background: 'none', border: 'none', color: '#444', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Skip tour</button>
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
  const [billingPlan, setBillingPlan] = useState('monthly')

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

  const vitaScore = 82
  const recoveryScore = 78
  const vitaAge = 29

  const bg = '#0D0D0D'
  const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 16, marginBottom: 12 }
  const goldCard = { background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 16, padding: 16, marginBottom: 12 }

  const nb = (active: boolean) => ({
    flex: 1, padding: '8px 2px', background: 'none', border: 'none',
    borderTop: active ? '2px solid #D4A017' : '2px solid transparent',
    color: active ? '#D4A017' : '#444',
    fontFamily: 'inherit', fontSize: 9, cursor: 'pointer',
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center' as const, gap: 3,
    textTransform: 'uppercase' as const, letterSpacing: '0.5px'
  })

  const REWARDS = [
    { name: 'VitaCore Watch', xp: 50000, unlocked: userXp >= 50000 },
    { name: 'Smart Scale', xp: 20000, unlocked: userXp >= 20000 },
    { name: 'KFC RM50', xp: 5000, unlocked: userXp >= 5000 },
    { name: 'McDonalds RM50', xp: 5000, unlocked: userXp >= 5000 },
    { name: 'Marathon Entry', xp: 8000, unlocked: userXp >= 8000 },
    { name: 'Earbuds', xp: 15000, unlocked: userXp >= 15000 },
  ]

  if (!profile) return (
    <div style={{ background: bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system,sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, color: '#D4A017', marginBottom: 8 }}>V</div>
        <div style={{ color: '#444', fontSize: 13 }}>Loading VitaCore...</div>
      </div>
    </div>
  )

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif', color: '#fff' }}>
      {showPdpa && <PdpaModal onAgree={() => { setPdpaAgreed(true); setShowPdpa(false) }} />}
      {showGuide && <OnboardingGuide step={guideStep} onClose={() => setShowGuide(false)} onNext={() => { if (guideStep < 4) setGuideStep(g => g + 1); else setShowGuide(false) }} />}

      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 80 }}>

        {/* TOP BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>VITA<span style={{ color: '#D4A017' }}>CORE</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isPro && <div style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: 20, padding: '3px 10px', fontSize: 10, color: '#D4A017', fontWeight: 600 }}>PRO</div>}
            <button onClick={logout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 10px', color: '#555', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>Out</button>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <nav style={{ display: 'flex', padding: '0 8px', position: 'sticky', top: 0, background: 'rgba(13,13,13,0.95)', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
          {([['home', 'Home'], ['ai', 'AI Coach'], ['health', 'History'], ['chat', 'Friends'], ['pro', 'Plans']] as [string, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={nb(tab === t)}><span style={{ fontSize: 16 }}>*</span>{label}</button>
          ))}
        </nav>

        <div style={{ padding: tab === 'chat' ? '16px' : '20px 16px' }}>

          {/* HOME */}
          {tab === 'home' && (
            <div>
              <div style={{ marginBottom: 6, fontSize: 12, color: '#444' }}>{new Date().toDateString()}</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Good morning, <span style={{ color: '#D4A017' }}>{name}</span></div>

              {/* HERO SCORES */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div style={{ ...goldCard, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: '#D4A017', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>VitaScore</div>
                  <div style={{ fontSize: 38, fontWeight: 700, color: '#D4A017', lineHeight: 1 }}>{vitaScore}</div>
                  <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>out of 100</div>
                </div>
                <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: '#10b981', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Recovery</div>
                  <div style={{ fontSize: 38, fontWeight: 700, color: '#10b981', lineHeight: 1 }}>{recoveryScore}%</div>
                  <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>Strong</div>
                </div>
                <div style={{ ...card, marginBottom: 0, textAlign: 'center', padding: '18px 10px' }}>
                  <div style={{ fontSize: 9, color: '#7C4DFF', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>VitaAge</div>
                  <div style={{ fontSize: 38, fontWeight: 700, color: '#7C4DFF', lineHeight: 1 }}>{vitaAge}</div>
                  <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>bio age</div>
                </div>
              </div>

              {/* XP BAR */}
              <div style={{ ...card, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#ccc' }}>Level {level} Fitness Warrior</div>
                  <div style={{ fontSize: 11, color: '#D4A017', fontWeight: 600 }}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,#D4A017,#B8860B)', width: Math.min((userXp / 3000) * 100, 100) + '%', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 10, color: '#444', marginTop: 5 }}>{userXp.toLocaleString()} / 3,000 XP to Level {level + 1}</div>
              </div>

              {/* BIOMETRICS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
                {[
                  { l: 'Heart Rate', v: '72', u: 'BPM', c: '#E24B4A' },
                  { l: 'Sleep', v: '7.4', u: 'hrs', c: '#7C4DFF' },
                  { l: 'Steps', v: '7,432', u: '', c: '#2196F3' },
                  { l: 'Calories', v: '1,640', u: 'kcal', c: '#D4A017' },
                  { l: 'SpO2', v: '98', u: '%', c: '#10b981' },
                  { l: 'Weight', v: '68.2', u: 'kg', c: '#FF6B35' },
                ].map(m => (
                  <div key={m.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: m.c, opacity: 0.6 }}>{m.u}</div>
                    <div style={{ fontSize: 9, color: '#444', marginTop: 3 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              {/* TODAY PLAN */}
              <div style={{ fontSize: 10, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Today Plan</div>
              {[
                { icon: 'salad', title: 'Grilled Salmon Bowl', sub: 'Lunch - 480 kcal - 42g protein', id: 'm1' },
                { icon: 'gym', title: 'Upper Body Strength', sub: '5:30 PM - 45 min - 320 kcal', id: 'w1' },
                { icon: 'moon', title: 'Quinoa Veggie Stir-fry', sub: 'Dinner - 390 kcal', id: 'm2' },
              ].map(item => (
                <div key={item.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>*</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>{item.sub}</div>
                  </div>
                  <div onClick={() => setChecks(c => ({ ...c, [item.id]: !c[item.id] }))} style={{ width: 26, height: 26, borderRadius: '50%', border: checks[item.id] ? 'none' : '1.5px solid #333', background: checks[item.id] ? '#10b981' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, color: '#000', flexShrink: 0 }}>{checks[item.id] ? 'ok' : ''}</div>
                </div>
              ))}

              {/* CAMPAIGNS */}
              <div style={{ fontSize: 10, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Active Campaigns</div>
              {[
                { name: 'KL Marathon 2026', date: 'Jun 15 - Earn 2,000 XP', color: '#2196F3' },
                { name: 'Badminton Tournament', date: 'Jul 8 - Earn 1,500 XP', color: '#10b981' },
                { name: 'Pickleball Open', date: 'Jul 22 - Earn 1,500 XP', color: '#FF6B35' },
              ].map(c2 => (
                <div key={c2.name} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{c2.name}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>{c2.date}</div>
                  </div>
                  <button style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: 'none', color: c2.color, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Join</button>
                </div>
              ))}

              {/* DEVICE */}
              <div style={{ ...goldCard, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Connect Smartwatch</div>
                  <div style={{ fontSize: 11, color: '#666' }}>Auto-sync BPM, calories, sleep and GPS location</div>
                </div>
                <button onClick={() => { if (!pdpaAgreed) setShowPdpa(true) }} style={{ padding: '8px 14px', borderRadius: 10, background: '#D4A017', border: 'none', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Connect</button>
              </div>
              {pdpaAgreed && <div style={{ fontSize: 11, color: '#10b981', marginTop: -8, marginBottom: 12, paddingLeft: 4 }}>PDPA agreed - Ready to sync</div>}
            </div>
          )}

          {/* AI COACH */}
          {tab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 14, ...goldCard, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, color: '#000', fontWeight: 700 }}>AI</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>VitaCore AI Coach</div>
                  <div style={{ fontSize: 11, color: '#D4A017', marginTop: 2 }}>Powered by Claude - Personalized to you</div>
                </div>
                <div style={{ background: '#10b981', borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#fff', fontWeight: 600 }}>LIVE</div>
              </div>
              <div style={{ flex: 1 }}>
                <AiCoach userName={name} />
              </div>
              <div style={{ ...card, marginTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: '#ccc' }}>Body Targeting Guide</div>
                {[
                  { area: 'Slim waist', sports: 'Swimming, Pilates, Yoga', gym: 'Cable crunches, Russian twists' },
                  { area: 'Tone thighs', sports: 'Cycling, Badminton, Running', gym: 'Squats, Lunges, Leg press' },
                  { area: 'Flat belly', sports: 'Swimming, HIIT, Tennis', gym: 'Planks, Deadlifts, Leg raises' },
                ].map(b => (
                  <div key={b.area} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{b.area}</div>
                    <div style={{ fontSize: 11, color: '#555' }}>Sports: {b.sports}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>Gym: {b.gym}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'health' && <HealthHistory />}
          {tab === 'chat' && <ChatTab />}

          {/* QUEST */}
          {tab === 'quest' && (
            <div>
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1 }}>Level {level} Fitness Warrior</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{name} Quest</div>
                  </div>
                  <div style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.25)', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: '#D4A017', fontWeight: 700 }}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,#D4A017,#B8860B)', width: Math.min((userXp / 3000) * 100, 100) + '%', borderRadius: 3 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
                  {[{ s: 'STR 84', c: '#E24B4A' }, { s: 'END 71', c: '#2196F3' }, { s: 'VIT 90', c: '#10b981' }].map(s2 => (
                    <div key={s2.s} style={{ textAlign: 'center', padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: s2.c }}>{s2.s}</div>
                    </div>
                  ))}
                </div>
                {[
                  { name: 'Burn 1,800 calories', prog: '1,247/1,800', pct: 69, xp: '+150 XP', done: false },
                  { name: 'Log all 3 meals', prog: '2/3 meals', pct: 66, xp: '+80 XP', done: false },
                  { name: 'Drink 2.5L water', prog: '1.6/2.5L', pct: 64, xp: '+60 XP', done: false },
                  { name: 'Sleep 7+ hours', prog: 'Completed!', pct: 100, xp: '+100 XP', done: true },
                ].map(q => (
                  <div key={q.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: q.done ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)', borderRadius: 12, border: q.done ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{q.name}</div>
                      <div style={{ fontSize: 11, color: q.done ? '#10b981' : '#555', marginTop: 2 }}>{q.prog}</div>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: q.done ? '#10b981' : '#D4A017', width: q.pct + '%', borderRadius: 2 }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: q.done ? '#10b981' : '#D4A017', fontWeight: 700, flexShrink: 0 }}>{q.xp}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>Weekly Leaderboard - Top 3 Win Prizes</div>
              <div style={card}>
                {[
                  { rank: '1', name: 'ZenFit Sara', xp: '3,240', prize: 'VitaCore Watch', c: '#D4A017' },
                  { rank: '2', name: name + ' (You)', xp: userXp.toLocaleString(), prize: 'RM50 KFC Voucher', c: '#888' },
                  { rank: '3', name: 'IronMike KL', xp: '2,150', prize: "RM50 McDonalds", c: '#CD7F32' },
                ].map(l => (
                  <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: 18, width: 30, textAlign: 'center', color: l.c, fontWeight: 700 }}>{l.rank}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: '#D4A017' }}>{l.prize}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: l.c, fontSize: 13 }}>{l.xp}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: 1, margin: '16px 0 10px' }}>XP Reward Store</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {REWARDS.map(r => (
                  <div key={r.name} style={{ background: r.unlocked ? 'rgba(212,160,23,0.08)' : 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 12, textAlign: 'center', border: r.unlocked ? '1px solid rgba(212,160,23,0.2)' : '1px solid rgba(255,255,255,0.05)', opacity: r.unlocked ? 1 : 0.5 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: '#D4A017' }}>{r.xp.toLocaleString()} XP</div>
                    {r.unlocked && <button style={{ marginTop: 6, padding: '3px 8px', borderRadius: 6, background: '#D4A017', border: 'none', color: '#000', fontSize: 9, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Redeem</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLANS */}
          {tab === 'pro' && (
            <div>
              <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                <div style={{ fontSize: 32, marginBottom: 8, color: '#D4A017' }}>crown</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>VitaCore Plans</div>
                <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>Choose your health journey</div>
              </div>
              <div style={{ ...card }}>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: '#666', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>FREE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Starter</div><div style={{ fontSize: 11, color: '#555' }}>Forever free</div></div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>$0</div>
                </div>
                {['Basic health tracking', '3 AI messages/day', 'XP quests and leaderboard', 'Friends and chat'].map(f => <div key={f} style={{ fontSize: 12, color: '#555', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#10b981' }}>ok</span>{f}</div>)}
              </div>
              <div style={{ ...card, border: '1px solid #2196F3' }}>
                <div style={{ display: 'inline-block', background: 'rgba(33,150,243,0.15)', color: '#2196F3', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>MONTHLY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Pro</div><div style={{ fontSize: 11, color: '#555' }}>Per month</div></div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>$9.99</div>
                </div>
                {['Unlimited AI coach', 'Advanced analytics', 'Workout video library', 'Smart device sync', 'Custom meal plans', 'Health history 1 month'].map(f => <div key={f} style={{ fontSize: 12, color: '#888', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#10b981' }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('monthly')} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#2196F3', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>
              <div style={{ ...card, border: '1px solid #10b981' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>ANNUAL</div>
                  <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Save 40%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Pro Annual</div><div style={{ fontSize: 11, color: '#555' }}>$71.88 billed yearly</div></div>
                  <div><div style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>$5.99</div><div style={{ fontSize: 10, color: '#555' }}>/mo</div></div>
                </div>
                {['All Pro Monthly features', 'Gym partner discounts', 'Priority AI coaching', 'Full nutrition plans', 'Early feature access'].map(f => <div key={f} style={{ fontSize: 12, color: '#888', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#10b981' }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('annual')} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#10b981', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>
              <div style={{ background: '#111', border: '1px solid rgba(212,160,23,0.4)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'inline-block', background: '#D4A017', color: '#000', fontSize: 10, padding: '2px 10px', borderRadius: 20, marginBottom: 12, fontWeight: 700 }}>PLATINUM ELITE</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#D4A017', marginBottom: 14 }}>Concierge Health Program</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[{ label: 'Monthly', price: '$199' }, { label: 'Quarterly', price: '$499' }, { label: 'Annual', price: '$1,399' }].map(p => (
                    <div key={p.label} style={{ background: 'rgba(212,160,23,0.08)', borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid rgba(212,160,23,0.2)' }}>
                      <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#D4A017' }}>{p.price}</div>
                    </div>
                  ))}
                </div>
                {['Private 1-on-1 health coach monthly', 'Monthly blood test analysis', 'Exclusive VitaCore Watch gifted', 'VIP marathon and sports event access', 'Unlimited AI nutrition and health coaching', '24/7 health concierge support hotline', 'Annual comprehensive health report', 'Priority onboarding call'].map(f => (
                  <div key={f} style={{ fontSize: 12, color: '#888', marginBottom: 7, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#D4A017', flexShrink: 0 }}>*</span>{f}</div>
                ))}
                <button style={{ width: '100%', padding: 14, borderRadius: 12, background: 'linear-gradient(135deg,#D4A017,#B8860B)', border: 'none', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 14 }}>Apply for Platinum Elite</button>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#444', marginTop: 8 }}>Limited spots - Personal onboarding call included</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
`);

console.log('\nAll done! Run:');
console.log('git add .');
console.log('git commit -m "bevel-inspired dark redesign with vitascore recovery vitaage"');
console.log('git push');
