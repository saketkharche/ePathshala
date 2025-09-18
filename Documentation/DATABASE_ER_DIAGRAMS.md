# Database ER Diagrams - Multiple Formats

## 1. Complete Database Schema (Mermaid ERD)

```mermaid
erDiagram
    USER {
        Long id PK
        String username UK
        String email UK
        String password
        String role
        Boolean active
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    STUDENT {
        Long id PK
        Long userId FK
        String studentId UK
        String firstName
        String lastName
        String className
        String section
        String parentEmail
        String phoneNumber
        String address
        Date dateOfBirth
        String gender
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    TEACHER {
        Long id PK
        Long userId FK
        String teacherId UK
        String firstName
        String lastName
        String subject
        String department
        String qualification
        String experience
        String phoneNumber
        String email
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    PARENT {
        Long id PK
        Long userId FK
        String parentId UK
        String firstName
        String lastName
        String phoneNumber
        String email
        String occupation
        String address
        Timestamp createdAt
        Timestamp updatedAt
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
        Boolean isPublished
        Long createdBy FK
        Timestamp createdAt
        Timestamp updatedAt
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
        Integer questionOrder
        Timestamp createdAt
    }
    
    EXAM_ATTEMPT {
        Long id PK
        Long examId FK
        Long studentId FK
        Timestamp startTime
        Timestamp endTime
        Integer score
        Integer totalMarks
        Boolean isCompleted
        Boolean isSubmitted
        Timestamp createdAt
    }
    
    EXAM_ANSWER {
        Long id PK
        Long attemptId FK
        Long questionId FK
        String selectedAnswer
        Boolean isCorrect
        Timestamp answeredAt
    }
    
    ASSIGNMENT {
        Long id PK
        String title
        String description
        String className
        String subject
        String fileName
        String filePath
        String fileType
        Long fileSize
        Timestamp dueDate
        Integer totalMarks
        Boolean isActive
        Long createdBy FK
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    ASSIGNMENT_SUBMISSION {
        Long id PK
        Long assignmentId FK
        Long studentId FK
        String fileName
        String filePath
        String fileType
        Long fileSize
        Timestamp submittedAt
        Integer marks
        String feedback
        Boolean isGraded
        Timestamp gradedAt
        Long gradedBy FK
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
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    GRADE {
        Long id PK
        Long studentId FK
        String className
        String subject
        String examType
        Integer marks
        String grade
        String remarks
        Timestamp createdAt
        Long createdBy FK
        Timestamp updatedAt
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
        String adminApproval
        String rejectionReason
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    ONLINE_CLASS {
        Long id PK
        String title
        String description
        String className
        String subject
        String meetingId
        String meetingUrl
        String meetingPassword
        Timestamp scheduledTime
        Integer duration
        Boolean isActive
        Boolean isRecorded
        Long createdBy FK
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    CHAT_MESSAGE {
        Long id PK
        Long senderId FK
        Long receiverId FK
        Long roomId FK
        String message
        String messageType
        String fileName
        String filePath
        Timestamp timestamp
        Boolean isRead
        Boolean isDeleted
        Timestamp createdAt
    }
    
    CHAT_ROOM {
        Long id PK
        String roomName
        String roomType
        String description
        Boolean isActive
        Timestamp createdAt
        Long createdBy FK
        Timestamp updatedAt
    }
    
    NOTIFICATION {
        Long id PK
        Long userId FK
        String title
        String message
        String type
        String priority
        Boolean isRead
        String actionUrl
        Timestamp createdAt
        Timestamp readAt
    }
    
    ACADEMIC_CALENDAR {
        Long id PK
        String title
        String description
        Date eventDate
        String eventType
        String className
        String location
        Boolean isHoliday
        Timestamp createdAt
        Long createdBy FK
        Timestamp updatedAt
    }
    
    SESSION {
        Long id PK
        Long userId FK
        String sessionToken
        String ipAddress
        String userAgent
        Timestamp loginTime
        Timestamp lastActivity
        Boolean isActive
        Timestamp expiresAt
    }
    
    OTP {
        Long id PK
        String email
        String otpCode
        String purpose
        Boolean isUsed
        Timestamp createdAt
        Timestamp expiresAt
    }
    
    FORUM_CATEGORY {
        Long id PK
        String name
        String description
        String icon
        Boolean isActive
        Timestamp createdAt
        Long createdBy FK
    }
    
    FORUM_THREAD {
        Long id PK
        Long categoryId FK
        Long authorId FK
        String title
        String content
        Integer viewCount
        Integer replyCount
        Boolean isPinned
        Boolean isLocked
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    FORUM_REPLY {
        Long id PK
        Long threadId FK
        Long authorId FK
        String content
        Boolean isSolution
        Timestamp createdAt
        Timestamp updatedAt
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
    USER ||--o{ SESSION : "has"
    USER ||--o{ FORUM_THREAD : "creates"
    USER ||--o{ FORUM_REPLY : "creates"
    
    EXAM ||--o{ EXAM_QUESTION : "contains"
    EXAM ||--o{ EXAM_ATTEMPT : "has"
    EXAM_ATTEMPT ||--o{ EXAM_ANSWER : "contains"
    EXAM_ATTEMPT }o--|| STUDENT : "attempted_by"
    EXAM_QUESTION ||--o{ EXAM_ANSWER : "answered_in"
    
    ASSIGNMENT ||--o{ ASSIGNMENT_SUBMISSION : "has"
    ASSIGNMENT_SUBMISSION }o--|| STUDENT : "submitted_by"
    ASSIGNMENT_SUBMISSION }o--|| USER : "graded_by"
    
    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ GRADE : "receives"
    STUDENT ||--o{ LEAVE_REQUEST : "submits"
    STUDENT ||--o{ EXAM_ATTEMPT : "attempts"
    STUDENT ||--o{ ASSIGNMENT_SUBMISSION : "submits"
    
    CHAT_ROOM ||--o{ CHAT_MESSAGE : "contains"
    
    FORUM_CATEGORY ||--o{ FORUM_THREAD : "contains"
    FORUM_THREAD ||--o{ FORUM_REPLY : "contains"
```

## 2. User Management Schema (Mermaid)

```mermaid
erDiagram
    USER {
        Long id PK
        String username UK
        String email UK
        String password
        String role
        Boolean active
        Timestamp createdAt
        Timestamp updatedAt
    }
    
    STUDENT {
        Long id PK
        Long userId FK
        String studentId UK
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
        String teacherId UK
        String firstName
        String lastName
        String subject
        String department
        Timestamp createdAt
    }
    
    PARENT {
        Long id PK
        Long userId FK
        String parentId UK
        String firstName
        String lastName
        String phoneNumber
        Timestamp createdAt
    }
    
    SESSION {
        Long id PK
        Long userId FK
        String sessionToken
        String ipAddress
        Timestamp loginTime
        Timestamp lastActivity
        Boolean isActive
    }
    
    OTP {
        Long id PK
        String email
        String otpCode
        String purpose
        Boolean isUsed
        Timestamp createdAt
        Timestamp expiresAt
    }
    
    USER ||--o{ STUDENT : "has"
    USER ||--o{ TEACHER : "has"
    USER ||--o{ PARENT : "has"
    USER ||--o{ SESSION : "has"
    USER ||--o{ OTP : "generates"
```

## 3. Academic Management Schema (Mermaid)

```mermaid
erDiagram
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
        Long createdBy FK
    }
    
    EXAM ||--o{ EXAM_QUESTION : "contains"
    EXAM ||--o{ EXAM_ATTEMPT : "has"
    EXAM_ATTEMPT ||--o{ EXAM_ANSWER : "contains"
    EXAM_QUESTION ||--o{ EXAM_ANSWER : "answered_in"
    
    ASSIGNMENT ||--o{ ASSIGNMENT_SUBMISSION : "has"
    
    STUDENT ||--o{ EXAM_ATTEMPT : "attempts"
    STUDENT ||--o{ ASSIGNMENT_SUBMISSION : "submits"
    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ GRADE : "receives"
```

## 4. Communication Schema (Mermaid)

```mermaid
erDiagram
    CHAT_ROOM {
        Long id PK
        String roomName
        String roomType
        String description
        Boolean isActive
        Timestamp createdAt
        Long createdBy FK
    }
    
    CHAT_MESSAGE {
        Long id PK
        Long senderId FK
        Long receiverId FK
        Long roomId FK
        String message
        String messageType
        String fileName
        String filePath
        Timestamp timestamp
        Boolean isRead
    }
    
    NOTIFICATION {
        Long id PK
        Long userId FK
        String title
        String message
        String type
        String priority
        Boolean isRead
        String actionUrl
        Timestamp createdAt
    }
    
    FORUM_CATEGORY {
        Long id PK
        String name
        String description
        String icon
        Boolean isActive
        Timestamp createdAt
        Long createdBy FK
    }
    
    FORUM_THREAD {
        Long id PK
        Long categoryId FK
        Long authorId FK
        String title
        String content
        Integer viewCount
        Integer replyCount
        Boolean isPinned
        Boolean isLocked
        Timestamp createdAt
    }
    
    FORUM_REPLY {
        Long id PK
        Long threadId FK
        Long authorId FK
        String content
        Boolean isSolution
        Timestamp createdAt
    }
    
    CHAT_ROOM ||--o{ CHAT_MESSAGE : "contains"
    FORUM_CATEGORY ||--o{ FORUM_THREAD : "contains"
    FORUM_THREAD ||--o{ FORUM_REPLY : "contains"
    
    USER ||--o{ CHAT_MESSAGE : "sends"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ FORUM_THREAD : "creates"
    USER ||--o{ FORUM_REPLY : "creates"
```

## 5. Database Indexing Strategy (Mermaid)

```mermaid
graph TB
    subgraph "Primary Indexes"
        A[USER.id - Primary Key]
        B[STUDENT.id - Primary Key]
        C[TEACHER.id - Primary Key]
        D[PARENT.id - Primary Key]
        E[EXAM.id - Primary Key]
        F[ASSIGNMENT.id - Primary Key]
    end
    
    subgraph "Unique Indexes"
        G[USER.username - Unique]
        H[USER.email - Unique]
        I[STUDENT.studentId - Unique]
        J[TEACHER.teacherId - Unique]
        K[PARENT.parentId - Unique]
    end
    
    subgraph "Foreign Key Indexes"
        L[STUDENT.userId - FK Index]
        M[TEACHER.userId - FK Index]
        N[PARENT.userId - FK Index]
        O[EXAM.createdBy - FK Index]
        P[ASSIGNMENT.createdBy - FK Index]
    end
    
    subgraph "Performance Indexes"
        Q[EXAM.className - Composite]
        R[EXAM.subject - Composite]
        S[ATTENDANCE.studentId - Composite]
        T[ATTENDANCE.date - Composite]
        U[CHAT_MESSAGE.senderId - Composite]
        V[CHAT_MESSAGE.receiverId - Composite]
    end
    
    subgraph "Search Indexes"
        W[USER.role - Search]
        X[STUDENT.className - Search]
        Y[TEACHER.subject - Search]
        Z[EXAM.isActive - Search]
        AA[ASSIGNMENT.isActive - Search]
    end
```

## 6. Database Relationships (Mermaid)

```mermaid
graph TB
    subgraph "One-to-One Relationships"
        A[USER] --> B[STUDENT]
        A --> C[TEACHER]
        A --> D[PARENT]
    end
    
    subgraph "One-to-Many Relationships"
        E[USER] --> F[EXAM]
        E --> G[ASSIGNMENT]
        E --> H[ONLINE_CLASS]
        E --> I[CHAT_MESSAGE]
        E --> J[NOTIFICATION]
        E --> K[SESSION]
    end
    
    subgraph "Many-to-Many Relationships"
        L[EXAM] --> M[EXAM_QUESTION]
        N[EXAM_ATTEMPT] --> O[EXAM_ANSWER]
        P[ASSIGNMENT] --> Q[ASSIGNMENT_SUBMISSION]
        R[CHAT_ROOM] --> S[CHAT_MESSAGE]
        T[FORUM_CATEGORY] --> U[FORUM_THREAD]
        V[FORUM_THREAD] --> W[FORUM_REPLY]
    end
    
    subgraph "Self-Referencing Relationships"
        X[USER] --> Y[USER - Parent-Child]
        Z[FORUM_REPLY] --> AA[FORUM_REPLY - Reply to Reply]
    end
```

## 7. Database Constraints (Mermaid)

```mermaid
graph TB
    subgraph "Primary Key Constraints"
        A[USER.id - PK]
        B[STUDENT.id - PK]
        C[TEACHER.id - PK]
        D[PARENT.id - PK]
        E[EXAM.id - PK]
        F[ASSIGNMENT.id - PK]
    end
    
    subgraph "Foreign Key Constraints"
        G[STUDENT.userId → USER.id]
        H[TEACHER.userId → USER.id]
        I[PARENT.userId → USER.id]
        J[EXAM.createdBy → USER.id]
        K[ASSIGNMENT.createdBy → USER.id]
        L[EXAM_QUESTION.examId → EXAM.id]
        M[EXAM_ATTEMPT.examId → EXAM.id]
        N[EXAM_ATTEMPT.studentId → STUDENT.id]
    end
    
    subgraph "Unique Constraints"
        O[USER.username - Unique]
        P[USER.email - Unique]
        Q[STUDENT.studentId - Unique]
        R[TEACHER.teacherId - Unique]
        S[PARENT.parentId - Unique]
    end
    
    subgraph "Check Constraints"
        T[USER.role must be ADMIN, STUDENT, TEACHER, PARENT]
        U[EXAM.duration > 0]
        V[EXAM.totalMarks > 0]
        W[ASSIGNMENT.totalMarks > 0]
        X[ATTENDANCE.isPresent is true or false]
    end
    
    subgraph "Not Null Constraints"
        Y[USER.username - Not Null]
        Z[USER.email - Not Null]
        AA[USER.password - Not Null]
        BB[USER.role - Not Null]
        CC[STUDENT.firstName - Not Null]
        DD[STUDENT.lastName - Not Null]
        EE[TEACHER.firstName - Not Null]
        FF[TEACHER.lastName - Not Null]
    end

```

## 8. Database Triggers (Mermaid)

```mermaid
graph TD
    subgraph "Audit Triggers"
        A[USER_INSERT_TRIGGER]
        B[USER_UPDATE_TRIGGER]
        C[USER_DELETE_TRIGGER]
        D[EXAM_INSERT_TRIGGER]
        E[EXAM_UPDATE_TRIGGER]
        F[ASSIGNMENT_INSERT_TRIGGER]
        G[ASSIGNMENT_UPDATE_TRIGGER]
    end
    
    subgraph "Business Logic Triggers"
        H[EXAM_ATTEMPT_INSERT_TRIGGER]
        I[ASSIGNMENT_SUBMISSION_INSERT_TRIGGER]
        J[ATTENDANCE_INSERT_TRIGGER]
        K[GRADE_INSERT_TRIGGER]
        L[LEAVE_REQUEST_INSERT_TRIGGER]
    end
    
    subgraph "Notification Triggers"
        M[EXAM_CREATED_NOTIFICATION]
        N[ASSIGNMENT_CREATED_NOTIFICATION]
        O[LEAVE_REQUEST_NOTIFICATION]
        P[GRADE_ENTERED_NOTIFICATION]
        Q[ATTENDANCE_MARKED_NOTIFICATION]
    end
    
    subgraph "Data Validation Triggers"
        R[EMAIL_VALIDATION_TRIGGER]
        S[PHONE_VALIDATION_TRIGGER]
        T[DATE_VALIDATION_TRIGGER]
        U[FILE_SIZE_VALIDATION_TRIGGER]
    end
```

## 9. Database Views (Mermaid)

```mermaid
graph TB
    subgraph "User Views"
        A[USER_PROFILE_VIEW]
        B[STUDENT_DETAILS_VIEW]
        C[TEACHER_DETAILS_VIEW]
        D[PARENT_DETAILS_VIEW]
    end
    
    subgraph "Academic Views"
        E[EXAM_SUMMARY_VIEW]
        F[ASSIGNMENT_SUMMARY_VIEW]
        G[ATTENDANCE_SUMMARY_VIEW]
        H[GRADE_SUMMARY_VIEW]
        I[STUDENT_PROGRESS_VIEW]
    end
    
    subgraph "Communication Views"
        J[CHAT_HISTORY_VIEW]
        K[NOTIFICATION_SUMMARY_VIEW]
        L[FORUM_THREAD_SUMMARY_VIEW]
        M[FORUM_REPLY_SUMMARY_VIEW]
    end
    
    subgraph "Administrative Views"
        N[DASHBOARD_STATS_VIEW]
        O[USER_ACTIVITY_VIEW]
        P[SYSTEM_USAGE_VIEW]
        Q[REPORT_SUMMARY_VIEW]
    end
```

## 10. Database Stored Procedures (Mermaid)

```mermaid
graph TD
    subgraph "User Management Procedures"
        A[CREATE_USER_PROCEDURE]
        B[UPDATE_USER_PROCEDURE]
        C[DELETE_USER_PROCEDURE]
        D[VALIDATE_USER_PROCEDURE]
        E[RESET_PASSWORD_PROCEDURE]
    end
    
    subgraph "Academic Procedures"
        F[CREATE_EXAM_PROCEDURE]
        G[SUBMIT_EXAM_PROCEDURE]
        H[GRADE_EXAM_PROCEDURE]
        I[CREATE_ASSIGNMENT_PROCEDURE]
        J[SUBMIT_ASSIGNMENT_PROCEDURE]
        K[GRADE_ASSIGNMENT_PROCEDURE]
    end
    
    subgraph "Reporting Procedures"
        L[GENERATE_ATTENDANCE_REPORT]
        M[GENERATE_GRADE_REPORT]
        N[GENERATE_EXAM_REPORT]
        O[GENERATE_ASSIGNMENT_REPORT]
        P[GENERATE_USER_REPORT]
    end
    
    subgraph "Utility Procedures"
        Q[CLEANUP_OLD_SESSIONS]
        R[CLEANUP_EXPIRED_OTP]
        S[BACKUP_DATABASE]
        T[RESTORE_DATABASE]
        U[OPTIMIZE_DATABASE]
    end
```

## 11. Database Backup Strategy (Mermaid)

```mermaid
graph TD
    subgraph "Backup Types"
        A[Full Backup]
        B[Incremental Backup]
        C[Differential Backup]
        D[Transaction Log Backup]
    end
    
    subgraph "Backup Schedule"
        E[Daily Full Backup]
        F[Hourly Incremental Backup]
        G[Every 15 minutes Transaction Log]
        H[Weekly Differential Backup]
    end
    
    subgraph "Backup Storage"
        I[Local Storage]
        J[Cloud Storage]
        K[Remote Storage]
        L[Tape Storage]
    end
    
    subgraph "Backup Verification"
        M[Backup Integrity Check]
        N[Restore Test]
        O[Data Validation]
        P[Performance Test]
    end
    
    A --> E
    B --> F
    C --> H
    D --> G
    
    E --> I
    F --> J
    G --> K
    H --> L
    
    I --> M
    J --> N
    K --> O
    L --> P
```

## 12. Database Performance Monitoring (Mermaid)

```mermaid
graph TB
    subgraph "Performance Metrics"
        A[Query Execution Time]
        B[Database Connections]
        C[Lock Wait Time]
        D[Buffer Hit Ratio]
        E[Cache Hit Ratio]
        F[Disk I/O]
        G[Memory Usage]
        H[CPU Usage]
    end
    
    subgraph "Monitoring Tools"
        I[MySQL Performance Schema]
        J[MySQL Enterprise Monitor]
        K[Custom Monitoring Scripts]
        L[Application Performance Monitoring]
    end
    
    subgraph "Alerting"
        M[Slow Query Alerts]
        N[Connection Limit Alerts]
        O[Disk Space Alerts]
        P[Memory Usage Alerts]
        Q[CPU Usage Alerts]
    end
    
    subgraph "Optimization"
        R[Query Optimization]
        S[Index Optimization]
        T[Configuration Tuning]
        U[Hardware Scaling]
    end
    
    A --> I
    B --> J
    C --> K
    D --> L
    E --> M
    F --> N
    G --> O
    H --> P
    
    I --> R
    J --> S
    K --> T
    L --> U
```

---

*These database ER diagrams provide a comprehensive view of the database schema, relationships, constraints, and performance optimization strategies for the ePathshala system.*
