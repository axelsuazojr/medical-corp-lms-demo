import { redirect } from 'next/navigation'
import { CampusShell } from '@/components/campus-shell'
import { getSession } from '@/lib/session'
export const metadata={robots:{index:false,follow:false}}
export default async function Layout({children}:{children:React.ReactNode}){const session=await getSession();if(!session)redirect('/login');if(session.role==='TEACHER')redirect('/teacher');return <CampusShell session={session}>{children}</CampusShell>}
