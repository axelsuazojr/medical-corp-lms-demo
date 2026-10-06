import Link from 'next/link'
import { ArrowUpRight, Clock3, UserRound } from 'lucide-react'
import type { Course } from '@/lib/demo-data'

export function CourseCard({course,showProgress=false}:{course:Course;showProgress?:boolean}){
  return <article className="course-card-v2">
    <div className={`course-cover-v2 ${course.coverClass}`}>
      <span className="course-index">{course.category}</span>
      <ArrowUpRight size={22}/>
    </div>
    <div className="course-card-content">
      <div className="course-kicker">Programa MEDICAL CORP</div>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <div className="course-meta-v2"><span><Clock3 size={14}/> {course.duration}</span><span><UserRound size={14}/> {course.instructor}</span></div>
      {showProgress&&<div className="course-progress-block"><div><strong>Progreso del curso</strong><span>{course.progress}%</span></div><div className="progress"><span style={{width:`${course.progress}%`}}/></div></div>}
      <Link href={showProgress?`/campus/cursos/${course.slug}`:`/cursos/${course.slug}`} className="text-link">{showProgress?'Entrar al curso':'Conocer programa'} <ArrowUpRight size={15}/></Link>
    </div>
  </article>
}
