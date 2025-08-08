# Login Troubleshooting Guide

## Issue: "Invalid or expired token" Error

This guide helps you troubleshoot the "Invalid or expired token" error that occurs during login.

## Quick Fixes

### 1. Clear Browser Storage
```javascript
// Open browser console and run:
localStorage.clear();
sessionStorage.clear();
```

### 2. Check Backend Server
Ensure the backend server is running on port 8081:
```bash
# Check if server is running
curl http://localhost:8081/api/auth/status
```

### 3. Check Database Connection
Ensure MySQL is running and accessible:
```bash
mysql -u root -p
# Enter password: root
```

## Detailed Troubleshooting Steps

### Step 1: Check Backend Server Status

1. **Verify server is running:**
   ```bash
   # Check if port 8081 is in use
   netstat -an | grep 8081
   ```

2. **Test API endpoint:**
   ```bash
   curl -X GET http://localhost:8081/api/auth/status
   ```
   Expected response:
   ```json
   {
     "status": "OK",
     "message": "Authentication service is running",
     "timestamp": 1234567890
   }
   ```

### Step 2: Check Database Connection

1. **Verify MySQL is running:**
   ```bash
   sudo systemctl status mysql
   # or
   sudo service mysql status
   ```

2. **Test database connection:**
   ```bash
   mysql -u root -p -h localhost
   # Enter password: root
   ```

3. **Check database exists:**
   ```sql
   SHOW DATABASES;
   USE epathshalaAI;
   SHOW TABLES;
   ```

### Step 3: Check Application Properties

Verify `application.properties` has correct settings:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/epathshalaAI?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root

# JWT
jwt.secret=your_jwt_secret_key_should_be_very_long_and_secure_for_production_use

# Server
server.port=8081
```

### Step 4: Check Frontend Configuration

1. **Verify API base URL:**
   - Frontend should be making requests to `http://localhost:8081`
   - Check if there's a proxy configuration in `vite.config.js`

2. **Check CORS settings:**
   - Backend should allow requests from frontend origin
   - Usually `http://localhost:5173` for Vite dev server

### Step 5: Debug Login Process

1. **Open browser developer tools (F12)**

2. **Go to Network tab**

3. **Attempt login and check:**
   - Request URL: `http://localhost:8081/api/auth/login`
   - Request method: `POST`
   - Request payload: `{"email":"...","password":"...","role":"..."}`
   - Response status: Should be `200 OK`
   - Response body: Should contain `token`, `role`, `userId`, `name`

4. **Check Console for errors:**
   - Look for CORS errors
   - Look for network errors
   - Look for JavaScript errors

### Step 6: Common Issues and Solutions

#### Issue 1: Backend Server Not Running
**Symptoms:**
- Network error in browser console
- Connection refused error

**Solution:**
```bash
# Start the backend server
cd epathshala
./mvnw spring-boot:run
```

#### Issue 2: Database Connection Failed
**Symptoms:**
- Backend logs show database connection errors
- Server starts but login fails

**Solution:**
```bash
# Start MySQL
sudo systemctl start mysql

# Check MySQL status
sudo systemctl status mysql

# Test connection
mysql -u root -p
```

#### Issue 3: CORS Error
**Symptoms:**
- Browser console shows CORS error
- Request fails with CORS policy error

**Solution:**
Add CORS configuration to backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

#### Issue 4: JWT Secret Mismatch
**Symptoms:**
- Token validation fails
- "Invalid or expired token" error

**Solution:**
1. Check JWT secret in `application.properties`
2. Ensure secret is consistent across restarts
3. Clear browser storage to remove old tokens

#### Issue 5: User Not Found
**Symptoms:**
- Login fails with "User not found" error
- No user exists in database

**Solution:**
1. Check if user exists in database:
   ```sql
   USE epathshalaAI;
   SELECT * FROM user WHERE email = 'your-email@example.com';
   ```

2. Create test user if needed:
   ```sql
   INSERT INTO user (email, password, role, name) 
   VALUES ('admin@test.com', '$2a$10$...', 'ADMIN', 'Test Admin');
   ```

### Step 7: Test with Sample Data

If no users exist, create a test user:

```sql
-- Connect to database
mysql -u root -p
USE epathshalaAI;

-- Create test admin user (password: admin123)
INSERT INTO user (email, password, role, name, created_at, updated_at) 
VALUES (
    'admin@test.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 
    'ADMIN', 
    'Test Admin',
    NOW(),
    NOW()
);
```

Then try logging in with:
- Email: `admin@test.com`
- Password: `admin123`
- Role: `ADMIN`

### Step 8: Enable Debug Logging

Add debug logging to see what's happening:

```properties
# In application.properties
logging.level.com.epathshala=DEBUG
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
```

### Step 9: Check Browser Console

Open browser developer tools and look for:

1. **Network errors:**
   - Failed requests to `/api/auth/login`
   - CORS errors
   - Connection refused errors

2. **Console errors:**
   - JavaScript errors
   - Token validation errors
   - Navigation errors

3. **Application errors:**
   - React component errors
   - State management errors

## Prevention

### 1. Regular Maintenance
- Keep backend server running
- Monitor database connections
- Check logs for errors

### 2. User Management
- Ensure users exist in database
- Use strong passwords
- Regular password updates

### 3. Security
- Use strong JWT secrets
- Implement proper session management
- Regular security audits

## Getting Help

If the issue persists:

1. **Check logs:**
   - Backend application logs
   - Database logs
   - Browser console logs

2. **Test endpoints:**
   ```bash
   # Test health endpoint
   curl http://localhost:8081/api/auth/status
   
   # Test login endpoint
   curl -X POST http://localhost:8081/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password","role":"ADMIN"}'
   ```

3. **Verify configuration:**
   - Database connection
   - JWT configuration
   - CORS settings
   - Server ports

4. **Contact support:**
   - Provide error logs
   - Describe steps to reproduce
   - Include system information
