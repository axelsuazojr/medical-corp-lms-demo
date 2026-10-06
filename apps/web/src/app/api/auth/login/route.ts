import { NextResponse } from 'next/server'
import { setSession } from '@/lib/session'

export async function POST(req: Request){
  const form=await req.formData(); const email=String(form.get('email')||'').trim().toLowerCase(); const password=String(form.get('password')||'')
  const studentEmail=(process.env.DEMO_STUDENT_EMAIL||'demo.student@medicalcorp.hn').toLowerCase(); const teacherEmail=(process.env.DEMO_TEACHER_EMAIL||'demo.teacher@medicalcorp.hn').toLowerCase()
  const studentPass=process.env.DEMO_STUDENT_PASSWORD; const teacherPass=process.env.DEMO_TEACHER_PASSWORD
  if(!studentPass||!teacherPass) return NextResponse.redirect(new URL('/login?error=config',req.url),303)
  if(email===studentEmail&&password===studentPass){await setSession({id:'student-demo',email,name:'Ana Martínez',role:'STUDENT'});return NextResponse.redirect(new URL('/campus',req.url),303)}
  if(email===teacherEmail&&password===teacherPass){await setSession({id:'teacher-demo',email,name:'Dr. Carlos Rivera',role:'TEACHER'});return NextResponse.redirect(new URL('/campus',req.url),303)}
  return NextResponse.redirect(new URL('/login?error=invalid',req.url),303)
}
