#!/bin/bash
# Script para generar un secret seguro para NextAuth

echo "Generando secret para NextAuth..."
echo ""
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo ""
echo "Copia este valor y úsalo en tus variables de entorno en Dokploy"


