@echo off
setlocal EnableExtensions
REM Ensure we are running from the project root (folder where this .bat lives)
cd /d "%~dp0"
REM ===========================================
REM LUXURY LIFE - Android AAB Build Script (Windows)
REM ===========================================
REM
REM PARA EL NUEVO UPLOAD KEY (después del 1 Feb 2026 19:24 UTC):
REM   set KEYSTORE_PATH=upload-keystore.jks
REM   set KEYSTORE_ALIAS=upload
REM   set KEYSTORE_PASSWORD=luxury1234
REM   set KEYSTORE_ALIAS_PASSWORD=luxury1234
REM   android-build.bat
REM
REM PARA EL KEY ORIGINAL:
REM   set KEYSTORE_PASSWORD=luxury1234
REM   set KEYSTORE_ALIAS_PASSWORD=luxury1234
REM   android-build.bat
REM
REM PARA FORZAR VERSION CODE:
REM   set VERSION_CODE=15
REM   android-build.bat
REM ===========================================

echo.
echo 🚀 Luxury Life - Build AAB para Google Play
echo ============================================
echo.

REM Check if any keystore exists
if not exist "release-key.jks" if not exist "upload-keystore.jks" (
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

REM Resolve keystore source path (support relative/absolute KEYSTORE_PATH)
set "KS_SRC=%KEYSTORE_PATH%"
if not exist "%KS_SRC%" (
    if exist "%~dp0%KEYSTORE_PATH%" set "KS_SRC=%~dp0%KEYSTORE_PATH%"
)
if not exist "%KS_SRC%" (
    echo.
    echo ❌ Keystore no encontrado.
    echo    Buscado en: "%KEYSTORE_PATH%"
    echo    Resuelto a: "%KS_SRC%"
    echo.
    echo 👉 Solucion:
    echo    - Copia tu keystore a la raiz del proyecto como "release-key.jks", o
    echo    - Ejecuta: set KEYSTORE_PATH=RUTA\ABSOLUTA\a\tu\keystore.jks
    echo.
    goto :error
)

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
