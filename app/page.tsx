'use client'
import Link from 'next/link'
export default function Home() {
  const s = {background:'#050d1a',minHeight:'100vh',fontFamily:'Outfit,sans-serif',color:'white'}
  const card = {background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:20,padding:24}
  return (
    <main style={s}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 32px',borderBottom:'1px solid rgba(100,180,255,0.12)'}}>
        <div style={{fontSize:22,fontWeight:700,color:'#00d4ff'}}>⬡ VitaFlow</div>
        <div style={{display:'flex',gap:12}}>
          <Link href="/login" style={{padding:'8px 18px',borderRadius:10,color:'#7a9ab5',border:'1px solid rgba(100,180,255,0.2)',textDecoration:'none',fontSize:14}}>Sign In</Link>
          <Link href="/signup" style={{padding:'8px 18px',borderRadius:10,background:'#00d4ff',color:'#000',fontWeight:600,textDecoration:'none',fontSize:14}}>Start Free</Link>
        </div>
      </nav>
      <section style={{textAlign:'center',padding:'80px 20px',maxWidth:640,margin:'0 auto'}}>
        <div style={{display:'inline-block',padding:'6px 16px',borderRadius:20,background:'rgba(124,58,237,0.15)',color:'#a78bfa',fontSize:13,marginBottom:24,border:'1px solid rgba(124,58,237,0.3)'}}>✦ AI-Powered Health Companion</div>
        <h1 style={{fontSize:48,fontWeight:700,lineHeight:1.2,marginBottom:20}}>Your body deserves<br/><span style={{color:'#00d4ff'}}>intelligent care</span></h1>
        <p style={{fontSize:18,color:'#7a9ab5',marginBottom:40}}>Track health metrics, get personalized AI meal plans and workouts, level up with gamified quests.</p>
        <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/signup" style={{padding:'16px 36px',borderRadius:16,background:'#00d4ff',color:'#000',fontWeight:700,fontSize:17,textDecoration:'none'}}>Start Free Trial →</Link>
          <Link href="/pricing" style={{padding:'16px 36px',borderRadius:16,border:'1px solid rgba(100,180,255,0.3)',color:'#00d4ff',fontWeight:600,fontSize:17,textDecoration:'none'}}>See Pricing</Link>
        </div>
        <p style={{marginTop:16,fontSize:13,color:'#7a9ab5'}}>No credit card required · 7-day free trial on Pro</p>
      </section>
      <section style={{maxWidth:900,margin:'0 auto',padding:'0 20px 80px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
          {[{icon:'🧠',title:'AI Health Coach',desc:'Chat with Claude-powered AI that knows your biometrics and gives real personalized advice.'},{icon:'⚔️',title:'Gamified Quests',desc:'Earn XP, level up your character stats, hit streaks and compete on the leaderboard.'},{icon:'🍱',title:'Smart Meal Plans',desc:'AI generates daily meal plans tailored to your macros, allergies and fitness goals.'}].map(f=>(
            <div key={f.title} style={card}>
              <div style={{fontSize:36,marginBottom:12}}>{f.icon}</div>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:8}}>{f.title}</h3>
              <p style={{fontSize:14,color:'#7a9ab5',lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
