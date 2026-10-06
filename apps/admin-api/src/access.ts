import type { Access } from 'payload'

type Role='SUPER_ADMIN'|'CO_ADMIN'|'TEACHER'|'COMPANY'|'STUDENT'
type UserLike={id:string|number;role?:Role;permissions?:string[]}
const user=(req:any)=>req.user as UserLike|undefined
export const loggedIn:Access=({req})=>Boolean(user(req))
export const adminOnly:Access=({req})=>['SUPER_ADMIN','CO_ADMIN'].includes(user(req)?.role||'')
export const superAdminOnly:Access=({req})=>user(req)?.role==='SUPER_ADMIN'
export const staffOnly:Access=({req})=>['SUPER_ADMIN','CO_ADMIN','TEACHER'].includes(user(req)?.role||'')
export const selfOrAdmin:Access=({req})=>{const u=user(req);if(!u)return false;if(['SUPER_ADMIN','CO_ADMIN'].includes(u.role||''))return true;return {id:{equals:u.id}} as any}
export const ownStudentRecords=(studentField='student'):Access=>({req})=>{const u=user(req);if(!u)return false;if(['SUPER_ADMIN','CO_ADMIN','TEACHER'].includes(u.role||''))return true;if(u.role==='STUDENT')return {[studentField]:{equals:u.id}} as any;return false}
export const preventSuperAdminDelete:Access=async({req,id})=>{const u=user(req);if(u?.role!=='SUPER_ADMIN')return false;if(!id)return true;const target=await req.payload.findByID({collection:'users',id,depth:0,overrideAccess:true});return (target as any)?.role!=='SUPER_ADMIN'||String(target.id)===String(u.id)}
