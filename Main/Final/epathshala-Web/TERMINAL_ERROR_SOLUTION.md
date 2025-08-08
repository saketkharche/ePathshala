# Terminal Error Solution Guide

## Issues Identified

1. **Backend Server Not Running** - 403 Forbidden error
2. **Frontend-Backend Connection Issues**
3. **Spring Security Configuration Problems**

## Quick Fix Steps

### Step 1: Start the Backend Server

**For Windows:**
```bash
cd epathshala
start-backend.bat
```

**For Unix/Linux/Mac:**
```bash
cd epathshala
chmod +x start-backend.sh
./start-backend.sh
```

**Manual Method:**
```bash
cd epathshala
./mvnw spring-boot:run
```

### Step 2: Verify Backend is Running

Open a new terminal and test:
```bash
curl http://localhost:8081/api/auth/status
```

Expected response:
```json
{
  "status": "OK",
  "message": "Authentication service is running",
  "timestamp": 1234567890
}
```

### Step 3: Check Frontend Connection

The frontend should automatically connect to the backend via the proxy configuration in `vite.config.js`.

## Detailed Solutions

### Issue 1: 403 Forbidden Error

**Problem:** The `/api/auth/status` endpoint was blocked by Spring Security.

**Solution:** ✅ **FIXED** - Added the status endpoint to permitted URLs in `SecurityConfig.java`:

```java
.antMatchers("/api/auth/status").permitAll() // Allow status endpoint
```

### Issue 2: Backend Server Not Running

**Problem:** The backend server was shut down (as shown in logs).

**Solution:** Start the backend server using one of the methods above.

### Issue 3: Database Connection

**Problem:** MySQL might not be running.

**Solution:** 
```bash
# Start MySQL (Windows)
net start mysql

# Start MySQL (Linux/Mac)
sudo systemctl start mysql
sudo service mysql start

# Check MySQL status
mysql -u root -p
# Enter password: root
```

### Issue 4: Port Conflicts

**Problem:** Port 8081 might be in use.

**Solution:**
```bash
# Check if port 8081 is in use
netstat -an | grep 8081

# Kill process using port 8081 (if needed)
# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8081 | xargs kill -9
```

## Testing the Fix

### 1. Test Backend Health
```bash
curl http://localhost:8081/api/auth/status
```

### 2. Test Login Endpoint
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","role":"ADMIN"}'
```

### 3. Test Frontend Connection
Open browser console and run:
```javascript
fetch('/api/auth/status')
  .then(res => res.json())
  .then(data => console.log('Backend status:', data))
  .catch(err => console.error('Error:', err));
```

## Common Error Messages and Solutions

### Error: "Connection refused"
- **Cause:** Backend server not running
- **Solution:** Start the backend server

### Error: "403 Forbidden"
- **Cause:** Spring Security blocking the endpoint
- **Solution:** ✅ **FIXED** - Status endpoint now permitted

### Error: "Database connection failed"
- **Cause:** MySQL not running or wrong credentials
- **Solution:** Start MySQL and verify credentials in `application.properties`

### Error: "Port already in use"
- **Cause:** Another application using port 8081
- **Solution:** Kill the process or change the port in `application.properties`

## Verification Steps

### 1. Backend Server Status
```bash
# Check if server is running
curl http://localhost:8081/api/auth/status
```

### 2. Database Connection
```bash
# Connect to MySQL
mysql -u root -p
# Enter password: root

# Check database
USE epathshalaAI;
SHOW TABLES;
```

### 3. Frontend-Backend Communication
Open browser developer tools and check:
- Network tab for successful API calls
- Console for any JavaScript errors
- No CORS errors

## Complete Startup Sequence

1. **Start MySQL:**
   ```bash
   # Windows
   net start mysql
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. **Start Backend:**
   ```bash
   cd epathshala
   ./mvnw spring-boot:run
   ```

3. **Start Frontend:**
   ```bash
   cd epathshala-Web
   npm run dev
   ```

4. **Test Login:**
   - Open browser to `http://localhost:3000`
   - Try logging in with test credentials

## Troubleshooting Commands

### Check Java Version
```bash
java -version
```

### Check Maven
```bash
mvn -version
```

### Check MySQL Status
```bash
# Windows
sc query mysql

# Linux/Mac
sudo systemctl status mysql
```

### Check Port Usage
```bash
# Windows
netstat -an | findstr 8081

# Linux/Mac
lsof -i :8081
```

### Check Application Logs
Look for these in the backend console:
- ✅ "Started EpathshalaApplication"
- ✅ "Tomcat started on port(s): 8081"
- ✅ "Started EpathshalaApplication in X seconds"

## Expected Behavior After Fix

1. **Backend Console:**
   ```
   Started EpathshalaApplication in 5.234 seconds
   Tomcat started on port(s): 8081 (http)
   ```

2. **Frontend Console:**
   ```
   VITE v7.0.6  ready in 812 ms
   ➜  Local:   http://localhost:3000/
   ```

3. **Browser Console:**
   ```
   ✅ Backend is running: {status: "OK", message: "Authentication service is running"}
   ```

## If Issues Persist

1. **Clear all caches:**
   ```bash
   # Clear Maven cache
   mvn clean
   
   # Clear npm cache
   npm cache clean --force
   
   # Clear browser cache
   # Press Ctrl+Shift+Delete in browser
   ```

2. **Restart all services:**
   ```bash
   # Stop all processes
   # Restart MySQL
   # Restart backend
   # Restart frontend
   ```

3. **Check firewall settings:**
   - Ensure port 8081 is not blocked
   - Allow Java and Node.js through firewall

4. **Verify file permissions:**
   ```bash
   # Linux/Mac
   chmod +x epathshala/mvnw
   chmod +x epathshala/start-backend.sh
   ```

## Success Indicators

✅ Backend server starts without errors  
✅ `curl http://localhost:8081/api/auth/status` returns JSON  
✅ Frontend loads at `http://localhost:3000`  
✅ Login page appears without errors  
✅ No 403 Forbidden errors in browser console  
✅ Network tab shows successful API calls  

## Next Steps

After fixing the terminal errors:

1. **Test the login functionality**
2. **Create test users if needed**
3. **Verify all features work correctly**
4. **Check the layout optimizations are working**

The main issue was that the backend server wasn't running and the status endpoint wasn't permitted in Spring Security. Both issues have been resolved.
