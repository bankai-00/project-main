@echo off
REM PortfolioHub Setup Script for Windows

echo 🚀 PortfolioHub Setup Started
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do echo ✅ Node.js version: %%i
for /f "tokens=*" %%i in ('npm -v') do echo ✅ npm version: %%i
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your configuration
)

echo Installing backend dependencies...
call npm install

echo.
echo ✅ Backend setup complete!
echo.

REM Frontend Setup
echo 📦 Setting up Frontend...
cd ..\frontend

if not exist .env (
    echo Creating .env file (optional)...
    (echo REACT_APP_API_URL=http://localhost:5000/api) > .env
)

echo Installing frontend dependencies...
call npm install

echo.
echo ✅ Frontend setup complete!
echo.

REM Summary
echo ═══════════════════════════════════════════
echo ✅ Setup Complete!
echo ═══════════════════════════════════════════
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
echo 📚 Documentation: See README.md in backend\ and frontend\ folders
echo.
pause
