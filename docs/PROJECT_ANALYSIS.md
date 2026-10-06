# Análisis técnico del proyecto MEDICAL CORP LMS

## 1. Resumen

El proyecto es un monorepo con dos aplicaciones Next.js:

- `apps/web` (puerto 3000): sitio público, autenticación demo, campus de estudiante y panel docente.
- `apps/admin-api` (puerto 3001): Payload CMS 3 + PostgreSQL + almacenamiento S3 opcional.

La base de datos de Payload ya estaba bien orientada a un LMS: usuarios, empresas, cursos, matrículas, módulos, clases, recursos, tareas, entregas, foros, quizzes, asistencia, calificaciones, anuncios, mensajes, notificaciones, webinars y auditoría. El principal problema encontrado no era la falta de entidades, sino que la experiencia web era una demostración estática que no explotaba esas entidades y mezclaba responsabilidades de estudiante y profesor.

## 2. Hallazgos principales del estado original

### Arquitectura
- La separación `web` / `admin-api` es correcta para evolucionar a un frontend + BFF/CMS.
- Había duplicación de identidad: la web usa una sesión demo independiente y Payload tiene su propio Auth. Esto impide persistencia real end-to-end hasta unificar autenticación.
- El frontend dependía fuertemente de fixtures (`demo-data`) y no de Payload.

### Web pública
- La presentación visual era funcional pero básica para una plataforma corporativa.
- El mismo modelo de curso contenía métricas académicas que debían mostrarse únicamente dentro del campus.
- Existían accesos OAuth demo para Google y Microsoft que no eran necesarios según el nuevo requerimiento.

### Estudiante
- Los recursos estaban disponibles como sección global, en vez de contextualizados dentro de la clase.
- La página de curso no agrupaba de forma clara clase, apuntes, recursos, tarea y foro por semana.
- La asistencia no se registraba como evento de acceso con fecha/hora.
- La carga de tareas no tenía experiencia de vista previa/estado.

### Profesor
- No existía un panel docente independiente: el rol TEACHER terminaba en `/campus`.
- No había flujo visual de curso → semana → estudiante → calificación/retroalimentación.
- No había dashboard docente consolidado ni calendario de ventanas de actividades.

### Payload / permisos
- El modelo soportaba muchos requisitos, pero faltaban fechas de apertura/cierre para foros y campos de retroalimentación en entregas.
- La colección de usuarios permitía actualización del propio registro sin protección de campos sensibles; un usuario podía intentar cambiar rol/estado/permisos vía API.
- Algunas colecciones aceptaban IDs de autor/estudiante declarados por el cliente, en vez de forzar la identidad de la sesión.
- `Media.create` estaba limitado a staff, incompatible con entregas de estudiantes y foto de perfil.
- La lectura de usuarios era demasiado restrictiva para el profesor, que necesita consultar alumnos desde el API.

## 3. Decisiones aplicadas

- Mantener el monorepo y Payload como fuente de datos futura, evitando una reescritura innecesaria.
- Separar `/campus` (STUDENT) y `/teacher` (TEACHER).
- Mantener la web pública libre de métricas personales y hacer el componente de curso consciente del contexto (`showProgress`).
- Añadir un constructor de páginas públicas en Payload (`site-pages`) exclusivo de SUPER_ADMIN.
- Exponer solo datos públicos sanitizados mediante endpoints dedicados, en lugar de abrir las colecciones internas directamente.
- Mantener fallback de contenido demo si Payload no está disponible.
- Endurecer identidad y campos de privilegios en Payload.
- Documentar explícitamente qué interacciones siguen siendo demo/local hasta unificar Auth.

## 4. Riesgos que siguen pendientes antes de producción

1. **Autenticación unificada:** sustituir la sesión demo por Payload Auth o un proveedor corporativo único y usar una sesión server-side coherente en ambas apps.
2. **Persistencia del frontend:** reemplazar `demo-data`, `localStorage` y estado React por operaciones autenticadas a Payload/BFF.
3. **Autorización por pertenencia al curso:** restringir profesores a cursos donde estén asignados y estudiantes a cursos donde tengan matrícula activa, también en recursos/foros/actividades.
4. **Mensajería:** aplicar filtros de participante a nivel de colección para impedir lectura horizontal entre conversaciones.
5. **Foros y quizzes:** añadir controles de pertenencia, ventana temporal y propiedad del registro en todas las operaciones de actualización/borrado.
6. **Archivos:** antivirus, límites de tamaño/cuota, validación del contenido real y URLs firmadas con expiración.
7. **Tareas:** validar en servidor `startAt`, `dueAt`, intentos máximos y política de entrega tardía.
8. **Calificaciones:** transacción/servicio único para sincronizar `Submission.status`, `Grades` y retroalimentación.
9. **Asistencia:** definir política exacta de deduplicación por curso/día/sesión en base de datos y no solo en cliente.
10. **Pruebas:** añadir tests RBAC/IDOR, integración API, E2E de roles y pruebas de accesibilidad.

## 5. Camino recomendado a producción

La siguiente iteración debería centrarse en integración, no en más pantallas: crear un BFF autenticado o consumir Payload desde Server Actions/API routes; reemplazar progresivamente fixtures por consultas reales; implementar mutaciones de tareas, foros, calificaciones, asistencia, perfil y recursos; y después añadir pruebas E2E para STUDENT, TEACHER, CO_ADMIN y SUPER_ADMIN.
