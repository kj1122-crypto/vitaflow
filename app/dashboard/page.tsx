'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const gold = '#B8860B'
const goldLight = '#FDF6DC'
const goldBorder = '#E8C84A'

function AiCoach({ isPro, userName }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello ' + (userName || 'there') + '! I am your VitaCore AI Health Coach powered by Claude. Ask me anything about nutrition, workouts, or how to slim specific body parts!' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const txt = input.trim(); setInput('')
    const newMsgs = [...messages, { role: 'user', content: txt }]
    setMessages(newMsgs); setLoading(true)
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMsgs }) })
      const data = await res.json()
      if (data.reply) setMessages(m => [...m, { role: 'assistant', content: data.reply }])
      else setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } catch (e) { setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.' }]) }
    setLoading(false)
  }

  const chips = ['Best meal for fat loss?', 'Slim my waist and thighs', 'Best sport for weight loss', 'Marathon training plan', 'How to build muscle fast', 'Improve my sleep quality']
  const inp = { flex: 1, background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: '12px 14px', color: '#1a1a1a', fontFamily: 'inherit', fontSize: 14, outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {chips.map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: '6px 12px', borderRadius: 20, background: goldLight, border: '1px solid ' + goldBorder, fontSize: 12, color: gold, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>{q}</button>
        ))}
      </div>
      <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 16, padding: 16, height: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ maxWidth: '85%', padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.6, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#0A0A0A' : '#fff', color: m.role === 'user' ? '#fff' : '#1a1a1a', border: m.role === 'assistant' ? '1px solid #eee' : 'none' }}>
            {m.role === 'assistant' && <div style={{ fontSize: 10, color: gold, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>VITACORE AI</div>}
            {m.content}
          </div>
        ))}
        {loading && <div style={{ fontSize: 13, color: '#999', fontStyle: 'italic', padding: '8px 14px' }}>VitaCore AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything about your health..." style={inp} />
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: 12, background: '#0A0A0A', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>↑</button>
      </div>
    </div>
  )
}

function PdpaModal({ onAgree }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480, maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Data Privacy Agreement</div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.8, marginBottom: 20 }}>
          <p style={{ marginBottom: 10 }}>In accordance with the <strong>Personal Data Protection Act (PDPA)</strong>, VitaCore requests your consent to collect and process the following health data:</p>
          <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            {['Heart rate (BPM) — daily average, min & max', 'Calories burned & intake', 'Sleep duration & quality', 'Step count & activity level', 'Body weight & BMI', 'SpO2 (blood oxygen level)', 'GPS location during workouts', 'Connected device data (smartwatch/wearable)'].map(item => (
              <div key={item} style={{ fontSize: 12, color: '#444', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: gold }}>✓</span>{item}</div>
            ))}
          </div>
          <p style={{ marginBottom: 8, fontSize: 12 }}>Your data will be:</p>
          {['Stored securely and encrypted', 'Used only to improve your health insights', 'Never sold to third parties', 'Retained for up to 12 months', 'Deletable at any time upon request'].map(item => (
            <div key={item} style={{ fontSize: 12, color: '#444', marginBottom: 5, display: 'flex', gap: 8 }}><span style={{ color: '#10b981' }}>✓</span>{item}</div>
          ))}
        </div>
        <button onClick={onAgree} style={{ width: '100%', padding: 14, borderRadius: 12, background: '#0A0A0A', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>I Agree & Continue</button>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#999' }}>You can withdraw consent anytime in Settings</div>
      </div>
    </div>
  )
}

function OnboardingGuide({ step, onClose, onNext }) {
  const steps = [
    { title: 'Welcome to VitaCore', desc: 'Your premium AI health companion. Track health, earn rewards, and connect with friends on your wellness journey.', icon: '🏠' },
    { title: 'AI Health Coach', desc: 'Chat with Claude-powered AI anytime. Get personalized meal plans, workout advice, and body slimming tips.', icon: '🧠' },
    { title: 'Earn XP & Rewards', desc: 'Complete daily quests to earn XP. Redeem for smart watches, vouchers, and exclusive prizes!', icon: '⚔️' },
    { title: 'Friends & Chat', desc: 'Add friends, send messages, and motivate each other on your health journeys together.', icon: '💬' },
    { title: 'Health Tracking', desc: 'Connect your smartwatch to auto-sync BPM, calories, sleep and more. View up to 1 month of history.', icon: '⌚' },
  ]
  const s = steps[step] || steps[0]
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: 28, width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{s.icon}</div>
          <div style={{ fontSize: 11, color: gold, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>STEP {step + 1} OF {steps.length}</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
          <div style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{s.desc}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? gold : '#e0e0e0', transition: 'all 0.3s' }} />
          ))}
        </div>
        <button onClick={onNext} style={{ width: '100%', padding: 14, borderRadius: 12, background: '#0A0A0A', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
          {step < steps.length - 1 ? 'Next →' : 'Get Started!'}
        </button>
        <button onClick={onClose} style={{ width: '100%', padding: 10, borderRadius: 12, background: 'none', border: 'none', color: '#999', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Skip tour</button>
      </div>
    </div>
  )
}

function ChatTab({ profile }) {
  const [friends] = useState([
    { id: '1', name: 'Sarah Lim', avatar: 'SL', status: 'online', lastMsg: 'Great workout today!', time: '2m', unread: 2 },
    { id: '2', name: 'Mike Tan', avatar: 'MT', status: 'online', lastMsg: 'Did you hit your steps goal?', time: '15m', unread: 0 },
    { id: '3', name: 'Priya K', avatar: 'PK', status: 'offline', lastMsg: 'See you at marathon!', time: '1h', unread: 0 },
  ])
  const [activeFriend, setActiveFriend] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMsgs, setChatMsgs] = useState([
    { role: 'them', text: 'Hey! How was your workout today?' },
    { role: 'me', text: 'Amazing! Hit a new PR on bench press' },
    { role: 'them', text: 'Great workout today! Keep it up!' },
  ])
  const [friendSearch, setFriendSearch] = useState('')
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMsgs, activeFriend])

  function sendChat() {
    if (!chatInput.trim()) return
    setChatMsgs(m => [...m, { role: 'me', text: chatInput.trim() }])
    setChatInput('')
    setTimeout(() => {
      setChatMsgs(m => [...m, { role: 'them', text: 'That is awesome! Keep pushing! 💪' }])
    }, 1000)
  }

  if (activeFriend) return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fff', position: 'sticky', top: 0 }}>
        <button onClick={() => setActiveFriend(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#666' }}>←</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: goldLight, border: '1px solid ' + goldBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: gold }}>{activeFriend.avatar}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{activeFriend.name}</div>
          <div style={{ fontSize: 11, color: activeFriend.status === 'online' ? '#10b981' : '#999' }}>{activeFriend.status}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: '#fafafa' }}>
        {chatMsgs.map((m, i) => (
          <div key={i} style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: 14, fontSize: 14, alignSelf: m.role === 'me' ? 'flex-end' : 'flex-start', background: m.role === 'me' ? '#0A0A0A' : '#fff', color: m.role === 'me' ? '#fff' : '#1a1a1a', border: m.role === 'them' ? '1px solid #eee' : 'none' }}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 16, borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: '1px solid #eee', background: '#f9f9f9', fontFamily: 'inherit', fontSize: 14, outline: 'none' }} />
        <button onClick={sendChat} style={{ width: 40, height: 40, borderRadius: 10, background: '#0A0A0A', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>↑</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Friends & Chat</div>
        <button onClick={() => setShowAddFriend(true)} style={{ padding: '7px 14px', borderRadius: 10, background: '#0A0A0A', border: 'none', color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add Friend</button>
      </div>

      {showAddFriend && (
        <div style={{ background: goldLight, border: '1px solid ' + goldBorder, borderRadius: 14, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: '#1a1a1a' }}>Send Friend Request</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={friendSearch} onChange={e => setFriendSearch(e.target.value)} placeholder="Enter email or username..." style={{ flex: 1, padding: '9px 12px', borderRadius: 10, border: '1px solid ' + goldBorder, background: '#fff', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} />
            <button onClick={() => { setRequestSent(true); setTimeout(() => { setShowAddFriend(false); setRequestSent(false); setFriendSearch('') }, 2000) }} style={{ padding: '9px 14px', borderRadius: 10, background: '#0A0A0A', border: 'none', color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{requestSent ? 'Sent!' : 'Send'}</button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Messages</div>
        {friends.map(f => (
          <div key={f.id} onClick={() => setActiveFriend(f)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: goldLight, border: '1px solid ' + goldBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: gold }}>{f.avatar}</div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: f.status === 'online' ? '#10b981' : '#ccc', border: '2px solid #fff' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                <div style={{ fontSize: 11, color: '#999' }}>{f.time}</div>
              </div>
              <div style={{ fontSize: 12, color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.lastMsg}</div>
            </div>
            {f.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 600, flexShrink: 0 }}>{f.unread}</div>}
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Friend Requests</div>
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#666', flexShrink: 0 }}>JW</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>James Wong</div>
            <div style={{ fontSize: 11, color: '#999' }}>Wants to be your friend</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ padding: '6px 12px', borderRadius: 8, background: '#0A0A0A', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Accept</button>
            <button style={{ padding: '6px 12px', borderRadius: 8, background: '#f0f0f0', border: 'none', color: '#666', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthHistory() {
  const days = ['May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7']
  const bpmData = [71, 74, 68, 76, 72, 70, 72]
  const sleepData = [7.2, 6.8, 7.5, 6.5, 7.4, 8.0, 7.4]
  const stepsData = [8200, 6500, 9100, 7200, 7432, 10200, 8800]
  const calData = [1580, 1720, 1640, 1800, 1640, 1550, 1700]

  const maxBpm = Math.max(...bpmData)
  const maxSleep = Math.max(...sleepData)
  const maxSteps = Math.max(...stepsData)
  const maxCal = Math.max(...calData)

  function MiniBar({ value, max, color }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
        <div style={{ height: 40, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: '100%', background: color, borderRadius: '3px 3px 0 0', height: (value / max * 100) + '%', minHeight: 4 }} />
        </div>
      </div>
    )
  }

  const card = { background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14, padding: 14, marginBottom: 10 }
  const sec = { fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, margin: '14px 0 8px' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Health History</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['7D', '2W', '1M'].map((t, i) => (
            <button key={t} style={{ padding: '5px 10px', borderRadius: 8, background: i === 0 ? '#0A0A0A' : '#f0f0f0', border: 'none', color: i === 0 ? '#fff' : '#666', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Heart Rate (BPM)</div>
          <div style={{ fontSize: 13, color: '#E24B4A', fontWeight: 600 }}>Avg: {Math.round(bpmData.reduce((a, b) => a + b) / bpmData.length)} BPM</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
          {bpmData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', background: '#FFF0F0', borderRadius: '3px 3px 0 0', height: (v / maxBpm * 50) + 'px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#E24B4A', borderRadius: '3px 3px 0 0', height: '60%' }} />
              </div>
              <div style={{ fontSize: 9, color: '#999' }}>{days[i].split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Sleep Duration</div>
          <div style={{ fontSize: 13, color: '#7C4DFF', fontWeight: 600 }}>Avg: {(sleepData.reduce((a, b) => a + b) / sleepData.length).toFixed(1)} hrs</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          {sleepData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 9, color: '#7C4DFF', fontWeight: 500 }}>{v}</div>
              <div style={{ width: '100%', background: '#EBE6FF', borderRadius: '3px 3px 0 0', height: (v / maxSleep * 40) + 'px' }} />
              <div style={{ fontSize: 9, color: '#999' }}>{days[i].split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Daily Steps</div>
          <div style={{ fontSize: 13, color: '#2196F3', fontWeight: 600 }}>Avg: {Math.round(stepsData.reduce((a, b) => a + b) / stepsData.length).toLocaleString()}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          {stepsData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', background: '#EBF4FF', borderRadius: '3px 3px 0 0', height: (v / maxSteps * 40) + 'px' }} />
              <div style={{ fontSize: 9, color: '#999' }}>{days[i].split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Calories Burned</div>
          <div style={{ fontSize: 13, color: gold, fontWeight: 600 }}>Avg: {Math.round(calData.reduce((a, b) => a + b) / calData.length).toLocaleString()} kcal</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          {calData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', background: goldLight, borderRadius: '3px 3px 0 0', height: (v / maxCal * 40) + 'px', border: '1px solid ' + goldBorder }} />
              <div style={{ fontSize: 9, color: '#999' }}>{days[i].split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#0A0A0A', borderRadius: 14, padding: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Connected Device</div>
          <div style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>● Connected</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 32 }}>⌚</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>VitaCore Watch Pro</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Last synced: 2 min ago · Battery 84%</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          {[{ l: 'Today BPM', v: '72 avg', c: '#E24B4A' }, { l: 'Active time', v: '1h 24m', c: '#10b981' }, { l: 'Weather', v: '31°C Cloudy', c: '#2196F3' }, { l: 'Location', v: 'KL, Malaysia', c: gold }].map(m => (
            <div key={m.l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>{m.l}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: m.c }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [tab, setTab] = useState('home')
  const [checks, setChecks] = useState({})
  const [billingPlan, setBillingPlan] = useState('monthly')
  const [showGuide, setShowGuide] = useState(false)
  const [guideStep, setGuideStep] = useState(0)
  const [showPdpa, setShowPdpa] = useState(false)
  const [pdpaAgreed, setPdpaAgreed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile(data || { full_name: 'Member', level: 1, xp: 2480, subscription_plan: 'free' })
        if (!data?.onboarded) setShowGuide(true)
      })
    })
  }, [])

  async function logout() { await supabase.auth.signOut(); router.push('/') }

  async function subscribe(plan) {
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  function copyReferral() {
    navigator.clipboard.writeText('https://vitacore.app/ref/' + (profile?.id?.slice(0, 8) || 'ABC123'))
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  function handleConnectWatch() {
    if (!pdpaAgreed) setShowPdpa(true)
  }

  const isPro = profile?.subscription_plan === 'monthly' || profile?.subscription_plan === 'annual' || profile?.subscription_plan === 'platinum'
  const name = profile?.full_name?.split(' ')[0] || 'Member'
  const userXp = profile?.xp || 2480
  const level = profile?.level || 1

  const card = { background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }
  const nb = (active) => ({ flex: 1, padding: '8px 2px', background: 'none', border: 'none', borderBottom: active ? '2px solid ' + gold : '2px solid transparent', color: active ? gold : '#999', fontFamily: 'inherit', fontSize: 9, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textTransform: 'uppercase', letterSpacing: '0.5px' })

  const REWARDS = [
    { icon: '⌚', name: 'VitaCore Watch', xp: 50000, unlocked: userXp >= 50000 },
    { icon: '⚖️', name: 'Smart Scale', xp: 20000, unlocked: userXp >= 20000 },
    { icon: '🍔', name: 'KFC RM50', xp: 5000, unlocked: userXp >= 5000 },
    { icon: '🍟', name: 'McDonalds RM50', xp: 5000, unlocked: userXp >= 5000 },
    { icon: '🏃', name: 'Marathon Entry', xp: 8000, unlocked: userXp >= 8000 },
    { icon: '🎧', name: 'Earbuds', xp: 15000, unlocked: userXp >= 15000 },
  ]

  if (!profile) return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⬡</div>
        <div style={{ color: '#999', fontSize: 14 }}>Loading VitaCore...</div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', color: '#1a1a1a' }}>
      {showPdpa && <PdpaModal onAgree={() => { setPdpaAgreed(true); setShowPdpa(false) }} />}
      {showGuide && <OnboardingGuide step={guideStep} onClose={() => setShowGuide(false)} onNext={() => { if (guideStep < 4) setGuideStep(g => g + 1); else setShowGuide(false) }} />}

      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 80 }}>
        <nav style={{ display: 'flex', padding: '10px 8px 0', position: 'sticky', top: 0, background: '#fff', zIndex: 100, borderBottom: '1px solid #f0f0f0', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          {[['home', '🏠', 'Home'], ['ai', '🧠', 'AI Coach'], ['health', '📊', 'History'], ['chat', '💬', 'Friends'], ['pro', '👑', 'Plans']].map(([t, icon, label]) => (
            <button key={t} onClick={() => setTab(t)} style={nb(tab === t)}><span style={{ fontSize: 17 }}>{icon}</span>{label}</button>
          ))}
        </nav>

        <div style={{ padding: tab === 'chat' ? 0 : '16px 16px' }}>

          {tab === 'home' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>{new Date().toDateString()}</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Good morning, <span style={{ color: gold }}>{name}</span> 👋</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {isPro && <div style={{ background: goldLight, border: '1px solid ' + goldBorder, borderRadius: 20, padding: '3px 8px', fontSize: 10, color: gold, fontWeight: 600 }}>✦ PRO</div>}
                  <button onClick={logout} style={{ background: 'none', border: '1px solid #e0e0e0', borderRadius: 8, padding: '5px 10px', color: '#999', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>Out</button>
                </div>
              </div>

              <div style={{ ...card, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Level {level} · Fitness Warrior</div>
                  <div style={{ background: goldLight, border: '1px solid ' + goldBorder, borderRadius: 20, padding: '3px 8px', fontSize: 11, color: gold, fontWeight: 600 }}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,' + gold + ',#D4A017)', width: Math.min((userXp / 3000) * 100, 100) + '%', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>{userXp.toLocaleString()} / 3,000 XP to Level {level + 1}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 12 }}>
                {[{ l: 'Heart Rate', v: '72', u: 'BPM', c: '#E24B4A', bg: '#FFF0F0' }, { l: 'Sleep', v: '7.4', u: 'hrs', c: '#7C4DFF', bg: '#F3EEFF' }, { l: 'Steps', v: '7,432', u: 'steps', c: '#2196F3', bg: '#EBF4FF' }, { l: 'Calories', v: '1,640', u: 'kcal', c: gold, bg: goldLight }, { l: 'SpO2', v: '98', u: '%', c: '#10b981', bg: '#E8F8F2' }, { l: 'Weight', v: '68.2', u: 'kg', c: '#FF6B35', bg: '#FFF0EB' }].map(m => (
                  <div key={m.l} style={{ background: m.bg, borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 600, color: m.c }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: m.c, opacity: 0.7 }}>{m.u}</div>
                    <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, margin: '14px 0 8px' }}>Today Plan</div>
              {[{ icon: '🥗', title: 'Grilled Salmon Bowl', sub: 'Lunch · 480 kcal · 42g protein', id: 'm1' }, { icon: '⚡', title: 'Upper Body Strength', sub: '5:30 PM · 45 min · 320 kcal', id: 'w1' }, { icon: '🌙', title: 'Quinoa Veggie Stir-fry', sub: 'Dinner · 390 kcal', id: 'm2' }].map(item => (
                <div key={item.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 20, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <div onClick={() => setChecks(c => ({ ...c, [item.id]: !c[item.id] }))} style={{ width: 26, height: 26, borderRadius: '50%', border: checks[item.id] ? 'none' : '1.5px solid #e0e0e0', background: checks[item.id] ? '#10b981' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, color: '#fff', flexShrink: 0 }}>{checks[item.id] ? '✓' : ''}</div>
                </div>
              ))}

              <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, margin: '14px 0 8px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, margin: '14px 0 8px' }}>Active Campaigns</div>
              {[{ icon: '🏃', name: 'KL Marathon 2026', date: 'Jun 15 · Earn 2,000 XP', color: '#2196F3', bg: '#EBF4FF' }, { icon: '🏸', name: 'Badminton Tournament', date: 'Jul 8 · Earn 1,500 XP', color: '#10b981', bg: '#E8F8F2' }, { icon: '🎾', name: 'Pickleball Open', date: 'Jul 22 · Earn 1,500 XP', color: '#FF6B35', bg: '#FFF0EB' }].map(c2 => (
                <div key={c2.name} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: c2.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c2.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c2.name}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{c2.date}</div>
                  </div>
                  <button style={{ padding: '5px 10px', borderRadius: 8, background: c2.bg, border: 'none', color: c2.color, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Join</button>
                </div>
              ))}

              <div style={{ ...card, background: '#0A0A0A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 28 }}>⌚</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>Connect Your Smartwatch</div>
                    <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>Auto-sync BPM, calories, sleep & location</div>
                  </div>
                  <button onClick={handleConnectWatch} style={{ padding: '7px 12px', borderRadius: 8, background: gold, border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Connect</button>
                </div>
                {pdpaAgreed && <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: 8, fontSize: 11, color: '#10b981' }}>✓ PDPA agreed · Ready to sync</div>}
              </div>
            </div>
          )}

          {tab === 'ai' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 14, background: goldLight, borderRadius: 14, border: '1px solid ' + goldBorder }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🧠</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>VitaCore AI Coach</div>
                  <div style={{ fontSize: 11, color: gold, marginTop: 2 }}>Powered by Claude · Personalized to you</div>
                </div>
                <div style={{ background: '#10b981', borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#fff', fontWeight: 500 }}>LIVE</div>
              </div>
              <AiCoach isPro={isPro} userName={name} />
              <div style={{ ...card, marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Body Targeting Guide</div>
                {[{ area: 'Slim waist', sports: 'Swimming, Pilates, Yoga', gym: 'Cable crunches, Russian twists' }, { area: 'Tone thighs', sports: 'Cycling, Badminton, Running', gym: 'Squats, Lunges, Leg press' }, { area: 'Flat belly', sports: 'Swimming, HIIT, Tennis', gym: 'Planks, Deadlifts, Leg raises' }, { area: 'Slim arms', sports: 'Tennis, Badminton, Swimming', gym: 'Tricep dips, Push-ups, Curls' }].map(b => (
                  <div key={b.area} style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{b.area}</div>
                    <div style={{ fontSize: 11, color: '#666' }}>Sports: {b.sports}</div>
                    <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>Gym: {b.gym}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'health' && <HealthHistory />}

          {tab === 'chat' && (
            <div style={{ padding: '16px 16px' }}>
              <ChatTab profile={profile} />
            </div>
          )}

          {tab === 'pro' && (
            <div>
              <div style={{ textAlign: 'center', padding: '12px 0 16px' }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>👑</div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>VitaCore Plans</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Choose your health journey</div>
              </div>

              <div style={{ ...card }}>
                <div style={{ display: 'inline-block', background: '#f0f0f0', color: '#666', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>FREE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>Starter</div><div style={{ fontSize: 11, color: '#999' }}>Forever free</div></div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>$0</div>
                </div>
                {['Basic health tracking', '3 AI messages/day', 'XP quests & leaderboard', 'Referral program', 'Friends & chat'].map(f => <div key={f} style={{ fontSize: 12, color: '#666', marginBottom: 5, display: 'flex', gap: 7 }}><span style={{ color: '#10b981' }}>✓</span>{f}</div>)}
              </div>

              <div style={{ ...card, border: '1.5px solid #2196F3' }}>
                <div style={{ display: 'inline-block', background: '#EBF4FF', color: '#2196F3', fontSize: 10, padding: '2px 8px', borderRadius: 20, marginBottom: 8, fontWeight: 600 }}>MONTHLY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>Pro</div><div style={{ fontSize: 11, color: '#999' }}>Per month</div></div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>$9.99</div>
                </div>
                {['Unlimited AI coach', 'Advanced analytics', 'Workout video library', 'Smart device sync', 'Custom meal plans', 'Health history up to 1 month'].map(f => <div key={f} style={{ fontSize: 12, color: '#666', marginBottom: 5, display: 'flex', gap: 7 }}><span style={{ color: '#10b981' }}>✓</span>{f}</div>)}
                <button onClick={() => subscribe('monthly')} style={{ width: '100%', padding: 11, borderRadius: 10, background: '#2196F3', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ ...card, border: '1.5px solid #10b981' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: '#E8F8F2', color: '#10b981', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>ANNUAL</div>
                  <div style={{ display: 'inline-block', background: '#E8F8F2', color: '#10b981', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Save 40%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>Pro Annual</div><div style={{ fontSize: 11, color: '#999' }}>$71.88/year billed</div></div>
                  <div><div style={{ fontSize: 24, fontWeight: 600 }}>$5.99</div><div style={{ fontSize: 10, color: '#999' }}>/mo</div></div>
                </div>
                {['All Pro Monthly features', 'Gym partner discounts', 'Priority AI coaching', 'Full nutrition plans', 'Early feature access'].map(f => <div key={f} style={{ fontSize: 12, color: '#666', marginBottom: 5, display: 'flex', gap: 7 }}><span style={{ color: '#10b981' }}>✓</span>{f}</div>)}
                <button onClick={() => subscribe('annual')} style={{ width: '100%', padding: 11, borderRadius: 10, background: '#10b981', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}>Start 7-Day Free Trial</button>
              </div>

              <div style={{ ...card, background: '#0A0A0A', border: '1.5px solid ' + gold }}>
                <div style={{ display: 'inline-block', background: gold, color: '#fff', fontSize: 10, padding: '2px 10px', borderRadius: 20, marginBottom: 10, fontWeight: 600 }}>✦ PLATINUM ELITE</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F5D97A', marginBottom: 12 }}>Concierge Health Program</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[{ label: 'Monthly', price: '$199' }, { label: 'Quarterly', price: '$499' }, { label: 'Annual', price: '$1,399' }].map(p => (
                    <div key={p.label} style={{ background: 'rgba(184,134,11,0.15)', borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid rgba(184,134,11,0.3)' }}>
                      <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: gold }}>{p.price}</div>
                    </div>
                  ))}
                </div>
                {['Private 1-on-1 health coach session (monthly)', 'Monthly blood test analysis & consultation', 'Exclusive VitaCore Watch (gifted on signup)', 'VIP marathon & sports event access', 'Unlimited AI nutrition & health coaching', '24/7 health concierge support hotline', 'Annual comprehensive full body health report', 'Priority customer support & onboarding call'].map(f => (
                  <div key={f} style={{ fontSize: 12, color: '#ccc', marginBottom: 7, display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: gold, flexShrink: 0 }}>✦</span>{f}</div>
                ))}
                <button style={{ width: '100%', padding: 13, borderRadius: 12, background: 'linear-gradient(135deg,' + gold + ',#D4A017)', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 14 }}>✦ Apply for Platinum Elite</button>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#555', marginTop: 8 }}>Limited spots · Personal onboarding call included</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
