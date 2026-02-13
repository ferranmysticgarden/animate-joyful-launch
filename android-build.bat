@echo off
setlocal EnableExtensions
REM Ensure we are running from the project root (folder where this .bat lives)
cd /d "%~dp0"
REM ===========================================
REM LUXURY LIFE - Android AAB Build Script (Windows)
REM ===========================================
REM
REM   Solo ejecuta: android-build.bat
REM   El keystore, alias y contraseñas ya están configurados.
REM
REM PARA FORZAR VERSION CODE:
REM   set VERSION_CODE=20
REM   android-build.bat
REM ===========================================

echo.
echo 🚀 Luxury Life - Build AAB para Google Play
echo ============================================
echo.

REM Defaults
if "%KEYSTORE_PATH%"=="" set KEYSTORE_PATH=upload-keystore.jks
if "%KEYSTORE_ALIAS%"=="" set KEYSTORE_ALIAS=upload
if "%KEYSTORE_PASSWORD%"=="" set KEYSTORE_PASSWORD=luxury2026
if "%KEYSTORE_ALIAS_PASSWORD%"=="" set KEYSTORE_ALIAS_PASSWORD=luxury2026

REM Si el keystore no esta en la raiz del proyecto, intentar copiarlo desde C:\Users\PC\
if not exist "%KEYSTORE_PATH%" (
    echo ⚠️  Keystore no encontrado en la raiz. Buscando en C:\Users\PC\%KEYSTORE_PATH%...
    if exist "C:\Users\PC\%KEYSTORE_PATH%" (
        copy /Y "C:\Users\PC\%KEYSTORE_PATH%" "%KEYSTORE_PATH%"
        echo ✅ Keystore copiado desde C:\Users\PC\
    ) else (
        echo.
        echo ❌ No se encontró el keystore "%KEYSTORE_PATH%".
        echo    Buscado en:
        echo      - %CD%\%KEYSTORE_PATH%
        echo      - C:\Users\PC\%KEYSTORE_PATH%
        echo    Colócalo en la raiz del proyecto o en C:\Users\PC\
        echo.
        goto :error
    )
)

REM Build web app
echo 📦 Building web app...
call npm run build
if errorlevel 1 goto :error

REM Ensure Android platform exists
if not exist "android" (
    echo 📱 Android platform no encontrada. Añadiendo Android...
    call npx cap add android
)

REM Sync with Capacitor
echo 🔄 Syncing with Android...
call npx cap sync android

REM Verify android\app exists after sync
if not exist "android\app" (
    echo.
    echo ❌ No se encontró la carpeta "android\app".
    echo    Asegúrate de que "npx cap sync android" haya terminado bien.
    echo.
    goto :error
)

REM Copy keystore to android\app for Gradle
echo 📋 Copiando keystore a android\app\release-key.jks...
copy /Y "%KEYSTORE_PATH%" "android\app\release-key.jks"
if errorlevel 1 goto :error
if not exist "android\app\release-key.jks" goto :error

REM Prepare: bump versionCode + BILLING permission + signing config in build.gradle
set "KEYSTORE_PATH=android/app/release-key.jks"
echo 🔏 Preparando firmado + subiendo versionCode...
node scripts\android\prepare-android-release.mjs
if errorlevel 1 goto :error

REM Build AAB - pass signing directly to Gradle to avoid interactive password prompt
echo 🏗️  Building AAB...
cd android

REM Resolve absolute path to keystore (no quotes in value to avoid Gradle issues)
set "KS_ABS=%CD%\app\release-key.jks"

call gradlew.bat bundleRelease ^
  -Pandroid.injected.signing.store.file=%KS_ABS% ^
  -Pandroid.injected.signing.store.password=%KEYSTORE_PASSWORD% ^
  -Pandroid.injected.signing.key.alias=%KEYSTORE_ALIAS% ^
  -Pandroid.injected.signing.key.password=%KEYSTORE_ALIAS_PASSWORD%

REM Stop on Gradle failure
if %ERRORLEVEL% NEQ 0 (
    cd ..
    goto :error
)

REM Double-check output exists
if not exist "app\build\outputs\bundle\release\app-release.aab" (
    cd ..
    goto :error
)

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
echo ❌ Error en el build. Revisa el mensaje anterior.
echo.
pause
exit /b 1
