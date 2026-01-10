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

# Sync with Capacitor
echo "🔄 Syncing with Android..."
npx cap sync android

# Build AAB
echo "🏗️  Building AAB..."
cd android

# Set gradle properties for signing
echo ""
echo "🔐 Introduce la contraseña del keystore:"
read -s KEYSTORE_PASSWORD
echo ""
echo "🔐 Introduce la contraseña del alias:"
read -s KEY_PASSWORD

# Create or update local.properties with signing config
cat > keystore.properties << EOF
storeFile=../release-key.jks
storePassword=$KEYSTORE_PASSWORD
keyAlias=luxury-life
keyPassword=$KEY_PASSWORD
EOF

# Build release AAB
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
