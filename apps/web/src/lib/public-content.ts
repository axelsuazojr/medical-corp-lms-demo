import 'server-only'
export type PublicCourseBlock={title:string;slug:string;summary:string;estimatedHours:number|null;modality:string}
export type PublicBlock=
 | {blockType:'hero';eyebrow:string;heading:string;body:string;primaryLabel:string;primaryHref:string}
 | {blockType:'companyInfo';heading:string;body:string;showLogo:boolean}
 | {blockType:'courseGrid';heading:string;intro:string;courses:PublicCourseBlock[]}
 | {blockType:'contentSection';heading:string;body:string;alignment:'LEFT'|'CENTER'}
 | {blockType:'cta';heading:string;body:string;buttonLabel:string;buttonHref:string}
export type PublicPage={title:string;slug:string;components:PublicBlock[]}
export async function getPublicPage(slug:string):Promise<PublicPage|null>{
  const base=process.env.INTERNAL_API_URL||process.env.NEXT_PUBLIC_ADMIN_URL
  if(!base)return null
  try{const res=await fetch(`${base.replace(/\/$/,'')}/public-content/${encodeURIComponent(slug)}`,{next:{revalidate:30}});if(!res.ok)return null;const data=await res.json() as {page?:PublicPage|null};return data.page||null}catch{return null}
}
export type PublicCourseDetail={title:string;slug:string;summary:string;modality:string;estimatedHours:number|null;startAt:string|null;endAt:string|null;instructors:string[];objectives:string[]}
export async function getPublicCourse(slug:string):Promise<PublicCourseDetail|null>{
  const base=process.env.INTERNAL_API_URL||process.env.NEXT_PUBLIC_ADMIN_URL
  if(!base)return null
  try{const res=await fetch(`${base.replace(/\/$/,'')}/public-course/${encodeURIComponent(slug)}`,{next:{revalidate:30}});if(!res.ok)return null;const data=await res.json() as {course?:PublicCourseDetail|null};return data.course||null}catch{return null}
}
