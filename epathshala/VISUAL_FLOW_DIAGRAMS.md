# ePathshala Visual Flow Diagrams

## 🔐 Authentication Flow

```
┌─────────────────┐
│   User Login    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ AuthController  │
│ /api/auth/login │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  AuthService    │
│ • Validate      │
│ • Generate JWT  │
│ • Create Session│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  JWT Token +    │
│  User Details   │
└─────────────────┘
```

## 📚 Assignment Management Flow

```
┌─────────────────┐
│ Teacher Creates │
│ Assignment      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│AssignmentController│
│ /api/assignments │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ AssignmentService│
│ • Save File     │
│ • Create Record │
│ • Notify Students│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Student Views   │
│ Assignment      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Student         │
│ Submits Work    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Teacher Grades  │
│ Submission      │
└─────────────────┘
```

## 🎯 Exam System Flow

```
┌─────────────────┐
│ Faculty Creates │
│ MCQ Exam        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│FacultyExamController│
│ /api/faculty/   │
│ exams           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  ExamService    │
│ • Create Exam   │
│ • Add Questions │
│ • Set Timer     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Student Takes   │
│ Exam            │
│ • Start Timer   │
│ • Answer Qs     │
│ • Auto Submit   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Auto Grading    │
│ • Calculate     │
│ • Generate      │
│ • Store Results │
└─────────────────┘
```

## 💬 Real-Time Chat Flow

```
┌─────────────────┐
│ User Sends      │
│ Message         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│WebSocketChatController│
│ /chat.sendMessage│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  ChatService    │
│ • Validate      │
│ • Store Message │
│ • Broadcast     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ All Connected   │
│ Users Receive   │
│ Message         │
└─────────────────┘
```

## 🔄 Request-Response Flow

```
┌─────────────────┐
│ Client Request  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Controller     │
│ • Validate      │
│ • Authorize     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Service Layer  │
│ • Business      │
│   Logic         │
│ • Data          │
│   Processing    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Repository     │
│ • Database      │
│   Operations    │
│ • Query         │
│   Execution     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Response       │
│ • DTO Mapping   │
│ • JSON          │
│   Serialization │
└─────────────────┘
```

## 🏗️ System Architecture

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
│   (Real-time)   │    │   (uploads/)    │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 👥 User Role Hierarchy

```
┌─────────────────┐
│   ADMIN         │
│ • User Mgmt     │
│ • System Config │
│ • All Access    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   TEACHER       │
│ • Class Mgmt    │
│ • Grade Entry   │
│ • Attendance    │
│ • Assignments   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   STUDENT       │
│ • View Grades   │
│ • Submit Work   │
│ • Take Exams    │
│ • Chat Access   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   PARENT        │
│ • Child Progress│
│ • Leave Approval│
│ • Notifications │
└─────────────────┘
```

## 📁 File Upload Flow

```
┌─────────────────┐
│ Teacher Uploads │
│ File            │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│AssignmentController│
│ (MultipartFile) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  FileService    │
│ • Validate Type │
│ • Generate Name │
│ • Save to Disk  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ File Storage    │
│ uploads/        │
│ assignments/    │
└─────────────────┘
```

## 🔐 Session Management Flow

```
┌─────────────────┐
│ User Login      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ SessionService  │
│ • Create Session│
│ • Set Expiry    │
│ • Store in DB   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Every Request   │
│ • Validate      │
│ • Update        │
│   Activity      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Scheduled       │
│ Cleanup         │
│ • Remove        │
│   Expired       │
└─────────────────┘
```

## 🎯 API Endpoint Categories

```
┌─────────────────┐
│ Authentication  │
│ /api/auth/*     │
└─────────────────┘

┌─────────────────┐
│ Admin APIs      │
│ /api/admin/*    │
└─────────────────┘

┌─────────────────┐
│ Teacher APIs    │
│ /api/teacher/*  │
└─────────────────┘

┌─────────────────┐
│ Student APIs    │
│ /api/student/*  │
└─────────────────┘

┌─────────────────┐
│ Communication   │
│ /api/chat/*     │
│ /api/forum/*    │
└─────────────────┘

┌─────────────────┐
│ Exam System     │
│ /api/faculty/   │
│ exams/*         │
└─────────────────┘
```

## 📊 Database Entity Relationships

```
User (Base Entity)
├── Student
│   ├── Attendance
│   ├── Grade
│   ├── AssignmentSubmission
│   ├── LeaveRequest
│   └── ExamAttempt
├── Teacher
│   ├── Assignment
│   ├── Grade
│   └── Attendance
├── Parent
└── Admin

Communication:
├── ChatMessage
├── ChatRoom
├── ForumThread
├── ForumReply
└── Notification

System:
├── Session
├── Otp
└── AcademicCalendar
```

## 🚀 Application Startup Flow

```
┌─────────────────┐
│ Spring Boot     │
│ Application     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ DataInitializer │
│ • Create Sample │
│   Data          │
│ • Setup Users   │
│ • Create        │
│   Relationships │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ SecurityConfig  │
│ • JWT Setup     │
│ • CORS Config   │
│ • Role Mapping  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ WebSocketConfig │
│ • STOMP Setup   │
│ • Message       │
│   Broker        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Application     │
│ Ready           │
└─────────────────┘
```

## 🔍 Monitoring & Logging

```
Request → Controller → Service → Repository
    │         │          │          │
    ▼         ▼          ▼          ▼
┌─────────────────────────────────────────┐
│           Logging System                │
│ • Request/Response Logs                 │
│ • Error Tracking                        │
│ • Performance Metrics                   │
│ • Security Events                       │
└─────────────────────────────────────────┘
```

## 🎯 Key Features Summary

```
┌─────────────────┐
│ User Management │
│ • Registration  │
│ • Authentication│
│ • Role-based    │
│   Access        │
└─────────────────┘

┌─────────────────┐
│ Academic Mgmt   │
│ • Assignments   │
│ • Grades        │
│ • Attendance    │
│ • Exams         │
└─────────────────┘

┌─────────────────┐
│ Communication   │
│ • Real-time Chat│
│ • Forums        │
│ • Notifications │
└─────────────────┘

┌─────────────────┐
│ File Management │
│ • Upload        │
│ • Download      │
│ • Storage       │
└─────────────────┘

┌─────────────────┐
│ Session Mgmt    │
│ • JWT Tokens    │
│ • Session       │
│   Tracking      │
│ • Security      │
└─────────────────┘
```

This visual representation provides a clear understanding of how the ePathshala system flows from user interactions to data processing and response generation.
