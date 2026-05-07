'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const s = {background:'#050d1a',minHeight:'100vh',fontFamily:'Outfit,sans-serif',color:'white',padding:'0 20px 60px'}
  return (
    <div style={s}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 0',borderBottom:'1px solid rgba(100,180,255,0.12)',marginBottom:40}}>
        <Link href="/" style={{fontSize:20,fontWeight:700,color:'#00d4ff',textDecoration:'none'}}>⬡ VitaFlow</Link>
        <Link href="/login" style={{fontSize:14,color:'#7a9ab5',textDecoration:'none'}}>Sign in →</Link>
      </nav>
      <div style={{maxWidth:560,margin:'0 auto',textAlign:'center'}}>
        <h1 style={{fontSize:36,fontWeight:700,marginBottom:8}}>Simple pricing</h1>
        <p style={{color:'#7a9ab5',marginBottom:32}}>Start free. Upgrade when ready.</p>
        <div style={{display:'inline-flex',background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:12,padding:4,marginBottom:32}}>
          {['monthly','annual'].map(b=>(
            <button key={b} onClick={()=>setBilling(b)} style={{padding:'10px 24px',borderRadius:10,border:'none',background:billing===b?'#7c3aed':'none',color:billing===b?'white':'#7a9ab5',cursor:'pointer',fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:500}}>
              {b==='monthly'?'Monthly':'Annual — Save 40%'}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,textAlign:'left'}}>
          <div style={{background:'#0f1e35',border:'1px solid rgba(100,180,255,0.12)',borderRadius:20,padding:24}}>
            <div style={{fontSize:12,color:'#7a9ab5',textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>Free</div>
            <div style={{fontSize:32,fontWeight:700,fontFamily:'Space Mono,monospace'}}>$0</div>
            <div style={{fontSize:12,color:'#7a9ab5',marginBottom:20}}>forever</div>
            {['Basic health tracking','3 AI messages/day','Basic meal plans','Quests and game'].map(f=>(
              <div key={f} style={{fontSize:13,display:'flex',gap:8,marginBottom:8,alignItems:'flex-start'}}><span style={{color:'#10b981',flexShrink:0}}>✓</span>{f}</div>
            ))}
            <Link href="/signup" style={{display:'block',marginTop:20,padding:12,textAlign:'center',border:'1px solid rgba(100,180,255,0.3)',borderRadius:12,color:'#7a9ab5',textDecoration:'none',fontSize:14}}>Get Started Free</Link>
          </div>
          <div style={{background:'linear-gradient(135deg,rgba(124,58,237,0.1),#0f1e35)',border:'1px solid rgba(124,58,237,0.5)',borderRadius:20,padding:24}}>
            <div style={{display:'inline-block',background:'#7c3aed',color:'white',fontSize:10,padding:'3px 10px',borderRadius:20,marginBottom:8,fontWeight:600}}>Most Popular</div>
            <div style={{fontSize:12,color:'#a78bfa',textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>Pro</div>
            <div style={{fontSize:32,fontWeight:700,fontFamily:'Space Mono,monospace'}}>{billing==='monthly'?'$9.99':'$5.99'}</div>
            <div style={{fontSize:12,color:'#7a9ab5',marginBottom:20}}>{billing==='annual'?'per month · $71.88/yr':'per month'}</div>
            {['Everything in Free','Unlimited AI Coach','Advanced analytics','Custom meal plans','Custom workouts','Priority support'].map(f=>(
              <div key={f} style={{fontSize:13,display:'flex',gap:8,marginBottom:8,alignItems:'flex-start'}}><span style={{color:'#10b981',flexShrink:0}}>✓</span>{f}</div>
            ))}
            <Link href="/signup" style={{display:'block',marginTop:20,padding:12,textAlign:'center',background:'linear-gradient(135deg,#7c3aed,#5b21b6)',borderRadius:12,color:'white',textDecoration:'none',fontSize:14,fontWeight:600}}>Start 7-Day Free Trial</Link>
          </div>
        </div>
        <p style={{fontSize:13,color:'#7a9ab5',marginTop:20}}>No credit card required for trial. Cancel anytime.</p>
      </div>
    </div>
  )
}
