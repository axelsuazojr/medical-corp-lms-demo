import Link from 'next/link'
import { ArrowRight, Building2, Check, GraduationCap, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react'
import { PublicNav } from '@/components/public-nav'
import { Footer } from '@/components/footer'
import { CourseCard } from '@/components/course-card'
import { courses } from '@/lib/demo-data'
import { getPublicPage } from '@/lib/public-content'
import { PublicPageBlocks } from '@/components/public-page-blocks'

export default async function Home(){const managed=await getPublicPage('inicio');if(managed?.components?.length)return <><PublicNav/><PublicPageBlocks blocks={managed.components}/><Footer/></>;return <><PublicNav/>
  <main>
    <section className="public-hero-v2">
      <div className="container hero-v2-grid">
        <div className="hero-v2-copy">
          <span className="eyebrow"><ShieldCheck size={14}/> Educación profesional en salud</span>
          <h1>Formación clínica con criterio, estructura y propósito.</h1>
          <p>MEDICAL CORP desarrolla experiencias de aprendizaje para profesionales y equipos de salud que necesitan actualizar conocimientos y aplicarlos con claridad en su práctica diaria.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="/cursos">Explorar programas <ArrowRight size={16}/></Link><Link className="btn btn-outline" href="/login">Acceso al campus</Link></div>
          <div className="hero-trust-row"><span><Check size={15}/> Contenido especializado</span><span><Check size={15}/> Modalidad flexible</span><span><Check size={15}/> Acompañamiento docente</span></div>
        </div>
        <div className="hero-v2-art" aria-label="MEDICAL CORP educación continua">
          <div className="hero-art-card hero-art-main"><HeartPulse size={26}/><span>Educación continua</span><strong>Conocimiento que se convierte en mejores decisiones.</strong></div>
          <div className="hero-art-card hero-art-small"><Stethoscope size={22}/><span>Práctica profesional</span></div>
          <div className="hero-art-orbit"><GraduationCap size={30}/></div>
        </div>
      </div>
    </section>

    <section className="company-strip">
      <div className="container company-strip-grid"><div><span>MEDICAL CORP</span><strong>Capacitación para organizaciones y profesionales del sector salud.</strong></div><div className="company-stat"><Building2/><p>Programas diseñados para reforzar competencias clínicas, seguridad, gestión y comunicación.</p></div></div>
    </section>

    <section className="section public-courses-section">
      <div className="container"><div className="section-head"><div><span className="eyebrow">Oferta académica</span><h2>Programas creados para la práctica real.</h2><p>Consulta el contenido, duración, modalidad e instructor de cada programa antes de ingresar al campus.</p></div><Link href="/cursos" className="btn btn-ghost">Ver catálogo <ArrowRight size={16}/></Link></div><div className="grid-3">{courses.slice(0,3).map(c=><CourseCard key={c.slug} course={c}/>)}</div></div>
    </section>

    <section className="section company-about" id="nosotros"><div className="container about-grid"><div><span className="eyebrow">Quiénes somos</span><h2>Una plataforma académica alineada con la realidad de los equipos de salud.</h2></div><div><p>MEDICAL CORP integra educación continua, actualización profesional y recursos aplicados en una experiencia digital clara y consistente con la identidad corporativa.</p><p>La propuesta académica prioriza contenidos organizados, acceso flexible, recursos de apoyo y comunicación directa con el equipo docente.</p><Link href="/contacto" className="text-link">Conocer más sobre MEDICAL CORP <ArrowRight size={15}/></Link></div></div></section>
  </main><Footer/></>}
