# Matriz RBAC

| Capacidad | SUPER_ADMIN | CO_ADMIN | TEACHER | COMPANY | STUDENT |
|---|---:|---:|---:|---:|---:|
| Ver usuarios | ✓ | ✓ | Limitado a cursos | Limitado a organización | Propio |
| Crear usuarios | ✓ | ✓ | - | - | - |
| Eliminar SUPER_ADMIN | Solo reglas críticas | ✗ | ✗ | ✗ | ✗ |
| Administrar cursos | ✓ | ✓ | Asignados | Lectura contratados | Lectura matriculados |
| Crear tareas | ✓ | ✓ | Cursos asignados | - | - |
| Entregar tareas | - | - | - | - | ✓ |
| Calificar | ✓ | ✓ | Cursos asignados | - | Solo lectura propia |
| Asistencia | ✓ | ✓ | Registrar en asignados | Reporte permitido | Solo lectura propia |
| Crear quizzes/exámenes | ✓ | ✓ | Cursos asignados | - | - |
| Foros | Moderar | Moderar | Moderar asignados | Según permiso | Participar |
| Mensajería | ✓ | ✓ | Cursos asignados | Según permiso | Docente/grupo |
| Reportes | ✓ | ✓ | Cursos asignados | Agregados organización | Propios |
| Auditoría | ✓ | Según permiso | - | - | - |
| Asignar roles/permisos | ✓ | Restringido | ✗ | ✗ | ✗ |

## Permisos granulares iniciales

- `users.read`, `users.create`, `users.update`, `users.delete`
- `courses.read`, `courses.create`, `courses.update`, `courses.delete`
- `assignments.create`, `assignments.grade`
- `quizzes.create`, `quizzes.grade`
- `grades.read`, `grades.update`
- `attendance.read`, `attendance.update`
- `reports.read`
- `audit.read`
- `roles.assign`

La UI nunca es la frontera de seguridad. Los controles se validan en backend mediante `access` de Payload y filtros por propiedad/matrícula.
