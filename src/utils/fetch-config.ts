/**
 * Configuración para fetch requests que maneja certificados SSL
 * Se usa cuando la API backend tiene certificados auto-firmados o problemas con Let's Encrypt
 */

// Verificar si debemos ignorar errores de certificado SSL
const shouldIgnoreSSLErrors = 
  process.env.ALLOW_SELF_SIGNED_CERT === 'true' ||
  process.env.ALLOW_SELF_SIGNED_CERT === '1' ||
  process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0';

/**
 * Opciones adicionales para fetch que manejan certificados SSL
 * En Node.js, fetch no tiene una opción directa, pero podemos usar https.Agent
 */
export function getFetchOptions(): RequestInit {
  // Si estamos usando Node.js y necesitamos ignorar SSL
  if (shouldIgnoreSSLErrors && typeof process !== 'undefined') {
    // Para Node.js, necesitamos usar un Agent personalizado
    // Esto se configurará a nivel de proceso con NODE_TLS_REJECT_UNAUTHORIZED
    // El fetch nativo de Node.js respetará esta variable de entorno
    return {};
  }
  
  return {};
}

/**
 * Configurar Node.js para ignorar errores SSL si es necesario
 * Esto debe ejecutarse antes de cualquier fetch request
 */
export function configureSSLSettings() {
  if (shouldIgnoreSSLErrors) {
    if (typeof process !== 'undefined' && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      console.log('⚠️  SSL certificate validation disabled for fetch requests');
    }
  }
}

// Ejecutar configuración al importar el módulo
configureSSLSettings();

