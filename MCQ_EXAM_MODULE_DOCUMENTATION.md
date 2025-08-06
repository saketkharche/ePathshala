# MCQ Exam Module - ePathshala Student ERP System

## 📋 Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Frontend Components](#frontend-components)
6. [Security Implementation](#security-implementation)
7. [Features](#features)
8. [Installation & Setup](#installation--setup)
9. [Usage Examples](#usage-examples)
10. [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

The MCQ Exam Module is a comprehensive role-based examination system integrated into the ePathshala Student ERP. It provides:

- **Faculty/Admin**: Create, manage, and monitor exams with detailed analytics
- **Students**: Take timed MCQ exams with real-time feedback and performance analysis
- **Automatic Evaluation**: Instant result calculation with performance charts
- **Role-based Access**: JWT-based security with role-specific endpoints

---

## 🏗️ Architecture

### Backend Stack
- **Framework**: Spring Boot 2.7.x
- **Database**: JPA/Hibernate with MySQL
- **Security**: Spring Security with JWT
- **Documentation**: Swagger/OpenAPI 3
- **Build Tool**: Maven

### Frontend Stack
- **Framework**: React.js with Vite
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts for data visualization
- **State Management**: React Hooks
- **HTTP Client**: Axios

### Key Components
```
Backend:
├── Entities (Exam, ExamQuestion, ExamAttempt, ExamAnswer)
├── DTOs (ExamDTO, ExamQuestionDTO, ExamResultDTO)
├── Repositories (CRUD operations)
├── Services (Business logic)
├── Controllers (REST APIs)
└── Security (JWT + Role-based access)

Frontend:
├── ExamCard (Display exam info)
├── MCQExamInterface (Timed exam interface)
├── ExamResultVisualization (Charts & analytics)
└── ExamDashboard (Main page)
```

---

## 🗄️ Database Schema

### Core Entities

#### 1. Exam Entity
```java
@Entity
public class Exam {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private Integer durationMinutes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer totalMarks;
    private Boolean negativeMarking;
    private Double negativeMarkingPercentage;
    private Boolean isActive;
    
    @ManyToOne
    private Teacher course;
    
    @ManyToOne
    private User createdBy;
    
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<ExamQuestion> questions;
    
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<ExamAttempt> attempts;
}
```

#### 2. ExamQuestion Entity
```java
@Entity
public class ExamQuestion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String questionText;
    private String optionA, optionB, optionC, optionD;
    private String correctAnswer;
    private Integer marks;
    private String difficulty; // EASY, MEDIUM, HARD
    private String topic;
    
    @ManyToOne
    private Exam exam;
}
```

#### 3. ExamAttempt Entity
```java
@Entity
public class ExamAttempt {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Exam exam;
    
    @ManyToOne
    private Student student;
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer totalQuestions;
    private Integer answeredQuestions;
    private Integer correctAnswers;
    private Integer incorrectAnswers;
    private Integer totalMarks;
    private Integer obtainedMarks;
    private Double percentage;
    private String status; // STARTED, COMPLETED, EXPIRED
}
```

#### 4. ExamAnswer Entity
```java
@Entity
public class ExamAnswer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private ExamAttempt attempt;
    
    @ManyToOne
    private ExamQuestion question;
    
    private String selectedAnswer;
    private Boolean isCorrect;
    private Integer marksObtained;
    private Integer timeSpentSeconds;
}
```

---

## 🔌 API Endpoints

### Faculty/Admin Endpoints

#### Create Exam
```http
POST /api/faculty/exams
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Java Programming Midterm",
  "description": "Covers OOP concepts and Java fundamentals",
  "durationMinutes": 60,
  "startTime": "2024-01-15T10:00:00",
  "endTime": "2024-01-15T11:00:00",
  "totalMarks": 100,
  "negativeMarking": true,
  "negativeMarkingPercentage": 0.25
}
```

#### Add Questions
```http
POST /api/faculty/exams/{examId}/questions
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

[
  {
    "questionText": "What is encapsulation in OOP?",
    "optionA": "Data hiding",
    "optionB": "Inheritance",
    "optionC": "Polymorphism",
    "optionD": "Abstraction",
    "correctAnswer": "A",
    "marks": 5,
    "difficulty": "MEDIUM",
    "topic": "OOP Concepts"
  }
]
```

#### Get Faculty Exams
```http
GET /api/faculty/exams
Authorization: Bearer <JWT_TOKEN>
```

#### Get Exam Results
```http
GET /api/faculty/exams/{examId}/results
Authorization: Bearer <JWT_TOKEN>
```

#### Activate/Deactivate Exam
```http
PUT /api/faculty/exams/{examId}/activate
PUT /api/faculty/exams/{examId}/deactivate
Authorization: Bearer <JWT_TOKEN>
```

### Student Endpoints

#### Get Available Exams
```http
GET /api/student/exams/available
Authorization: Bearer <JWT_TOKEN>
```

#### Start Exam
```http
POST /api/student/exams/{examId}/start
Authorization: Bearer <JWT_TOKEN>
```

#### Submit Exam
```http
POST /api/student/exams/{examId}/submit
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D"
}
```

#### Get Exam Result
```http
GET /api/student/exams/{examId}/result
Authorization: Bearer <JWT_TOKEN>
```

#### Get Exam History
```http
GET /api/student/exams/history
Authorization: Bearer <JWT_TOKEN>
```

#### Get Exam Timer
```http
GET /api/student/exams/{examId}/timer
Authorization: Bearer <JWT_TOKEN>
```

---

## 🎨 Frontend Components

### 1. ExamCard Component
**Purpose**: Display individual exam information on student dashboard

**Features**:
- Exam title, description, duration
- Start/end times with countdown
- Question count and total marks
- Negative marking indicator
- Conditional action buttons (Start, View Details, View Result)

**Props**:
```javascript
{
  exam: {
    id: number,
    title: string,
    description: string,
    durationMinutes: number,
    startTime: string,
    endTime: string,
    totalMarks: number,
    questionCount: number,
    status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED',
    negativeMarking: boolean
  },
  onStartExam: function,
  onViewResult: function
}
```

### 2. MCQExamInterface Component
**Purpose**: Timed MCQ exam interface with one question at a time

**Features**:
- Countdown timer with auto-submit
- Progress bar showing completion
- Radio button options (A, B, C, D)
- Navigation buttons (Previous, Next, Submit)
- Confirmation dialog before submission
- Real-time answer saving

**State Management**:
```javascript
{
  currentQuestion: number,
  answers: Map<questionId, selectedAnswer>,
  timeRemaining: number,
  isSubmitting: boolean
}
```

### 3. ExamResultVisualization Component
**Purpose**: Display comprehensive exam results with charts

**Features**:
- Score summary with grade and pass/fail status
- Pie chart for answer distribution (Correct/Incorrect/Unanswered)
- Bar charts for topic-wise performance
- Bar charts for difficulty-wise performance
- Performance summary table
- Export functionality (PDF)

**Chart Data Structure**:
```javascript
{
  score: {
    obtained: number,
    total: number,
    percentage: number,
    grade: string
  },
  charts: {
    answerDistribution: { Correct: number, Incorrect: number, Unanswered: number },
    topicPerformance: { [topic]: number },
    difficultyPerformance: { [difficulty]: number }
  }
}
```

### 4. ExamDashboard Component
**Purpose**: Main page for student exam management

**Features**:
- Tab navigation (Available Exams, Completed Exams)
- Exam card grid layout
- Modal dialogs for exam interface and results
- Responsive design with Material-UI
- Mock data integration for development

---

## 🔐 Security Implementation

### JWT Token Structure
```json
{
  "sub": "user@email.com",
  "role": "STUDENT|TEACHER|ADMIN",
  "userId": 123,
  "courseId": 456,
  "iat": 1642234567,
  "exp": 1642238167
}
```

### Role-based Access Control
```java
// Faculty endpoints
@PreAuthorize("hasRole('TEACHER')")
@RequestMapping("/api/faculty/exams")

// Student endpoints  
@PreAuthorize("hasRole('STUDENT')")
@RequestMapping("/api/student/exams")
```

### Security Context Integration
```java
private Long getCurrentFacultyId() {
    String currentUserEmail = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();
    
    User user = userRepository.findByEmail(currentUserEmail)
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    return user.getId();
}
```

---

## ✨ Features

### Core Features
- ✅ **Role-based Access**: Faculty create/manage, Students take exams
- ✅ **Timed Exams**: Configurable duration with auto-submit
- ✅ **Negative Marking**: Configurable penalty for wrong answers
- ✅ **Real-time Timer**: Countdown with auto-submission
- ✅ **Instant Results**: Automatic evaluation and scoring
- ✅ **Performance Analytics**: Topic-wise and difficulty-wise analysis

### Advanced Features
- ✅ **One Question Interface**: Focused exam experience
- ✅ **Progress Tracking**: Visual progress indicators
- ✅ **Answer Persistence**: Auto-save during exam
- ✅ **Result Visualization**: Charts and detailed analytics
- ✅ **Exam History**: Complete attempt history
- ✅ **Responsive Design**: Mobile-friendly interface

### Security Features
- ✅ **JWT Authentication**: Secure token-based access
- ✅ **Role-based Authorization**: Endpoint-level security
- ✅ **Session Management**: Secure user context
- ✅ **Input Validation**: Request validation and sanitization

---

## 🚀 Installation & Setup

### Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd epathshala
   ```

2. **Update database configuration**:
   ```properties
   # application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/epathshala
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Compile and run**:
   ```bash
   mvn clean compile
   mvn spring-boot:run
   ```

### Frontend Setup
1. **Navigate to frontend directory**:
   ```bash
   cd epathshala-Web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Database Migration
The exam module entities will be automatically created by Hibernate. Ensure your MySQL database is running and accessible.

---

## 📖 Usage Examples

### Faculty Creating an Exam
1. **Login as faculty** with JWT token
2. **Create exam** via `POST /api/faculty/exams`
3. **Add questions** via `POST /api/faculty/exams/{id}/questions`
4. **Activate exam** via `PUT /api/faculty/exams/{id}/activate`
5. **Monitor results** via `GET /api/faculty/exams/{id}/results`

### Student Taking an Exam
1. **Login as student** with JWT token
2. **View available exams** via `GET /api/student/exams/available`
3. **Start exam** via `POST /api/student/exams/{id}/start`
4. **Take exam** using MCQ interface
5. **Submit answers** via `POST /api/student/exams/{id}/submit`
6. **View results** via `GET /api/student/exams/{id}/result`

### API Testing with Swagger
1. **Access Swagger UI**: `http://localhost:8080/swagger-ui/`
2. **Authorize with JWT**: Click "Authorize" and enter token
3. **Test endpoints**: Use the interactive API documentation

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **PDF Export**: Generate detailed result reports
- [ ] **Bulk Question Upload**: Excel/CSV import for questions
- [ ] **Question Bank**: Reusable question repository
- [ ] **Advanced Analytics**: Detailed performance insights
- [ ] **Proctoring**: Anti-cheating measures
- [ ] **Mobile App**: Native mobile application
- [ ] **Offline Support**: Offline exam capability
- [ ] **Multi-language**: Internationalization support

### Technical Improvements
- [ ] **Caching**: Redis for performance optimization
- [ ] **Async Processing**: Background result calculation
- [ ] **WebSocket**: Real-time exam updates
- [ ] **File Upload**: Image-based questions
- [ ] **API Rate Limiting**: Prevent abuse
- [ ] **Comprehensive Testing**: Unit and integration tests

---

## 📝 Notes

### Development Status
- ✅ **Backend**: Complete with all core functionality
- ✅ **Frontend**: Complete with mock data integration
- ✅ **Security**: JWT-based authentication implemented
- ✅ **Documentation**: Comprehensive API documentation
- 🔄 **Integration**: Frontend-backend integration pending
- 🔄 **Testing**: End-to-end testing required

### Known Limitations
- Mock data currently used in frontend components
- PDF export feature not yet implemented
- Advanced analytics features are basic
- No offline capability
- Limited question types (MCQ only)

### Performance Considerations
- Large exam datasets may require pagination
- Real-time timer updates consume resources
- Chart rendering for large datasets needs optimization
- Database queries should be optimized for production

---

## 🤝 Contributing

To contribute to the MCQ Exam Module:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** and test thoroughly
4. **Commit changes**: `git commit -m 'Add new feature'`
5. **Push to branch**: `git push origin feature/new-feature`
6. **Create Pull Request**

### Code Standards
- Follow Java coding conventions
- Use meaningful variable and method names
- Add comprehensive comments
- Write unit tests for new features
- Update documentation for API changes

---

## 📞 Support

For technical support or questions about the MCQ Exam Module:

- **Email**: support@epathshala.com
- **Documentation**: This file and Swagger UI
- **Issues**: GitHub repository issues
- **Community**: Developer forum

---

*Last Updated: January 2024*
*Version: 1.0.0* 