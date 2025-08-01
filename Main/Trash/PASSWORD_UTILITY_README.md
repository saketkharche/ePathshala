# 🔐 Password Utility for ePathshala System

## Overview

This document explains the password management system in the ePathshala ERP. **Important Note**: BCrypt passwords cannot be "decrypted" as they are one-way cryptographic hashes. This utility provides methods to verify passwords and manage password-related operations.

## 🔍 How BCrypt Works

BCrypt is a one-way hashing algorithm that:
- **Cannot be reversed**: You cannot decrypt a BCrypt hash back to the original password
- **Can be verified**: You can check if a plain text password matches a BCrypt hash
- **Is secure**: Each hash includes a salt and uses multiple rounds of encryption

## 📋 Available Endpoints

### 1. Verify Sample Passwords
**GET** `/api/password/verify-sample-passwords`

Verifies all known sample passwords against their database hashes.

**Response Example:**
```json
{
  "message": "Password verification completed",
  "totalUsers": 4,
  "samplePasswords": {
    "admin@epathshala.com": "admin123",
    "teacher@epathshala.com": "teacher123",
    "student@epathshala.com": "student123",
    "parent@epathshala.com": "parent123"
  },
  "verificationResults": {
    "admin@epathshala.com": true,
    "teacher@epathshala.com": true,
    "student@epathshala.com": true,
    "parent@epathshala.com": true
  }
}
```

### 2. Verify Specific Password
**POST** `/api/password/verify`

**Parameters:**
- `email`: User's email address
- `plainPassword`: Plain text password to verify

**Response Example:**
```json
{
  "email": "admin@epathshala.com",
  "passwordMatches": true,
  "userName": "System Administrator",
  "userRole": "ADMIN"
}
```

### 3. Generate Random Password
**POST** `/api/password/generate`

Generates a new random password and its BCrypt hash.

**Response Example:**
```json
{
  "plainPassword": "Kj8mN2pQ",
  "hashedPassword": "$2a$10$...",
  "message": "New password generated successfully"
}
```

### 4. Get Sample Passwords
**GET** `/api/password/sample-passwords`

Returns the known sample passwords used in the system.

**Response Example:**
```json
{
  "samplePasswords": {
    "admin@epathshala.com": "admin123",
    "teacher@epathshala.com": "teacher123",
    "student@epathshala.com": "student123",
    "parent@epathshala.com": "parent123"
  },
  "message": "Sample passwords retrieved successfully",
  "note": "These are the default passwords used in DataInitializer"
}
```

### 5. Get All Users
**GET** `/api/password/users`

Returns all users with their password hashes (Admin only).

**Response Example:**
```json
{
  "totalUsers": 4,
  "users": [
    {
      "id": 1,
      "email": "admin@epathshala.com",
      "name": "System Administrator",
      "role": "ADMIN",
      "hashedPassword": "$2a$10$..."
    }
  ]
}
```

## 🚀 How to Use

### 1. Start the Application
```bash
cd backend
mvn spring-boot:run
```

### 2. Access Swagger UI
Open your browser and go to: `http://localhost:8081/swagger-ui.html`

### 3. Authenticate as Admin
First, you need to get an admin token:

```bash
curl -X POST "http://localhost:8081/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@epathshala.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

### 4. Use Password Endpoints
With the admin token, you can now access the password endpoints:

```bash
# Verify sample passwords
curl -X GET "http://localhost:8081/api/password/verify-sample-passwords" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Verify specific password
curl -X POST "http://localhost:8081/api/password/verify" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=admin@epathshala.com&plainPassword=admin123"

# Generate new password
curl -X POST "http://localhost:8081/api/password/generate" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## 📝 Sample User Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@epathshala.com | admin123 |
| Teacher | teacher@epathshala.com | teacher123 |
| Student | student@epathshala.com | student123 |
| Parent | parent@epathshala.com | parent123 |

## 🔧 Password Utility Class

The `PasswordUtility` class provides these methods:

- `verifyPassword(plainPassword, hashedPassword)`: Check if password matches hash
- `encodePassword(plainPassword)`: Generate BCrypt hash for password
- `getSamplePasswords()`: Get known sample passwords
- `verifyAllSamplePasswords(userPasswords)`: Verify all sample passwords
- `generateRandomPassword()`: Generate new random password
- `printPasswordVerificationResults(userPasswords)`: Print results to console

## ⚠️ Important Security Notes

1. **Never store plain text passwords** in the database
2. **BCrypt hashes cannot be decrypted** - they can only be verified
3. **Use strong passwords** in production
4. **Rotate passwords regularly** for security
5. **Log password verification attempts** for audit purposes

## 🛠️ Troubleshooting

### Common Issues:

1. **"User not found"**: Check if the email exists in the database
2. **"Password doesn't match"**: Verify the plain text password is correct
3. **"Unauthorized"**: Make sure you're using an admin token
4. **"BCrypt hash invalid"**: The hash in the database might be corrupted

### Debug Steps:

1. Check if the application is running on port 8081
2. Verify the database connection
3. Ensure you have admin privileges
4. Check the console logs for detailed error messages

## 📊 Console Output

When you call the verify sample passwords endpoint, you'll see output like this in the console:

```
🔐 Password Verification Results:
=================================
📧 admin@epathshala.com
   Plain Password: admin123
   Status: ✅ MATCHES

📧 teacher@epathshala.com
   Plain Password: teacher123
   Status: ✅ MATCHES

📧 student@epathshala.com
   Plain Password: student123
   Status: ✅ MATCHES

📧 parent@epathshala.com
   Plain Password: parent123
   Status: ✅ MATCHES
```

## 🔗 Related Files

- `backend/src/main/java/com/epathshala/util/PasswordUtility.java`
- `backend/src/main/java/com/epathshala/controller/PasswordController.java`
- `backend/src/main/java/com/epathshala/config/DataInitializer.java`
- `backend/src/main/java/com/epathshala/config/SecurityConfig.java`

## 📞 Support

If you encounter any issues with the password utility, check:
1. Application logs for detailed error messages
2. Database connectivity
3. Admin authentication
4. Swagger UI for endpoint documentation 