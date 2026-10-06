'use client'
import { useState } from 'react'
import { FileUp, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function TaskDemo(){
  const [submitted,setSubmitted]=useState(false)
  const [stamp,setStamp]=useState('')
  function submit(){
    setSubmitted(true)
    setStamp(new Intl.DateTimeFormat('es-HN',{dateStyle:'long',timeStyle:'short'}).format(new Date()))
  }
  return <div className="panel">
    <h3>Entrega · Análisis de caso clínico</h3>
    <p className="muted">Adjunta tu documento o imagen. La demo conserva el estado únicamente durante esta visita.</p>
    {!submitted ? <>
      <div className="file-drop"><FileUp size={28}/><p><b>Selecciona un archivo</b></p><input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4"/></div>
      <textarea className="input" rows={4} placeholder="Comentario para el docente" style={{marginTop:14}}/>
      <Button onClick={submit} style={{marginTop:14}}>Enviar tarea</Button>
    </> : <>
      <div className="alert" style={{background:'#eef8f0',borderColor:'#b9ddbf',color:'#285b31'}}>Entrega registrada · {stamp}</div>
      <AlertDialog>
        <AlertDialogTrigger asChild><Button variant="outline" style={{marginTop:14}}><Trash2 size={16}/> Eliminar entrega</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Deseas eliminar esta entrega?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción eliminará el archivo enviado y la entrega dejará de considerarse presentada. En producción, la acción queda registrada en el historial de actividad.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{setSubmitted(false);setStamp('')}}>Eliminar entrega</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>}
  </div>
}
