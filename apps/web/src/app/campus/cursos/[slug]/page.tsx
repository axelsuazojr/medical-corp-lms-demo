import { notFound } from 'next/navigation'
import { courses } from '@/lib/demo-data'
import { CourseAttendanceRecorder } from '@/components/course-attendance-recorder'
import { StudentCourseWorkspace } from '@/components/student-course-workspace'
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const course=courses.find(x=>x.slug===slug);if(!course)notFound();return <div className="content course-content"><CourseAttendanceRecorder course={course.title} slug={course.slug}/><div className="course-hero-dashboard"><div><span className="pill">{course.status}</span><h1>{course.title}</h1><p>{course.instructor} · {course.duration} · {course.schedule}</p></div><div className="course-progress-summary"><div><span>Progreso del curso</span><strong>{course.progress}%</strong></div><div className="progress"><span style={{width:`${course.progress}%`}}/></div></div></div><StudentCourseWorkspace course={course}/></div>}
