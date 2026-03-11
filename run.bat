@echo off
echo Starting ATS Resume V2...

:: Start Backend
echo Starting Backend (Django)...
start "Backend" cmd /c "cd api && ..\api\env\Scripts\python.exe manage.py runserver"

:: Start UI
echo Starting UI (Next.js)...
start "UI" cmd /c "cd ui && npm run dev"

echo Started! Backend and UI are running in separate windows.
pause
