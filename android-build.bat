@echo off
setlocal EnableExtensions
REM Ensure we are running from the project root (folder where this .bat lives)
cd /d "%~dp0"
REM ===========================================
REM LUXURY LIFE - Android AAB Build Script (Windows)
REM ===========================================
REM
REM CONFIGURACION RECOMENDADA (Google Play Upload Key):
REM   Keystore: upload-keystore.jks
REM   Alias: upload
REM   Passwords: (NO se guardan aqui; usar variables de entorno)
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

REM Defaults (sin contraseñas hardcodeadas)
if "%KEYSTORE_PATH%"=="" set KEYSTORE_PATH=upload-keystore.jks
if "%KEYSTORE_ALIAS%"=="" set KEYSTORE_ALIAS=upload

if "%KEYSTORE_PASSWORD%"=="" (
    echo.
    echo ❌ Falta KEYSTORE_PASSWORD.
    echo    Ejemplo: set KEYSTORE_PASSWORD=tu_password
    echo.
    goto :error
)
if "%KEYSTORE_ALIAS_PASSWORD%"=="" (
    echo.
    echo ❌ Falta KEYSTORE_ALIAS_PASSWORD.
    echo    Ejemplo: set KEYSTORE_ALIAS_PASSWORD=tu_password
    echo.
    goto :error
)

REM El keystore DEBE existir (no autogeneramos uno, para no romper el SHA1 de Google Play)
if not exist "%KEYSTORE_PATH%" (
    echo.
    echo ❌ No se encontró el keystore "%KEYSTORE_PATH%".
    echo    Colócalo en la raiz del proyecto o define KEYSTORE_PATH con su ruta.
    echo.
    goto :error
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

REM Copy keystore to android/app and force signing to use this exact file
if not exist "android\app" (
    echo.
    echo ❌ No se encontró la carpeta "android\app".
    echo    Asegúrate de que "npx cap sync android" haya terminado bien.
    echo.
    goto :error
)

echo 📋 Copiando keystore a android\app\release-key.jks...
copy /Y "%KS_SRC%" "android\app\release-key.jks"
if errorlevel 1 goto :error
if not exist "android\app\release-key.jks" goto :error

REM Make prepare script point to the copied keystore (most reliable)
set "KEYSTORE_PATH=android/app/release-key.jks"
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
