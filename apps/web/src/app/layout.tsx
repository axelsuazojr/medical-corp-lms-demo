import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata={title:{default:'MEDICAL CORP | Formación profesional',template:'%s | MEDICAL CORP'},description:'Plataforma de formación continua y campus virtual de MEDICAL CORP.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
