import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

function richTextToPlain(value:unknown):string{
  if(!value||typeof value!=='object')return ''
  const node=value as {text?:unknown;children?:unknown[];root?:unknown}
  if(typeof node.text==='string')return node.text
  if(Array.isArray(node.children))return node.children.map(richTextToPlain).filter(Boolean).join(' ')
  if(node.root)return richTextToPlain(node.root)
  return ''
}

function safeCourse(value:unknown){
  if(!value||typeof value!=='object')return null
  const c=value as Record<string,unknown>
  return {title:String(c.title||''),slug:String(c.slug||''),summary:String(c.summary||''),estimatedHours:typeof c.estimatedHours==='number'?c.estimatedHours:null,modality:String(c.modality||'ASYNCHRONOUS')}
}

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const payload=await getPayload({config})
  const result=await payload.find({collection:'site-pages' as never,overrideAccess:true,draft:false,depth:2,limit:1,where:{slug:{equals:slug}}})
  const doc=(result.docs?.[0]||null) as null|Record<string,unknown>
  if(!doc||doc._status!=='published')return NextResponse.json({page:null},{status:404})
  const blocks=Array.isArray(doc.components)?doc.components:[]
  const components=blocks.map((raw)=>{
    const block=raw as Record<string,unknown>
    const blockType=String(block.blockType||'')
    if(blockType==='hero')return {blockType,eyebrow:block.eyebrow||'',heading:block.heading||'',body:block.body||'',primaryLabel:block.primaryLabel||'',primaryHref:block.primaryHref||''}
    if(blockType==='companyInfo')return {blockType,heading:block.heading||'',body:richTextToPlain(block.body),showLogo:Boolean(block.showLogo)}
    if(blockType==='courseGrid')return {blockType,heading:block.heading||'',intro:block.intro||'',courses:Array.isArray(block.courses)?block.courses.map(safeCourse).filter(Boolean):[]}
    if(blockType==='contentSection')return {blockType,heading:block.heading||'',body:richTextToPlain(block.body),alignment:block.alignment||'LEFT'}
    if(blockType==='cta')return {blockType,heading:block.heading||'',body:block.body||'',buttonLabel:block.buttonLabel||'',buttonHref:block.buttonHref||''}
    return null
  }).filter(Boolean)
  return NextResponse.json({page:{title:doc.title,slug:doc.slug,components}})
}
