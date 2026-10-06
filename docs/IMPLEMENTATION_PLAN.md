# Plan de implementación

## Fase 1 - Base del demo

- Monorepo y design system.
- Sitio público.
- Login y sesiones demo.
- Campus navegable.
- Payload + PostgreSQL.
- RBAC inicial.
- Seed de demostración.

## Fase 2 - Integración real frontend/backend

- Sustituir fixtures por BFF en todas las pantallas.
- Filtrar por matrícula y rol en servidor.
- Integrar CRUD de tareas, foros, mensajes, asistencia y calificaciones.
- Conectar visualizador a recursos protegidos.

## Fase 3 - Evaluaciones

- Motor de preguntas.
- Intentos y autosave.
- Timer autoritativo del servidor.
- Auto-submit.
- ActivityEvents para blur/tab/fullscreen/copy/paste.

## Fase 4 - Administración avanzada

- Matriz editable de permisos.
- Preview como estudiante sin generar actividad real.
- Draft/Published.
- Reportes por curso/empresa.
- Gestión de anuncios y notificaciones.

## Fase 5 - Hardening

- MFA/TOTP administradores.
- Rate limiting distribuido.
- Escaneo de malware en uploads.
- CSP con nonces y revisión de cabeceras.
- Gestión de sesiones y revocación.
- Backups, PITR y plan de recuperación.
- Auditoría de accesos a recursos.
- Pruebas E2E, autorización y seguridad.

## Fase 6 - Producción

- Dominios finales.
- SMTP/transaccional.
- S3/R2 privado.
- Observabilidad.
- Analytics de producto respetando privacidad.
- Política de retención y cumplimiento.
