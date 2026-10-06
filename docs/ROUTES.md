# Diseño de rutas

## Sitio público

- `/`
- `/cursos`
- `/cursos/[slug]`
- `/webinars`
- `/contacto`
- `/login`

## Campus

- `/campus`
- `/campus/cursos`
- `/campus/cursos/[slug]`
- `/campus/calendario`
- `/campus/tareas`
- `/campus/calificaciones`
- `/campus/asistencia`
- `/campus/recursos`
- `/campus/foros`
- `/campus/mensajes`
- `/campus/notificaciones`
- `/campus/perfil`

## Admin/API

En el proyecto `apps/admin-api`:

- `/admin`
- `/api/*` (Payload REST)

La administración no se enlaza desde la navegación pública ni desde el sidebar del alumno.
