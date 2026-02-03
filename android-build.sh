#!/bin/bash

# ===========================================
# LUXURY LIFE - Android AAB Build Script
# ===========================================
#
# CONFIGURACION ACTUAL (Feb 2026):
#   Keystore: upload-2026.jks
#   Alias: luxury-life
#   Passwords: 2026
#
#   Solo ejecuta: ./android-build.sh
#
# PARA FORZAR VERSION CODE:
#   VERSION_CODE=20 ./android-build.sh
# ===========================================

echo "🚀 Luxury Life - Build AAB para Google Play"
echo "============================================"

# Default keystore config for 2026
export KEYSTORE_PATH="${KEYSTORE_PATH:-upload-2026.jks}"
export KEYSTORE_ALIAS="${KEYSTORE_ALIAS:-luxury-life}"
export KEYSTORE_PASSWORD="${KEYSTORE_PASSWORD:-2026}"
export KEYSTORE_ALIAS_PASSWORD="${KEYSTORE_ALIAS_PASSWORD:-2026}"

# Check if keystore exists, if not create it
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo ""
    echo "⚠️  No se encontró keystore '$KEYSTORE_PATH'. Creando uno nuevo..."
    echo ""
    
    keytool -genkey -v \
        -keystore "$KEYSTORE_PATH" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -alias "$KEYSTORE_ALIAS" \
        -storetype JKS \
        -storepass "$KEYSTORE_PASSWORD" \
        -keypass "$KEYSTORE_ALIAS_PASSWORD" \
        -dname "CN=Luxury Life, OU=Development, O=Luxury Life, L=Madrid, ST=Madrid, C=ES"
    
    echo ""
    echo "✅ Keystore creado: $KEYSTORE_PATH"
    echo ""
    echo "📋 IMPORTANTE: Copia esta huella SHA-1 para Google Play Console:"
    keytool -list -v -keystore "$KEYSTORE_PATH" -alias "$KEYSTORE_ALIAS" -storepass "$KEYSTORE_PASSWORD" | grep "SHA1"
    echo ""
    echo "⚠️  Deberás solicitar 'Cambio de clave de subida' en Google Play Console"
    echo "   y subir el certificado PEM de este nuevo keystore."
    echo ""
    read -p "Pulsa Enter para continuar..."
fi

# Build web app
echo "📦 Building web app..."
npm run build

# Ensure Android platform exists
if [ ! -d "android" ]; then
  echo "📱 Android platform no encontrada. Añadiendo Android..."
  npx cap add android
fi

# Sync with Capacitor
echo "🔄 Syncing with Android..."
npx cap sync android

echo "🔏 Preparando firmado + subiendo versionCode..."
node scripts/android/prepare-android-release.mjs

# Build AAB
echo "🏗️  Building AAB..."
cd android
./gradlew bundleRelease

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Error en el build. Revisa el mensaje anterior."
    exit 1
fi

cd ..

echo ""
echo "============================================"
echo "✅ AAB generado en:"
echo "   android/app/build/outputs/bundle/release/app-release.aab"
echo "============================================"

# Abrir carpeta con el AAB
if [[ "$OSTYPE" == "darwin"* ]]; then
    open android/app/build/outputs/bundle/release/
else
    xdg-open android/app/build/outputs/bundle/release/
fi

echo "📂 Carpeta abierta!"
