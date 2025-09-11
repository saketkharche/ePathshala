# ePathshala - Comprehensive Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [Database Design](#database-design)
6. [API Documentation](#api-documentation)
7. [Flow Diagrams](#flow-diagrams)
8. [Interview Project Explanation](#interview-project-explanation)

---

## Project Overview

**ePathshala** is a comprehensive Educational Management System built with modern web technologies. It provides a complete solution for managing educational institutions with features for students, teachers, parents, and administrators.

### Key Features
- **Multi-role Authentication System** (Admin, Student, Teacher, Parent)
- **Real-time Communication** (Chat, WebSocket, Notifications)
- **Online Classes** (Jitsi Meet Integration)
- **Exam Management** (MCQ-based exams with auto-grading)
- **Assignment Management** (File uploads, submissions, grading)
- **Attendance Tracking**
- **Grade Management**
- **Leave Management System**
- **Academic Calendar**
- **Discussion Forums**
- **AI Chatbot Support**

### Technology Stack
- **Backend**: Spring Boot 2.7.18, Java 17, MySQL 8.0
- **Frontend**: React 18, Vite, Material-UI
- **Security**: JWT Authentication, Spring Security
- **Real-time**: WebSocket, STOMP
- **Video Conferencing**: Jitsi Meet
- **Documentation**: Swagger/OpenAPI

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile App]
    end
    
    subgraph "Frontend Layer"
        C[React Application]
        D[Material-UI Components]
        E[Vite Build System]
    end
    
    subgraph "Backend Layer"
        F[Spring Boot API]
        G[Spring Security]
        H[JWT Authentication]
        I[WebSocket Server]
    end
    
    subgraph "Service Layer"
        J[Auth Service]
        K[User Management]
        L[Exam Service]
        M[Assignment Service]
        N[Chat Service]
        O[Notification Service]
    end
    
    subgraph "Data Layer"
        P[MySQL Database]
        Q[File Storage]
        R[Session Storage]
    end
    
    subgraph "External Services"
        S[Jitsi Meet API]
        T[Email Service]
        U[AI Chatbot]
    end
    
    A --> C
    B --> C
    C --> F
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
    F --> L
    F --> M
    F --> N
    F --> O
    J --> P
    K --> P
    L --> P
    M --> P
    N --> P
    O --> P
    M --> Q
    F --> R
    C --> S
    F --> T
    F --> U
```

### Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A[Authentication]
        B[Dashboard]
        C[User Management]
        D[Exam System]
        E[Assignment System]
        F[Chat System]
        G[Online Classes]
        H[Calendar]
        I[Notifications]
    end
    
    subgraph "Backend Services"
        J[AuthController]
        K[AdminController]
        L[StudentController]
        M[TeacherController]
        N[ParentController]
        O[ExamController]
        P[AssignmentController]
        Q[ChatController]
        R[OnlineClassController]
    end
    
    A --> J
    B --> K
    C --> K
    D --> O
    E --> P
    F --> Q
    G --> R
    H --> K
    I --> Q
```

---

## Backend Documentation

### Backend Architecture

```mermaid
graph TB
    subgraph "Controller Layer"
        A[AuthController]
        B[AdminController]
        C[StudentController]
        D[TeacherController]
        E[ParentController]
        F[ExamController]
        G[AssignmentController]
        H[ChatController]
        I[OnlineClassController]
        J[NotificationController]
    end
    
    subgraph "Service Layer"
        K[AuthService]
        L[AdminService]
        M[StudentService]
        N[TeacherService]
        O[ParentService]
        P[ExamService]
        Q[AssignmentService]
        R[ChatService]
        S[OnlineClassService]
        T[NotificationService]
    end
    
    subgraph "Repository Layer"
        U[UserRepository]
        V[StudentRepository]
        W[TeacherRepository]
        X[ParentRepository]
        Y[ExamRepository]
        Z[AssignmentRepository]
        AA[ChatRepository]
        BB[OnlineClassRepository]
        CC[NotificationRepository]
    end
    
    subgraph "Entity Layer"
        DD[User Entity]
        EE[Student Entity]
        FF[Teacher Entity]
        GG[Parent Entity]
        HH[Exam Entity]
        II[Assignment Entity]
        JJ[Chat Entity]
        KK[OnlineClass Entity]
        LL[Notification Entity]
    end
    
    A --> K
    B --> L
    C --> M
    D --> N
    E --> O
    F --> P
    G --> Q
    H --> R
    I --> S
    J --> T
    
    K --> U
    L --> U
    M --> V
    N --> W
    O --> X
    P --> Y
    Q --> Z
    R --> AA
    S --> BB
    T --> CC
    
    U --> DD
    V --> EE
    W --> FF
    X --> GG
    Y --> HH
    Z --> II
    AA --> JJ
    BB --> KK
    CC --> LL
```

### Backend Package Structure

```
com.epathshala/
├── config/                    # Configuration classes
│   ├── SecurityConfig.java    # Spring Security configuration
│   ├── WebSocketConfig.java   # WebSocket configuration
│   ├── SwaggerConfig.java     # API documentation
│   └── WebConfig.java         # Web configuration
├── controller/                # REST Controllers
│   ├── AuthController.java    # Authentication endpoints
│   ├── AdminController.java   # Admin operations
│   ├── StudentController.java # Student operations
│   ├── TeacherController.java # Teacher operations
│   ├── ParentController.java  # Parent operations
│   ├── ExamController.java    # Exam management
│   ├── AssignmentController.java # Assignment management
│   ├── ChatController.java    # Chat functionality
│   └── OnlineClassController.java # Online classes
├── service/                   # Business logic layer
│   ├── AuthService.java       # Authentication logic
│   ├── AdminService.java      # Admin operations
│   ├── StudentService.java    # Student operations
│   ├── TeacherService.java    # Teacher operations
│   ├── ParentService.java     # Parent operations
│   ├── ExamService.java       # Exam logic
│   ├── AssignmentService.java # Assignment logic
│   ├── ChatService.java       # Chat logic
│   └── OnlineClassService.java # Online class logic
├── repository/                # Data access layer
│   ├── UserRepository.java    # User data access
│   ├── StudentRepository.java # Student data access
│   ├── TeacherRepository.java # Teacher data access
│   ├── ParentRepository.java  # Parent data access
│   ├── ExamRepository.java    # Exam data access
│   ├── AssignmentRepository.java # Assignment data access
│   ├── ChatRepository.java    # Chat data access
│   └── OnlineClassRepository.java # Online class data access
├── entity/                    # JPA entities
│   ├── User.java              # Base user entity
│   ├── Student.java           # Student entity
│   ├── Teacher.java           # Teacher entity
│   ├── Parent.java            # Parent entity
│   ├── Exam.java              # Exam entity
│   ├── Assignment.java        # Assignment entity
│   ├── ChatMessage.java       # Chat message entity
│   └── OnlineClass.java       # Online class entity
├── dto/                       # Data transfer objects
│   ├── LoginRequest.java      # Login DTO
│   ├── UserDTO.java           # User DTO
│   ├── ExamDTO.java           # Exam DTO
│   ├── AssignmentDTO.java     # Assignment DTO
│   └── ChatMessageDTO.java    # Chat message DTO
├── security/                  # Security components
│   ├── JwtUtil.java           # JWT utilities
│   ├── JwtFilter.java         # JWT filter
│   └── CustomUserDetailsService.java # User details service
└── util/                      # Utility classes
    ├── FileUtil.java          # File operations
    └── EmailUtil.java         # Email operations
```

### Backend Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant Service
    participant Repository
    participant Database
    
    Client->>Controller: HTTP Request
    Controller->>Controller: Validate Request
    Controller->>Service: Call Business Logic
    Service->>Repository: Data Access
    Repository->>Database: SQL Query
    Database-->>Repository: Result Set
    Repository-->>Service: Entity Objects
    Service-->>Controller: Processed Data
    Controller-->>Client: HTTP Response
```

---

## Frontend Documentation

### Frontend Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[Pages]
        B[Components]
        C[Layouts]
    end
    
    subgraph "State Management"
        D[React Hooks]
        E[Context API]
        F[Local Storage]
    end
    
    subgraph "API Layer"
        G[API Services]
        H[HTTP Client]
        I[WebSocket Client]
    end
    
    subgraph "UI Framework"
        J[Material-UI]
        K[Custom Components]
        L[Theme System]
    end
    
    subgraph "Routing"
        M[React Router]
        N[Protected Routes]
        O[Navigation Guards]
    end
    
    A --> B
    A --> C
    B --> D
    B --> E
    B --> F
    A --> G
    G --> H
    G --> I
    B --> J
    B --> K
    J --> L
    A --> M
    M --> N
    N --> O
```

### Frontend Component Structure

```
src/
├── components/                # Reusable components
│   ├── common/               # Common components
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Sidebar.jsx       # Sidebar navigation
│   │   ├── Logo.jsx          # Application logo
│   │   ├── Notifications.jsx # Notification system
│   │   └── Chatbot.jsx       # AI chatbot
│   ├── layout/               # Layout components
│   │   ├── DashboardLayout.jsx # Main dashboard layout
│   │   ├── AdminDashboardLayout.jsx # Admin layout
│   │   ├── StudentDashboardLayout.jsx # Student layout
│   │   ├── TeacherDashboardLayout.jsx # Teacher layout
│   │   └── ParentDashboardLayout.jsx # Parent layout
│   ├── auth/                 # Authentication components
│   │   ├── LoginForm.jsx     # Login form
│   │   └── ForgotPassword.jsx # Password reset
│   ├── dashboard/            # Dashboard components
│   │   ├── StudentOverview.jsx # Student dashboard
│   │   ├── TeacherOverview.jsx # Teacher dashboard
│   │   └── ParentOverview.jsx # Parent dashboard
│   ├── exam/                 # Exam components
│   │   ├── ExamCard.jsx      # Exam display
│   │   ├── MCQExamInterface.jsx # MCQ interface
│   │   └── ExamResultVisualization.jsx # Results
│   ├── assignment/           # Assignment components
│   │   ├── AssignmentCard.jsx # Assignment display
│   │   └── AssignmentSubmission.jsx # Submission form
│   ├── chat/                 # Chat components
│   │   ├── Chat.jsx          # Main chat interface
│   │   ├── ChatMessages.jsx  # Message display
│   │   └── ChatInput.jsx     # Message input
│   └── ui/                   # UI components
│       ├── LoadingSpinner.jsx # Loading indicator
│       ├── ErrorMessage.jsx  # Error display
│       └── EmptyState.jsx    # Empty state
├── pages/                    # Page components
│   ├── auth/                 # Authentication pages
│   │   ├── LoginPage.jsx     # Login page
│   │   └── ForgotPassword.jsx # Password reset page
│   ├── dashboard/            # Dashboard pages
│   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   ├── StudentDashboard.jsx # Student dashboard
│   │   ├── TeacherDashboard.jsx # Teacher dashboard
│   │   └── ParentDashboard.jsx # Parent dashboard
│   ├── HomePage.jsx          # Home page
│   ├── AboutUs.jsx           # About page
│   └── ContactUs.jsx         # Contact page
├── api/                      # API service layer
│   ├── auth.jsx              # Authentication API
│   ├── admin.jsx             # Admin API
│   ├── student.jsx           # Student API
│   ├── teacher.jsx           # Teacher API
│   ├── parent.jsx            # Parent API
│   ├── exams.jsx             # Exam API
│   ├── assignments.jsx       # Assignment API
│   └── notifications.jsx     # Notification API
├── hooks/                    # Custom React hooks
│   └── useApi.js             # API hook
├── utils/                    # Utility functions
│   ├── auth.jsx              # Authentication utilities
│   ├── validation.js         # Form validation
│   └── responsive.js         # Responsive utilities
├── theme/                    # Theme configuration
│   └── theme.js              # Material-UI theme
└── routes/                   # Routing configuration
    └── AppRoutes.jsx         # Main routing
```

### Frontend Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant ReactApp
    participant API
    participant Backend
    participant Database
    
    User->>ReactApp: User Interaction
    ReactApp->>ReactApp: State Update
    ReactApp->>API: API Call
    API->>Backend: HTTP Request
    Backend->>Database: Query
    Database-->>Backend: Data
    Backend-->>API: Response
    API-->>ReactApp: Data
    ReactApp->>ReactApp: Re-render
    ReactApp-->>User: Updated UI
```

---

## Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        Long id PK
        String username
        String email
        String password
        String role
        Boolean active
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    STUDENT {
        Long id PK
        Long userId FK
        String studentId
        String firstName
        String lastName
        String className
        String section
        String parentEmail
        Timestamp createdAt
    }
    
    TEACHER {
        Long id PK
        Long userId FK
        String teacherId
        String firstName
        String lastName
        String subject
        String department
        Timestamp createdAt
    }
    
    PARENT {
        Long id PK
        Long userId FK
        String parentId
        String firstName
        String lastName
        String phoneNumber
        Timestamp createdAt
    }
    
    EXAM {
        Long id PK
        String title
        String description
        String className
        String subject
        Integer duration
        Integer totalMarks
        Timestamp startTime
        Timestamp endTime
        Boolean isActive
        Long createdBy FK
    }
    
    EXAM_QUESTION {
        Long id PK
        Long examId FK
        String question
        String optionA
        String optionB
        String optionC
        String optionD
        String correctAnswer
        Integer marks
    }
    
    EXAM_ATTEMPT {
        Long id PK
        Long examId FK
        Long studentId FK
        Timestamp startTime
        Timestamp endTime
        Integer score
        Boolean isCompleted
    }
    
    EXAM_ANSWER {
        Long id PK
        Long attemptId FK
        Long questionId FK
        String selectedAnswer
        Boolean isCorrect
    }
    
    ASSIGNMENT {
        Long id PK
        String title
        String description
        String className
        String subject
        String fileName
        String filePath
        Timestamp dueDate
        Integer totalMarks
        Long createdBy FK
        Timestamp createdAt
    }
    
    ASSIGNMENT_SUBMISSION {
        Long id PK
        Long assignmentId FK
        Long studentId FK
        String fileName
        String filePath
        Timestamp submittedAt
        Integer marks
        String feedback
        Boolean isGraded
    }
    
    ATTENDANCE {
        Long id PK
        Long studentId FK
        String className
        String subject
        Date date
        Boolean isPresent
        String remarks
        Long markedBy FK
    }
    
    GRADE {
        Long id PK
        Long studentId FK
        String className
        String subject
        String examType
        Integer marks
        String grade
        Timestamp createdAt
        Long createdBy FK
    }
    
    LEAVE_REQUEST {
        Long id PK
        Long studentId FK
        String reason
        Date startDate
        Date endDate
        String status
        String parentApproval
        String teacherApproval
        Timestamp createdAt
    }
    
    ONLINE_CLASS {
        Long id PK
        String title
        String description
        String className
        String subject
        String meetingId
        String meetingUrl
        Timestamp scheduledTime
        Integer duration
        Long createdBy FK
        Boolean isActive
    }
    
    CHAT_MESSAGE {
        Long id PK
        Long senderId FK
        Long receiverId FK
        String message
        String messageType
        Timestamp timestamp
        Boolean isRead
    }
    
    CHAT_ROOM {
        Long id PK
        String roomName
        String roomType
        Timestamp createdAt
        Long createdBy FK
    }
    
    NOTIFICATION {
        Long id PK
        Long userId FK
        String title
        String message
        String type
        Boolean isRead
        Timestamp createdAt
    }
    
    ACADEMIC_CALENDAR {
        Long id PK
        String title
        String description
        Date eventDate
        String eventType
        String className
        Timestamp createdAt
        Long createdBy FK
    }
    
    USER ||--o{ STUDENT : "has"
    USER ||--o{ TEACHER : "has"
    USER ||--o{ PARENT : "has"
    USER ||--o{ EXAM : "creates"
    USER ||--o{ ASSIGNMENT : "creates"
    USER ||--o{ ONLINE_CLASS : "creates"
    USER ||--o{ ATTENDANCE : "marks"
    USER ||--o{ GRADE : "creates"
    USER ||--o{ CHAT_MESSAGE : "sends"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ ACADEMIC_CALENDAR : "creates"
    
    EXAM ||--o{ EXAM_QUESTION : "contains"
    EXAM ||--o{ EXAM_ATTEMPT : "has"
    EXAM_ATTEMPT ||--o{ EXAM_ANSWER : "contains"
    EXAM_ATTEMPT }o--|| STUDENT : "attempted_by"
    EXAM_QUESTION ||--o{ EXAM_ANSWER : "answered_in"
    
    ASSIGNMENT ||--o{ ASSIGNMENT_SUBMISSION : "has"
    ASSIGNMENT_SUBMISSION }o--|| STUDENT : "submitted_by"
    
    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ GRADE : "receives"
    STUDENT ||--o{ LEAVE_REQUEST : "submits"
    STUDENT ||--o{ EXAM_ATTEMPT : "attempts"
    STUDENT ||--o{ ASSIGNMENT_SUBMISSION : "submits"
    
    CHAT_ROOM ||--o{ CHAT_MESSAGE : "contains"
```

### Database Schema Overview

```mermaid
graph TB
    subgraph "User Management"
        A[User Table]
        B[Student Table]
        C[Teacher Table]
        D[Parent Table]
    end
    
    subgraph "Academic Management"
        E[Exam Tables]
        F[Assignment Tables]
        G[Attendance Table]
        H[Grade Table]
        I[Leave Request Table]
    end
    
    subgraph "Communication"
        J[Chat Tables]
        K[Notification Table]
        L[Online Class Table]
    end
    
    subgraph "Administrative"
        M[Academic Calendar Table]
        N[Session Table]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    A --> K
    A --> L
    A --> M
    A --> N
```

---

## API Documentation

### API Architecture

```mermaid
graph TB
    subgraph "Authentication APIs"
        A[POST /api/auth/login]
        B[POST /api/auth/forgot-password]
        C[POST /api/auth/reset-password]
        D[POST /api/auth/verify-otp]
    end
    
    subgraph "Admin APIs"
        E[GET /api/admin/dashboard]
        F[POST /api/admin/students]
        G[POST /api/admin/teachers]
        H[POST /api/admin/parents]
        I[GET /api/admin/users]
        J[PUT /api/admin/users/{id}]
        K[DELETE /api/admin/users/{id}]
    end
    
    subgraph "Student APIs"
        L[GET /api/student/dashboard]
        M[GET /api/student/exams]
        N[POST /api/student/exams/{id}/attempt]
        O[GET /api/student/assignments]
        P[POST /api/student/assignments/{id}/submit]
        Q[GET /api/student/grades]
        R[GET /api/student/attendance]
    end
    
    subgraph "Teacher APIs"
        S[GET /api/teacher/dashboard]
        T[POST /api/teacher/exams]
        U[GET /api/teacher/exams]
        V[POST /api/teacher/assignments]
        W[GET /api/teacher/assignments]
        X[POST /api/teacher/attendance]
        Y[GET /api/teacher/attendance]
        Z[POST /api/teacher/grades]
    end
    
    subgraph "Parent APIs"
        AA[GET /api/parent/dashboard]
        BB[GET /api/parent/child-progress]
        CC[GET /api/parent/child-attendance]
        DD[GET /api/parent/child-grades]
        EE[POST /api/parent/leave-approval]
    end
    
    subgraph "Communication APIs"
        FF[GET /api/chat/messages]
        GG[POST /api/chat/send]
        HH[GET /api/notifications]
        II[PUT /api/notifications/{id}/read]
        JJ[GET /api/online-classes]
        KK[POST /api/online-classes]
    end
```

### API Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Auth Service
    participant Business Service
    participant Database
    
    Client->>API Gateway: Request with JWT Token
    API Gateway->>Auth Service: Validate Token
    Auth Service-->>API Gateway: Token Valid/Invalid
    alt Token Valid
        API Gateway->>Business Service: Process Request
        Business Service->>Database: Query Data
        Database-->>Business Service: Return Data
        Business Service-->>API Gateway: Processed Response
        API Gateway-->>Client: Success Response
    else Token Invalid
        API Gateway-->>Client: 401 Unauthorized
    end
```

---

## Flow Diagrams

### User Authentication Flow

```mermaid
flowchart TD
    A[User Access] --> B{Authenticated?}
    B -->|No| C[Login Page]
    B -->|Yes| D[Dashboard]
    
    C --> E[Enter Credentials]
    E --> F[Submit Login]
    F --> G{Valid Credentials?}
    G -->|No| H[Show Error]
    G -->|Yes| I[Generate JWT Token]
    I --> J[Store Token]
    J --> K[Redirect to Dashboard]
    
    H --> E
    K --> D
    
    D --> L{Token Expired?}
    L -->|Yes| M[Redirect to Login]
    L -->|No| N[Continue Session]
    
    M --> C
```

### Exam Management Flow

```mermaid
flowchart TD
    A[Teacher Creates Exam] --> B[Set Exam Details]
    B --> C[Add Questions]
    C --> D[Set Time & Duration]
    D --> E[Publish Exam]
    
    E --> F[Students See Exam]
    F --> G{Exam Active?}
    G -->|Yes| H[Student Attempts Exam]
    G -->|No| I[Exam Not Available]
    
    H --> J[Answer Questions]
    J --> K[Submit Exam]
    K --> L[Auto-Grade]
    L --> M[Store Results]
    
    M --> N[Teacher Views Results]
    N --> O[Student Views Results]
    
    I --> P[Wait for Exam Time]
    P --> F
```

### Assignment Management Flow

```mermaid
flowchart TD
    A[Teacher Creates Assignment] --> B[Upload Assignment File]
    B --> C[Set Due Date]
    C --> D[Assign to Classes]
    D --> E[Publish Assignment]
    
    E --> F[Students Receive Notification]
    F --> G[Student Downloads Assignment]
    G --> H[Student Completes Work]
    H --> I[Student Uploads Submission]
    I --> J[Teacher Receives Notification]
    
    J --> K[Teacher Reviews Submission]
    K --> L[Teacher Grades Assignment]
    L --> M[Student Receives Grade]
    
    M --> N[Student Views Feedback]
```

### Real-time Chat Flow

```mermaid
sequenceDiagram
    participant Student
    participant Teacher
    participant WebSocket
    participant Database
    
    Student->>WebSocket: Connect to Chat
    Teacher->>WebSocket: Connect to Chat
    
    Student->>WebSocket: Send Message
    WebSocket->>Database: Store Message
    WebSocket->>Teacher: Broadcast Message
    
    Teacher->>WebSocket: Send Reply
    WebSocket->>Database: Store Reply
    WebSocket->>Student: Broadcast Reply
    
    Note over WebSocket: Real-time bidirectional communication
```

---

## Interview Project Explanation

### Project Overview for Interview

```mermaid
mindmap
  root((ePathshala))
    Backend
      Spring Boot
        REST APIs
        JWT Security
        WebSocket
      Database
        MySQL
        JPA/Hibernate
        Entity Relationships
      Features
        Multi-role Auth
        Exam System
        Assignment Management
        Real-time Chat
        Online Classes
    Frontend
      React
        Material-UI
        Vite Build
        Responsive Design
      Features
        Role-based Dashboards
        Real-time Updates
        File Upload/Download
        Video Conferencing
        AI Chatbot
    Key Technologies
      Authentication
        JWT Tokens
        Role-based Access
        Session Management
      Real-time Features
        WebSocket
        STOMP Protocol
        Live Notifications
      External Integrations
        Jitsi Meet
        Email Service
        AI Chatbot
      Database Design
        Normalized Schema
        Foreign Key Relationships
        Indexing Strategy
```

### System Architecture for Interview

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[React Frontend]
        B[Material-UI Components]
        C[Responsive Design]
    end
    
    subgraph "API Layer"
        D[REST Controllers]
        E[JWT Authentication]
        F[WebSocket Handlers]
    end
    
    subgraph "Business Logic"
        G[Service Layer]
        H[Validation Logic]
        I[Business Rules]
    end
    
    subgraph "Data Access"
        J[Repository Layer]
        K[JPA Entities]
        L[Database Queries]
    end
    
    subgraph "External Services"
        M[Jitsi Meet API]
        N[Email Service]
        O[AI Chatbot]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    D --> G
    G --> H
    G --> I
    G --> J
    J --> K
    J --> L
    G --> M
    G --> N
    G --> O
```

### Key Features Demonstration

```mermaid
graph LR
    subgraph "Authentication System"
        A[Multi-role Login]
        B[JWT Token Management]
        C[Session Handling]
    end
    
    subgraph "Academic Management"
        D[Exam Creation & Taking]
        E[Assignment Management]
        F[Grade Tracking]
        G[Attendance System]
    end
    
    subgraph "Communication"
        H[Real-time Chat]
        I[Online Classes]
        J[Notifications]
        K[Discussion Forums]
    end
    
    subgraph "Administrative"
        L[User Management]
        M[Academic Calendar]
        N[Leave Management]
        O[Reports & Analytics]
    end
    
    A --> D
    B --> E
    C --> F
    D --> H
    E --> I
    F --> J
    G --> K
    H --> L
    I --> M
    J --> N
    K --> O
```

### Technical Implementation Highlights

```mermaid
graph TB
    subgraph "Security Implementation"
        A[JWT Authentication]
        B[Role-based Authorization]
        C[Password Encryption]
        D[Session Management]
    end
    
    subgraph "Real-time Features"
        E[WebSocket Implementation]
        F[STOMP Protocol]
        G[Live Notifications]
        H[Real-time Chat]
    end
    
    subgraph "File Management"
        I[File Upload/Download]
        J[Assignment Submissions]
        K[Document Storage]
        L[File Validation]
    end
    
    subgraph "Database Optimization"
        M[Entity Relationships]
        N[Query Optimization]
        O[Indexing Strategy]
        P[Data Validation]
    end
    
    A --> E
    B --> F
    C --> G
    D --> H
    E --> I
    F --> J
    G --> K
    H --> L
    I --> M
    J --> N
    K --> O
    L --> P
```

---

## ASCII Diagrams

### System Architecture (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│                    ePathshala System                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   React     │    │   Spring    │    │   MySQL     │     │
│  │  Frontend   │◄──►│    Boot     │◄──►│  Database   │     │
│  │             │    │   Backend   │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │          │
│         │                   │                   │          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Material-UI │    │   JWT       │    │   File      │     │
│  │ Components  │    │   Security  │    │  Storage    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  WebSocket  │    │   Jitsi     │    │   Email     │     │
│  │   Server    │    │    Meet     │    │  Service    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### User Flow (ASCII)

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Login     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Features  │
│             │
│ • Exams     │
│ • Assignments│
│ • Chat      │
│ • Classes   │
└─────────────┘
```

### Database Schema (ASCII)

```
┌─────────────┐
│    USER     │
│             │
│ • id        │
│ • username  │
│ • email     │
│ • password  │
│ • role      │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│   STUDENT   │
│             │
│ • id        │
│ • userId    │
│ • firstName │
│ • lastName  │
│ • className │
└─────────────┘

┌─────────────┐
│    EXAM     │
│             │
│ • id        │
│ • title     │
│ • className │
│ • duration  │
│ • createdBy │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│EXAM_QUESTION│
│             │
│ • id        │
│ • examId    │
│ • question  │
│ • options   │
│ • correct   │
└─────────────┘
```

---

## Markmap Structure

```markmap
# ePathshala Project Structure

## Backend (Spring Boot)
### Controllers
- AuthController
- AdminController
- StudentController
- TeacherController
- ParentController
- ExamController
- AssignmentController
- ChatController
- OnlineClassController

### Services
- AuthService
- AdminService
- StudentService
- TeacherService
- ParentService
- ExamService
- AssignmentService
- ChatService
- OnlineClassService

### Entities
- User
- Student
- Teacher
- Parent
- Exam
- Assignment
- ChatMessage
- OnlineClass
- Notification

### Security
- JWT Authentication
- Role-based Authorization
- Password Encryption
- Session Management

## Frontend (React)
### Components
- Authentication
- Dashboard
- User Management
- Exam System
- Assignment System
- Chat System
- Online Classes
- Notifications

### Pages
- Login/Register
- Admin Dashboard
- Student Dashboard
- Teacher Dashboard
- Parent Dashboard
- Exam Interface
- Assignment Interface
- Chat Interface

### Features
- Material-UI Design
- Responsive Layout
- Real-time Updates
- File Upload/Download
- Video Conferencing
- AI Chatbot

## Database (MySQL)
### Tables
- User Management
- Academic Records
- Communication
- File Storage
- Session Management

## External Integrations
- Jitsi Meet
- Email Service
- AI Chatbot
- File Storage
```

---

## Conclusion

This comprehensive documentation provides a complete overview of the ePathshala Educational Management System. The project demonstrates modern full-stack development practices with:

- **Robust Backend Architecture** using Spring Boot with proper separation of concerns
- **Modern Frontend** built with React and Material-UI
- **Secure Authentication** using JWT tokens and role-based access control
- **Real-time Features** implemented with WebSocket technology
- **Comprehensive Database Design** with proper relationships and normalization
- **External Integrations** for enhanced functionality

The system is designed to be scalable, maintainable, and user-friendly, making it an excellent example of a modern educational management platform.

---

*This documentation serves as a complete reference for understanding, maintaining, and extending the ePathshala system.*
