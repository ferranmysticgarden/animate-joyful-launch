@echo off
REM ===========================================
REM LUXURY LIFE - Android AAB Build Script (Windows)
REM ===========================================

echo.
echo 🚀 Luxury Life - Build AAB para Google Play
echo ============================================
echo.

REM Check if keystore exists
if not exist "release-key.jks" (
    echo.
    echo ⚠️  No se encontró keystore. Creando uno nuevo...
    echo.
    echo 📝 Introduce los datos para tu keystore:
    echo.
    
    keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias luxury-life -storetype JKS
    
    echo.
    echo ✅ Keystore creado: release-key.jks
    echo ⚠️  ¡GUARDA ESTE ARCHIVO Y LAS CONTRASEÑAS EN LUGAR SEGURO!
    echo.
)

REM Build web app
echo 📦 Building web app...
call npm run build

REM Sync with Capacitor
echo 🔄 Syncing with Android...
call npx cap sync android

REM Build AAB
echo 🏗️  Building AAB...
cd android

echo.
set /p KEYSTORE_PASSWORD=🔐 Introduce la contraseña del keystore: 
echo.
set /p KEY_PASSWORD=🔐 Introduce la contraseña del alias: 

REM Create keystore.properties
echo storeFile=../release-key.jks > keystore.properties
echo storePassword=%KEYSTORE_PASSWORD% >> keystore.properties
echo keyAlias=luxury-life >> keystore.properties
echo keyPassword=%KEY_PASSWORD% >> keystore.properties

REM Build release AAB
call gradlew.bat bundleRelease

echo.
echo ============================================
echo ✅ AAB generado en:
echo    android\app\build\outputs\bundle\release\app-release.aab
echo ============================================
echo.

cd ..
pause
