@echo off
echo ========================================
echo Portfolio Website Setup
echo ========================================
echo.

echo Cleaning previous installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Clean complete!
echo.

echo Installing dependencies...
call npm install
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo Installation completed successfully!
    echo ========================================
    echo.
    echo To start the development server, run:
    echo npm run dev
    echo.
) else (
    echo ========================================
    echo Installation failed!
    echo ========================================
    echo Please check the error messages above
    echo.
)

pause

