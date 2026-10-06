import { getSession } from '@/lib/session'
import { ProfileEditor } from '@/components/profile-editor'
export default async function Page(){const s=await getSession();return <div className="content"><div className="page-title"><div><span className="section-label">Cuenta docente</span><h1>Perfil</h1><p className="muted">Actualiza tu foto, información de perfil y contraseña.</p></div></div><ProfileEditor name={s?.name||'Profesor'} email={s?.email||''}/></div>}
