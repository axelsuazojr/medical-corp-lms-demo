import 'server-only'
import { randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { setSession } from './session'

type Provider='google'|'microsoft'
const STATE='mc_oauth_state'
export async function beginOAuth(provider:Provider,requestUrl:string){
 const appUrl=process.env.NEXT_PUBLIC_APP_URL||new URL(requestUrl).origin; const state=randomBytes(24).toString('base64url'); (await cookies()).set(STATE,state,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:600,path:'/'})
 if(provider==='google'){const id=process.env.GOOGLE_CLIENT_ID;if(!id) throw new Error('Google OAuth no configurado');const p=new URLSearchParams({client_id:id,redirect_uri:`${appUrl}/api/auth/callback/google`,response_type:'code',scope:'openid email profile',state,prompt:'select_account'});return `https://accounts.google.com/o/oauth2/v2/auth?${p}`}
 const id=process.env.MICROSOFT_CLIENT_ID; if(!id) throw new Error('Microsoft OAuth no configurado'); const tenant=process.env.MICROSOFT_TENANT_ID||'common';const p=new URLSearchParams({client_id:id,redirect_uri:`${appUrl}/api/auth/callback/microsoft`,response_type:'code',scope:'openid email profile User.Read',state,prompt:'select_account'});return `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?${p}`
}
export async function finishOAuth(provider:Provider,req:Request){
 const url=new URL(req.url); const code=url.searchParams.get('code'); const state=url.searchParams.get('state'); const store=await cookies(); const saved=store.get(STATE)?.value; store.delete(STATE); if(!code||!state||state!==saved) throw new Error('Estado OAuth inválido')
 const appUrl=process.env.NEXT_PUBLIC_APP_URL||url.origin; let email='',name='Usuario';
 if(provider==='google'){const id=process.env.GOOGLE_CLIENT_ID,secret=process.env.GOOGLE_CLIENT_SECRET;if(!id||!secret) throw new Error('Google OAuth incompleto');const token=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:id,client_secret:secret,redirect_uri:`${appUrl}/api/auth/callback/google`,grant_type:'authorization_code'})});if(!token.ok)throw new Error('Token Google rechazado');const t=await token.json() as {access_token:string};const profile=await fetch('https://openidconnect.googleapis.com/v1/userinfo',{headers:{authorization:`Bearer ${t.access_token}`}});const p=await profile.json() as {email?:string;name?:string};email=p.email||'';name=p.name||name}
 else {const id=process.env.MICROSOFT_CLIENT_ID,secret=process.env.MICROSOFT_CLIENT_SECRET,tenant=process.env.MICROSOFT_TENANT_ID||'common';if(!id||!secret)throw new Error('Microsoft OAuth incompleto');const token=await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:id,client_secret:secret,redirect_uri:`${appUrl}/api/auth/callback/microsoft`,grant_type:'authorization_code',scope:'openid email profile User.Read'})});if(!token.ok)throw new Error('Token Microsoft rechazado');const t=await token.json() as {access_token:string};const profile=await fetch('https://graph.microsoft.com/v1.0/me',{headers:{authorization:`Bearer ${t.access_token}`}});const p=await profile.json() as {mail?:string;userPrincipalName?:string;displayName?:string};email=p.mail||p.userPrincipalName||'';name=p.displayName||name}
 if(!email)throw new Error('El proveedor no devolvió correo'); await setSession({id:`oauth:${provider}:${email}`,email,name,role:'STUDENT'})
}
