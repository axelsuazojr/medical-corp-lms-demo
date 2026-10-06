# Arquitectura - MEDICAL CORP LMS Demo

## 1. Visión

El repositorio separa la experiencia pública/campus de la administración y API:

```text
Browser
  |
  +--> apps/web (Next.js 16.3.8)
  |      - Sitio público
  |      - Login
  |      - Campus estudiante
  |      - BFF /api/*
  |
  +--> apps/admin-api (Next.js + Payload CMS 3.90.2)
         - /admin
         - Payload REST API
         - RBAC
         - PostgreSQL
         - Storage S3-compatible
```

Para producción, el navegador no debe recibir credenciales internas, `DATABASE_URL`, `PAYLOAD_SECRET`, secretos OAuth ni credenciales S3. El frontend debe consumir datos sensibles mediante rutas server-side/BFF o Server Components.

## 2. Monorepo

```text
medical-corp-lms-demo/
├─ apps/
│  ├─ web/             # sitio público + campus
│  └─ admin-api/       # Payload CMS + backend administrativo
├─ packages/
│  ├─ ui/              # reservado para UI compartida
│  ├─ types/           # reservado para tipos compartidos
│  └─ config/          # reservado para configuración compartida
├─ docs/
├─ .env.example
├─ pnpm-workspace.yaml
└─ turbo.json
```

## 3. Modelo de datos

Payload contiene las siguientes colecciones principales:

- Users
- Roles
- Permissions
- Companies
- Courses
- Enrollments
- Modules
- Lessons
- Resources
- Assignments
- Submissions
- Forums
- ForumPosts
- Quizzes
- Questions
- QuizAttempts
- QuizAnswers
- Attendance
- Grades
- Announcements
- Threads
- Messages
- Notifications
- Webinars
- Media
- AuditLogs
- ActivityEvents

Relaciones centrales:

```text
User --< Enrollment >-- Course --< Module --< Lesson
                         |          |
                         |          +--< Resource
                         |
                         +--< Assignment --< Submission >-- User
                         +--< Quiz --< Question
                         |     +--< QuizAttempt >-- User
                         +--< Forum --< ForumPost >-- User
                         +--< Attendance >-- User
                         +--< Grade >-- User
```

## 4. Autenticación

### Demo web

El campus incluye un flujo funcional de autenticación por correo con cookie firmada HMAC, HttpOnly, SameSite y Secure en producción. Las contraseñas demo se suministran por variables de entorno.

También se incluyeron flujos OAuth 2.0 / OpenID Connect para Google y Microsoft. Los botones solo funcionan cuando se configuran las credenciales correspondientes.

### Payload

Payload administra autenticación de usuarios administrativos mediante su colección `users`, con bloqueo de intentos fallidos. En producción se recomienda habilitar MFA para SUPER_ADMIN y CO_ADMIN.

## 5. Archivos protegidos

`Media` usa el adaptador S3-compatible cuando se configuran las variables de entorno. Se mantienen los controles de acceso de Payload y se habilitan descargas firmadas. No se deben configurar buckets públicos para recursos académicos protegidos.

Controles recomendados:

1. bucket privado;
2. TLS/HTTPS;
3. acceso por sesión + matrícula + rol;
4. URL firmada de corta duración;
5. Content-Disposition inline para visor;
6. watermark dinámico para material sensible;
7. auditoría de RESOURCE_VIEW;
8. límites MIME/tamaño;
9. DRM para material que lo justifique.

Ninguna aplicación web puede impedir al 100% capturas de pantalla o extracción por un usuario autorizado que puede ver el contenido.

## 6. Evaluaciones

`ActivityEvents` está preparado para registrar señales como:

- TAB_HIDDEN
- WINDOW_BLUR
- FULLSCREEN_EXIT
- COPY_ATTEMPT
- PASTE_ATTEMPT
- EXAM_EXIT
- NETWORK_RECONNECT

Son señales de auditoría, no una prueba concluyente de conducta indebida.

## 7. Demo vs producción

El frontend incluye datos de muestra para permitir una presentación inmediata. Antes de producción, sustituir los fixtures por llamadas server-side a Payload mediante BFF y aplicar autorización de matrícula en cada recurso/entidad.
