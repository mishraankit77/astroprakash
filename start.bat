@echo off
echo ========================================================
echo         Starting AstroPrakash Web Application
echo ========================================================
echo.

echo [1/2] Starting FastAPI Backend (Port 8000)...
start "AstroPrakash Backend" cmd /k "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting Next.js Frontend (Port 3000)...
start "AstroPrakash Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo AstroPrakash is booting up!
echo Frontend will be live at: http://localhost:3000
echo Backend API will be live at: http://127.0.0.1:8000/docs
echo.
pause
