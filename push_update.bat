@echo off
setlocal
title FAKHAMA DECOR - Push Update to GitHub
cd /d "%~dp0"

echo ============================================================
echo   FAKHAMA DECOR - PUSH UPDATE TO GITHUB
echo ============================================================
echo.

:: 1. Verify Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 goto :NO_GIT

:: 2. Show current status
echo [STATUS] Checking for changes...
echo.
git status --short
echo.

:: 3. Check if there are any changes to commit
git diff --quiet --exit-code 2>nul
set "DIFF_EXIT=%errorlevel%"
git diff --cached --quiet --exit-code 2>nul
set "CACHED_EXIT=%errorlevel%"

:: Also check for untracked files
for /f %%i in ('git ls-files --others --exclude-standard') do set "UNTRACKED=1"

if "%DIFF_EXIT%"=="0" if "%CACHED_EXIT%"=="0" if not defined UNTRACKED goto :NO_CHANGES

:: 4. Stage all changes
echo [STATUS] Staging all changes...
git add .
if %errorlevel% neq 0 goto :GIT_ERROR
echo [OK] All changes staged.
echo.

:: 5. Ask for commit message
echo ============================================================
echo   Enter your commit message below
echo   (or press Enter for default: "Update project")
echo ============================================================
echo.
set /p COMMIT_MSG="Commit message: "

:: Use default message if empty
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Update project"

echo.
echo [STATUS] Committing with message: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 goto :GIT_ERROR
echo [OK] Changes committed.
echo.

:: 6. Push to remote
echo [STATUS] Pushing to GitHub...
git push
if %errorlevel% neq 0 goto :PUSH_FAIL
echo.
echo ============================================================
echo   [SUCCESS] Project updated on GitHub!
echo ============================================================
echo.
pause
exit /b 0

:NO_GIT
echo [ERROR] Git is not detected in your PATH.
echo Please install Git from https://git-scm.com/
echo.
pause
exit /b 1

:NO_CHANGES
echo ============================================================
echo   [INFO] No changes detected. Nothing to push.
echo ============================================================
echo.
pause
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
echo   - Try running: git push --set-upstream origin main
echo.
pause
exit /b 1
