import type { CollectionConfig } from 'payload'
export function withAudit(config:CollectionConfig):CollectionConfig {
  if(config.slug==='audit-logs') return config
  const originalAfterChange=config.hooks?.afterChange||[]
  const originalAfterDelete=config.hooks?.afterDelete||[]
  return {...config,hooks:{...config.hooks,afterChange:[...originalAfterChange,async({doc,operation,req})=>{try{if(req.user)await req.payload.create({collection:'audit-logs',overrideAccess:true,data:{actor:req.user.id,action:`${config.slug.toUpperCase()}_${operation==='create'?'CREATED':'UPDATED'}`,entityType:config.slug,entityId:String(doc.id),metadata:{operation},userAgent:req.headers.get('user-agent')?.slice(0,240)}})}catch{}return doc}],afterDelete:[...originalAfterDelete,async({id,req})=>{try{if(req.user)await req.payload.create({collection:'audit-logs',overrideAccess:true,data:{actor:req.user.id,action:`${config.slug.toUpperCase()}_DELETED`,entityType:config.slug,entityId:String(id),userAgent:req.headers.get('user-agent')?.slice(0,240)}})}catch{}}]}}
}
