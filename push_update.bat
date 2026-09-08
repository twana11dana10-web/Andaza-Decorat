@echo off
setlocal enabledelayedexpansion
title ANDAZA DECORAT - Push Update to GitHub
cd /d "%~dp0"

echo ============================================================
echo   ANDAZA DECORAT - PUSH UPDATE TO GITHUB
echo ============================================================
echo.

:: 1. Verify Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 goto :NO_GIT

:: 2. Check internet connectivity first
echo [STATUS] Checking internet connection...
ping github.com -n 1 -w 5000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] First ping failed, retrying...
    ping github.com -n 1 -w 10000 >nul 2>&1
    if %errorlevel% neq 0 goto :NO_INTERNET
)
echo [OK] Internet connection verified.
echo.

:: 3. Check if there are any changes to commit or push
set "HAS_UNCOMMITTED=0"
set "HAS_UNPUSHED=0"

git diff --quiet --exit-code 2>nul
if %errorlevel% neq 0 set "HAS_UNCOMMITTED=1"

git diff --cached --quiet --exit-code 2>nul
if %errorlevel% neq 0 set "HAS_UNCOMMITTED=1"

for /f %%i in ('git ls-files --others --exclude-standard 2^>nul') do set "HAS_UNCOMMITTED=1"

for /f %%i in ('git log origin/main..HEAD --oneline 2^>nul') do set "HAS_UNPUSHED=1"

if "%HAS_UNCOMMITTED%"=="0" if "%HAS_UNPUSHED%"=="0" goto :NO_CHANGES

:: 4. Stage and commit if there are uncommitted changes
if "%HAS_UNCOMMITTED%"=="1" (
    echo [STATUS] Staging all changes...
    git add .
    if %errorlevel% neq 0 goto :GIT_ERROR
    echo [OK] All changes staged.
    echo.

    echo [STATUS] Committing changes...
    git commit -m "Update project"
    if %errorlevel% neq 0 goto :GIT_ERROR
    echo [OK] Changes committed.
    echo.
)

:: 5. Push to remote
echo [STATUS] Pushing to GitHub...
echo (Please wait, this may take a moment on slow connections...)
echo.
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [RETRY] First push attempt failed. Retrying in 5 seconds...
    echo.
    timeout /t 5 >nul
    git push origin main
    if %errorlevel% neq 0 goto :PUSH_FAIL
)
echo.
echo ============================================================
echo   [SUCCESS] Project updated on GitHub!
echo ============================================================
echo.
echo Window will close in 5 seconds...
timeout /t 5 >nul
exit /b 0

:NO_GIT
echo [ERROR] Git is not detected in your PATH.
echo Please install Git from https://git-scm.com/
echo.
pause
exit /b 1

:NO_INTERNET
echo.
echo [ERROR] Cannot reach github.com
echo   - Check your internet connection
echo   - Check your VPN if you use one
echo   - Try again in a minute
echo.
pause
exit /b 1

:NO_CHANGES
echo [INFO] No changes detected. Nothing to push.
echo.
echo Window will close in 3 seconds...
timeout /t 3 >nul
exit /b 0

:GIT_ERROR
echo.
echo [ERROR] A Git operation failed. Check the output above.
echo.
pause
exit /b 1

:PUSH_FAIL
echo.
echo [ERROR] Push to GitHub failed after 2 attempts.
echo   - Make sure you have a stable internet connection
echo   - Make sure you are logged in to GitHub
echo   - Try running manually: git push origin main
echo.
pause
exit /b 1
