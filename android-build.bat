@echo off
setlocal EnableExtensions
REM Ensure we are running from the project root (folder where this .bat lives)
cd /d "%~dp0"
REM ===========================================
REM LUXURY LIFE - Android AAB Build Script (Windows)
REM ===========================================
REM
REM CONFIGURACION ACTUAL (Feb 2026):
REM   Keystore: upload-2026.jks
REM   Alias: luxury-life
REM   Passwords: 2026
REM
REM   Solo ejecuta: android-build.bat
REM
REM PARA FORZAR VERSION CODE:
REM   set VERSION_CODE=20
REM   android-build.bat
REM ===========================================

echo.
echo 🚀 Luxury Life - Build AAB para Google Play
echo ============================================
echo.

REM Default keystore config for 2026
if "%KEYSTORE_PATH%"=="" set KEYSTORE_PATH=upload-2026.jks
if "%KEYSTORE_ALIAS%"=="" set KEYSTORE_ALIAS=luxury-life
if "%KEYSTORE_PASSWORD%"=="" set KEYSTORE_PASSWORD=2026
if "%KEYSTORE_ALIAS_PASSWORD%"=="" set KEYSTORE_ALIAS_PASSWORD=2026

REM Check if the keystore exists, if not create it
if not exist "%KEYSTORE_PATH%" (
    echo.
    echo ⚠️  No se encontró keystore "%KEYSTORE_PATH%". Creando uno nuevo...
    echo.
    
    keytool -genkey -v -keystore %KEYSTORE_PATH% -keyalg RSA -keysize 2048 -validity 10000 -alias %KEYSTORE_ALIAS% -storetype JKS -storepass %KEYSTORE_PASSWORD% -keypass %KEYSTORE_ALIAS_PASSWORD% -dname "CN=Luxury Life, OU=Development, O=Luxury Life, L=Madrid, ST=Madrid, C=ES"
    
    echo.
    echo ✅ Keystore creado: %KEYSTORE_PATH%
    echo.
    echo 📋 IMPORTANTE: Copia esta huella SHA-1 para Google Play Console:
    keytool -list -v -keystore %KEYSTORE_PATH% -alias %KEYSTORE_ALIAS% -storepass %KEYSTORE_PASSWORD% | findstr "SHA1"
    echo.
    echo ⚠️  Deberás solicitar "Cambio de clave de subida" en Google Play Console
    echo    y subir el certificado PEM de este nuevo keystore.
    echo.
    pause
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

REM Resolve keystore source path (support relative/absolute KEYSTORE_PATH)
set "KS_SRC=%KEYSTORE_PATH%"
if not exist "%KS_SRC%" (
    if exist "%~dp0%KEYSTORE_PATH%" set "KS_SRC=%~dp0%KEYSTORE_PATH%"
)
if not exist "%KS_SRC%" (
    echo.
    echo ❌ Keystore no encontrado.
    echo    Buscado en: "%KEYSTORE_PATH%"
    echo.
    goto :error
)

echo 🔏 Preparando firmado + subiendo versionCode...
node scripts\android\prepare-android-release.mjs
if errorlevel 1 goto :error

REM Copy keystore to android/app as fallback for relative path resolution
if not exist "android\app" (
    echo.
    echo ❌ No se encontró la carpeta "android\app".
    echo    Asegúrate de que "npx cap sync android" haya terminado bien.
    echo.
    goto :error
)

echo 📋 Copiando keystore a android\app...
copy /Y "%KS_SRC%" "android\app\release-key.jks"
if errorlevel 1 goto :error
if not exist "android\app\release-key.jks" goto :error

REM Build AAB
echo 🏗️  Building AAB...
cd android
call gradlew.bat bundleRelease

REM Stop on Gradle failure (avoid printing success when build failed)
if %ERRORLEVEL% NEQ 0 goto :error

REM Double-check output exists
if not exist "app\build\outputs\bundle\release\app-release.aab" goto :error


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

goto :eof


:error
echo.
echo ❌ Error preparando el firmado Android. Revisa el mensaje anterior.
echo.
pause
exit /b 1
