#!/bin/bash

# ===========================================
# LUXURY LIFE - Android AAB Build Script
# ===========================================
#
# CONFIGURACION RECOMENDADA (Google Play Upload Key):
#   Keystore: upload-keystore.jks
#   Alias: upload
#   Passwords: (NO se guardan aqui; usar variables de entorno)
#
#   Solo ejecuta: ./android-build.sh
#
# PARA FORZAR VERSION CODE:
#   VERSION_CODE=20 ./android-build.sh
# ===========================================

echo "🚀 Luxury Life - Build AAB para Google Play"
echo "============================================"

# Defaults (sin contraseñas hardcodeadas)
export KEYSTORE_PATH="${KEYSTORE_PATH:-upload-keystore.jks}"
export KEYSTORE_ALIAS="${KEYSTORE_ALIAS:-upload}"

if [ -z "$KEYSTORE_PASSWORD" ]; then
  echo "❌ Falta KEYSTORE_PASSWORD (ej: export KEYSTORE_PASSWORD=tu_password)"
  exit 1
fi

if [ -z "$KEYSTORE_ALIAS_PASSWORD" ]; then
  echo "❌ Falta KEYSTORE_ALIAS_PASSWORD (ej: export KEYSTORE_ALIAS_PASSWORD=tu_password)"
  exit 1
fi

# El keystore DEBE existir (no autogeneramos uno, para no romper el SHA1 de Google Play)
if [ ! -f "$KEYSTORE_PATH" ]; then
  echo "❌ No se encontró el keystore '$KEYSTORE_PATH'."
  echo "   Colócalo en la raiz del proyecto o define KEYSTORE_PATH con su ruta."
  exit 1
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

# Copiamos el keystore al proyecto Android y forzamos que el firmado use este fichero
if [ ! -d "android/app" ]; then
  echo "❌ No se encontró android/app. ¿Falló npx cap sync android?"
  exit 1
fi

echo "📋 Copiando keystore a android/app/release-key.jks..."
cp -f "$KEYSTORE_PATH" "android/app/release-key.jks"

export KEYSTORE_PATH="android/app/release-key.jks"

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
