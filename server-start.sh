#!/bin/sh
# Script de inicio para Next.js que configura SSL antes de iniciar el servidor

# Debug: mostrar valores de variables de entorno
echo "=========================================="
echo "SSL Configuration Debug:"
echo "ALLOW_SELF_SIGNED_CERT: '${ALLOW_SELF_SIGNED_CERT:-not_set}'"
echo "NODE_TLS_REJECT_UNAUTHORIZED: '${NODE_TLS_REJECT_UNAUTHORIZED:-not_set}'"
echo "=========================================="

# Normalizar la variable ALLOW_SELF_SIGNED_CERT
CERT_VAR=$(echo "${ALLOW_SELF_SIGNED_CERT}" | tr '[:upper:]' '[:lower:]' | tr -d ' ')

# Deshabilitar validación SSL si está configurado
# Verificar múltiples formatos de la variable
if [ "$CERT_VAR" = "true" ] || \
   [ "$CERT_VAR" = "1" ] || \
   [ "$CERT_VAR" = "yes" ] || \
   [ "${NODE_TLS_REJECT_UNAUTHORIZED}" = "0" ]; then
  export NODE_TLS_REJECT_UNAUTHORIZED=0
  export ALLOW_SELF_SIGNED_CERT=true
  echo "⚠️  SSL certificate validation is DISABLED"
  echo "⚠️  NODE_TLS_REJECT_UNAUTHORIZED=0"
else
  export NODE_TLS_REJECT_UNAUTHORIZED=1
  echo "✓ SSL certificate validation is ENABLED (using system CA certificates)"
fi

# Mostrar configuración final
echo "Final NODE_TLS_REJECT_UNAUTHORIZED: ${NODE_TLS_REJECT_UNAUTHORIZED}"
echo "=========================================="

# Iniciar el servidor Next.js
# La variable NODE_TLS_REJECT_UNAUTHORIZED será respetada por Node.js
exec node server.js

