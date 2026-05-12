'use client'
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
  const [referralCopied, setReferralCopied] = useState(false)
  const [checkinDone, setCheckinDone] = useState(false)
  const referralCount = 4
  const checkinStreak = 5
  const stepsDone = 4320
  const stepsGoal = 5000
  const referralGoal = 10
  const checkinGoal = 7

  function copyReferral() {
    navigator.clipboard.writeText('https://vellcareai.health/ref/VCAI' + (Math.random().toString(36).slice(2,8).toUpperCase()))
    setReferralCopied(true)
    setTimeout(() => setReferralCopied(false), 2000)
  }

  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 16, marginBottom: 10 }
  const greenLight = '#D1FAE5'
  const greenBorder = '#6EE7B7'
  const greenDark = '#065F46'
  const green = '#10B981'

  const challenges = [
    { rank: 1, name: 'FitKing_Razif', steps: 12840, score: 98, prize: 'RM 50 Grab voucher', avatar: 'RZ', color: '#F59E0B' },
    { rank: 2, name: 'HealthQueenSiti', steps: 10220, score: 94, prize: 'RM 30 Touch n Go', avatar: 'ST', color: '#9CA3AF' },
    { rank: 3, name: 'RunnerJosh_KL', steps: 9870, score: 91, prize: 'RM 20 McDonalds', avatar: 'JK', color: '#CD7F32' },
    { rank: 4, name: 'You', steps: 4320, score: 72, prize: 'Keep going!', avatar: 'ME', color: green },
    { rank: 5, name: 'HealthyMom88', steps: 3980, score: 68, prize: '', avatar: 'HM', color: '#E5E7EB' },
  ]

  return (
    <div>
      {/* TAGLINE */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: green, letterSpacing: 1.5, textTransform: 'uppercase' }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500, marginTop: 2 }}>VCAI Community</div>
      </div>

      {/* WEEKLY CHALLENGE */}
      <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 18, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: green, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Weekly Challenge</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Step King of the Week</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>Top 3 win real prizes every Sunday</div>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '4px 10px', fontSize: 10, color: green, fontWeight: 700 }}>LIVE</div>
        </div>

        {/* TOP 3 PRIZES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            { pos: '1st', prize: 'RM 50', sub: 'Grab voucher', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
            { pos: '2nd', prize: 'RM 30', sub: 'Touch n Go', color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)' },
            { pos: '3rd', prize: 'RM 20', sub: "McDonalds", color: '#CD7F32', bg: 'rgba(205,127,50,0.1)' },
          ].map(p => (
            <div key={p.pos} style={{ background: p.bg, borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid ' + p.color + '30' }}>
              <div style={{ fontSize: 11, color: p.color, fontWeight: 700, marginBottom: 3 }}>{p.pos}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.prize}</div>
              <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>{p.sub}</div>
            </div>
          ))}
        </div>

        {/* LEADERBOARD */}
        {challenges.map(u => (
          <div key={u.rank} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: 22, textAlign: 'center', fontSize: 13, fontWeight: 700, color: u.rank <= 3 ? u.color : '#444', flexShrink: 0 }}>{u.rank}</div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.name === 'You' ? green : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: u.name === 'You' ? '#fff' : '#888', flexShrink: 0 }}>{u.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: u.name === 'You' ? 700 : 500, color: u.name === 'You' ? green : '#ccc' }}>{u.name}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{u.steps.toLocaleString()} steps</div>
            </div>
            {u.prize && u.rank <= 3 && <div style={{ fontSize: 11, color: u.color, fontWeight: 600 }}>{u.prize}</div>}
            {u.name === 'You' && <div style={{ fontSize: 11, color: '#555' }}>#{u.rank}</div>}
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ fontSize: 12, color: green, fontWeight: 600, marginBottom: 3 }}>You need 680 more steps to overtake #3!</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: green, width: (stepsDone / stepsGoal * 100) + '%', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 4 }}>{stepsDone.toLocaleString()} / {stepsGoal.toLocaleString()} steps today</div>
        </div>
      </div>

      {/* REFERRAL PROGRAM */}
      <div style={{ ...card, background: greenLight, border: '1px solid ' + greenBorder }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: greenDark, marginBottom: 4 }}>Referral Reward Program</div>
        <div style={{ fontSize: 12, color: '#065F46', marginBottom: 14, lineHeight: 1.6 }}>
          Complete all 3 missions below to unlock your exclusive reward!
        </div>

        {/* MISSION 1 — REFERRALS */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 1 — Invite Friends</div>
            <div style={{ fontSize: 11, color: referralCount >= referralGoal ? green : '#F59E0B', fontWeight: 700 }}>{referralCount}/{referralGoal}</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: referralCount >= referralGoal ? green : '#F59E0B', width: (referralCount / referralGoal * 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>Invite 10 friends to join VellCareAI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', borderRadius: 8, padding: '8px 10px', border: '1px solid #E5E7EB', cursor: 'pointer', marginBottom: 8 }} onClick={copyReferral}>
            <span style={{ flex: 1, fontSize: 12, color: '#6B7280', fontFamily: 'monospace' }}>vellcareai.health/ref/VCAIABCD</span>
            <span style={{ fontSize: 12, color: green, fontWeight: 700 }}>{referralCopied ? 'Copied!' : 'Copy'}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: i < referralCount ? green : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: i < referralCount ? '#fff' : '#9CA3AF' }}>
                {i < referralCount ? 'ok' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* MISSION 2 — CHECK IN */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 2 — Daily Check-in</div>
            <div style={{ fontSize: 11, color: checkinStreak >= checkinGoal ? green : '#F59E0B', fontWeight: 700 }}>{checkinStreak}/{checkinGoal} days</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: checkinStreak >= checkinGoal ? green : '#F59E0B', width: (checkinStreak / checkinGoal * 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>Open the app and check in for 7 consecutive days</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 28, borderRadius: 6, background: i < checkinStreak ? green : '#F3F4F6', marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: i < checkinStreak ? '#fff' : '#9CA3AF', fontWeight: 600 }}>
                  {i < checkinStreak ? 'ok' : ''}
                </div>
                <div style={{ fontSize: 9, color: '#9CA3AF' }}>{d}</div>
              </div>
            ))}
          </div>
          {!checkinDone && (
            <button onClick={() => setCheckinDone(true)} style={{ width: '100%', padding: '8px', borderRadius: 8, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginTop: 10 }}>
              Check In Today
            </button>
          )}
          {checkinDone && <div style={{ marginTop: 10, fontSize: 12, color: green, fontWeight: 600, textAlign: 'center' }}>Checked in today!</div>}
        </div>

        {/* MISSION 3 — STEPS */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 14, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 3 — Walk 5,000 Steps</div>
            <div style={{ fontSize: 11, color: stepsDone >= stepsGoal ? green : '#F59E0B', fontWeight: 700 }}>{stepsDone.toLocaleString()}/{stepsGoal.toLocaleString()}</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: stepsDone >= stepsGoal ? green : '#F59E0B', width: Math.min(stepsDone / stepsGoal * 100, 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Walk 5,000 steps today — sync from your device automatically</div>
        </div>

        {/* REWARD UNLOCK */}
        <div style={{ background: greenDark, borderRadius: 12, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Complete all 3 missions to unlock</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            {['1 Month Free Pro', 'RM 20 Grab Voucher', 'Exclusive VCAI Badge'].map(r => (
              <div key={r} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', fontSize: 11, color: '#6EE7B7', border: '1px solid rgba(110,231,183,0.2)' }}>{r}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            Progress: {Math.round(((referralCount >= referralGoal ? 1 : 0) + (checkinStreak >= checkinGoal ? 1 : 0) + (stepsDone >= stepsGoal ? 1 : 0)) / 3 * 100)}% complete
          </div>
        </div>
      </div>

      {/* TAGLINE FOOTER */}
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase' }}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
      </div>
    </div>
  )
}

{tab === 'pro' && (
            <div>
              <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: green, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>SUPER AI HEALTH ECOSYSTEM</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>VellCareAI Plans</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Simple pricing. Real value. Cancel anytime.</div>
              </div>

              <div style={card}>
                <div style={{ display: 'inline-block', background: '#F3F4F6', color: '#6B7280', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 700 }}>FREE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Starter</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>Forever free</div></div>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>$0</div>
                </div>
                {['Health data tracking (BPM, sleep, steps, calories)', '3 AI Coach messages per day', '3 meal advice per day', 'WellScore dashboard', 'SOS family alert', 'Device sync — Apple Health, Samsung Health'].map(f => <div key={f} style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: green, flexShrink: 0, fontWeight: 700 }}>ok</span>{f}</div>)}
              </div>

              <div style={{ ...card, border: '1.5px solid ' + green }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: greenLight, color: greenDark, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>MONTHLY</div>
                  <div style={{ display: 'inline-block', background: '#FEF2F2', color: '#EF4444', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>Most Popular</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Monthly</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>Unlimited everything</div></div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 700 }}>RM 9.90</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>USD 2.99/month</div>
                  </div>
                </div>
                {['UNLIMITED AI Health Coach', 'UNLIMITED meal planning', 'Family monitoring dashboard', 'Advanced health analytics', 'Community challenges and leaderboard', 'Referral reward program', 'Health history — 1 month', 'Priority customer support'].map(f => <div key={f} style={{ fontSize: 12, color: '#374151', marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: green, flexShrink: 0, fontWeight: 700 }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('monthly')} style={{ width: '100%', padding: 12, borderRadius: 12, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ ...card, border: '1.5px solid #2196F3' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: '#EFF6FF', color: '#1D4ED8', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>ANNUAL</div>
                  <div style={{ display: 'inline-block', background: '#EAF3DE', color: '#3B6D11', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>Save 58%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>Pro Annual</div><div style={{ fontSize: 11, color: '#9CA3AF' }}>RM 99 billed once/year</div></div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 700 }}>RM 8.25</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>USD 2.08/month · USD 29/yr</div>
                  </div>
                </div>
                {['Everything in Pro Monthly', 'VIP community badge', 'Early access to new features', 'Gym partner discounts', 'Extended health history — 3 months'].map(f => <div key={f} style={{ fontSize: 12, color: '#374151', marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#2196F3', flexShrink: 0, fontWeight: 700 }}>ok</span>{f}</div>)}
                <button onClick={() => subscribe('annual')} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#2196F3', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ background: '#0A0A0A', border: '1.5px solid ' + green, borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'inline-block', background: green, color: '#fff', fontSize: 10, padding: '2px 10px', borderRadius: 20, marginBottom: 12, fontWeight: 700, letterSpacing: 0.5 }}>PLATINUM ELITE</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Concierge Health Program</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[{ label: 'Monthly', rm: 'RM 299', usd: 'USD 69' }, { label: 'Quarterly', rm: 'RM 799', usd: 'USD 189' }, { label: 'Annual', rm: 'RM 2,499', usd: 'USD 599' }].map(p => (
                    <div key={p.label} style={{ background: 'rgba(16,185,129,0.1)', borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <div style={{ fontSize: 10, color: '#6B7280', marginBottom: 3 }}>{p.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: green }}>{p.rm}</div>
                      <div style={{ fontSize: 10, color: '#555' }}>{p.usd}</div>
                    </div>
                  ))}
                </div>
                {['Private 1-on-1 health coach (monthly call)', 'Monthly blood test AI analysis', 'Exclusive VellCare Watch gifted on signup', 'VIP health events and marathons access', 'Unlimited AI coaching 24/7', '24/7 health concierge hotline', 'Annual comprehensive health report', 'Personal onboarding call with health expert', 'Family plan for up to 10 members'].map(f => (
                  <div key={f} style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 7, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: green, flexShrink: 0, fontWeight: 700 }}>ok</span>{f}</div>
                ))}
                <button style={{ width: '100%', padding: 14, borderRadius: 12, background: 'linear-gradient(135deg,' + green + ',#059669)', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 14 }}>Apply for Platinum Elite</button>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#555', marginTop: 8 }}>Limited spots available</p>
              </div>
            </div>
          )}nt'
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
  const [referralCopied, setReferralCopied] = useState(false)
  const [checkinDone, setCheckinDone] = useState(false)
  const referralCount = 4
  const checkinStreak = 5
  const stepsDone = 4320
  const stepsGoal = 5000
  const referralGoal = 10
  const checkinGoal = 7

  function copyReferral() {
    navigator.clipboard.writeText('https://vellcareai.health/ref/VCAI' + (Math.random().toString(36).slice(2,8).toUpperCase()))
    setReferralCopied(true)
    setTimeout(() => setReferralCopied(false), 2000)
  }

  const card = { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 16, marginBottom: 10 }
  const greenLight = '#D1FAE5'
  const greenBorder = '#6EE7B7'
  const greenDark = '#065F46'
  const green = '#10B981'

  const challenges = [
    { rank: 1, name: 'FitKing_Razif', steps: 12840, score: 98, prize: 'RM 50 Grab voucher', avatar: 'RZ', color: '#F59E0B' },
    { rank: 2, name: 'HealthQueenSiti', steps: 10220, score: 94, prize: 'RM 30 Touch n Go', avatar: 'ST', color: '#9CA3AF' },
    { rank: 3, name: 'RunnerJosh_KL', steps: 9870, score: 91, prize: 'RM 20 McDonalds', avatar: 'JK', color: '#CD7F32' },
    { rank: 4, name: 'You', steps: 4320, score: 72, prize: 'Keep going!', avatar: 'ME', color: green },
    { rank: 5, name: 'HealthyMom88', steps: 3980, score: 68, prize: '', avatar: 'HM', color: '#E5E7EB' },
  ]

  return (
    <div>
      {/* TAGLINE */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: green, letterSpacing: 1.5, textTransform: 'uppercase' }}>SUPER AI HEALTH ECOSYSTEM</div>
        <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500, marginTop: 2 }}>VCAI Community</div>
      </div>

      {/* WEEKLY CHALLENGE */}
      <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 18, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: green, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Weekly Challenge</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Step King of the Week</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>Top 3 win real prizes every Sunday</div>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '4px 10px', fontSize: 10, color: green, fontWeight: 700 }}>LIVE</div>
        </div>

        {/* TOP 3 PRIZES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            { pos: '1st', prize: 'RM 50', sub: 'Grab voucher', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
            { pos: '2nd', prize: 'RM 30', sub: 'Touch n Go', color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)' },
            { pos: '3rd', prize: 'RM 20', sub: "McDonalds", color: '#CD7F32', bg: 'rgba(205,127,50,0.1)' },
          ].map(p => (
            <div key={p.pos} style={{ background: p.bg, borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid ' + p.color + '30' }}>
              <div style={{ fontSize: 11, color: p.color, fontWeight: 700, marginBottom: 3 }}>{p.pos}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.prize}</div>
              <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>{p.sub}</div>
            </div>
          ))}
        </div>

        {/* LEADERBOARD */}
        {challenges.map(u => (
          <div key={u.rank} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: 22, textAlign: 'center', fontSize: 13, fontWeight: 700, color: u.rank <= 3 ? u.color : '#444', flexShrink: 0 }}>{u.rank}</div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.name === 'You' ? green : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: u.name === 'You' ? '#fff' : '#888', flexShrink: 0 }}>{u.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: u.name === 'You' ? 700 : 500, color: u.name === 'You' ? green : '#ccc' }}>{u.name}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{u.steps.toLocaleString()} steps</div>
            </div>
            {u.prize && u.rank <= 3 && <div style={{ fontSize: 11, color: u.color, fontWeight: 600 }}>{u.prize}</div>}
            {u.name === 'You' && <div style={{ fontSize: 11, color: '#555' }}>#{u.rank}</div>}
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ fontSize: 12, color: green, fontWeight: 600, marginBottom: 3 }}>You need 680 more steps to overtake #3!</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: green, width: (stepsDone / stepsGoal * 100) + '%', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 4 }}>{stepsDone.toLocaleString()} / {stepsGoal.toLocaleString()} steps today</div>
        </div>
      </div>

      {/* REFERRAL PROGRAM */}
      <div style={{ ...card, background: greenLight, border: '1px solid ' + greenBorder }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: greenDark, marginBottom: 4 }}>Referral Reward Program</div>
        <div style={{ fontSize: 12, color: '#065F46', marginBottom: 14, lineHeight: 1.6 }}>
          Complete all 3 missions below to unlock your exclusive reward!
        </div>

        {/* MISSION 1 — REFERRALS */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 1 — Invite Friends</div>
            <div style={{ fontSize: 11, color: referralCount >= referralGoal ? green : '#F59E0B', fontWeight: 700 }}>{referralCount}/{referralGoal}</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: referralCount >= referralGoal ? green : '#F59E0B', width: (referralCount / referralGoal * 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>Invite 10 friends to join VellCareAI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', borderRadius: 8, padding: '8px 10px', border: '1px solid #E5E7EB', cursor: 'pointer', marginBottom: 8 }} onClick={copyReferral}>
            <span style={{ flex: 1, fontSize: 12, color: '#6B7280', fontFamily: 'monospace' }}>vellcareai.health/ref/VCAIABCD</span>
            <span style={{ fontSize: 12, color: green, fontWeight: 700 }}>{referralCopied ? 'Copied!' : 'Copy'}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: i < referralCount ? green : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: i < referralCount ? '#fff' : '#9CA3AF' }}>
                {i < referralCount ? 'ok' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* MISSION 2 — CHECK IN */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 2 — Daily Check-in</div>
            <div style={{ fontSize: 11, color: checkinStreak >= checkinGoal ? green : '#F59E0B', fontWeight: 700 }}>{checkinStreak}/{checkinGoal} days</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: checkinStreak >= checkinGoal ? green : '#F59E0B', width: (checkinStreak / checkinGoal * 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>Open the app and check in for 7 consecutive days</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 28, borderRadius: 6, background: i < checkinStreak ? green : '#F3F4F6', marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: i < checkinStreak ? '#fff' : '#9CA3AF', fontWeight: 600 }}>
                  {i < checkinStreak ? 'ok' : ''}
                </div>
                <div style={{ fontSize: 9, color: '#9CA3AF' }}>{d}</div>
              </div>
            ))}
          </div>
          {!checkinDone && (
            <button onClick={() => setCheckinDone(true)} style={{ width: '100%', padding: '8px', borderRadius: 8, background: green, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginTop: 10 }}>
              Check In Today
            </button>
          )}
          {checkinDone && <div style={{ marginTop: 10, fontSize: 12, color: green, fontWeight: 600, textAlign: 'center' }}>Checked in today!</div>}
        </div>

        {/* MISSION 3 — STEPS */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 14, border: '1px solid ' + greenBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Mission 3 — Walk 5,000 Steps</div>
            <div style={{ fontSize: 11, color: stepsDone >= stepsGoal ? green : '#F59E0B', fontWeight: 700 }}>{stepsDone.toLocaleString()}/{stepsGoal.toLocaleString()}</div>
          </div>
          <div style={{ height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', background: stepsDone >= stepsGoal ? green : '#F59E0B', width: Math.min(stepsDone / stepsGoal * 100, 100) + '%', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Walk 5,000 steps today — sync from your device automatically</div>
        </div>

        {/* REWARD UNLOCK */}
        <div style={{ background: greenDark, borderRadius: 12, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Complete all 3 missions to unlock</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            {['1 Month Free Pro', 'RM 20 Grab Voucher', 'Exclusive VCAI Badge'].map(r => (
              <div key={r} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', fontSize: 11, color: '#6EE7B7', border: '1px solid rgba(110,231,183,0.2)' }}>{r}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            Progress: {Math.round(((referralCount >= referralGoal ? 1 : 0) + (checkinStreak >= checkinGoal ? 1 : 0) + (stepsDone >= stepsGoal ? 1 : 0)) / 3 * 100)}% complete
          </div>
        </div>
      </div>

      {/* TAGLINE FOOTER */}
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase' }}>SUPER AI HEALTH ECOSYSTEM · VCAI</div>
      </div>
    </div>
  )
}


