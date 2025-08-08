#!/bin/bash

echo "Starting ePathshala Backend Server..."
echo

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 11 or higher"
    exit 1
fi

# Check if Maven is available
if command -v mvn &> /dev/null; then
    MAVEN_CMD="mvn"
elif [ -f "./mvnw" ]; then
    MAVEN_CMD="./mvnw"
    chmod +x ./mvnw
else
    echo "ERROR: Maven not found"
    echo "Please install Maven or ensure mvnw is present"
    exit 1
fi

echo "Starting Spring Boot application..."
echo "Backend will be available at: http://localhost:8081"
echo
echo "Press Ctrl+C to stop the server"
echo

# Start the application
$MAVEN_CMD spring-boot:run
