'use client'
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
