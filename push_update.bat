@echo off
setlocal enabledelayedexpansion
title FAKHAMA DECOR - Push Update to GitHub
cd /d "%~dp0"

echo ============================================================
echo   FAKHAMA DECOR - PUSH UPDATE TO GITHUB
echo ============================================================
echo.

:: 1. Verify Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 goto :NO_GIT

:: 2. Check if there are any changes
set "HAS_CHANGES=0"

git diff --quiet --exit-code 2>nul
if %errorlevel% neq 0 set "HAS_CHANGES=1"

git diff --cached --quiet --exit-code 2>nul
if %errorlevel% neq 0 set "HAS_CHANGES=1"

for /f %%i in ('git ls-files --others --exclude-standard 2^>nul') do set "HAS_CHANGES=1"

if "%HAS_CHANGES%"=="0" goto :NO_CHANGES

:: 3. Stage all changes
echo [STATUS] Staging all changes...
git add .
if %errorlevel% neq 0 goto :GIT_ERROR
echo [OK] All changes staged.
echo.

:: 4. Commit with automatic timestamp
git commit -m "Update project"
if %errorlevel% neq 0 goto :GIT_ERROR
echo [OK] Changes committed.
echo.

:: 5. Push to remote
echo [STATUS] Pushing to GitHub...
echo (Please wait, this may take a moment...)
echo.
git push 2>&1
if %errorlevel% neq 0 goto :PUSH_FAIL
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
echo [ERROR] Push to GitHub failed.
echo   - Make sure you have internet connection
echo   - Make sure you are logged in to GitHub
echo.
pause
exit /b 1
