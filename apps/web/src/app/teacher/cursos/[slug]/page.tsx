import { notFound } from 'next/navigation'
import { courses } from '@/lib/demo-data'
import { TeacherCourseManager } from '@/components/teacher-course-manager'
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const course=courses.find(c=>c.slug===slug);if(!course)notFound();return <div className="content"><TeacherCourseManager course={course}/></div>}
