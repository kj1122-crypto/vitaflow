const fs = require('fs');

function write(filePath, content) {
  fs.mkdirSync(require('path').dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Fixed: ' + filePath);
}

write('app/signup/page.tsx', `'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Signup() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const router = useRouter()
  const [form, setForm] = useState({name:'',email:'',password:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handle(e) {
    e.preventDefault(); setLoading(true); setError('')
    const {error} = await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{full_name:form.name},emailRedirectTo:window.location.origin+'/dashboard'}})
    if(error){setError(error.message);setLoading(false)}else{router.push('/dashboard')}
  }
  const inp = {width:'100%',padding:'12px 14px',borderRadius:10,background:'#0f1e35',border:'1px solid rgba(100,180,255,0.2)',color:'white',fontFamily:'Outfit,sans-serif',fontSize:14,outline:'none'}
  return (
    <div style={{background:'#050d1a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'Outfit,sans-serif'}}>
      <div style={{width:'100%',maxWidth:380}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontSize:22,fontWeight:700,color:'#00d4ff',marginBottom:4}}>⬡ VitaFlow</div>
          <div style={{fontSize:14,color:'#7a9ab5'}}>Create your health profile</div>
        </div>
        <div style={{background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:20,padding:24}}>
          <form onSubmit={handle} style={{display:'flex',flexDirection:'column',gap:14}}>
            <input style={inp} placeholder="Full name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input style={inp} type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <input style={inp} type="password" placeholder="Password (min 8 chars)" required minLength={8} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            {error&&<div style={{fontSize:13,color:'#f87171',background:'rgba(239,68,68,0.1)',padding:'10px 14px',borderRadius:8}}>{error}</div>}
            <button type="submit" disabled={loading} style={{padding:'13px',borderRadius:12,background:'#00d4ff',border:'none',color:'#000',fontWeight:700,fontSize:15,cursor:'pointer',fontFamily:'Outfit,sans-serif',opacity:loading?0.7:1}}>{loading?'Creating...':'Create Account'}</button>
          </form>
        </div>
        <p style={{textAlign:'center',fontSize:13,color:'#7a9ab5',marginTop:16}}>Already have an account? <Link href="/login" style={{color:'#00d4ff',textDecoration:'none'}}>Sign in</Link></p>
      </div>
    </div>
  )
}
`);

write('app/login/page.tsx', `'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Login() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const router = useRouter()
  const [form, setForm] = useState({email:'',password:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handle(e) {
    e.preventDefault(); setLoading(true); setError('')
    const {error} = await supabase.auth.signInWithPassword({email:form.email,password:form.password})
    if(error){setError(error.message);setLoading(false)}else{router.push('/dashboard');router.refresh()}
  }
  const inp = {width:'100%',padding:'12px 14px',borderRadius:10,background:'#0f1e35',border:'1px solid rgba(100,180,255,0.2)',color:'white',fontFamily:'Outfit,sans-serif',fontSize:14,outline:'none'}
  return (
    <div style={{background:'#050d1a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'Outfit,sans-serif'}}>
      <div style={{width:'100%',maxWidth:380}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontSize:22,fontWeight:700,color:'#00d4ff',marginBottom:4}}>⬡ VitaFlow</div>
          <div style={{fontSize:14,color:'#7a9ab5'}}>Welcome back</div>
        </div>
        <div style={{background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:20,padding:24}}>
          <form onSubmit={handle} style={{display:'flex',flexDirection:'column',gap:14}}>
            <input style={inp} type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <input style={inp} type="password" placeholder="Password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            {error&&<div style={{fontSize:13,color:'#f87171',background:'rgba(239,68,68,0.1)',padding:'10px 14px',borderRadius:8}}>{error}</div>}
            <button type="submit" disabled={loading} style={{padding:'13px',borderRadius:12,background:'#00d4ff',border:'none',color:'#000',fontWeight:700,fontSize:15,cursor:'pointer',fontFamily:'Outfit,sans-serif',opacity:loading?0.7:1}}>{loading?'Signing in...':'Sign In'}</button>
          </form>
        </div>
        <p style={{textAlign:'center',fontSize:13,color:'#7a9ab5',marginTop:16}}>No account? <Link href="/signup" style={{color:'#00d4ff',textDecoration:'none'}}>Sign up free</Link></p>
      </div>
    </div>
  )
}
`);

write('app/dashboard/page.tsx', `'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

function AiCoach({isPro}) {
  const [messages, setMessages] = useState([{role:'assistant',content:"Hey! I've analyzed your health data. Sleep was great at 7.4hrs, heart rate steady at 72 BPM. Want me to adjust your meal plan today?"}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [limitHit, setLimitHit] = useState(false)
  const endRef = useRef(null)
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[messages])
  async function send() {
    if(!input.trim()||loading) return
    const txt = input.trim(); setInput('')
    const newMsgs = [...messages,{role:'user',content:txt}]
    setMessages(newMsgs); setLoading(true)
    try {
      const res = await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:newMsgs})})
      const data = await res.json()
      if(res.status===429){setLimitHit(true);setMessages(m=>[...m,{role:'assistant',content:data.error}])}
      else if(data.reply){setMessages(m=>[...m,{role:'assistant',content:data.reply}])}
    } catch(e){setMessages(m=>[...m,{role:'assistant',content:'Connection error. Try again.'}])}
    setLoading(false)
  }
  return (
    <div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        {['Best meal for my goal?','Improve my strength','Why am I tired?','Hit a plateau?'].map(q=>(
          <button key={q} onClick={()=>setInput(q)} style={{padding:'6px 12px',borderRadius:20,background:'#0f1e35',border:'1px solid rgba(100,180,255,0.22)',fontSize:12,color:'white',cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>{q}</button>
        ))}
      </div>
      <div style={{background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:16,padding:16,height:280,overflowY:'auto',display:'flex',flexDirection:'column',gap:10,marginBottom:12}}>
        {messages.map((m,i)=>(
          <div key={i} style={{maxWidth:'85%',padding:'10px 14px',borderRadius:14,fontSize:14,lineHeight:1.5,alignSelf:m.role==='user'?'flex-end':'flex-start',background:m.role==='user'?'linear-gradient(135deg,#7c3aed,#5b21b6)':'#132540',border:m.role==='assistant'?'1px solid rgba(100,180,255,0.12)':'none'}}>{m.content}</div>
        ))}
        {loading&&<div style={{fontSize:14,color:'#7a9ab5',fontStyle:'italic'}}>VitaAI is thinking...</div>}
        <div ref={endRef}/>
      </div>
      {limitHit&&!isPro&&<div style={{background:'rgba(124,58,237,0.15)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:12,padding:'12px 16px',marginBottom:12,fontSize:13,color:'#a78bfa'}}>Daily limit reached. <a href="/pricing" style={{color:'#00d4ff'}}>Upgrade to Pro</a> for unlimited AI.</div>}
      <div style={{display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything about your health..." style={{flex:1,background:'#0f1e35',border:'1px solid rgba(100,180,255,0.22)',borderRadius:12,padding:'12px 14px',color:'white',fontFamily:'Outfit,sans-serif',fontSize:14,outline:'none'}}/>
        <button onClick={send} style={{width:44,height:44,borderRadius:12,background:'#00d4ff',border:'none',color:'#000',fontSize:18,cursor:'pointer',flexShrink:0}}>↑</button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [tab, setTab] = useState('home')
  const [checks, setChecks] = useState({})
  const [billingPlan, setBillingPlan] = useState('monthly')

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{
      if(!user){router.push('/login');return}
      supabase.from('profiles').select('*').eq('id',user.id).single().then(({data})=>setProfile(data||{full_name:'User',level:1,xp:0}))
    })
  },[])

  async function logout(){await supabase.auth.signOut();router.push('/')}
  async function subscribe(plan) {
    const res = await fetch('/api/stripe/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
    const {url} = await res.json()
    if(url) window.location.href=url
  }
  async function manageSubscription() {
    const res = await fetch('/api/stripe/portal',{method:'POST'})
    const {url} = await res.json()
    if(url) window.location.href=url
  }

  const isPro = profile?.subscription_plan==='monthly'||profile?.subscription_plan==='annual'
  const name = profile?.full_name?.split(' ')[0]||'there'
  const card = {background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:16,padding:16,marginBottom:12}
  const nb = (active)=>({flex:1,padding:'8px 4px',background:'none',border:'none',borderBottom:active?'2px solid #00d4ff':'2px solid transparent',color:active?'#00d4ff':'#7a9ab5',fontFamily:'Outfit,sans-serif',fontSize:10,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4,textTransform:'uppercase',letterSpacing:'0.5px'})

  if(!profile) return <div style={{background:'#050d1a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif'}}><p style={{color:'#7a9ab5'}}>Loading...</p></div>

  return (
    <div style={{background:'#050d1a',minHeight:'100vh',fontFamily:'Outfit,sans-serif',color:'white'}}>
      <div style={{maxWidth:480,margin:'0 auto',paddingBottom:80}}>
        <nav style={{display:'flex',padding:'12px 16px 0',position:'sticky',top:0,background:'#050d1a',zIndex:100,borderBottom:'1px solid rgba(100,180,255,0.12)'}}>
          {[['home','⬡','Dashboard'],['ai','◈','AI Coach'],['workout','◉','Workout'],['game','◆','Quest'],['pro','✦','Pro']].map(([t,icon,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={nb(tab===t)}><span style={{fontSize:18}}>{icon}</span>{label}</button>
          ))}
        </nav>
        <div style={{padding:'20px 16px'}}>

          {tab==='home'&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                <div>
                  <div style={{fontSize:22,fontWeight:600}}>Good morning, <span style={{color:'#00d4ff'}}>{name}</span> 👋</div>
                  <div style={{fontSize:12,color:'#7a9ab5',fontFamily:'Space Mono,monospace',marginTop:4}}>{new Date().toDateString().toUpperCase()}</div>
                </div>
                <button onClick={logout} style={{background:'none',border:'1px solid rgba(100,180,255,0.2)',borderRadius:10,padding:'6px 12px',color:'#7a9ab5',cursor:'pointer',fontSize:12,fontFamily:'Outfit,sans-serif'}}>Sign out</button>
              </div>
              {isPro&&(
                <div style={{background:'rgba(124,58,237,0.15)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:12,padding:'10px 14px',marginBottom:14,fontSize:13,color:'#a78bfa',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>✦ Pro Active</span>
                  <button onClick={manageSubscription} style={{background:'none',border:'none',color:'#00d4ff',fontSize:12,cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>Manage →</button>
                </div>
              )}
              <div style={{...card,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                {[{l:'Heart Rate',v:'72',u:'BPM',c:'#00d4ff'},{l:'Sleep',v:'7.4',u:'hrs',c:'#a78bfa'},{l:'Steps',v:'7,432',u:'steps',c:'#10b981'},{l:'Calories',v:'1,640',u:'kcal',c:'#f59e0b'},{l:'SpO2',v:'98',u:'%',c:'#00d4ff'},{l:'Weight',v:'68.2',u:'kg',c:'#a78bfa'}].map(m=>(
                  <div key={m.l} style={{textAlign:'center',padding:12,background:'#132540',borderRadius:12}}>
                    <div style={{fontSize:20,fontWeight:700,fontFamily:'Space Mono,monospace',color:m.c}}>{m.v}</div>
                    <div style={{fontSize:11,color:'#7a9ab5'}}>{m.u}</div>
                    <div style={{fontSize:11,color:'#7a9ab5',marginTop:2}}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:13,fontWeight:600,color:'#7a9ab5',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Today Plan</div>
              {[{icon:'🥗',title:'Grilled Salmon Bowl',sub:'Lunch · 480 kcal · 42g protein',id:'m1'},{icon:'⚡',title:'Upper Body Strength',sub:'45 min · 320 kcal burn',id:'w1'},{icon:'🌙',title:'Quinoa Veggie Stir-fry',sub:'Dinner · 390 kcal · 28g protein',id:'m2'}].map(item=>(
                <div key={item.id} style={{...card,display:'flex',alignItems:'center',gap:14}}>
                  <div style={{fontSize:24,width:42,height:42,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.06)',flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:15}}>{item.title}</div>
                    <div style={{fontSize:12,color:'#7a9ab5',marginTop:3}}>{item.sub}</div>
                  </div>
                  <div onClick={()=>setChecks(c=>({...c,[item.id]:!c[item.id]}))} style={{width:28,height:28,borderRadius:'50%',border:checks[item.id]?'none':'2px solid rgba(100,180,255,0.3)',background:checks[item.id]?'#10b981':'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14,flexShrink:0}}>{checks[item.id]?'✓':''}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='ai'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,#7c3aed,#00d4ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>🧠</div>
                <div>
                  <div style={{fontWeight:600,fontSize:16}}>VitaAI Coach</div>
                  <div style={{fontSize:12,color:'#7a9ab5'}}>Powered by Claude · {isPro?'Unlimited':'3 msg/day on Free'}</div>
                </div>
              </div>
              <AiCoach isPro={isPro}/>
            </div>
          )}

          {tab==='workout'&&(
            <div>
              <div style={{...card,background:'linear-gradient(135deg,#0a1628,#1a0a2e)'}}>
                <div style={{fontSize:12,color:'#a78bfa',fontWeight:600,textTransform:'uppercase',letterSpacing:1}}>Day 3 · Upper Body</div>
                <div style={{fontSize:22,fontWeight:700,margin:'6px 0 4px'}}>Push and Pull Power</div>
                <div style={{display:'flex',gap:16,fontSize:13,color:'#7a9ab5'}}><span>45 min</span><span>320 kcal</span><span>6 exercises</span></div>
              </div>
              {[{n:'01',name:'Bench Press',detail:'Chest, Triceps · 90s rest',sets:'4x8'},{n:'02',name:'Pull-ups',detail:'Back, Biceps · 60s rest',sets:'3x10'},{n:'03',name:'Overhead Press',detail:'Shoulders · 90s rest',sets:'4x8'},{n:'04',name:'Cable Rows',detail:'Back, Rear Delts · 60s rest',sets:'3x12'},{n:'05',name:'Lateral Raises',detail:'Side Delts · 45s rest',sets:'3x15'},{n:'06',name:'Tricep Dips',detail:'Triceps · 60s rest',sets:'3x12'}].map(ex=>(
                <div key={ex.n} style={{...card,display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'rgba(124,58,237,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#a78bfa',fontFamily:'Space Mono,monospace',flexShrink:0}}>{ex.n}</div>
                  <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{ex.name}</div><div style={{fontSize:12,color:'#7a9ab5',marginTop:2}}>{ex.detail}</div></div>
                  <div style={{fontFamily:'Space Mono,monospace',color:'#00d4ff',fontWeight:700}}>{ex.sets}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='game'&&(
            <div>
              <div style={card}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <div><div style={{fontSize:12,color:'#7a9ab5',textTransform:'uppercase',letterSpacing:1}}>Level {profile?.level||1} Fitness Warrior</div><div style={{fontSize:20,fontWeight:700}}>{name} Quest</div></div>
                  <div style={{background:'rgba(245,158,11,0.15)',border:'1px solid rgba(245,158,11,0.3)',borderRadius:20,padding:'4px 12px',fontSize:12,color:'#f59e0b',fontWeight:600}}>{profile?.xp||2480} XP</div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#7a9ab5',marginBottom:6}}><span>Level {profile?.level||1}</span><span>{profile?.xp||2480} / 3000 XP</span></div>
                  <div style={{height:8,background:'rgba(255,255,255,0.08)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,#f59e0b,#f97316)',borderRadius:4,width:Math.min(((profile?.xp||2480)/3000)*100,100)+'%'}}/></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
                  {[{icon:'sword',stat:'STR 84',color:'#f87171',bg:'rgba(239,68,68,0.08)',label:'Strength'},{icon:'run',stat:'END 71',color:'#00d4ff',bg:'rgba(0,212,255,0.08)',label:'Endurance'},{icon:'leaf',stat:'VIT 90',color:'#10b981',bg:'rgba(16,185,129,0.08)',label:'Vitality'}].map(s2=>(
                    <div key={s2.stat} style={{textAlign:'center',padding:12,background:s2.bg,borderRadius:12}}>
                      <div style={{fontSize:14,fontWeight:700,color:s2.color,marginBottom:4}}>{s2.stat}</div>
                      <div style={{fontSize:10,color:'#7a9ab5'}}>{s2.label}</div>
                    </div>
                  ))}
                </div>
                {[{name:'Burn 1800 calories',prog:'1247 / 1800',pct:69,xp:'+150 XP',done:false},{name:'Log all 3 meals',prog:'2 / 3 meals',pct:66,xp:'+80 XP',done:false},{name:'Drink 2.5L water',prog:'1.6 / 2.5L',pct:64,xp:'+60 XP',done:false},{name:'Sleep 7+ hours',prog:'Completed!',pct:100,xp:'+100',done:true}].map(q=>(
                  <div key={q.name} style={{display:'flex',alignItems:'center',gap:12,padding:12,background:q.done?'rgba(16,185,129,0.04)':'rgba(255,255,255,0.03)',borderRadius:12,border:q.done?'1px solid rgba(16,185,129,0.3)':'1px solid rgba(100,180,255,0.12)',marginBottom:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600}}>{q.name}</div>
                      <div style={{fontSize:11,color:q.done?'#10b981':'#7a9ab5',marginTop:2}}>{q.prog}</div>
                      <div style={{height:3,background:'rgba(255,255,255,0.08)',borderRadius:2,marginTop:6,overflow:'hidden'}}><div style={{height:'100%',background:q.done?'#10b981':'#f59e0b',width:q.pct+'%',borderRadius:2}}/></div>
                    </div>
                    <div style={{fontSize:12,color:q.done?'#10b981':'#f59e0b',fontWeight:600,flexShrink:0}}>{q.xp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='pro'&&(
            <div>
              {isPro?(
                <div style={{...card,textAlign:'center',padding:32}}>
                  <div style={{fontSize:48,marginBottom:12}}>crown</div>
                  <div style={{fontSize:22,fontWeight:700,color:'#a78bfa',marginBottom:8}}>You are on Pro!</div>
                  <div style={{fontSize:14,color:'#7a9ab5',marginBottom:20}}>Enjoy unlimited AI coaching and all premium features.</div>
                  <button onClick={manageSubscription} style={{padding:'12px 24px',borderRadius:12,background:'rgba(124,58,237,0.2)',border:'1px solid rgba(124,58,237,0.4)',color:'#a78bfa',cursor:'pointer',fontSize:14,fontFamily:'Outfit,sans-serif'}}>Manage Subscription</button>
                </div>
              ):(
                <div>
                  <div style={{...card,textAlign:'center',padding:28,background:'linear-gradient(135deg,#1a0a2e,#0a1628)'}}>
                    <div style={{fontSize:22,fontWeight:700,color:'#a78bfa',marginBottom:6}}>VitaFlow Pro</div>
                    <div style={{fontSize:14,color:'#7a9ab5'}}>Unlock your full health potential</div>
                  </div>
                  <div style={{display:'flex',background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:12,padding:4,marginBottom:16}}>
                    {['monthly','annual'].map(b=>(
                      <button key={b} onClick={()=>setBillingPlan(b)} style={{flex:1,padding:'10px',borderRadius:10,border:'none',background:billingPlan===b?'#7c3aed':'none',color:billingPlan===b?'white':'#7a9ab5',cursor:'pointer',fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:500}}>
                        {b==='monthly'?'Monthly':'Annual Save 40%'}
                      </button>
                    ))}
                  </div>
                  <div style={{...card,textAlign:'center'}}>
                    <div style={{fontSize:36,fontWeight:700,fontFamily:'Space Mono,monospace',color:'#00d4ff'}}>{billingPlan==='monthly'?'$9.99':'$5.99'}</div>
                    <div style={{fontSize:13,color:'#7a9ab5',marginBottom:16}}>{billingPlan==='annual'?'per month billed $71.88/year':'per month'}</div>
                    <button onClick={()=>subscribe(billingPlan)} style={{width:'100%',padding:'14px',borderRadius:14,background:'linear-gradient(135deg,#7c3aed,#5b21b6)',border:'none',color:'white',fontFamily:'Outfit,sans-serif',fontSize:16,fontWeight:700,cursor:'pointer'}}>Start 7-Day Free Trial</button>
                    <p style={{fontSize:12,color:'#7a9ab5',marginTop:10}}>No charge during trial. Cancel anytime.</p>
                  </div>
                  {[{icon:'brain',name:'Unlimited AI Coach',desc:'Ask anything, personalized to your data',tag:'Pro'},{icon:'chart',name:'Advanced Analytics',desc:'Trends, predictions, weekly reports',tag:'Pro'},{icon:'target',name:'Custom Workout Builder',desc:'AI plans for your body',tag:'Pro'},{icon:'game',name:'Quest and Leaderboard',desc:'Earn XP, compete with friends',tag:'Free'},{icon:'food',name:'AI Meal Generator',desc:'Recipes tailored to your macros',tag:'Free'}].map(f=>(
                    <div key={f.name} style={{...card,display:'flex',alignItems:'center',gap:12}}>
                      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{f.name}</div><div style={{fontSize:12,color:'#7a9ab5',marginTop:2}}>{f.desc}</div></div>
                      <div style={{fontSize:10,padding:'3px 10px',borderRadius:10,fontWeight:600,background:f.tag==='Pro'?'rgba(124,58,237,0.2)':'rgba(16,185,129,0.15)',color:f.tag==='Pro'?'#a78bfa':'#10b981',flexShrink:0}}>{f.tag}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
`);

console.log('\n✅ All files fixed! Run: npm run dev');
