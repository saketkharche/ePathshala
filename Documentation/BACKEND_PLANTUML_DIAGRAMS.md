# Backend Architecture - PlantUML Diagrams

## 1. Class Diagram - Core Entities

```plantuml
@startuml
!theme plain

package "com.epathshala.entity" {
    class User {
        -Long id
        -String username
        -String email
        -String password
        -String role
        -Boolean active
        -Timestamp createdAt
        -Timestamp updatedAt
        +getId()
        +getUsername()
        +getEmail()
        +getPassword()
        +getRole()
        +isActive()
        +getCreatedAt()
        +getUpdatedAt()
        +setId()
        +setUsername()
        +setEmail()
        +setPassword()
        +setRole()
        +setActive()
        +setCreatedAt()
        +setUpdatedAt()
    }

    class Student {
        -Long id
        -Long userId
        -String studentId
        -String firstName
        -String lastName
        -String className
        -String section
        -String parentEmail
        -Timestamp createdAt
        +getId()
        +getUserId()
        +getStudentId()
        +getFirstName()
        +getLastName()
        +getClassName()
        +getSection()
        +getParentEmail()
        +getCreatedAt()
        +setId()
        +setUserId()
        +setStudentId()
        +setFirstName()
        +setLastName()
        +setClassName()
        +setSection()
        +setParentEmail()
        +setCreatedAt()
    }

    class Teacher {
        -Long id
        -Long userId
        -String teacherId
        -String firstName
        -String lastName
        -String subject
        -String department
        -Timestamp createdAt
        +getId()
        +getUserId()
        +getTeacherId()
        +getFirstName()
        +getLastName()
        +getSubject()
        +getDepartment()
        +getCreatedAt()
        +setId()
        +setUserId()
        +setTeacherId()
        +setFirstName()
        +setLastName()
        +setSubject()
        +setDepartment()
        +setCreatedAt()
    }

    class Parent {
        -Long id
        -Long userId
        -String parentId
        -String firstName
        -String lastName
        -String phoneNumber
        -Timestamp createdAt
        +getId()
        +getUserId()
        +getParentId()
        +getFirstName()
        +getLastName()
        +getPhoneNumber()
        +getCreatedAt()
        +setId()
        +setUserId()
        +setParentId()
        +setFirstName()
        +setLastName()
        +setPhoneNumber()
        +setCreatedAt()
    }

    class Exam {
        -Long id
        -String title
        -String description
        -String className
        -String subject
        -Integer duration
        -Integer totalMarks
        -Timestamp startTime
        -Timestamp endTime
        -Boolean isActive
        -Long createdBy
        +getId()
        +getTitle()
        +getDescription()
        +getClassName()
        +getSubject()
        +getDuration()
        +getTotalMarks()
        +getStartTime()
        +getEndTime()
        +isActive()
        +getCreatedBy()
        +setId()
        +setTitle()
        +setDescription()
        +setClassName()
        +setSubject()
        +setDuration()
        +setTotalMarks()
        +setStartTime()
        +setEndTime()
        +setActive()
        +setCreatedBy()
    }

    class ExamQuestion {
        -Long id
        -Long examId
        -String question
        -String optionA
        -String optionB
        -String optionC
        -String optionD
        -String correctAnswer
        -Integer marks
        +getId()
        +getExamId()
        +getQuestion()
        +getOptionA()
        +getOptionB()
        +getOptionC()
        +getOptionD()
        +getCorrectAnswer()
        +getMarks()
        +setId()
        +setExamId()
        +setQuestion()
        +setOptionA()
        +setOptionB()
        +setOptionC()
        +setOptionD()
        +setCorrectAnswer()
        +setMarks()
    }

    class Assignment {
        -Long id
        -String title
        -String description
        -String className
        -String subject
        -String fileName
        -String filePath
        -Timestamp dueDate
        -Integer totalMarks
        -Long createdBy
        -Timestamp createdAt
        +getId()
        +getTitle()
        +getDescription()
        +getClassName()
        +getSubject()
        +getFileName()
        +getFilePath()
        +getDueDate()
        +getTotalMarks()
        +getCreatedBy()
        +getCreatedAt()
        +setId()
        +setTitle()
        +setDescription()
        +setClassName()
        +setSubject()
        +setFileName()
        +setFilePath()
        +setDueDate()
        +setTotalMarks()
        +setCreatedBy()
        +setCreatedAt()
    }

    class ChatMessage {
        -Long id
        -Long senderId
        -Long receiverId
        -String message
        -String messageType
        -Timestamp timestamp
        -Boolean isRead
        +getId()
        +getSenderId()
        +getReceiverId()
        +getMessage()
        +getMessageType()
        +getTimestamp()
        +isRead()
        +setId()
        +setSenderId()
        +setReceiverId()
        +setMessage()
        +setMessageType()
        +setTimestamp()
        +setRead()
    }

    class OnlineClass {
        -Long id
        -String title
        -String description
        -String className
        -String subject
        -String meetingId
        -String meetingUrl
        -Timestamp scheduledTime
        -Integer duration
        -Long createdBy
        -Boolean isActive
        +getId()
        +getTitle()
        +getDescription()
        +getClassName()
        +getSubject()
        +getMeetingId()
        +getMeetingUrl()
        +getScheduledTime()
        +getDuration()
        +getCreatedBy()
        +isActive()
        +setId()
        +setTitle()
        +setDescription()
        +setClassName()
        +setSubject()
        +setMeetingId()
        +setMeetingUrl()
        +setScheduledTime()
        +setDuration()
        +setCreatedBy()
        +setActive()
    }
}

User ||--o{ Student : "has"
User ||--o{ Teacher : "has"
User ||--o{ Parent : "has"
User ||--o{ Exam : "creates"
User ||--o{ Assignment : "creates"
User ||--o{ OnlineClass : "creates"
User ||--o{ ChatMessage : "sends"

Exam ||--o{ ExamQuestion : "contains"

@enduml
```

## 2. Service Layer Architecture

```plantuml
@startuml
!theme plain

package "com.epathshala.service" {
    interface AuthService {
        +authenticateUser(LoginRequest) : String
        +generateToken(User) : String
        +validateToken(String) : Boolean
        +forgotPassword(String) : Boolean
        +resetPassword(ResetPasswordRequest) : Boolean
        +verifyOtp(String, String) : Boolean
    }

    class AuthServiceImpl {
        -UserRepository userRepository
        -JwtUtil jwtUtil
        -PasswordEncoder passwordEncoder
        -EmailService emailService
        -OtpRepository otpRepository
        +authenticateUser(LoginRequest) : String
        +generateToken(User) : String
        +validateToken(String) : Boolean
        +forgotPassword(String) : Boolean
        +resetPassword(ResetPasswordRequest) : Boolean
        +verifyOtp(String, String) : Boolean
    }

    interface AdminService {
        +createStudent(StudentDTO) : Student
        +createTeacher(TeacherDTO) : Teacher
        +createParent(ParentDTO) : Parent
        +getAllUsers() : List<User>
        +updateUser(Long, UserDTO) : User
        +deleteUser(Long) : Boolean
        +getDashboardData() : AdminDashboardDTO
    }

    class AdminServiceImpl {
        -UserRepository userRepository
        -StudentRepository studentRepository
        -TeacherRepository teacherRepository
        -ParentRepository parentRepository
        -PasswordEncoder passwordEncoder
        +createStudent(StudentDTO) : Student
        +createTeacher(TeacherDTO) : Teacher
        +createParent(ParentDTO) : Parent
        +getAllUsers() : List<User>
        +updateUser(Long, UserDTO) : User
        +deleteUser(Long) : Boolean
        +getDashboardData() : AdminDashboardDTO
    }

    interface ExamService {
        +createExam(ExamDTO) : Exam
        +getExamsByTeacher(Long) : List<Exam>
        +getExamsByClass(String) : List<Exam>
        +getExamById(Long) : Exam
        +updateExam(Long, ExamDTO) : Exam
        +deleteExam(Long) : Boolean
        +submitExamAttempt(ExamAttemptDTO) : ExamAttempt
        +getExamResults(Long) : List<ExamResultDTO>
    }

    class ExamServiceImpl {
        -ExamRepository examRepository
        -ExamQuestionRepository examQuestionRepository
        -ExamAttemptRepository examAttemptRepository
        -ExamAnswerRepository examAnswerRepository
        -StudentRepository studentRepository
        +createExam(ExamDTO) : Exam
        +getExamsByTeacher(Long) : List<Exam>
        +getExamsByClass(String) : List<Exam>
        +getExamById(Long) : Exam
        +updateExam(Long, ExamDTO) : Exam
        +deleteExam(Long) : Boolean
        +submitExamAttempt(ExamAttemptDTO) : ExamAttempt
        +getExamResults(Long) : List<ExamResultDTO>
    }

    interface AssignmentService {
        +createAssignment(AssignmentDTO) : Assignment
        +getAssignmentsByTeacher(Long) : List<Assignment>
        +getAssignmentsByClass(String) : List<Assignment>
        +getAssignmentById(Long) : Assignment
        +updateAssignment(Long, AssignmentDTO) : Assignment
        +deleteAssignment(Long) : Boolean
        +submitAssignment(AssignmentSubmissionDTO) : AssignmentSubmission
        +gradeAssignment(Long, Integer, String) : AssignmentSubmission
    }

    class AssignmentServiceImpl {
        -AssignmentRepository assignmentRepository
        -AssignmentSubmissionRepository assignmentSubmissionRepository
        -StudentRepository studentRepository
        -FileService fileService
        +createAssignment(AssignmentDTO) : Assignment
        +getAssignmentsByTeacher(Long) : List<Assignment>
        +getAssignmentsByClass(String) : List<Assignment>
        +getAssignmentById(Long) : Assignment
        +updateAssignment(Long, AssignmentDTO) : Assignment
        +deleteAssignment(Long) : Boolean
        +submitAssignment(AssignmentSubmissionDTO) : AssignmentSubmission
        +gradeAssignment(Long, Integer, String) : AssignmentSubmission
    }

    interface ChatService {
        +sendMessage(ChatMessageDTO) : ChatMessage
        +getMessages(Long, Long) : List<ChatMessage>
        +getChatRooms(Long) : List<ChatRoomDTO>
        +createChatRoom(ChatRoomDTO) : ChatRoom
        +markAsRead(Long, Long) : Boolean
    }

    class ChatServiceImpl {
        -ChatMessageRepository chatMessageRepository
        -ChatRoomRepository chatRoomRepository
        -UserRepository userRepository
        -NotificationService notificationService
        +sendMessage(ChatMessageDTO) : ChatMessage
        +getMessages(Long, Long) : List<ChatMessage>
        +getChatRooms(Long) : List<ChatRoomDTO>
        +createChatRoom(ChatRoomDTO) : ChatRoom
        +markAsRead(Long, Long) : Boolean
    }
}

AuthService <|.. AuthServiceImpl
AdminService <|.. AdminServiceImpl
ExamService <|.. ExamServiceImpl
AssignmentService <|.. AssignmentServiceImpl
ChatService <|.. ChatServiceImpl

@enduml
```

## 3. Controller Layer Architecture

```plantuml
@startuml
!theme plain

package "com.epathshala.controller" {
    class AuthController {
        -AuthService authService
        +login(LoginRequest) : ResponseEntity<String>
        +forgotPassword(ForgotPasswordRequest) : ResponseEntity<String>
        +resetPassword(ResetPasswordRequest) : ResponseEntity<String>
        +verifyOtp(VerifyOtpRequest) : ResponseEntity<String>
    }

    class AdminController {
        -AdminService adminService
        +createStudent(StudentDTO) : ResponseEntity<Student>
        +createTeacher(TeacherDTO) : ResponseEntity<Teacher>
        +createParent(ParentDTO) : ResponseEntity<Parent>
        +getAllUsers() : ResponseEntity<List<User>>
        +updateUser(Long, UserDTO) : ResponseEntity<User>
        +deleteUser(Long) : ResponseEntity<String>
        +getDashboard() : ResponseEntity<AdminDashboardDTO>
    }

    class StudentController {
        -StudentService studentService
        +getDashboard() : ResponseEntity<StudentDashboardDTO>
        +getExams() : ResponseEntity<List<Exam>>
        +getAssignments() : ResponseEntity<List<Assignment>>
        +getGrades() : ResponseEntity<List<Grade>>
        +getAttendance() : ResponseEntity<List<Attendance>>
        +submitLeaveRequest(LeaveRequestDTO) : ResponseEntity<LeaveRequest>
    }

    class TeacherController {
        -TeacherService teacherService
        +getDashboard() : ResponseEntity<TeacherDashboardDTO>
        +createExam(ExamDTO) : ResponseEntity<Exam>
        +getExams() : ResponseEntity<List<Exam>>
        +createAssignment(AssignmentDTO) : ResponseEntity<Assignment>
        +getAssignments() : ResponseEntity<List<Assignment>>
        +markAttendance(AttendanceDTO) : ResponseEntity<Attendance>
        +enterGrades(GradeDTO) : ResponseEntity<Grade>
    }

    class ParentController {
        -ParentService parentService
        +getDashboard() : ResponseEntity<ParentDashboardDTO>
        +getChildProgress(Long) : ResponseEntity<ChildProgressDTO>
        +getChildAttendance(Long) : ResponseEntity<List<Attendance>>
        +getChildGrades(Long) : ResponseEntity<List<Grade>>
        +approveLeaveRequest(Long, Boolean) : ResponseEntity<String>
    }

    class ExamController {
        -ExamService examService
        +createExam(ExamDTO) : ResponseEntity<Exam>
        +getExams() : ResponseEntity<List<Exam>>
        +getExamById(Long) : ResponseEntity<Exam>
        +updateExam(Long, ExamDTO) : ResponseEntity<Exam>
        +deleteExam(Long) : ResponseEntity<String>
        +submitExam(ExamAttemptDTO) : ResponseEntity<ExamAttempt>
        +getExamResults(Long) : ResponseEntity<List<ExamResultDTO>>
    }

    class AssignmentController {
        -AssignmentService assignmentService
        +createAssignment(AssignmentDTO) : ResponseEntity<Assignment>
        +getAssignments() : ResponseEntity<List<Assignment>>
        +getAssignmentById(Long) : ResponseEntity<Assignment>
        +updateAssignment(Long, AssignmentDTO) : ResponseEntity<Assignment>
        +deleteAssignment(Long) : ResponseEntity<String>
        +submitAssignment(AssignmentSubmissionDTO) : ResponseEntity<AssignmentSubmission>
        +gradeAssignment(Long, Integer, String) : ResponseEntity<AssignmentSubmission>
    }

    class ChatController {
        -ChatService chatService
        +sendMessage(ChatMessageDTO) : ResponseEntity<ChatMessage>
        +getMessages(Long, Long) : ResponseEntity<List<ChatMessage>>
        +getChatRooms() : ResponseEntity<List<ChatRoomDTO>>
        +createChatRoom(ChatRoomDTO) : ResponseEntity<ChatRoom>
        +markAsRead(Long, Long) : ResponseEntity<String>
    }

    class OnlineClassController {
        -OnlineClassService onlineClassService
        +createOnlineClass(OnlineClassDTO) : ResponseEntity<OnlineClass>
        +getOnlineClasses() : ResponseEntity<List<OnlineClass>>
        +getOnlineClassById(Long) : ResponseEntity<OnlineClass>
        +updateOnlineClass(Long, OnlineClassDTO) : ResponseEntity<OnlineClass>
        +deleteOnlineClass(Long) : ResponseEntity<String>
        +joinOnlineClass(Long) : ResponseEntity<String>
    }
}

@enduml
```

## 4. Repository Layer Architecture

```plantuml
@startuml
!theme plain

package "com.epathshala.repository" {
    interface JpaRepository<T, ID> {
        +save(T) : T
        +findById(ID) : Optional<T>
        +findAll() : List<T>
        +deleteById(ID) : void
        +count() : long
    }

    interface UserRepository {
        +findByUsername(String) : Optional<User>
        +findByEmail(String) : Optional<User>
        +findByRole(String) : List<User>
        +findByActive(Boolean) : List<User>
    }

    interface StudentRepository {
        +findByUserId(Long) : Optional<Student>
        +findByClassName(String) : List<Student>
        +findByParentEmail(String) : List<Student>
        +findByStudentId(String) : Optional<Student>
    }

    interface TeacherRepository {
        +findByUserId(Long) : Optional<Teacher>
        +findBySubject(String) : List<Teacher>
        +findByDepartment(String) : List<Teacher>
        +findByTeacherId(String) : Optional<Teacher>
    }

    interface ParentRepository {
        +findByUserId(Long) : Optional<Parent>
        +findByParentId(String) : Optional<Parent>
        +findByPhoneNumber(String) : Optional<Parent>
    }

    interface ExamRepository {
        +findByCreatedBy(Long) : List<Exam>
        +findByClassName(String) : List<Exam>
        +findBySubject(String) : List<Exam>
        +findByIsActive(Boolean) : List<Exam>
        +findByStartTimeBetween(Timestamp, Timestamp) : List<Exam>
    }

    interface ExamQuestionRepository {
        +findByExamId(Long) : List<ExamQuestion>
        +findByExamIdOrderByCreatedAt(Long) : List<ExamQuestion>
    }

    interface ExamAttemptRepository {
        +findByExamId(Long) : List<ExamAttempt>
        +findByStudentId(Long) : List<ExamAttempt>
        +findByExamIdAndStudentId(Long, Long) : Optional<ExamAttempt>
    }

    interface AssignmentRepository {
        +findByCreatedBy(Long) : List<Assignment>
        +findByClassName(String) : List<Assignment>
        +findBySubject(String) : List<Assignment>
        +findByDueDateAfter(Timestamp) : List<Assignment>
    }

    interface AssignmentSubmissionRepository {
        +findByAssignmentId(Long) : List<AssignmentSubmission>
        +findByStudentId(Long) : List<AssignmentSubmission>
        +findByAssignmentIdAndStudentId(Long, Long) : Optional<AssignmentSubmission>
    }

    interface ChatMessageRepository {
        +findBySenderIdAndReceiverId(Long, Long) : List<ChatMessage>
        +findByReceiverIdAndIsRead(Long, Boolean) : List<ChatMessage>
        +findBySenderIdOrReceiverId(Long, Long) : List<ChatMessage>
    }

    interface OnlineClassRepository {
        +findByCreatedBy(Long) : List<OnlineClass>
        +findByClassName(String) : List<OnlineClass>
        +findBySubject(String) : List<OnlineClass>
        +findByIsActive(Boolean) : List<OnlineClass>
        +findByScheduledTimeBetween(Timestamp, Timestamp) : List<OnlineClass>
    }
}

JpaRepository <|-- UserRepository
JpaRepository <|-- StudentRepository
JpaRepository <|-- TeacherRepository
JpaRepository <|-- ParentRepository
JpaRepository <|-- ExamRepository
JpaRepository <|-- ExamQuestionRepository
JpaRepository <|-- ExamAttemptRepository
JpaRepository <|-- AssignmentRepository
JpaRepository <|-- AssignmentSubmissionRepository
JpaRepository <|-- ChatMessageRepository
JpaRepository <|-- OnlineClassRepository

@enduml
```

## 5. Security Architecture

```plantuml
@startuml
!theme plain

package "com.epathshala.security" {
    class SecurityConfig {
        -PasswordEncoder passwordEncoder
        -JwtFilter jwtFilter
        -CustomUserDetailsService userDetailsService
        +passwordEncoder() : PasswordEncoder
        +authenticationManager() : AuthenticationManager
        +securityFilterChain() : SecurityFilterChain
        +corsConfigurationSource() : CorsConfigurationSource
    }

    class JwtUtil {
        -String secret
        -int expiration
        +generateToken(UserDetails) : String
        +extractUsername(String) : String
        +extractExpiration(String) : Date
        +isTokenExpired(String) : Boolean
        +validateToken(String, UserDetails) : Boolean
    }

    class JwtFilter {
        -JwtUtil jwtUtil
        -CustomUserDetailsService userDetailsService
        +doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain) : void
        +getTokenFromRequest(HttpServletRequest) : String
    }

    class CustomUserDetailsService {
        -UserRepository userRepository
        +loadUserByUsername(String) : UserDetails
        +loadUserById(Long) : UserDetails
    }

    class CustomUserDetails {
        -User user
        +getAuthorities() : Collection<GrantedAuthority>
        +getPassword() : String
        +getUsername() : String
        +isAccountNonExpired() : Boolean
        +isAccountNonLocked() : Boolean
        +isCredentialsNonExpired() : Boolean
        +isEnabled() : Boolean
    }
}

SecurityConfig --> JwtFilter
SecurityConfig --> CustomUserDetailsService
SecurityConfig --> PasswordEncoder
JwtFilter --> JwtUtil
JwtFilter --> CustomUserDetailsService
CustomUserDetailsService --> CustomUserDetails

@enduml
```

## 6. WebSocket Architecture

```plantuml
@startuml
!theme plain

package "com.epathshala.config" {
    class WebSocketConfig {
        +registerStompEndpoints(StompEndpointRegistry) : void
        +configureMessageBroker(MessageBrokerRegistry) : void
    }
}

package "com.epathshala.controller" {
    class WebSocketChatController {
        +sendMessage(ChatMessageDTO) : void
        +addUser(String, SimpMessageHeaderAccessor) : void
        +disconnectUser(String, SimpMessageHeaderAccessor) : void
    }

    class NotificationController {
        +sendNotification(NotificationDTO) : void
        +sendAssignmentNotification(AssignmentDTO) : void
        +sendExamNotification(ExamDTO) : void
    }
}

package "com.epathshala.interceptor" {
    class WebSocketInterceptor {
        +beforeHandshake(ServerHttpRequest, ServerHttpResponse, WebSocketHandler, Map<String, Object>) : boolean
        +afterHandshake(ServerHttpRequest, ServerHttpResponse, WebSocketHandler, Exception) : void
    }
}

WebSocketConfig --> WebSocketInterceptor
WebSocketChatController --> WebSocketConfig
NotificationController --> WebSocketConfig

@enduml
```

## 7. Complete Backend Architecture

```plantuml
@startuml
!theme plain

package "Presentation Layer" {
    [AuthController]
    [AdminController]
    [StudentController]
    [TeacherController]
    [ParentController]
    [ExamController]
    [AssignmentController]
    [ChatController]
    [OnlineClassController]
}

package "Service Layer" {
    [AuthService]
    [AdminService]
    [StudentService]
    [TeacherService]
    [ParentService]
    [ExamService]
    [AssignmentService]
    [ChatService]
    [OnlineClassService]
}

package "Repository Layer" {
    [UserRepository]
    [StudentRepository]
    [TeacherRepository]
    [ParentRepository]
    [ExamRepository]
    [AssignmentRepository]
    [ChatRepository]
    [OnlineClassRepository]
}

package "Entity Layer" {
    [User]
    [Student]
    [Teacher]
    [Parent]
    [Exam]
    [Assignment]
    [ChatMessage]
    [OnlineClass]
}

package "Security Layer" {
    [JwtUtil]
    [JwtFilter]
    [CustomUserDetailsService]
    [SecurityConfig]
}

package "Configuration Layer" {
    [WebSocketConfig]
    [SwaggerConfig]
    [WebConfig]
    [JacksonConfig]
}

[AuthController] --> [AuthService]
[AdminController] --> [AdminService]
[StudentController] --> [StudentService]
[TeacherController] --> [TeacherService]
[ParentController] --> [ParentService]
[ExamController] --> [ExamService]
[AssignmentController] --> [AssignmentService]
[ChatController] --> [ChatService]
[OnlineClassController] --> [OnlineClassService]

[AuthService] --> [UserRepository]
[AdminService] --> [UserRepository]
[StudentService] --> [StudentRepository]
[TeacherService] --> [TeacherRepository]
[ParentService] --> [ParentRepository]
[ExamService] --> [ExamRepository]
[AssignmentService] --> [AssignmentRepository]
[ChatService] --> [ChatRepository]
[OnlineClassService] --> [OnlineClassRepository]

[UserRepository] --> [User]
[StudentRepository] --> [Student]
[TeacherRepository] --> [Teacher]
[ParentRepository] --> [Parent]
[ExamRepository] --> [Exam]
[AssignmentRepository] --> [Assignment]
[ChatRepository] --> [ChatMessage]
[OnlineClassRepository] --> [OnlineClass]

[JwtFilter] --> [JwtUtil]
[JwtFilter] --> [CustomUserDetailsService]
[SecurityConfig] --> [JwtFilter]
[SecurityConfig] --> [CustomUserDetailsService]

@enduml
```

## 8. Database Connection Flow

```plantuml
@startuml
!theme plain

participant "Controller" as C
participant "Service" as S
participant "Repository" as R
participant "JPA" as J
participant "MySQL" as DB

C -> S: Business Logic Call
S -> R: Data Access Call
R -> J: JPA Query
J -> DB: SQL Query
DB --> J: Result Set
J --> R: Entity Objects
R --> S: Domain Objects
S --> C: Processed Data

note right of DB
  MySQL Database
  - User Management
  - Academic Records
  - Communication Data
  - File References
end note

@enduml
```

## 9. Authentication Flow

```plantuml
@startuml
!theme plain

participant "Client" as C
participant "AuthController" as AC
participant "AuthService" as AS
participant "JwtUtil" as JWT
participant "UserRepository" as UR
participant "Database" as DB

C -> AC: Login Request
AC -> AS: Authenticate User
AS -> UR: Find User by Username
UR -> DB: Query User
DB --> UR: User Data
UR --> AS: User Object
AS -> AS: Validate Password
AS -> JWT: Generate Token
JWT --> AS: JWT Token
AS --> AC: Authentication Result
AC --> C: JWT Token Response

note right of JWT
  JWT Token contains:
  - User ID
  - Username
  - Role
  - Expiration Time
end note

@enduml
```

## 10. File Upload Flow

```plantuml
@startuml
!theme plain

participant "Client" as C
participant "AssignmentController" as AC
participant "AssignmentService" as AS
participant "FileService" as FS
participant "FileSystem" as F
participant "Database" as DB

C -> AC: Upload Assignment File
AC -> AS: Process Assignment
AS -> FS: Save File
FS -> F: Write File to Disk
F --> FS: File Saved
FS --> AS: File Path
AS -> DB: Save Assignment Record
DB --> AS: Assignment Saved
AS --> AC: Assignment Created
AC --> C: Success Response

note right of F
  File Storage:
  - Assignment Files
  - Submission Files
  - Profile Images
  - Documents
end note

@enduml
```

---

*These PlantUML diagrams provide a comprehensive view of the backend architecture, including class relationships, service interactions, and data flow patterns.*
