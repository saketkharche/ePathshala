-- SQL Script to Extract Password Hashes from ePathshala Database
-- Run this script in your MySQL database to get the actual password hashes

-- Connect to your database first:
-- mysql -u your_username -p epathshalaai

-- Extract all users with their password hashes
SELECT 
    id,
    email,
    name,
    role,
    password as hashed_password
FROM user;

-- Extract only sample users (the ones created by DataInitializer)
SELECT 
    id,
    email,
    name,
    role,
    password as hashed_password
FROM user 
WHERE email IN (
    'admin@epathshala.com',
    'teacher@epathshala.com', 
    'student@epathshala.com',
    'parent@epathshala.com'
);

-- Get just the email and password hash for easy copy-paste
SELECT 
    CONCAT('"', email, '": "', password, '"') as password_entry
FROM user 
WHERE email IN (
    'admin@epathshala.com',
    'teacher@epathshala.com', 
    'student@epathshala.com',
    'parent@epathshala.com'
);

-- Count total users
SELECT COUNT(*) as total_users FROM user;

-- Show all users (without passwords for security)
SELECT id, email, name, role FROM user; 