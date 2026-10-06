import Link from 'next/link'
import { Logo } from './logo'
export function PublicNav(){return <header className="nav"><div className="container nav-inner"><Link href="/"><Logo /></Link><nav className="nav-links" aria-label="Principal"><Link href="/">Inicio</Link><Link href="/#nosotros">Nosotros</Link><Link href="/cursos">Cursos</Link><Link href="/webinars">Webinars</Link><Link href="/contacto">Contacto</Link><Link className="btn btn-primary login-link" href="/login">Iniciar sesión</Link></nav></div></header>}
