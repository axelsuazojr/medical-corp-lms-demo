import type { CollectionConfig } from 'payload'
import { loggedIn, ownStudentRecords, staffOnly } from '../access'
export const Attendance:CollectionConfig={
  slug:'attendance',labels:{singular:'Asistencia',plural:'Asistencia'},
  access:{read:ownStudentRecords(),create:loggedIn,update:staffOnly,delete:staffOnly},
  admin:{group:'Seguimiento',defaultColumns:['course','student','date','status','source']},
  hooks:{beforeChange:[({data,req,operation})=>{if(operation==='create'&&req.user&&typeof req.user==='object'&&'role' in req.user&&req.user.role==='STUDENT'){data.student=req.user.id;data.date=new Date().toISOString();data.status='PRESENT';data.source='MODULE_ACCESS';data.createdBy=req.user.id}return data}]},
  fields:[{name:'course',type:'relationship',relationTo:'courses',required:true},{name:'student',type:'relationship',relationTo:'users',required:true},{name:'date',label:'Fecha y hora de ingreso',type:'date',required:true,admin:{date:{pickerAppearance:'dayAndTime'}}},{name:'status',type:'select',options:['PRESENT','ABSENT','LATE','JUSTIFIED'],required:true},{name:'source',type:'select',options:['MODULE_ACCESS','REQUIRED_ACTIVITY','CHECK_IN','SESSION','MANUAL'],required:true},{name:'createdBy',type:'relationship',relationTo:'users'}]
}
