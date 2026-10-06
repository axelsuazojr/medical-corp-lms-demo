# MEDICAL CORP Education Platform - Demo

Demo navegable de una plataforma LMS para MEDICAL CORP. Incluye sitio público, campus académico y un backend/admin separado con Payload CMS + PostgreSQL.

## Stack

- Next.js 16.3.8
- React 19.2
- TypeScript
- Tailwind CSS 4
- shadcn-style UI primitives/component patterns
- Payload CMS 3.90.2
- PostgreSQL
- S3-compatible private storage
- Turborepo + pnpm workspaces

## Requisitos

- Node.js 22 recomendado
- pnpm 10+
- PostgreSQL/Neon/Supabase
- Bucket S3-compatible para archivos privados en producción

## Inicio rápido

```bash
corepack enable
pnpm install
cp .env.example .env
```

Edita `.env` y define como mínimo:

```env
AUTH_SECRET=<32+ caracteres aleatorios>
DATABASE_URL=<postgresql url>
PAYLOAD_SECRET=<32+ caracteres aleatorios>
DEMO_STUDENT_PASSWORD=<contraseña demo>
DEMO_TEACHER_PASSWORD=<contraseña demo>
DEMO_ADMIN_PASSWORD=<contraseña demo>
```

Luego:

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- Payload Admin: http://localhost:3001/admin

## Credenciales demo

Los correos por defecto son:

- Estudiante: `demo.student@medicalcorp.hn`
- Profesor: `demo.teacher@medicalcorp.hn`
- Super Admin: `demo.admin@medicalcorp.hn`

Las contraseñas **no están hardcodeadas en el frontend**. Debes definirlas en `.env`.

## Inicializar datos Payload

```bash
pnpm --filter @medical-corp/admin-api seed
```

El seed crea usuarios de ejemplo, un curso, módulos, una tarea, matrícula y notificación.

## Inicio de sesión

El demo utiliza acceso por correo y contraseña. Estudiantes y profesores se redirigen a paneles separados según su rol.

## Storage privado

Configura:

```env
S3_BUCKET=
S3_REGION=auto
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

Cuando estas variables existen, Payload activa el adaptador S3 y utiliza descargas firmadas. En local, sin S3, Payload utiliza almacenamiento local para facilitar desarrollo.

## Deploy en Vercel

La separación frontend/backend implica **dos proyectos de Vercel** apuntando al mismo monorepo:

### Proyecto 1 - web

Root Directory: `apps/web`

Variables:

- `AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `INTERNAL_API_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- contraseñas/correos demo mientras siga activo el modo demo

### Proyecto 2 - admin-api

Root Directory: `apps/admin-api`

Variables:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ADMIN_URL`
- `S3_*`
- credenciales de seed únicamente durante inicialización

Para una demo simple se puede usar Neon PostgreSQL + Cloudflare R2.

## Seguridad incorporada

- cookies HttpOnly/Secure/SameSite
- Payload RBAC/access control
- bloqueo por intentos fallidos en auth Payload
- API/administración separadas
- CORS/CSRF restringidos a orígenes configurados
- bucket privado y signed downloads
- audit log para operaciones sensibles
- validación de roles en servidor
- no se exponen secretos en bundles cliente
- headers básicos de endurecimiento

## Limitaciones del demo

Este repositorio es un demo técnico presentable, no una certificación de producción. Antes de utilizar datos reales se debe completar:

- MFA/TOTP para administradores
- recuperación de contraseña y proveedor de correo
- migraciones versionadas y backups
- rate limiting distribuido (Redis/Upstash u otro)
- antivirus/escaneo de uploads
- autorización de matrícula específica para cada archivo
- BFF conectado a Payload en todas las pantallas (el frontend actual usa fixtures para que la demo funcione sin infraestructura)
- pruebas E2E y de penetración
- política de privacidad/retención
- observabilidad y alertas
- rotación de secretos

La protección contra screenshots es best-effort; no puede garantizarse desde un navegador.

## Documentación

- `docs/ARCHITECTURE.md`
- `docs/RBAC.md`
- `docs/ROUTES.md`
