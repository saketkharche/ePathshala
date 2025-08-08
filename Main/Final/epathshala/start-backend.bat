@echo off
echo Starting ePathshala Backend Server...
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 11 or higher
    pause
    exit /b 1
)

REM Check if Maven is available
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Using Maven wrapper...
    if not exist "mvnw.cmd" (
        echo ERROR: Maven wrapper not found
        echo Please ensure you're in the correct directory
        pause
        exit /b 1
    )
    set MAVEN_CMD=mvnw.cmd
) else (
    set MAVEN_CMD=mvn
)

echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8081
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the application
%MAVEN_CMD% spring-boot:run

pause
