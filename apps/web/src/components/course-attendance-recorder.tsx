'use client'
import { useEffect } from 'react'

type Event={course:string;slug:string;enteredAt:string}
export function CourseAttendanceRecorder({course,slug}:{course:string;slug:string}){
  useEffect(()=>{
    const key='mc_attendance_events'
    const now=new Date()
    const today=now.toISOString().slice(0,10)
    let events:Event[]=[]
    try{events=JSON.parse(localStorage.getItem(key)||'[]') as Event[]}catch{}
    const already=events.some(e=>e.slug===slug&&e.enteredAt.slice(0,10)===today)
    if(!already){events.unshift({course,slug,enteredAt:now.toISOString()});localStorage.setItem(key,JSON.stringify(events.slice(0,50)))}
  },[course,slug])
  return null
}
