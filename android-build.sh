#!/bin/bash

# ===========================================
# LUXURY LIFE - Android AAB Build Script
# ===========================================

echo "🚀 Luxury Life - Build AAB para Google Play"
echo "============================================"

# Check if keystore exists
if [ ! -f "release-key.jks" ]; then
    echo ""
    echo "⚠️  No se encontró keystore. Creando uno nuevo..."
    echo ""
    echo "📝 Introduce los datos para tu keystore:"
    
    keytool -genkey -v \
        -keystore release-key.jks \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -alias luxury-life \
        -storetype JKS
    
    echo ""
    echo "✅ Keystore creado: release-key.jks"
    echo "⚠️  ¡GUARDA ESTE ARCHIVO Y LAS CONTRASEÑAS EN LUGAR SEGURO!"
    echo ""
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

# Signing config (usa variables de entorno para no teclear cada vez)
export KEYSTORE_ALIAS="${KEYSTORE_ALIAS:-luxury-life}"
export KEYSTORE_PATH="${KEYSTORE_PATH:-release-key.jks}"

if [ -z "${KEYSTORE_PASSWORD:-}" ]; then
  echo ""
  echo "🔐 Introduce la contraseña del keystore:"
  read -s KEYSTORE_PASSWORD
  export KEYSTORE_PASSWORD
fi

if [ -z "${KEYSTORE_ALIAS_PASSWORD:-}" ]; then
  echo ""
  echo "🔐 Introduce la contraseña del alias:"
  read -s KEYSTORE_ALIAS_PASSWORD
  export KEYSTORE_ALIAS_PASSWORD
fi

echo "🔏 Preparando firmado + subiendo versionCode..."
node scripts/android/prepare-android-release.mjs

# Build AAB
echo "🏗️  Building AAB..."
cd android
./gradlew bundleRelease


cd ..

echo ""
echo "============================================"
echo "✅ AAB generado en:"
echo "   android/app/build/outputs/bundle/release/app-release.aab"
echo "============================================"

# Abrir carpeta con el AAB
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    open android/app/build/outputs/bundle/release/
else
    # Linux
    xdg-open android/app/build/outputs/bundle/release/
fi

echo "📂 Carpeta abierta!"
