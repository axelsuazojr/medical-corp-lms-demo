# Seguridad - decisiones del demo

## Fronteras de confianza

- El navegador se considera no confiable.
- PostgreSQL, Payload secrets, secretos OAuth y S3 viven únicamente en servidor.
- La UI puede ocultar acciones, pero la autorización definitiva pertenece al backend.
- Los recursos protegidos requieren controles de acceso de Payload y almacenamiento privado.

## Sesiones

El demo web utiliza cookie HttpOnly firmada para la sesión de presentación. No se guardan tokens en `localStorage`. En producción, la sesión debe integrarse con la identidad persistente de Payload/Auth y revocación server-side.

## Archivos

- MIME allowlist.
- Bucket privado.
- Signed download.
- No credenciales S3 en browser.
- Recomendado: escaneo antivirus, cuotas y validación profunda de archivo antes de producción.

## Evaluaciones

Eventos de cambio de pestaña, blur, fullscreen, copia y salida se consideran señales de auditoría. No deben utilizarse por sí solos como prueba concluyente de fraude.

## Screenshots

No existe una forma fiable de impedir capturas de pantalla en un navegador general. Para reducir redistribución se recomienda watermark individual, expiración de enlaces, DRM en video y trazabilidad de accesos.

## Pendiente antes de producción

1. MFA/TOTP.
2. Rate limiting distribuido.
3. Recuperación de contraseña con tokens de un solo uso.
4. CSP estricta con nonces si las integraciones lo requieren.
5. Rotación de secretos.
6. Auditoría externa de permisos/RBAC.
7. Pruebas de autorización horizontal (IDOR/BOLA).
8. Antivirus/Content Disarm & Reconstruction si el riesgo lo requiere.
9. Política de retención y backups.
10. Observabilidad y alertas.
