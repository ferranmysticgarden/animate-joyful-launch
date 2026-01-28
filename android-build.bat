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

REM Ensure Android platform exists
if not exist "android" (
    echo 📱 Android platform no encontrada. Añadiendo Android...
    call npx cap add android
)

REM Sync with Capacitor
echo 🔄 Syncing with Android...
call npx cap sync android

REM Signing config (usa variables de entorno para no teclear cada vez)
if "%KEYSTORE_ALIAS%"=="" set KEYSTORE_ALIAS=luxury-life
if "%KEYSTORE_PATH%"=="" set KEYSTORE_PATH=release-key.jks

if "%KEYSTORE_PASSWORD%"=="" (
    echo.
    set /p KEYSTORE_PASSWORD=🔐 Introduce la contraseña del keystore: 
)

if "%KEYSTORE_ALIAS_PASSWORD%"=="" (
    echo.
    set /p KEYSTORE_ALIAS_PASSWORD=🔐 Introduce la contraseña del alias: 
)

echo 🔏 Preparando firmado + subiendo versionCode...
node scripts\android\prepare-android-release.mjs
if errorlevel 1 goto :error

REM Copy keystore to android/app as fallback for relative path resolution
if exist "release-key.jks" (
    echo 📋 Copiando keystore a android\app...
    copy /Y "release-key.jks" "android\app\release-key.jks" >nul
)

REM Build AAB
echo 🏗️  Building AAB...
cd android
call gradlew.bat bundleRelease

REM Stop on Gradle failure (avoid printing success when build failed)
if errorlevel 1 goto :error


echo.
echo ============================================
echo ✅ AAB generado en:
echo    android\app\build\outputs\bundle\release\app-release.aab
echo ============================================
echo.

cd ..

REM Abrir carpeta con el AAB
echo 📂 Abriendo carpeta...
explorer android\app\build\outputs\bundle\release\


:error
echo.
echo ❌ Error preparando el firmado Android. Revisa el mensaje anterior.
echo.
pause
