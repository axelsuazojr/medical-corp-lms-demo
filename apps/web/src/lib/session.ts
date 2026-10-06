import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export type DemoSession = { id: string; email: string; name: string; role: 'STUDENT' | 'TEACHER'; exp: number }
const COOKIE = 'mc_session'

function secret() {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) throw new Error('AUTH_SECRET debe tener al menos 32 caracteres')
  return value
}
function sign(body: string) { return createHmac('sha256', secret()).update(body).digest('base64url') }
export function encodeSession(payload: DemoSession) { const body=Buffer.from(JSON.stringify(payload)).toString('base64url'); return `${body}.${sign(body)}` }
export function decodeSession(raw?: string): DemoSession | null {
  if (!raw) return null
  const [body, sig] = raw.split('.')
  if (!body || !sig) return null
  const expected=sign(body)
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  try { const value=JSON.parse(Buffer.from(body,'base64url').toString()) as DemoSession; return value.exp > Date.now() ? value : null } catch { return null }
}
export async function getSession() { return decodeSession((await cookies()).get(COOKIE)?.value) }
export async function setSession(session: Omit<DemoSession,'exp'>) {
  const store=await cookies(); const value=encodeSession({...session, exp:Date.now()+1000*60*60*8})
  store.set(COOKIE,value,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*8})
}
export async function clearSession() { (await cookies()).set(COOKIE,'',{httpOnly:true,expires:new Date(0),path:'/'}) }
