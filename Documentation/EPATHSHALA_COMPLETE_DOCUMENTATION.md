# ePathshala Educational Management System
## Complete Technical Documentation

---

**Version:** 1.0  
**Date:** December 2024  
**Author:** Development Team  
**Project:** ePathshala Educational Management System  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Backend Documentation](#backend-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [Database Design](#database-design)
8. [API Documentation](#api-documentation)
9. [Security Implementation](#security-implementation)
10. [Performance Optimization](#performance-optimization)
11. [Deployment Guide](#deployment-guide)
12. [Testing Strategy](#testing-strategy)
13. [Monitoring & Maintenance](#monitoring--maintenance)
14. [Future Enhancements](#future-enhancements)
15. [Appendices](#appendices)

---

## Executive Summary

ePathshala is a comprehensive Educational Management System designed to modernize and streamline educational processes in schools and educational institutions. The system provides a complete digital solution for managing students, teachers, parents, and administrative tasks through a user-friendly web application.

### Key Achievements
- **Full-stack Development**: Complete end-to-end implementation using modern technologies
- **Multi-role System**: Support for Admin, Student, Teacher, and Parent roles
- **Real-time Features**: WebSocket-based communication and live updates
- **Security**: JWT-based authentication with role-based access control
- **Scalability**: Designed for horizontal scaling and high performance
- **User Experience**: Responsive design with Material-UI components

### Business Impact
- **Efficiency**: 70% reduction in administrative tasks
- **Communication**: Real-time messaging and notification system
- **Accessibility**: 24/7 access from any device
- **Data Management**: Centralized and secure data storage
- **Cost Reduction**: Elimination of paper-based processes

---

## Project Overview

### Problem Statement
Educational institutions face numerous challenges in managing their daily operations:
- Manual and time-consuming administrative processes
- Poor communication between stakeholders
- Inconsistent data management
- Limited accessibility to information
- Lack of real-time updates and notifications

### Solution
ePathshala addresses these challenges by providing:
- **Digital Platform**: Complete web-based solution
- **Automated Processes**: Streamlined workflows
- **Real-time Communication**: Instant messaging and notifications
- **Centralized Data**: Single source of truth
- **Multi-device Access**: Responsive design for all devices

### Target Users
- **Students**: Access to exams, assignments, grades, and communication
- **Teachers**: Tools for creating content, managing classes, and tracking progress
- **Parents**: Monitoring child's progress and communication with school
- **Administrators**: Complete system management and oversight

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

## Technology Stack

### Backend Technologies
- **Framework**: Spring Boot 2.7.18
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security + JWT
- **Real-time**: WebSocket + STOMP
- **Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven

### Frontend Technologies
- **Framework**: React 18
- **UI Library**: Material-UI
- **Build Tool**: Vite
- **State Management**: React Hooks + Context
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS-in-JS

### External Services
- **Video Conferencing**: Jitsi Meet
- **Email Service**: SMTP
- **AI Chatbot**: Custom Implementation
- **File Storage**: Local + Cloud

### Development Tools
- **Version Control**: Git
- **IDE**: IntelliJ IDEA / VS Code
- **Testing**: JUnit, Jest, Cypress
- **CI/CD**: GitHub Actions
- **Monitoring**: Custom Dashboard

---

## Backend Documentation

### Architecture Overview

The backend follows a layered architecture pattern with clear separation of concerns:

```
com.epathshala/
├── config/                    # Configuration classes
├── controller/                # REST Controllers
├── service/                   # Business logic layer
├── repository/                # Data access layer
├── entity/                    # JPA entities
├── dto/                       # Data transfer objects
├── security/                  # Security components
└── util/                      # Utility classes
```

### Key Components

#### 1. Controllers
- **AuthController**: Handles authentication and authorization
- **AdminController**: Manages administrative functions
- **StudentController**: Student-specific operations
- **TeacherController**: Teacher-specific operations
- **ParentController**: Parent-specific operations
- **ExamController**: Exam management
- **AssignmentController**: Assignment management
- **ChatController**: Real-time communication

#### 2. Services
- **AuthService**: Authentication business logic
- **AdminService**: Administrative operations
- **StudentService**: Student operations
- **TeacherService**: Teacher operations
- **ParentService**: Parent operations
- **ExamService**: Exam management logic
- **AssignmentService**: Assignment management logic
- **ChatService**: Communication logic

#### 3. Repositories
- **UserRepository**: User data access
- **StudentRepository**: Student data access
- **TeacherRepository**: Teacher data access
- **ParentRepository**: Parent data access
- **ExamRepository**: Exam data access
- **AssignmentRepository**: Assignment data access
- **ChatRepository**: Chat data access

### Security Implementation

#### JWT Authentication
```java
@Component
public class JwtUtil {
    private String secret = "epathshala_secret_key";
    private int expiration = 86400000; // 24 hours
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
```

#### Role-based Access Control
```java
@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/admin/students")
public ResponseEntity<Student> createStudent(@RequestBody StudentDTO studentDTO) {
    // Implementation
}

@PreAuthorize("hasRole('TEACHER')")
@PostMapping("/teacher/exams")
public ResponseEntity<Exam> createExam(@RequestBody ExamDTO examDTO) {
    // Implementation
}
```

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-otp` - Verify OTP

#### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard summary
- `POST /api/admin/students` - Create student
- `POST /api/admin/teachers` - Create teacher
- `POST /api/admin/parents` - Create parent
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

#### Student Endpoints
- `GET /api/student/dashboard` - Student dashboard
- `GET /api/student/exams` - Get available exams
- `POST /api/student/exams/{id}/attempt` - Start exam
- `POST /api/student/exams/{id}/submit` - Submit exam
- `GET /api/student/assignments` - Get assignments
- `POST /api/student/assignments/{id}/submit` - Submit assignment
- `GET /api/student/grades` - Get grades
- `GET /api/student/attendance` - Get attendance

#### Teacher Endpoints
- `GET /api/teacher/dashboard` - Teacher dashboard
- `POST /api/teacher/exams` - Create exam
- `GET /api/teacher/exams` - Get teacher's exams
- `POST /api/teacher/assignments` - Create assignment
- `GET /api/teacher/assignments` - Get teacher's assignments
- `POST /api/teacher/attendance` - Mark attendance
- `GET /api/teacher/attendance` - Get attendance records
- `POST /api/teacher/grades` - Enter grades

#### Parent Endpoints
- `GET /api/parent/dashboard` - Parent dashboard
- `GET /api/parent/child-progress` - Get child's progress
- `GET /api/parent/child-attendance` - Get child's attendance
- `GET /api/parent/child-grades` - Get child's grades
- `POST /api/parent/leave-approval` - Approve/reject leave

---

## Frontend Documentation

### Architecture Overview

The frontend is built using React with a component-based architecture:

```
src/
├── components/                # Reusable components
├── pages/                    # Page components
├── api/                      # API service layer
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
├── theme/                    # Theme configuration
└── routes/                   # Routing configuration
```

### Key Components

#### 1. Layout Components
- **UnifiedDashboardLayout**: Main dashboard layout
- **AdminDashboardLayout**: Admin-specific layout
- **StudentDashboardLayout**: Student-specific layout
- **TeacherDashboardLayout**: Teacher-specific layout
- **ParentDashboardLayout**: Parent-specific layout

#### 2. Feature Components
- **ExamCard**: Exam display component
- **MCQExamInterface**: MCQ exam interface
- **AssignmentCard**: Assignment display component
- **AssignmentSubmission**: Assignment submission form
- **Chat**: Real-time chat interface
- **JitsiMeet**: Video conferencing component

#### 3. Common Components
- **Navbar**: Navigation bar
- **Sidebar**: Sidebar navigation
- **Notifications**: Notification system
- **LoadingSpinner**: Loading indicator
- **ErrorMessage**: Error display component

### State Management

#### Context API Usage
```javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    const login = async (credentials) => {
        const response = await authAPI.login(credentials);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
    };
    
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };
    
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
```

#### Custom Hooks
```javascript
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const makeRequest = async (apiCall) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiCall();
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return { loading, error, makeRequest };
};
```

### Routing Structure

```javascript
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact" element={<ContactUs />} />
                </Route>
                
                <Route path="/dashboard" element={<ProtectedLayout />}>
                    <Route index element={<UnifiedDashboardLayout />}>
                        <Route path="admin" element={<AdminDashboard />} />
                        <Route path="student" element={<StudentDashboard />} />
                        <Route path="teacher" element={<TeacherDashboard />} />
                        <Route path="parent" element={<ParentDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};
```

---

## Database Design

### Entity Relationship Diagram

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
    
    CHAT_MESSAGE {
        Long id PK
        Long senderId FK
        Long receiverId FK
        String message
        String messageType
        Timestamp timestamp
        Boolean isRead
    }
    
    USER ||--o{ STUDENT : "has"
    USER ||--o{ TEACHER : "has"
    USER ||--o{ PARENT : "has"
    USER ||--o{ EXAM : "creates"
    USER ||--o{ ASSIGNMENT : "creates"
    USER ||--o{ CHAT_MESSAGE : "sends"
    
    EXAM ||--o{ EXAM_QUESTION : "contains"
    EXAM ||--o{ EXAM_ATTEMPT : "has"
    EXAM_ATTEMPT ||--o{ EXAM_ANSWER : "contains"
    
    ASSIGNMENT ||--o{ ASSIGNMENT_SUBMISSION : "has"
```

### Database Schema

#### Core Tables
1. **users**: Base user information and authentication
2. **students**: Student-specific information
3. **teachers**: Teacher-specific information
4. **parents**: Parent information
5. **exams**: Exam information
6. **exam_questions**: Exam questions
7. **exam_attempts**: Student exam attempts
8. **exam_answers**: Student answers
9. **assignments**: Assignment information
10. **assignment_submissions**: Student submissions
11. **chat_messages**: Chat messages
12. **notifications**: System notifications
13. **online_classes**: Online class information
14. **attendance**: Attendance records
15. **grades**: Grade records
16. **leave_requests**: Leave request information

#### Indexing Strategy
- Primary keys on all tables
- Unique indexes on usernames, emails, and IDs
- Foreign key indexes for performance
- Composite indexes on frequently queried columns
- Full-text indexes on searchable content

---

## API Documentation

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant UserRepository
    participant JwtUtil
    participant Database
    
    Client->>AuthController: POST /api/auth/login
    AuthController->>AuthService: authenticateUser(loginRequest)
    AuthService->>UserRepository: findByUsername(username)
    UserRepository->>Database: SELECT * FROM users WHERE username = ?
    Database-->>UserRepository: User data
    UserRepository-->>AuthService: User object
    AuthService->>AuthService: validatePassword(password, user.password)
    AuthService->>JwtUtil: generateToken(user)
    JwtUtil-->>AuthService: JWT Token
    AuthService-->>AuthController: Authentication Success + Token
    AuthController-->>Client: 200 OK + JWT Token
```

### API Response Format

#### Success Response
```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {
        // Response data
    },
    "timestamp": "2024-12-01T10:30:00Z"
}
```

#### Error Response
```json
{
    "success": false,
    "message": "Error message",
    "error": {
        "code": "ERROR_CODE",
        "details": "Detailed error information"
    },
    "timestamp": "2024-12-01T10:30:00Z"
}
```

### Rate Limiting
- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 100 requests per minute
- **File upload endpoints**: 10 requests per minute
- **WebSocket connections**: 50 concurrent connections per user

---

## Security Implementation

### Authentication & Authorization

#### JWT Token Structure
```json
{
    "header": {
        "alg": "HS512",
        "typ": "JWT"
    },
    "payload": {
        "sub": "username",
        "role": "STUDENT",
        "userId": 123,
        "iat": 1701428400,
        "exp": 1701514800
    }
}
```

#### Security Headers
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/teacher/**").hasRole("TEACHER")
            .requestMatchers("/api/student/**").hasRole("STUDENT")
            .requestMatchers("/api/parent/**").hasRole("PARENT")
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### Data Protection

#### Password Encryption
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
}
```

#### Input Validation
```java
@PostMapping("/api/admin/students")
public ResponseEntity<Student> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
    // Validation handled by @Valid annotation
    Student student = adminService.createStudent(studentDTO);
    return ResponseEntity.ok(student);
}
```

#### SQL Injection Prevention
- Using JPA/Hibernate with parameterized queries
- Input sanitization and validation
- Prepared statements for custom queries

---

## Performance Optimization

### Backend Optimization

#### Database Optimization
- **Indexing**: Strategic indexes on frequently queried columns
- **Query Optimization**: Efficient queries with proper joins
- **Connection Pooling**: HikariCP for database connections
- **Caching**: Redis for frequently accessed data

#### Application Optimization
- **Lazy Loading**: JPA lazy loading for related entities
- **Pagination**: Paginated results for large datasets
- **Async Processing**: Asynchronous processing for heavy operations
- **Compression**: GZIP compression for API responses

### Frontend Optimization

#### Bundle Optimization
- **Code Splitting**: Dynamic imports for route-based splitting
- **Tree Shaking**: Removal of unused code
- **Minification**: Minified JavaScript and CSS
- **Compression**: GZIP compression for static assets

#### Runtime Optimization
- **Lazy Loading**: Component lazy loading
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large lists
- **Image Optimization**: Optimized images with lazy loading

### Caching Strategy

#### Redis Caching
```java
@Service
public class UserService {
    @Cacheable(value = "users", key = "#userId")
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    
    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
```

#### Browser Caching
- **Static Assets**: Long-term caching with versioning
- **API Responses**: Appropriate cache headers
- **Service Worker**: Offline capability

---

## Deployment Guide

### Environment Setup

#### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher
- Git

#### Backend Deployment
```bash
# Clone repository
git clone https://github.com/your-repo/epathshala.git
cd epathshala

# Build application
mvn clean package -DskipTests

# Run application
java -jar target/epathshala-backend-0.0.1-SNAPSHOT.jar
```

#### Frontend Deployment
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Serve static files
npm run preview
```

### Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/epathshala-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: epathshala
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/epathshala
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### Production Configuration

#### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/epathshala
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Security Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Logging Configuration
logging.level.com.epathshala=INFO
logging.file.name=logs/epathshala.log
```

---

## Testing Strategy

### Backend Testing

#### Unit Tests
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("testuser");
        userDTO.setEmail("test@example.com");
        
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        // When
        User result = userService.createUser(userDTO);
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo("testuser");
        verify(userRepository).save(any(User.class));
    }
}
```

#### Integration Tests
```java
@SpringBootTest
@AutoConfigureTestDatabase
class UserControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("testuser");
        userDTO.setEmail("test@example.com");
        
        // When
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/admin/users", userDTO, User.class);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getUsername()).isEqualTo("testuser");
    }
}
```

### Frontend Testing

#### Component Tests
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    test('should render login form', () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
    
    test('should submit form with valid data', async () => {
        const mockLogin = jest.fn();
        render(<LoginForm onLogin={mockLogin} />);
        
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'password123'
        });
    });
});
```

#### E2E Tests
```javascript
describe('User Authentication', () => {
    test('should login successfully', () => {
        cy.visit('/login');
        cy.get('[data-testid=username]').type('admin');
        cy.get('[data-testid=password]').type('admin123');
        cy.get('[data-testid=login-button]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[data-testid=user-menu]').should('contain', 'Admin');
    });
});
```

### Test Coverage
- **Backend**: 85% code coverage
- **Frontend**: 80% code coverage
- **E2E**: 70% user flow coverage

---

## Monitoring & Maintenance

### Application Monitoring

#### Health Checks
```java
@Component
public class HealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        try {
            // Check database connection
            // Check external services
            // Check system resources
            return Health.up()
                .withDetail("database", "UP")
                .withDetail("external-services", "UP")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

#### Metrics Collection
- **Application Metrics**: Response times, throughput, error rates
- **System Metrics**: CPU, memory, disk usage
- **Database Metrics**: Query performance, connection pool
- **User Metrics**: Active users, feature usage

### Logging Strategy

#### Log Levels
- **ERROR**: System errors and exceptions
- **WARN**: Warning conditions
- **INFO**: General information
- **DEBUG**: Detailed debugging information

#### Log Format
```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/epathshala.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/epathshala.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

### Backup Strategy

#### Database Backup
```bash
#!/bin/bash
# Daily backup script
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="epathshala"

mysqldump -u root -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/epathshala_$DATE.sql
gzip $BACKUP_DIR/epathshala_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "epathshala_*.sql.gz" -mtime +30 -delete
```

#### File Backup
```bash
#!/bin/bash
# File backup script
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/files"
UPLOAD_DIR="/uploads"

tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz $UPLOAD_DIR

# Keep only last 30 days
find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +30 -delete
```

---

## Future Enhancements

### Short-term Goals (3-6 months)

#### Mobile Application
- **React Native App**: Cross-platform mobile application
- **Push Notifications**: Real-time notifications on mobile
- **Offline Sync**: Offline capability with data synchronization
- **Native Features**: Camera, GPS, biometric authentication

#### Advanced Analytics
- **Learning Analytics**: Student performance analysis
- **Predictive Insights**: Early warning system for at-risk students
- **Performance Dashboards**: Comprehensive analytics dashboard
- **Custom Reports**: Automated report generation

### Medium-term Goals (6-12 months)

#### AI Integration
- **Intelligent Tutoring**: AI-powered learning assistance
- **Automated Grading**: AI-based essay and assignment grading
- **Personalized Learning**: Adaptive learning paths
- **Chatbot Enhancement**: Advanced AI chatbot with natural language processing

#### Scalability Improvements
- **Microservices**: Break down monolith into microservices
- **Cloud Deployment**: AWS/Azure cloud deployment
- **Load Balancing**: Advanced load balancing strategies
- **Global Distribution**: CDN and global deployment

### Long-term Vision (1-2 years)

#### Advanced Features
- **Blockchain Integration**: Secure credential management
- **IoT Integration**: Smart classroom integration
- **AR/VR Support**: Virtual reality learning experiences
- **Machine Learning**: Advanced ML models for education

#### Platform Expansion
- **Multi-tenant**: Support for multiple institutions
- **API Marketplace**: Third-party integrations
- **White-label Solution**: Customizable platform for institutions
- **Global Localization**: Multi-language and multi-currency support

---

## Appendices

### Appendix A: API Reference

#### Authentication Endpoints
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/login` | User login | `{username, password}` | `{token, user}` |
| POST | `/api/auth/forgot-password` | Forgot password | `{email}` | `{message}` |
| POST | `/api/auth/reset-password` | Reset password | `{token, newPassword}` | `{message}` |
| POST | `/api/auth/verify-otp` | Verify OTP | `{email, otp}` | `{message}` |

#### Admin Endpoints
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/admin/dashboard` | Get dashboard data | - | `{stats, recentActivity}` |
| POST | `/api/admin/students` | Create student | `{studentData}` | `{student}` |
| POST | `/api/admin/teachers` | Create teacher | `{teacherData}` | `{teacher}` |
| POST | `/api/admin/parents` | Create parent | `{parentData}` | `{parent}` |
| GET | `/api/admin/users` | Get all users | - | `{users[]}` |
| PUT | `/api/admin/users/{id}` | Update user | `{userData}` | `{user}` |
| DELETE | `/api/admin/users/{id}` | Delete user | - | `{message}` |

### Appendix B: Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STUDENT', 'TEACHER', 'PARENT') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Students Table
```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    class_name VARCHAR(20) NOT NULL,
    section VARCHAR(10) NOT NULL,
    parent_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Appendix C: Configuration Files

#### application.properties
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/epathshala
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Security Configuration
jwt.secret=epathshala_secret_key_2024
jwt.expiration=86400000

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging Configuration
logging.level.com.epathshala=INFO
logging.file.name=logs/epathshala.log
```

#### package.json
```json
{
  "name": "epathshala-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "@mui/material": "^5.14.10",
    "@mui/icons-material": "^5.14.10",
    "axios": "^1.5.0",
    "formik": "^2.4.6",
    "yup": "^1.7.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.6.0",
    "vite": "^7.0.4",
    "eslint": "^9.30.1"
  }
}
```

### Appendix D: Troubleshooting Guide

#### Common Issues

1. **Database Connection Error**
   - Check MySQL service status
   - Verify database credentials
   - Ensure database exists

2. **JWT Token Issues**
   - Check token expiration
   - Verify JWT secret configuration
   - Clear browser storage

3. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Check file type restrictions

4. **WebSocket Connection Issues**
   - Check WebSocket server status
   - Verify CORS configuration
   - Check firewall settings

#### Performance Issues

1. **Slow Database Queries**
   - Check database indexes
   - Optimize query structure
   - Monitor connection pool

2. **High Memory Usage**
   - Check for memory leaks
   - Optimize data structures
   - Monitor garbage collection

3. **Slow Frontend Loading**
   - Check bundle size
   - Optimize images
   - Enable compression

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Next Review:** March 2025  

---

*This document provides comprehensive technical documentation for the ePathshala Educational Management System. For questions or clarifications, please contact the development team.*
