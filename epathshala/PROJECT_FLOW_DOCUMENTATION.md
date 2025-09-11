# ePathshala Project Flow Documentation

## 🏗️ System Architecture Overview

ePathshala is a comprehensive educational management system built with Spring Boot backend and React frontend, featuring role-based access control, real-time communication, and exam management.

### Technology Stack
- **Backend**: Spring Boot 3.x, Spring Security, Spring Data JPA
- **Database**: MySQL 8.0
- **Authentication**: JWT tokens with session management
- **Real-time**: WebSocket for chat and notifications
- **File Management**: Multipart file uploads
- **API Documentation**: Swagger/OpenAPI 3

## 📊 High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Spring Boot) │◄──►│   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WebSocket     │    │   File Storage  │    │   Session Mgmt  │
│   (Real-time)   │    │   (uploads/)    │    │   (Redis-like)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Authentication & Authorization Flow

### 1. User Login Process
```
User Login Request
        │
        ▼
┌─────────────────┐
│  AuthController │
│  /api/auth/login│
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   AuthService   │
│  - Validate     │
│  - Generate JWT │
│  - Create Session│
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Response with  │
│  JWT Token +    │
│  User Details   │
└─────────────────┘
```

### 2. Role-Based Access Control
```
┌─────────────────┐
│   User Roles    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ ADMIN           │
│ - User Management│
│ - System Config │
│ - All Access    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ TEACHER         │
│ - Class Mgmt    │
│ - Grade Entry   │
│ - Attendance    │
│ - Assignments   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ STUDENT         │
│ - View Grades   │
│ - Submit Work   │
│ - Take Exams    │
│ - Chat Access   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ PARENT          │
│ - Child Progress│
│ - Leave Approval│
│ - Notifications │
└─────────────────┘
```

## 📚 Core Module Flows

### 1. Student Management Flow
```
Student Registration
        │
        ▼
┌─────────────────┐
│ AdminController │
│ /api/admin/     │
│ add-student     │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  AdminService   │
│ - Create User   │
│ - Create Student│
│ - Link Parent   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Database        │
│ - users table   │
│ - students table│
└─────────────────┘
```

### 2. Assignment Management Flow
```
Teacher Creates Assignment
        │
        ▼
┌─────────────────┐
│AssignmentController│
│ /api/assignments │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ AssignmentService│
│ - Save File     │
│ - Create Record │
│ - Notify Students│
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Student Submission│
│ - Upload File   │
│ - Submit Text   │
│ - Track Status  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Teacher Grading │
│ - Review Work   │
│ - Assign Grade  │
│ - Add Feedback  │
└─────────────────┘
```

### 3. Exam Management Flow
```
Faculty Creates Exam
        │
        ▼
┌─────────────────┐
│FacultyExamController│
│ /api/faculty/   │
│ exams           │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  ExamService    │
│ - Create Exam   │
│ - Add Questions │
│ - Set Timer     │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Student Takes   │
│ Exam            │
│ - Start Timer   │
│ - Answer Qs     │
│ - Auto Submit   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Auto Grading    │
│ - Calculate     │
│ - Generate      │
│ - Store Results │
└─────────────────┘
```

## 💬 Real-Time Communication Flow

### 1. Chat System
```
User Sends Message
        │
        ▼
┌─────────────────┐
│WebSocketChatController│
│ /chat.sendMessage│
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  ChatService    │
│ - Validate      │
│ - Store Message │
│ - Broadcast     │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ All Connected   │
│ Users Receive   │
│ Message         │
└─────────────────┘
```

### 2. Notification System
```
System Event
        │
        ▼
┌─────────────────┐
│NotificationService│
│ - Create Notif  │
│ - Determine     │
│   Recipients    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ WebSocket       │
│ Broadcasting    │
│ - Real-time     │
│ - Push to UI    │
└─────────────────┘
```

## 📁 File Management Flow

### 1. Assignment File Upload
```
Teacher Uploads File
        │
        ▼
┌─────────────────┐
│AssignmentController│
│ /api/assignments │
│ (MultipartFile) │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  FileService    │
│ - Validate Type │
│ - Generate Name │
│ - Save to Disk  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ File Storage    │
│ uploads/        │
│ assignments/    │
└─────────────────┘
```

## 🔄 Data Flow Patterns

### 1. Request-Response Flow
```
Client Request
        │
        ▼
┌─────────────────┐
│  Controller     │
│  - Validate     │
│  - Authorize    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Service Layer  │
│  - Business     │
│    Logic        │
│  - Data         │
│    Processing   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Repository     │
│  - Database     │
│    Operations   │
│  - Query        │
│    Execution    │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Response       │
│  - DTO Mapping  │
│  - JSON         │
│    Serialization│
└─────────────────┘
```

### 2. Session Management Flow
```
User Login
        │
        ▼
┌─────────────────┐
│ SessionService  │
│ - Create Session│
│ - Set Expiry    │
│ - Store in DB   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Every Request   │
│ - Validate      │
│ - Update        │
│   Activity      │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Scheduled       │
│ Cleanup         │
│ - Remove        │
│   Expired       │
└─────────────────┘
```

## 🎯 Key API Endpoints Flow

### 1. Authentication APIs
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/verify-otp
```

### 2. Admin APIs
```
POST /api/admin/add-student
POST /api/admin/add-teacher
POST /api/admin/add-parent
GET  /api/admin/students
GET  /api/admin/teachers
GET  /api/admin/parents
DELETE /api/admin/user/{id}
```

### 3. Teacher APIs
```
POST /api/teacher/attendance
POST /api/teacher/grades
POST /api/teacher/assignments
PUT  /api/teacher/leave-requests/{id}
```

### 4. Student APIs
```
GET  /api/student/assignments
POST /api/student/assignments/{id}/submit
GET  /api/student/grades
POST /api/student/leave-requests
```

### 5. Communication APIs
```
GET  /api/chat/rooms
POST /api/chat/messages
GET  /api/forum/categories
POST /api/forum/threads
```

## 🔧 Configuration Flow

### 1. Application Startup
```
Spring Boot Application
        │
        ▼
┌─────────────────┐
│ DataInitializer │
│ - Create Sample │
│   Data          │
│ - Setup Users   │
│ - Create        │
│   Relationships │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ SecurityConfig  │
│ - JWT Setup     │
│ - CORS Config   │
│ - Role Mapping  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ WebSocketConfig │
│ - STOMP Setup   │
│ - Message       │
│   Broker        │
└─────────────────┘
```

## 📊 Database Schema Flow

### 1. Core Entities
```
User (Base Entity)
├── Student
├── Teacher
├── Parent
└── Admin

Related Entities:
├── Attendance
├── Grade
├── Assignment
├── AssignmentSubmission
├── LeaveRequest
├── Exam
├── ExamQuestion
├── ExamAttempt
├── ExamAnswer
├── ChatMessage
├── ChatRoom
├── ForumThread
├── ForumReply
├── Notification
└── Session
```

## 🚀 Deployment Flow

### 1. Development Setup
```
1. Clone Repository
2. Setup MySQL Database
3. Configure application.properties
4. Run: mvn spring-boot:run
5. Access: http://localhost:8081
6. Swagger UI: http://localhost:8081/swagger-ui.html
```

### 2. Production Deployment
```
1. Build: mvn clean package
2. Configure Production DB
3. Set Environment Variables
4. Deploy JAR File
5. Configure Reverse Proxy
6. Setup SSL Certificate
```

## 🔍 Monitoring & Logging Flow

### 1. Application Monitoring
```
Request → Controller → Service → Repository
    │         │          │          │
    ▼         ▼          ▼          ▼
┌─────────────────────────────────────────┐
│           Logging System                │
│ - Request/Response Logs                 │
│ - Error Tracking                        │
│ - Performance Metrics                   │
│ - Security Events                       │
└─────────────────────────────────────────┘
```

## 🎯 Key Features Flow Summary

1. **User Management**: Registration, Authentication, Role-based Access
2. **Academic Management**: Assignments, Grades, Attendance, Exams
3. **Communication**: Real-time Chat, Forums, Notifications
4. **File Management**: Upload, Download, Storage
5. **Session Management**: JWT, Session Tracking, Security
6. **Real-time Features**: WebSocket, Live Updates
7. **Exam System**: MCQ Creation, Auto-grading, Results
8. **Leave Management**: Request, Approval Workflow
9. **Online Classes**: Scheduling, Room Management
10. **AI Chatbot**: Context-aware Assistance

This comprehensive flow documentation provides a complete overview of how the ePathshala system operates, from user authentication to real-time communication and academic management.
