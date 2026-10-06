import { redirect } from 'next/navigation'
import { TeacherShell } from '@/components/teacher-shell'
import { getSession } from '@/lib/session'
export const metadata={robots:{index:false,follow:false}}
export default async function Layout({children}:{children:React.ReactNode}){const session=await getSession();if(!session)redirect('/login');if(session.role!=='TEACHER')redirect('/campus');return <TeacherShell session={session}>{children}</TeacherShell>}
