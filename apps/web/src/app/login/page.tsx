import Link from 'next/link'
import Image from 'next/image'
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'

export default async function Login({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const q=await searchParams; const error=typeof q.error==='string'?q.error:null
  return <div className="auth-page auth-page-v2">
    <section className="auth-brand auth-brand-v2"><Link href="/"><Image src="/brand/medical-corp-logo.png" alt="Medical Corp" width={160} height={160}/></Link><div className="auth-copy"><span className="eyebrow" style={{background:'rgba(255,255,255,.08)',borderColor:'rgba(255,255,255,.18)',color:'white'}}><ShieldCheck size={14}/> Campus MEDICAL CORP</span><h1>Acceso seguro a tu experiencia académica.</h1><p>Ingresa con el correo y contraseña asignados por MEDICAL CORP para acceder a tu panel correspondiente.</p></div><small>MEDICAL CORP · Plataforma educativa</small></section>
    <section className="auth-form-wrap"><div className="auth-card auth-card-v2"><Link href="/" className="back-link">← Volver al sitio público</Link><div className="auth-icon"><LockKeyhole size={24}/></div><h2>Iniciar sesión</h2><p className="muted">Utiliza únicamente tu correo institucional o el correo registrado en la plataforma.</p>{error&&<div className="alert">{error==='invalid'?'Correo o contraseña incorrectos.':error==='config'?'Las credenciales de demostración no están configuradas.':'No fue posible iniciar sesión.'}</div>}
      <form action="/api/auth/login" method="post"><div className="field"><label htmlFor="email">Correo electrónico</label><div className="input-with-icon"><Mail size={17}/><input id="email" name="email" type="email" required autoComplete="email" placeholder="nombre@empresa.com"/></div></div><div className="field"><label htmlFor="password">Contraseña</label><div className="input-with-icon"><LockKeyhole size={17}/><input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••••••"/></div></div><div className="auth-options"><label><input type="checkbox" name="remember"/> Recordar sesión</label><span className="muted">¿Olvidaste tu contraseña?</span></div><button className="btn btn-primary" style={{width:'100%',marginTop:22}}>Entrar al campus</button></form>
      <div className="notice">El acceso está segmentado por rol. Estudiantes y profesores son dirigidos automáticamente a su panel correspondiente.</div></div></section>
  </div>
}
