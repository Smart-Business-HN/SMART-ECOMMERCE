#!/bin/sh
# Script de inicio para Next.js que configura SSL antes de iniciar el servidor

# Solo deshabilitar validación SSL si está explícitamente configurado
# Por defecto, se usan los certificados CA actualizados del sistema
if [ "$ALLOW_SELF_SIGNED_CERT" = "true" ] || [ "$NODE_TLS_REJECT_UNAUTHORIZED" = "0" ]; then
  export NODE_TLS_REJECT_UNAUTHORIZED=0
  echo "⚠️  SSL certificate validation is disabled"
else
  echo "✓ SSL certificate validation is enabled (using system CA certificates)"
fi

# Iniciar el servidor Next.js
exec node server.js

