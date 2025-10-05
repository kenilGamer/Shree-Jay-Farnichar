@echo off
echo Starting Shree Jay Furniture Development Environment...
echo.

echo Installing dependencies...
call npm run setup

echo.
echo Starting development servers...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.

call npm run dev

pause
