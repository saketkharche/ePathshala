# ePathshala - Login Credentials

## 🎉 **Sample Users Created Successfully!**

The following test accounts have been automatically created in the database:

### 👨‍💼 **Admin User**
- **Email:** `admin@epathshala.com`
- **Password:** `admin123`
- **Role:** ADMIN
- **Access:** Full system access, user management, dashboard

### 👨‍🏫 **Teacher User**
- **Email:** `teacher@epathshala.com`
- **Password:** `teacher123`
- **Role:** TEACHER
- **Subject:** Mathematics
- **Class:** Class 10A
- **Access:** Attendance, grades, assignments, leave approval

### 👨‍🎓 **Student User**
- **Email:** `student@epathshala.com`
- **Password:** `student123`
- **Role:** STUDENT
- **Class:** Class 10A
- **Parent:** Robert Johnson
- **Access:** View attendance, grades, assignments, submit leave

### 👨‍👩‍👧‍👦 **Parent User**
- **Email:** `parent@epathshala.com`
- **Password:** `parent123`
- **Role:** PARENT
- **Child:** Alice Johnson
- **Access:** View child's attendance, grades, approve leave

## 🚀 **How to Use**

### 1. **Access the Application**
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8081`
- **Swagger UI:** `http://localhost:8081/swagger-ui.html`

### 2. **Login Process**
1. Open the frontend application
2. Select the appropriate role from the dropdown
3. Enter the email and password for that role
4. Click "Login"

### 3. **Testing Different Roles**
- **Admin:** Can manage all users, view dashboard, manage calendar
- **Teacher:** Can mark attendance, enter grades, upload assignments
- **Student:** Can view their attendance, grades, and submit leave requests
- **Parent:** Can view their child's information and approve leave requests

## 🔧 **Database Information**
- **Database:** `epathshalaAI` (created automatically)
- **Host:** `localhost:3306`
- **Username:** `root`
- **Password:** `root`

## 📝 **Notes**
- All passwords are encrypted using BCrypt
- Users are created only once (won't be duplicated on restart)
- The student is linked to the parent for testing parent-child relationships
- The teacher is assigned to Class 10A for testing class-specific features

## 🆘 **Troubleshooting**
If you can't login:
1. Make sure MySQL is running
2. Check that the backend is running on port 8081
3. Verify the database connection in `application.properties`
4. Check the console logs for any error messages 