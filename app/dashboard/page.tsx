'use client'
import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const gold = '#B8860B'
const goldLight = '#FDF6DC'
const goldBorder = '#E8C84A'

function AiCoach({isPro, userName}) {
  const [messages, setMessages] = useState([{role:'assistant',content:"Hello " + (userName||'there') + "! I am your VitaCore AI Health Coach. I have analysed your profile and I am ready to help you reach your goals. What would you like to work on today?"}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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
      if(data.reply) setMessages(m=>[...m,{role:'assistant',content:data.reply}])
      else if(data.error) setMessages(m=>[...m,{role:'assistant',content:data.error}])
    } catch(e){setMessages(m=>[...m,{role:'assistant',content:'Connection error. Please try again.'}])}
    setLoading(false)
  }
  const chips = ['Best meal for fat loss?','Slim my waist & thighs','Best sport for weight loss','Marathon training plan','Pilates for beginners','How to build muscle fast']
  return (
    <div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16}}>
        {chips.map(q=>(
          <button key={q} onClick={()=>setInput(q)} style={{padding:'6px 14px',borderRadius:20,background:goldLight,border:'1px solid '+goldBorder,fontSize:12,color:gold,cursor:'pointer',fontFamily:'inherit',fontWeight:500}}>{q}</button>
        ))}
      </div>
      <div style={{background:'#f9f9f9',border:'1px solid #eee',borderRadius:16,padding:16,height:320,overflowY:'auto',display:'flex',flexDirection:'column',gap:12,marginBottom:12}}>
        {messages.map((m,i)=>(
          <div key={i} style={{maxWidth:'85%',padding:'12px 16px',borderRadius:16,fontSize:14,lineHeight:1.6,alignSelf:m.role==='user'?'flex-end':'flex-start',background:m.role==='user'?'#0A0A0A':'#fff',color:m.role==='user'?'#fff':'#1a1a1a',border:m.role==='assistant'?'1px solid #eee':'none',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
            {m.role==='assistant'&&<div style={{fontSize:11,color:gold,fontWeight:600,marginBottom:4}}>VITACORE AI</div>}
            {m.content}
          </div>
        ))}
        {loading&&<div style={{fontSize:13,color:'#999',fontStyle:'italic',padding:'8px 16px'}}>VitaCore AI is thinking...</div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything about your health, workouts, nutrition..." style={{flex:1,background:'#fff',border:'1px solid #ddd',borderRadius:12,padding:'13px 16px',color:'#1a1a1a',fontFamily:'inherit',fontSize:14,outline:'none'}}/>
        <button onClick={send} style={{width:48,height:48,borderRadius:12,background:'#0A0A0A',border:'none',color:'#fff',fontSize:20,cursor:'pointer',flexShrink:0}}>↑</button>
      </div>
    </div>
  )
}

function OnboardingGuide({step, onClose, onNext}) {
  const steps = [
    {title:'Welcome to VitaCore',desc:'This is your health dashboard. Track all your vital metrics, calories, sleep and more in real time.',icon:'🏠'},
    {title:'Your AI Health Coach',desc:'Chat with our Claude-powered AI coach anytime. Ask about meals, workouts, or how to slim specific body parts.',icon:'🧠'},
    {title:'Earn XP & Rewards',desc:'Complete daily quests to earn XP points. Redeem them for smart watches, weight scales and exclusive vouchers!',icon:'⚔️'},
    {title:'Referral Program',desc:'Share your referral link. Every 10 successful referrals earns you RM50 vouchers for KFC, McDonald's and more!',icon:'🎁'},
    {title:'Connect Your Device',desc:'Sync your VitaCore Watch or any Bluetooth device to automatically track workouts and health data.',icon:'⌚'},
  ]
  const s = steps[step]||steps[0]
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:'20px 20px 0 0',padding:28,width:'100%',maxWidth:480}}>
        <div style={{textAlign:'center',marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:12}}>{s.icon}</div>
          <div style={{fontSize:11,color:gold,fontWeight:600,letterSpacing:1,marginBottom:8}}>STEP {step+1} OF {steps.length}</div>
          <div style={{fontSize:20,fontWeight:600,marginBottom:8,color:'#1a1a1a'}}>{s.title}</div>
          <div style={{fontSize:14,color:'#666',lineHeight:1.7}}>{s.desc}</div>
        </div>
        <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:20}}>
          {steps.map((_,i)=>(
            <div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,background:i===step?gold:'#e0e0e0',transition:'all 0.3s'}}/>
          ))}
        </div>
        <button onClick={onNext} style={{width:'100%',padding:14,borderRadius:12,background:'#0A0A0A',border:'none',color:'#fff',fontFamily:'inherit',fontSize:15,fontWeight:600,cursor:'pointer',marginBottom:10}}>
          {step<steps.length-1?'Next →':'Get Started!'}
        </button>
        <button onClick={onClose} style={{width:'100%',padding:10,borderRadius:12,background:'none',border:'none',color:'#999',fontFamily:'inherit',fontSize:13,cursor:'pointer'}}>Skip tour</button>
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
  const [showGuide, setShowGuide] = useState(true)
  const [guideStep, setGuideStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [xp, setXp] = useState(2480)

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{
      if(!user){router.push('/login');return}
      supabase.from('profiles').select('*').eq('id',user.id).single().then(({data})=>setProfile(data||{full_name:'Member',level:1,xp:2480,subscription_plan:'free'}))
    })
  },[])

  async function logout(){await supabase.auth.signOut();router.push('/')}
  async function subscribe(plan) {
    const res = await fetch('/api/stripe/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
    const {url} = await res.json()
    if(url) window.location.href=url
  }

  function copyReferral() {
    navigator.clipboard.writeText('https://vitacore.app/ref/'+( profile?.id?.slice(0,8)||'ABC123'))
    setCopied(true); setTimeout(()=>setCopied(false),2000)
  }

  function handleGuideNext() {
    if(guideStep<4) setGuideStep(g=>g+1)
    else setShowGuide(false)
  }

  const isPro = profile?.subscription_plan==='monthly'||profile?.subscription_plan==='annual'||profile?.subscription_plan==='platinum'
  const name = profile?.full_name?.split(' ')[0]||'Member'
  const userXp = profile?.xp||xp
  const level = profile?.level||1

  const card = {background:'#fff',border:'1px solid #f0f0f0',borderRadius:16,padding:16,marginBottom:12,boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}
  const nb = (active)=>({flex:1,padding:'8px 4px',background:'none',border:'none',borderBottom:active?'2px solid '+gold:'2px solid transparent',color:active?gold:'#999',fontFamily:'inherit',fontSize:10,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4,textTransform:'uppercase',letterSpacing:'0.5px'})

  const REWARDS = [
    {icon:'⌚',name:'VitaCore Watch',xp:50000,unlocked:userXp>=50000},
    {icon:'⚖️',name:'Smart Scale',xp:20000,unlocked:userXp>=20000},
    {icon:'🎧',name:'Earbuds',xp:15000,unlocked:userXp>=15000},
    {icon:'🍔',name:'KFC RM50',xp:5000,unlocked:userXp>=5000},
    {icon:'🍟',name:"McDonald's RM50",xp:5000,unlocked:userXp>=5000},
    {icon:'🏃',name:'Marathon Entry',xp:8000,unlocked:userXp>=8000},
  ]

  const WORKOUTS = [
    {icon:'🏋️',name:'Slim Your Waist',meta:'15 min · Burn 180 kcal',xp:'+80 XP',target:'waist',video:'https://www.youtube.com/results?search_query=waist+slimming+workout'},
    {icon:'🦵',name:'Tone Your Thighs',meta:'20 min · Burn 220 kcal',xp:'+100 XP',target:'thighs',video:'https://www.youtube.com/results?search_query=thigh+toning+workout'},
    {icon:'💪',name:'Arm Definition',meta:'12 min · Burn 140 kcal',xp:'+60 XP',target:'arms',video:'https://www.youtube.com/results?search_query=arm+toning+workout'},
    {icon:'🧘',name:'Pilates Core',meta:'30 min · Burn 200 kcal',xp:'+120 XP',target:'core',video:'https://www.youtube.com/results?search_query=pilates+core+workout'},
    {icon:'🏃',name:'Marathon Prep',meta:'45 min · Burn 450 kcal',xp:'+200 XP',target:'full body',video:'https://www.youtube.com/results?search_query=marathon+training+beginner'},
    {icon:'🏸',name:'Badminton Drills',meta:'40 min · Burn 380 kcal',xp:'+180 XP',target:'full body',video:'https://www.youtube.com/results?search_query=badminton+fitness+drills'},
    {icon:'🎾',name:'Pickleball Cardio',meta:'35 min · Burn 320 kcal',xp:'+150 XP',target:'cardio',video:'https://www.youtube.com/results?search_query=pickleball+workout'},
  ]

  if(!profile) return (
    <div style={{background:'#fff',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui,sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:32,marginBottom:8}}>⬡</div>
        <div style={{color:'#999',fontSize:14}}>Loading VitaCore...</div>
      </div>
    </div>
  )

  return (
    <div style={{background:'#fafafa',minHeight:'100vh',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',color:'#1a1a1a'}}>
      {showGuide&&<OnboardingGuide step={guideStep} onClose={()=>setShowGuide(false)} onNext={handleGuideNext}/>}
      <div style={{maxWidth:480,margin:'0 auto',paddingBottom:80}}>

        {/* TOP NAV */}
        <nav style={{display:'flex',padding:'12px 16px 0',position:'sticky',top:0,background:'#fff',zIndex:100,borderBottom:'1px solid #f0f0f0',boxShadow:'0 1px 8px rgba(0,0,0,0.04)'}}>
          {[['home','🏠','Home'],['ai','🧠','AI Coach'],['workout','💪','Workout'],['game','⚔️','Quest'],['pro','👑','Plans']].map(([t,icon,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={nb(tab===t)}><span style={{fontSize:18}}>{icon}</span>{label}</button>
          ))}
        </nav>

        <div style={{padding:'20px 16px'}}>

          {/* ── HOME ── */}
          {tab==='home'&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                <div>
                  <div style={{fontSize:13,color:'#999',marginBottom:2}}>{new Date().toDateString()}</div>
                  <div style={{fontSize:22,fontWeight:600}}>Good morning, <span style={{color:gold}}>{name}</span> 👋</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  {isPro&&<div style={{background:goldLight,border:'1px solid '+goldBorder,borderRadius:20,padding:'4px 10px',fontSize:11,color:gold,fontWeight:600}}>✦ PRO</div>}
                  <button onClick={logout} style={{background:'none',border:'1px solid #e0e0e0',borderRadius:10,padding:'6px 12px',color:'#999',cursor:'pointer',fontSize:12,fontFamily:'inherit'}}>Sign out</button>
                </div>
              </div>

              {/* XP BAR */}
              <div style={{...card,padding:'14px 16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#1a1a1a'}}>Level {level} · Fitness Warrior</div>
                  <div style={{background:goldLight,border:'1px solid '+goldBorder,borderRadius:20,padding:'3px 10px',fontSize:11,color:gold,fontWeight:600}}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{height:8,background:'#f0f0f0',borderRadius:4,overflow:'hidden'}}>
                  <div style={{height:'100%',background:'linear-gradient(90deg,'+gold+',#D4A017)',borderRadius:4,width:Math.min((userXp/3000)*100,100)+'%',transition:'width 1s ease'}}/>
                </div>
                <div style={{fontSize:11,color:'#999',marginTop:6}}>{userXp.toLocaleString()} / 3,000 XP to Level {level+1}</div>
              </div>

              {/* HEALTH METRICS */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:12}}>
                {[{l:'Heart Rate',v:'72',u:'BPM',c:'#E24B4A',bg:'#FFF0F0'},{l:'Sleep',v:'7.4',u:'hrs',c:'#7C4DFF',bg:'#F3EEFF'},{l:'Steps',v:'7,432',u:'steps',c:'#2196F3',bg:'#EBF4FF'},{l:'Calories',v:'1,640',u:'kcal',c:gold,bg:goldLight},{l:'SpO₂',v:'98',u:'%',c:'#10b981',bg:'#E8F8F2'},{l:'Weight',v:'68.2',u:'kg',c:'#FF6B35',bg:'#FFF0EB'}].map(m=>(
                  <div key={m.l} style={{background:m.bg,borderRadius:14,padding:'12px 10px',textAlign:'center',border:'1px solid #f0f0f0'}}>
                    <div style={{fontSize:20,fontWeight:700,color:m.c}}>{m.v}</div>
                    <div style={{fontSize:10,color:'#999'}}>{m.u}</div>
                    <div style={{fontSize:10,color:'#666',marginTop:2}}>{m.l}</div>
                  </div>
                ))}
              </div>

              {/* TODAY PLAN */}
              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Today's Plan</div>
              {[{icon:'🥗',title:'Grilled Salmon Bowl',sub:'Lunch · 480 kcal · 42g protein',id:'m1'},{icon:'⚡',title:'Upper Body Strength',sub:'45 min · 320 kcal burn',id:'w1'},{icon:'🌙',title:'Quinoa Veggie Stir-fry',sub:'Dinner · 390 kcal',id:'m2'}].map(item=>(
                <div key={item.id} style={{...card,display:'flex',alignItems:'center',gap:14}}>
                  <div style={{fontSize:22,width:44,height:44,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f5f5',flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:15}}>{item.title}</div>
                    <div style={{fontSize:12,color:'#999',marginTop:3}}>{item.sub}</div>
                  </div>
                  <div onClick={()=>{setChecks(c=>({...c,[item.id]:!c[item.id]}));if(!checks[item.id])setXp(x=>x+50)}} style={{width:28,height:28,borderRadius:'50%',border:checks[item.id]?'none':'2px solid #e0e0e0',background:checks[item.id]?'#10b981':'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14,color:'white',flexShrink:0}}>{checks[item.id]?'✓':''}</div>
                </div>
              ))}

              {/* REFERRAL */}
              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Referral Program</div>
              <div style={{...card,background:goldLight,border:'1px solid '+goldBorder}}>
                <div style={{fontSize:15,fontWeight:600,color:'#1a1a1a',marginBottom:4}}>🎁 Invite friends, earn rewards!</div>
                <div style={{fontSize:13,color:'#666',marginBottom:12,lineHeight:1.6}}>Every 10 successful referrals = <strong>RM50 voucher</strong> (KFC, McDonald's & more)</div>
                <div style={{display:'flex',alignItems:'center',gap:8,background:'#fff',borderRadius:10,padding:'10px 14px',border:'1px solid '+goldBorder,marginBottom:12,cursor:'pointer'}} onClick={copyReferral}>
                  <span style={{flex:1,fontSize:13,color:'#666',fontFamily:'monospace'}}>vitacore.app/ref/{profile?.id?.slice(0,8)||'ABC123'}</span>
                  <span style={{fontSize:13,color:gold,fontWeight:600}}>{copied?'Copied! ✓':'Copy'}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#666',marginBottom:8}}><span>Progress: 3/10 referrals</span><span style={{color:gold,fontWeight:600}}>30% complete</span></div>
                <div style={{display:'flex',gap:4}}>
                  {Array.from({length:10},(_,i)=>(
                    <div key={i} style={{flex:1,height:20,borderRadius:4,background:i<3?gold:'#e0e0e0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:i<3?'#fff':'#ccc'}}>{i<3?'✓':i+1}</div>
                  ))}
                </div>
              </div>

              {/* DEVICE CONNECT */}
              <div style={{...card,background:'#0A0A0A',color:'#fff'}}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{fontSize:32}}>⌚</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>VitaCore Watch</div>
                    <div style={{fontSize:12,color:'#999',lineHeight:1.5}}>Connect via Bluetooth to auto-sync workouts, heart rate & sleep data</div>
                  </div>
                  <button style={{padding:'8px 14px',borderRadius:10,background:gold,border:'none',color:'#fff',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>Connect</button>
                </div>
              </div>

              {/* CAMPAIGNS */}
              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Active Campaigns</div>
              {[{icon:'🏃',name:'KL Marathon 2026',date:'Jun 15 · Earn 2,000 XP',color:'#2196F3',bg:'#EBF4FF'},{icon:'🏸',name:'Badminton Tournament',date:'Jul 8 · Earn 1,500 XP',color:'#10b981',bg:'#E8F8F2'},{icon:'🎾',name:'Pickleball Open',date:'Jul 22 · Earn 1,500 XP',color:'#FF6B35',bg:'#FFF0EB'}].map(c2=>(
                <div key={c2.name} style={{...card,display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:44,height:44,borderRadius:12,background:c2.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{c2.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{c2.name}</div>
                    <div style={{fontSize:12,color:'#999',marginTop:3}}>{c2.date}</div>
                  </div>
                  <button style={{padding:'6px 12px',borderRadius:8,background:c2.bg,border:'none',color:c2.color,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Join</button>
                </div>
              ))}
            </div>
          )}

          {/* ── AI COACH ── */}
          {tab==='ai'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20,padding:16,background:goldLight,borderRadius:16,border:'1px solid '+goldBorder}}>
                <div style={{width:48,height:48,borderRadius:14,background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>🧠</div>
                <div>
                  <div style={{fontWeight:600,fontSize:16,color:'#1a1a1a'}}>VitaCore AI Coach</div>
                  <div style={{fontSize:12,color:gold,fontWeight:500}}>Powered by Claude · Personalized to you</div>
                  <div style={{fontSize:11,color:'#666',marginTop:2}}>{isPro?'Unlimited messages':'3 messages/day on Free'}</div>
                </div>
                <div style={{marginLeft:'auto',background:'#10b981',borderRadius:20,padding:'4px 10px',fontSize:11,color:'#fff',fontWeight:600}}>LIVE</div>
              </div>
              <AiCoach isPro={isPro} userName={name}/>
              <div style={{...card,marginTop:12,background:'#f9f9f9'}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:10,color:'#1a1a1a'}}>💡 Body Targeting Guide</div>
                {[{area:'Slim waist',sports:'Swimming, Pilates, Yoga',gym:'Cable crunches, Russian twists'},{area:'Tone thighs',sports:'Cycling, Badminton, Running',gym:'Squats, Lunges, Leg press'},{area:'Flat belly',sports:'Swimming, HIIT, Tennis',gym:'Planks, Deadlifts, Leg raises'},{area:'Slim arms',sports:'Tennis, Badminton, Swimming',gym:'Tricep dips, Push-ups, Curls'}].map(b=>(
                  <div key={b.area} style={{padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#1a1a1a',marginBottom:3}}>{b.area}</div>
                    <div style={{fontSize:11,color:'#666'}}>🏃 Sports: {b.sports}</div>
                    <div style={{fontSize:11,color:'#666',marginTop:2}}>🏋️ Gym: {b.gym}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WORKOUT ── */}
          {tab==='workout'&&(
            <div>
              <div style={{...card,background:'#0A0A0A',color:'#fff',padding:20}}>
                <div style={{fontSize:11,color:gold,fontWeight:600,textTransform:'uppercase',letterSpacing:1}}>Today · Upper Body</div>
                <div style={{fontSize:22,fontWeight:700,margin:'6px 0 4px'}}>Push & Pull Power</div>
                <div style={{display:'flex',gap:16,fontSize:13,color:'#999'}}><span>⏱ 45 min</span><span>🔥 320 kcal</span><span>💪 +150 XP</span></div>
              </div>

              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Target by Body Part</div>
              {WORKOUTS.map(ex=>(
                <div key={ex.name} style={{...card,display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{ex.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:600}}>{ex.name}</div>
                    <div style={{fontSize:12,color:'#999',marginTop:2}}>{ex.meta}</div>
                    <div style={{fontSize:11,color:'#666',marginTop:2}}>Target: {ex.target}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
                    <div style={{fontSize:12,color:gold,fontWeight:600}}>{ex.xp}</div>
                    <button onClick={()=>window.open(ex.video,'_blank')} style={{padding:'5px 10px',borderRadius:8,background:goldLight,border:'1px solid '+goldBorder,color:gold,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>▶ Video</button>
                  </div>
                </div>
              ))}

              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>Gym & Sport Recommendations</div>
              <div style={{...card}}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:12}}>Best sports for your goal</div>
                {[{sport:'🏊 Swimming',benefit:'Full body fat burn, joint-friendly',kcal:'400-600 kcal/hr'},{sport:'🚴 Cycling',benefit:'Lower body toning, high endurance',kcal:'300-500 kcal/hr'},{sport:'🧘 Pilates',benefit:'Core strength, posture, flexibility',kcal:'200-400 kcal/hr'},{sport:'🏸 Badminton',benefit:'Agility, cardio, fun social sport',kcal:'350-500 kcal/hr'},{sport:'🎾 Pickleball',benefit:'Low impact, full body, growing sport',kcal:'300-450 kcal/hr'}].map(s2=>(
                  <div key={s2.sport} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid #f5f5f5'}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600}}>{s2.sport}</div>
                      <div style={{fontSize:11,color:'#666',marginTop:2}}>{s2.benefit}</div>
                    </div>
                    <div style={{fontSize:11,color:'#10b981',fontWeight:600}}>{s2.kcal}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── QUEST ── */}
          {tab==='game'&&(
            <div>
              <div style={card}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <div>
                    <div style={{fontSize:11,color:'#999',textTransform:'uppercase',letterSpacing:1}}>Level {level} · Fitness Warrior</div>
                    <div style={{fontSize:20,fontWeight:700}}>{name}'s Quest ⚔️</div>
                  </div>
                  <div style={{background:goldLight,border:'1px solid '+goldBorder,borderRadius:20,padding:'4px 12px',fontSize:12,color:gold,fontWeight:600}}>{userXp.toLocaleString()} XP</div>
                </div>
                <div style={{height:8,background:'#f0f0f0',borderRadius:4,overflow:'hidden',marginBottom:6}}>
                  <div style={{height:'100%',background:'linear-gradient(90deg,'+gold+',#D4A017)',borderRadius:4,width:Math.min((userXp/3000)*100,100)+'%'}}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16,marginTop:12}}>
                  {[{s:'STR 84',c:'#E24B4A',bg:'#FFF0F0'},{s:'END 71',c:'#2196F3',bg:'#EBF4FF'},{s:'VIT 90',c:'#10b981',bg:'#E8F8F2'}].map(s2=>(
                    <div key={s2.s} style={{textAlign:'center',padding:10,background:s2.bg,borderRadius:12}}><div style={{fontSize:15,fontWeight:700,color:s2.c}}>{s2.s}</div></div>
                  ))}
                </div>
                {[{icon:'🔥',name:'Burn 1,800 calories',prog:'1,247/1,800',pct:69,xp:'+150 XP',done:false},{icon:'🥗',name:'Log all 3 meals',prog:'2/3',pct:66,xp:'+80 XP',done:false},{icon:'💧',name:'Drink 2.5L water',prog:'1.6/2.5L',pct:64,xp:'+60 XP',done:false},{icon:'😴',name:'Sleep 7+ hours',prog:'✓ Done!',pct:100,xp:'+100 XP',done:true}].map(q=>(
                  <div key={q.name} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background:q.done?'#E8F8F2':'#fafafa',borderRadius:12,border:q.done?'1px solid #b7e4d0':'1px solid #f0f0f0',marginBottom:8}}>
                    <div style={{fontSize:20,flexShrink:0}}>{q.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600}}>{q.name}</div>
                      <div style={{fontSize:11,color:q.done?'#10b981':'#999',marginTop:2}}>{q.prog}</div>
                      <div style={{height:3,background:'#eee',borderRadius:2,marginTop:6,overflow:'hidden'}}><div style={{height:'100%',background:q.done?'#10b981':gold,width:q.pct+'%',borderRadius:2}}/></div>
                    </div>
                    <div style={{fontSize:12,color:q.done?'#10b981':gold,fontWeight:600,flexShrink:0}}>{q.xp}</div>
                  </div>
                ))}
              </div>

              {/* WEEKLY LEADERBOARD */}
              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>🏆 Weekly Top 3 · Win Prizes!</div>
              <div style={card}>
                <div style={{fontSize:12,color:'#666',marginBottom:12}}>Top 3 each week win exclusive rewards — smart watch, vouchers & more!</div>
                {[{rank:'🥇',name:'ZenFit_Sara',xp:'3,240',prize:'VitaCore Watch'},{rank:'🥈',name:name+' (You)',xp:userXp.toLocaleString(),prize:'RM50 KFC Voucher'},{rank:'🥉',name:'IronMike_KL',xp:'2,150',prize:'RM50 McDonald's'}].map(l=>(
                  <div key={l.name} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid #f5f5f5'}}>
                    <div style={{fontSize:22,width:32,textAlign:'center'}}>{l.rank}</div>
                    <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{l.name}</div><div style={{fontSize:11,color:gold}}>{l.prize}</div></div>
                    <div style={{fontWeight:700,color:'#1a1a1a',fontSize:14}}>{l.xp} XP</div>
                  </div>
                ))}
              </div>

              {/* XP REWARDS */}
              <div style={{fontSize:12,fontWeight:600,color:'#999',textTransform:'uppercase',letterSpacing:1,margin:'16px 0 10px'}}>🎁 XP Reward Store</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                {REWARDS.map(r=>(
                  <div key={r.name} style={{background:r.unlocked?goldLight:'#f5f5f5',borderRadius:14,padding:14,textAlign:'center',border:r.unlocked?'1px solid '+goldBorder:'1px solid #e0e0e0',opacity:r.unlocked?1:0.6}}>
                    <div style={{fontSize:28,marginBottom:6}}>{r.icon}</div>
                    <div style={{fontSize:11,fontWeight:600,color:'#1a1a1a',marginBottom:4}}>{r.name}</div>
                    <div style={{fontSize:10,color:gold,fontWeight:600}}>{r.xp.toLocaleString()} XP</div>
                    {r.unlocked&&<button style={{marginTop:8,padding:'4px 10px',borderRadius:8,background:gold,border:'none',color:'#fff',fontSize:10,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Redeem</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PLANS ── */}
          {tab==='pro'&&(
            <div>
              <div style={{textAlign:'center',padding:'20px 0',marginBottom:8}}>
                <div style={{fontSize:36,marginBottom:8}}>👑</div>
                <div style={{fontSize:24,fontWeight:700,color:'#1a1a1a',marginBottom:6}}>VitaCore Plans</div>
                <div style={{fontSize:14,color:'#666'}}>Choose the plan that fits your lifestyle</div>
              </div>

              {/* FREE */}
              <div style={{...card}}>
                <div style={{display:'inline-block',background:'#f0f0f0',color:'#666',fontSize:11,padding:'3px 10px',borderRadius:20,marginBottom:8,fontWeight:600}}>FREE</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div><div style={{fontSize:18,fontWeight:700}}>Starter</div><div style={{fontSize:13,color:'#999'}}>Forever free</div></div>
                  <div style={{fontSize:28,fontWeight:700}}>$0</div>
                </div>
                {['Basic health tracking','3 AI messages/day','XP quests & leaderboard','Referral program'].map(f=><div key={f} style={{fontSize:13,color:'#666',marginBottom:6,display:'flex',gap:8}}><span style={{color:'#10b981'}}>✓</span>{f}</div>)}
              </div>

              {/* PRO MONTHLY */}
              <div style={{...card,border:'2px solid #2196F3'}}>
                <div style={{display:'inline-block',background:'#EBF4FF',color:'#2196F3',fontSize:11,padding:'3px 10px',borderRadius:20,marginBottom:8,fontWeight:600}}>MONTHLY</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div><div style={{fontSize:18,fontWeight:700}}>Pro</div><div style={{fontSize:13,color:'#999'}}>Per month</div></div>
                  <div style={{fontSize:28,fontWeight:700}}>$9.99</div>
                </div>
                {['Unlimited AI coach','Advanced analytics','Workout video library','Smart device sync','Custom meal plans'].map(f=><div key={f} style={{fontSize:13,color:'#666',marginBottom:6,display:'flex',gap:8}}><span style={{color:'#10b981'}}>✓</span>{f}</div>)}
                <button onClick={()=>subscribe('monthly')} style={{width:'100%',padding:12,borderRadius:12,background:'#2196F3',border:'none',color:'#fff',fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer',marginTop:12}}>Start 7-Day Free Trial</button>
              </div>

              {/* PRO ANNUAL */}
              <div style={{...card,border:'2px solid #10b981'}}>
                <div style={{display:'flex',gap:8,marginBottom:8}}>
                  <div style={{display:'inline-block',background:'#E8F8F2',color:'#10b981',fontSize:11,padding:'3px 10px',borderRadius:20,fontWeight:600}}>ANNUAL</div>
                  <div style={{display:'inline-block',background:'#E8F8F2',color:'#10b981',fontSize:11,padding:'3px 10px',borderRadius:20,fontWeight:600}}>Save 40%</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div><div style={{fontSize:18,fontWeight:700}}>Pro Annual</div><div style={{fontSize:13,color:'#999'}}>$71.88 billed yearly</div></div>
                  <div><div style={{fontSize:28,fontWeight:700}}>$5.99</div><div style={{fontSize:11,color:'#999'}}>per month</div></div>
                </div>
                {['All Pro Monthly features','Gym partner discounts','Priority AI coaching','Nutrition & meal plans','Early feature access'].map(f=><div key={f} style={{fontSize:13,color:'#666',marginBottom:6,display:'flex',gap:8}}><span style={{color:'#10b981'}}>✓</span>{f}</div>)}
                <button onClick={()=>subscribe('annual')} style={{width:'100%',padding:12,borderRadius:12,background:'#10b981',border:'none',color:'#fff',fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer',marginTop:12}}>Start 7-Day Free Trial</button>
              </div>

              {/* PLATINUM */}
              <div style={{...card,background:'#0A0A0A',color:'#fff',border:'2px solid '+gold}}>
                <div style={{display:'flex',gap:8,marginBottom:8}}>
                  <div style={{display:'inline-block',background:gold,color:'#fff',fontSize:11,padding:'3px 10px',borderRadius:20,fontWeight:600}}>✦ PLATINUM</div>
                  <div style={{display:'inline-block',background:'rgba(184,134,11,0.2)',color:gold,fontSize:11,padding:'3px 10px',borderRadius:20,fontWeight:600}}>Concierge</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                  <div><div style={{fontSize:18,fontWeight:700,color:'#F5D97A'}}>Elite</div></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
                  {[{label:'Monthly',price:'$199'},{label:'Quarterly',price:'$399'},{label:'Annual',price:'$999'}].map(p=>(
                    <div key={p.label} style={{background:'rgba(255,255,255,0.08)',borderRadius:12,padding:'10px 8px',textAlign:'center',border:'1px solid rgba(184,134,11,0.3)',cursor:'pointer'}}>
                      <div style={{fontSize:11,color:'#aaa',marginBottom:4}}>{p.label}</div>
                      <div style={{fontSize:18,fontWeight:700,color:gold}}>{p.price}</div>
                    </div>
                  ))}
                </div>
                {['Private 1-on-1 health coach','Monthly blood test analysis','Exclusive VitaCore Watch (gifted)','VIP marathon & event access','Unlimited AI nutrition & coaching','Personal gym trainer matching','Pilates & yoga course access','Monthly supplement box delivery','24/7 health concierge hotline','Annual full body health report'].map(f=><div key={f} style={{fontSize:13,color:'#ccc',marginBottom:7,display:'flex',gap:8}}><span style={{color:gold}}>✦</span>{f}</div>)}
                <button style={{width:'100%',padding:14,borderRadius:12,background:'linear-gradient(135deg,'+gold+',#D4A017)',border:'none',color:'#fff',fontFamily:'inherit',fontSize:15,fontWeight:700,cursor:'pointer',marginTop:16}}>✦ Apply for Platinum</button>
                <p style={{textAlign:'center',fontSize:11,color:'#666',marginTop:8}}>Limited spots · Personal onboarding call included</p>
              </div>

              {/* OEM WATCH INFO */}
              <div style={{...card,background:goldLight,border:'1px solid '+goldBorder}}>
                <div style={{fontSize:15,fontWeight:700,color:'#1a1a1a',marginBottom:8}}>⌚ VitaCore Watch — OEM Info</div>
                <div style={{fontSize:13,color:'#666',lineHeight:1.7,marginBottom:12}}>
                  We source from <strong>Shenzhen & Guangzhou</strong> OEM manufacturers.<br/>
                  Similar Apple Watch UI/UX, Bluetooth health sync, your branding.
                </div>
                {[{l:'MOQ',v:'1,000 pieces'},{l:'Est. unit cost',v:'USD 25–45 per unit'},{l:'Total budget',v:'USD 25,000–45,000'},{l:'Lead time',v:'60–90 days'},{l:'Features',v:'Heart rate, SpO₂, steps, sleep, BT sync'},{l:'Recommended vendors',v:'Huaqiangbei, Shenzhen OEM district'}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid '+goldBorder,fontSize:13}}>
                    <span style={{color:'#666'}}>{r.l}</span>
                    <span style={{fontWeight:600,color:'#1a1a1a',textAlign:'right',maxWidth:'60%'}}>{r.v}</span>
                  </div>
                ))}
                <button style={{width:'100%',padding:12,borderRadius:12,background:'#0A0A0A',border:'none',color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer',marginTop:12}}>Contact OEM Supplier →</button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}
