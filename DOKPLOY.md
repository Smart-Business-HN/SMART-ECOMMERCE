# Guía de Deployment en Dokploy

Esta guía te ayudará a desplegar SMART-ECOMMERCE en Dokploy.

## Prerequisitos

1. Servidor con Dokploy instalado y configurado
2. Repositorio Git del proyecto
3. Variables de entorno configuradas

## Variables de Entorno Necesarias

Configura las siguientes variables de entorno en Dokploy:

### Variables Requeridas

```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.smartbusiness.site/api/v2
NEXT_PUBLIC_APP_URL=https://www.smartbusiness.site
NEXTAUTH_URL=https://www.smartbusiness.site
NEXTAUTH_SECRET=tu_secret_key_aqui_generar_una_nueva
```

### Variables Opcionales

```env
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1
```

### Variables para Certificados SSL (Solo si es necesario)

El Dockerfile ya actualiza automáticamente los certificados CA del sistema, por lo que certificados válidos como **Let's Encrypt deberían funcionar sin configuración adicional**.

Si tu API backend usa certificados SSL auto-firmados (casos especiales), agrega:

```env
ALLOW_SELF_SIGNED_CERT=true
```

⚠️ **ADVERTENCIA**: Solo usar esta opción si tu API realmente usa certificados auto-firmados. Si tu API usa Let's Encrypt u otros certificados válidos, NO es necesario configurar esta variable.

## Pasos para Deployment en Dokploy

### 1. Preparar el Repositorio

Asegúrate de que todos los cambios estén commiteados y pusheados:

```bash
git add .
git commit -m "Preparado para deployment en Dokploy"
git push origin main
```

### 2. Crear Nueva Aplicación en Dokploy

1. Inicia sesión en tu instancia de Dokploy
2. Haz clic en "Nueva Aplicación"
3. Selecciona "Git Repository" como fuente
4. Conecta tu repositorio Git

### 3. Configurar la Aplicación

- **Nombre**: `smart-business-ecommerce`
- **Tipo**: `Dockerfile`
- **Puerto**: `3000`
- **Directorio de Build**: `.` (raíz del proyecto)

### 4. Configurar Variables de Entorno

Agrega todas las variables de entorno necesarias en la sección de "Environment Variables" de Dokploy.

### 5. Configurar Dominio

1. Ve a la sección "Domains" de tu aplicación
2. Agrega tu dominio: `www.smartbusiness.site`
3. Dokploy configurará automáticamente el SSL/TLS con Let's Encrypt

### 6. Configurar Health Check (Opcional)

En la configuración avanzada, puedes agregar:
- **Health Check Path**: `/`
- **Health Check Interval**: `30s`

### 7. Desplegar

1. Haz clic en "Deploy"
2. Dokploy construirá la imagen Docker y la desplegará
3. Monitorea los logs en tiempo real

## Configuración del Dockerfile

El proyecto ya incluye un `Dockerfile` optimizado con:
- Multi-stage build para reducir el tamaño de la imagen
- Build standalone de Next.js para mejor rendimiento
- Usuario no-root para seguridad
- Configuración optimizada para producción

## Verificación Post-Deployment

Después del deployment, verifica:

1. ✅ La aplicación responde en tu dominio
2. ✅ Las imágenes se cargan correctamente
3. ✅ La autenticación funciona
4. ✅ Las API routes responden
5. ✅ El SSL/TLS está activo

## Troubleshooting

### La aplicación no inicia

- Verifica los logs en Dokploy: `Application → Logs`
- Verifica que todas las variables de entorno estén configuradas
- Verifica que el puerto 3000 esté expuesto

### Error: "self-signed certificate" o "DEPTH_ZERO_SELF_SIGNED_CERT"

Si ves este error en los logs:
```
TypeError: fetch failed
[cause]: [Error: self-signed certificate] { code: 'DEPTH_ZERO_SELF_SIGNED_CERT' }
```

**Solución**: 

1. **Si tu API usa Let's Encrypt** (recomendado): El Dockerfile ya está configurado para actualizar los certificados CA del sistema. Esto debería resolver el problema automáticamente. Si persiste, verifica:
   - Que el dominio de la API sea correcto
   - Que el certificado Let's Encrypt esté válido y no haya expirado
   - Que los DNS estén configurados correctamente

2. **Si tu API usa certificados auto-firmados** (solo en casos especiales): Agrega esta variable de entorno en Dokploy:

```env
ALLOW_SELF_SIGNED_CERT=true
```

**Nota**: El Dockerfile actualiza automáticamente los certificados CA del sistema, por lo que certificados válidos como Let's Encrypt deberían funcionar sin configuración adicional.

### Errores de build

- Verifica que `next.config.ts` tenga `output: 'standalone'`
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Dokploy

### Errores de conexión a la API

- Verifica que `NEXT_PUBLIC_API_BASE_URL` esté correctamente configurada
- Verifica que la API backend esté accesible desde el servidor
- Revisa los CORS en el backend si es necesario

### Problemas con imágenes

- Verifica que `next.config.ts` tenga configurados los `remotePatterns`
- Verifica que las URLs de las imágenes sean accesibles

## Actualizaciones Futuras

Para actualizar la aplicación:

1. Haz push de los cambios al repositorio
2. Dokploy detectará automáticamente los cambios (si tienes auto-deploy habilitado)
3. O haz clic manualmente en "Redeploy" en Dokploy

## Rollback

Si necesitas hacer rollback a una versión anterior:

1. Ve a "Deployments" en tu aplicación
2. Selecciona la versión anterior
3. Haz clic en "Rollback"

## Recursos Adicionales

- [Documentación de Dokploy](https://dokploy.com/docs)
- [Documentación de Next.js Deployment](https://nextjs.org/docs/deployment)

## Notas Importantes

- ⚠️ **NEXTAUTH_SECRET**: Genera un nuevo secret único para producción usando: `openssl rand -base64 32`
- ⚠️ **API URL**: Asegúrate de que la URL de la API sea accesible desde el servidor
- ⚠️ **Dominio**: Configura correctamente los DNS antes de agregar el dominio en Dokploy


