@echo off
echo 🔐 ePathshala Password Verification Tool
echo ======================================
echo.

echo 📋 Available Options:
echo 1. Start the Spring Boot application
echo 2. Access Swagger UI
echo 3. Get admin token
echo 4. Verify sample passwords via API
echo 5. Run SQL to extract password hashes
echo 6. Exit
echo.

:menu
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start_app
if "%choice%"=="2" goto swagger_ui
if "%choice%"=="3" goto get_token
if "%choice%"=="4" goto verify_passwords
if "%choice%"=="5" goto sql_extract
if "%choice%"=="6" goto exit
echo Invalid choice. Please try again.
goto menu

:start_app
echo.
echo 🚀 Starting Spring Boot application...
echo Make sure you're in the backend directory
cd backend
mvn spring-boot:run
goto menu

:swagger_ui
echo.
echo 🌐 Opening Swagger UI...
echo URL: http://localhost:8081/swagger-ui.html
echo.
echo Press any key to open in browser...
pause >nul
start http://localhost:8081/swagger-ui.html
goto menu

:get_token
echo.
echo 🔑 Getting admin token...
echo.
echo Running: curl -X POST "http://localhost:8081/api/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"admin@epathshala.com\",\"password\":\"admin123\",\"role\":\"ADMIN\"}"
echo.
curl -X POST "http://localhost:8081/api/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"admin@epathshala.com\",\"password\":\"admin123\",\"role\":\"ADMIN\"}"
echo.
echo Copy the token from the response above and use it in the next step.
echo.
pause
goto menu

:verify_passwords
echo.
echo 🔍 Verifying sample passwords...
echo.
set /p token="Enter your admin token: "
echo.
echo Running: curl -X GET "http://localhost:8081/api/password/verify-sample-passwords" -H "Authorization: Bearer %token%"
echo.
curl -X GET "http://localhost:8081/api/password/verify-sample-passwords" -H "Authorization: Bearer %token%"
echo.
pause
goto menu

:sql_extract
echo.
echo 📊 Extracting password hashes from database...
echo.
echo Run these SQL commands in your MySQL database:
echo.
echo 1. Connect to database:
echo    mysql -u your_username -p epathshalaai
echo.
echo 2. Run this query to get password hashes:
echo    SELECT email, password FROM user WHERE email IN ('admin@epathshala.com', 'teacher@epathshala.com', 'student@epathshala.com', 'parent@epathshala.com');
echo.
echo 3. Copy the results and use them in the StandalonePasswordVerifier.java
echo.
pause
goto menu

:exit
echo.
echo 👋 Goodbye!
pause
exit 