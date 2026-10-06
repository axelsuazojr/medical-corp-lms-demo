import Link from 'next/link'
import Image from 'next/image'
import { Bell, BookOpen, CalendarDays, CheckSquare, ClipboardCheck, GraduationCap, Home, LogOut, MessageCircle, UserRound, UsersRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { DemoSession } from '@/lib/session'

const links=[['/campus','Inicio',Home],['/campus/cursos','Mis cursos',BookOpen],['/campus/calendario','Calendario',CalendarDays],['/campus/tareas','Tareas',CheckSquare],['/campus/calificaciones','Calificaciones',GraduationCap],['/campus/asistencia','Asistencia',ClipboardCheck],['/campus/foros','Foros',UsersRound],['/campus/mensajes','Mensajes',MessageCircle],['/campus/notificaciones','Notificaciones',Bell],['/campus/perfil','Perfil',UserRound]] as const

export function CampusShell({children,session}:{children:ReactNode;session:DemoSession}){
  return <div className="campus"><aside className="sidebar"><Link href="/campus" className="sidebar-brand"><Image src="/brand/medical-corp-logo.png" alt="Medical Corp" width={54} height={54}/><div><strong>MEDICAL CORP</strong><div>Campus estudiante</div></div></Link><nav className="sidebar-nav">{links.map(([href,label,Icon])=><Link href={href} className="sidebar-link" key={href}><Icon size={17}/>{label}</Link>)}</nav><div className="sidebar-spacer"/><div className="demo-badge">Panel de estudiante</div><form action="/api/auth/logout" method="post"><button className="sidebar-link sidebar-button"><LogOut size={17}/>Cerrar sesión</button></form></aside><main className="main"><header className="topbar"><div><strong>Campus académico</strong><span className="topbar-subtitle">Experiencia del estudiante</span></div><div className="user-chip"><div className="user-avatar">{session.name.slice(0,1)}</div><div><strong>{session.name}</strong><div className="muted">{session.email}</div></div></div></header>{children}</main></div>
}
