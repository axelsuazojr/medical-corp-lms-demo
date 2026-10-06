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
- `/campus/foros`
- `/campus/mensajes`
- `/campus/notificaciones`
- `/campus/perfil`

## Profesor

- `/teacher`
- `/teacher/cursos`
- `/teacher/cursos/[slug]`
- `/teacher/calendario`
- `/teacher/mensajes`
- `/teacher/analitica`
- `/teacher/perfil`

## Admin/API

En el proyecto `apps/admin-api`:

- `/admin`
- `/api/*` (Payload REST)

La administración no se enlaza desde la navegación pública ni desde el sidebar del alumno.
