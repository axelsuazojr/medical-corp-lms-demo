import type { CollectionConfig } from 'payload'
import { superAdminOnly } from '../access'

const appUrl=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'

export const SitePages:CollectionConfig={
  slug:'site-pages',
  labels:{singular:'Página pública',plural:'Página pública · Componentes'},
  versions:{drafts:true},
  access:{read:superAdminOnly,create:superAdminOnly,update:superAdminOnly,delete:superAdminOnly},
  admin:{
    useAsTitle:'title',
    group:'Sitio web',
    description:'Constructor visual de contenido público. Disponible únicamente para SUPER_ADMIN.',
    defaultColumns:['title','slug','_status','updatedAt'],
    preview:(doc)=>`${appUrl}${doc?.slug==='inicio'?'/':doc?.slug==='cursos'?'/cursos':doc?.slug==='empresa'?'/#nosotros':'/cursos'}`,
  },
  fields:[
    {name:'title',label:'Nombre interno',type:'text',required:true},
    {name:'slug',label:'Página',type:'select',required:true,unique:true,options:[{label:'Inicio',value:'inicio'},{label:'Cursos',value:'cursos'},{label:'Empresa',value:'empresa'}]},
    {name:'seo',label:'SEO',type:'group',fields:[{name:'title',type:'text'},{name:'description',type:'textarea'}]},
    {name:'components',label:'Componentes de la página',type:'blocks',blocks:[
      {slug:'hero',labels:{singular:'Hero',plural:'Hero'},fields:[{name:'eyebrow',type:'text'},{name:'heading',type:'text',required:true},{name:'body',type:'textarea'},{name:'primaryLabel',type:'text'},{name:'primaryHref',type:'text'}]},
      {slug:'companyInfo',labels:{singular:'Información de empresa',plural:'Información de empresa'},fields:[{name:'heading',type:'text',required:true},{name:'body',type:'richText'},{name:'showLogo',type:'checkbox',defaultValue:true}]},
      {slug:'courseGrid',labels:{singular:'Listado de cursos',plural:'Listados de cursos'},fields:[{name:'heading',type:'text'},{name:'intro',type:'textarea'},{name:'courses',type:'relationship',relationTo:'courses',hasMany:true}]},
      {slug:'contentSection',labels:{singular:'Sección de contenido',plural:'Secciones de contenido'},fields:[{name:'heading',type:'text'},{name:'body',type:'richText'},{name:'alignment',type:'select',defaultValue:'LEFT',options:[{label:'Izquierda',value:'LEFT'},{label:'Centro',value:'CENTER'}]}]},
      {slug:'cta',labels:{singular:'Llamado a la acción',plural:'Llamados a la acción'},fields:[{name:'heading',type:'text',required:true},{name:'body',type:'textarea'},{name:'buttonLabel',type:'text'},{name:'buttonHref',type:'text'}]},
    ]},
  ],
}
