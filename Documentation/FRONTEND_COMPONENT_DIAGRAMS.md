# Frontend Component Diagrams - Multiple Formats

## 1. React Component Hierarchy (Mermaid)

```mermaid
graph TD
    A[App.jsx] --> B[AppRoutes.jsx]
    B --> C[PublicLayout]
    B --> D[ProtectedLayout]
    
    C --> E[HomePage]
    C --> F[LoginPage]
    C --> G[AboutUs]
    C --> H[ContactUs]
    
    D --> I[UnifiedDashboardLayout]
    I --> J[AdminDashboard]
    I --> K[StudentDashboard]
    I --> L[TeacherDashboard]
    I --> M[ParentDashboard]
    
    J --> N[AdminSummary]
    J --> O[UserManagement]
    J --> P[AdminAcademicCalendar]
    J --> Q[AdminOnlineClasses]
    
    K --> R[StudentOverview]
    K --> S[StudentExams]
    K --> T[StudentAssignments]
    K --> U[StudentGrades]
    K --> V[StudentAttendance]
    
    L --> W[TeacherOverview]
    L --> X[TeacherExams]
    L --> Y[TeacherAssignments]
    L --> Z[TeacherAttendance]
    L --> AA[TeacherGrades]
    
    M --> BB[ParentOverview]
    M --> CC[ParentChildProgress]
    M --> DD[ParentLeaveApprovals]
    M --> EE[ParentCalendar]
```

## 2. Component Architecture (Mermaid)

```mermaid
graph TB
    subgraph "Layout Components"
        A[UnifiedDashboardLayout]
        B[AdminDashboardLayout]
        C[StudentDashboardLayout]
        D[TeacherDashboardLayout]
        E[ParentDashboardLayout]
        F[PublicLayout]
    end
    
    subgraph "Navigation Components"
        G[UnifiedNavigation]
        H[Sidebar]
        I[Navbar]
        J[Breadcrumb]
    end
    
    subgraph "Dashboard Components"
        K[StudentOverview]
        L[TeacherOverview]
        M[ParentOverview]
        N[AdminStatsCard]
        O[AdminActivityFeed]
    end
    
    subgraph "Feature Components"
        P[ExamCard]
        Q[MCQExamInterface]
        R[AssignmentCard]
        S[AssignmentSubmission]
        T[Chat]
        U[JitsiMeet]
        V[Notifications]
    end
    
    subgraph "UI Components"
        W[LoadingSpinner]
        X[ErrorMessage]
        Y[EmptyState]
        Z[FormikForm]
    end
    
    A --> G
    A --> H
    A --> I
    B --> G
    C --> G
    D --> G
    E --> G
    
    A --> K
    A --> L
    A --> M
    A --> N
    A --> O
    
    A --> P
    A --> Q
    A --> R
    A --> S
    A --> T
    A --> U
    A --> V
    
    A --> W
    A --> X
    A --> Y
    A --> Z
```

## 3. State Management Flow (Mermaid)

```mermaid
graph LR
    subgraph "Component State"
        A[useState]
        B[useEffect]
        C[useContext]
    end
    
    subgraph "API State"
        D[useApi Hook]
        E[API Services]
        F[HTTP Client]
    end
    
    subgraph "Authentication State"
        G[Auth Context]
        H[JWT Token]
        I[User Role]
    end
    
    subgraph "Real-time State"
        J[WebSocket]
        K[STOMP Client]
        L[Live Updates]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
```

## 4. Component Communication (Mermaid)

```mermaid
sequenceDiagram
    participant Parent as Parent Component
    participant Child as Child Component
    participant API as API Service
    participant Backend as Backend API
    
    Parent->>Child: Pass Props
    Child->>Parent: Callback Function
    Parent->>API: API Call
    API->>Backend: HTTP Request
    Backend-->>API: Response
    API-->>Parent: Data
    Parent->>Child: Update Props
    Child->>Child: Re-render
```

## 5. Routing Structure (Mermaid)

```mermaid
graph TD
    A[AppRoutes] --> B[Public Routes]
    A --> C[Protected Routes]
    
    B --> D[/ - HomePage]
    B --> E[/login - LoginPage]
    B --> F[/about - AboutUs]
    B --> G[/contact - ContactUs]
    
    C --> H[/dashboard - Dashboard]
    C --> I[/admin - Admin Routes]
    C --> J[/student - Student Routes]
    C --> K[/teacher - Teacher Routes]
    C --> L[/parent - Parent Routes]
    
    I --> M[/admin/users - UserManagement]
    I --> N[/admin/calendar - AcademicCalendar]
    I --> O[/admin/classes - OnlineClasses]
    
    J --> P[/student/exams - StudentExams]
    J --> Q[/student/assignments - StudentAssignments]
    J --> R[/student/grades - StudentGrades]
    
    K --> S[/teacher/exams - TeacherExams]
    K --> T[/teacher/assignments - TeacherAssignments]
    K --> U[/teacher/attendance - TeacherAttendance]
    
    L --> V[/parent/progress - ChildProgress]
    L --> W[/parent/approvals - LeaveApprovals]
    L --> X[/parent/calendar - ParentCalendar]
```

## 6. Material-UI Theme Structure (Mermaid)

```mermaid
graph TB
    A[Theme Provider] --> B[Color Palette]
    A --> C[Typography]
    A --> D[Spacing]
    A --> E[Components]
    
    B --> F[Primary Colors]
    B --> G[Secondary Colors]
    B --> H[Error Colors]
    B --> I[Warning Colors]
    B --> J[Info Colors]
    B --> K[Success Colors]
    
    C --> L[Font Family]
    C --> M[Font Sizes]
    C --> N[Font Weights]
    C --> O[Line Heights]
    
    D --> P[Margin]
    D --> Q[Padding]
    D --> R[Gap]
    
    E --> S[Button Variants]
    E --> T[Card Variants]
    E --> U[TextField Variants]
    E --> V[AppBar Variants]
```

## 7. API Integration Flow (Mermaid)

```mermaid
graph LR
    subgraph "Frontend API Layer"
        A[API Services]
        B[HTTP Client]
        C[Request Interceptors]
        D[Response Interceptors]
    end
    
    subgraph "Authentication"
        E[JWT Token]
        F[Token Refresh]
        G[Logout Handling]
    end
    
    subgraph "Error Handling"
        H[Error Boundaries]
        I[Toast Notifications]
        J[Retry Logic]
    end
    
    A --> B
    B --> C
    B --> D
    C --> E
    D --> F
    D --> G
    A --> H
    A --> I
    A --> J
```

## 8. Component Lifecycle (Mermaid)

```mermaid
graph TD
    A[Component Mount] --> B[useEffect - Initial Load]
    B --> C[API Call]
    C --> D[State Update]
    D --> E[Component Render]
    
    E --> F[User Interaction]
    F --> G[State Change]
    G --> H[Re-render]
    
    H --> I[useEffect - Dependency Change]
    I --> J[API Call]
    J --> K[State Update]
    K --> L[Re-render]
    
    L --> M[Component Unmount]
    M --> N[Cleanup]
```

## 9. Form Handling Flow (Mermaid)

```mermaid
graph TD
    A[Form Component] --> B[Formik Form]
    B --> C[Yup Validation]
    C --> D{Validation Pass?}
    
    D -->|No| E[Show Errors]
    D -->|Yes| F[Submit Handler]
    
    F --> G[API Call]
    G --> H{API Success?}
    
    H -->|No| I[Show Error Message]
    H -->|Yes| J[Success Message]
    
    E --> K[User Correction]
    I --> K
    J --> L[Form Reset]
    K --> C
```

## 10. Real-time Updates Flow (Mermaid)

```mermaid
sequenceDiagram
    participant Component as React Component
    participant WebSocket as WebSocket Client
    participant Backend as Backend WebSocket
    participant Database as Database
    
    Component->>WebSocket: Connect
    WebSocket->>Backend: Establish Connection
    Backend-->>WebSocket: Connection Established
    WebSocket-->>Component: Connected
    
    Backend->>Database: Data Change
    Database-->>Backend: Updated Data
    Backend->>WebSocket: Send Update
    WebSocket->>Component: Receive Update
    Component->>Component: Update State
    Component->>Component: Re-render
```

## 11. File Upload Component Flow (Mermaid)

```mermaid
graph TD
    A[File Upload Component] --> B[File Selection]
    B --> C[File Validation]
    C --> D{Valid File?}
    
    D -->|No| E[Show Error]
    D -->|Yes| F[Upload Progress]
    
    F --> G[FormData Creation]
    G --> H[API Upload Call]
    H --> I{Upload Success?}
    
    I -->|No| J[Show Upload Error]
    I -->|Yes| K[Show Success]
    
    E --> L[User Correction]
    J --> L
    K --> M[Reset Form]
    L --> B
```

## 12. Responsive Design Flow (Mermaid)

```mermaid
graph TD
    A[Device Detection] --> B{Screen Size}
    
    B -->|Mobile| C[Mobile Layout]
    B -->|Tablet| D[Tablet Layout]
    B -->|Desktop| E[Desktop Layout]
    
    C --> F[Mobile Components]
    D --> G[Tablet Components]
    E --> H[Desktop Components]
    
    F --> I[Mobile Navigation]
    G --> J[Tablet Navigation]
    H --> K[Desktop Navigation]
    
    I --> L[Mobile Sidebar]
    J --> M[Tablet Sidebar]
    K --> N[Desktop Sidebar]
```

## 13. Component Testing Structure (Mermaid)

```mermaid
graph TB
    subgraph "Unit Tests"
        A[Component Tests]
        B[Hook Tests]
        C[Utility Tests]
    end
    
    subgraph "Integration Tests"
        D[API Integration]
        E[Form Integration]
        F[Routing Integration]
    end
    
    subgraph "E2E Tests"
        G[User Flows]
        H[Authentication Flow]
        I[Feature Flows]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
```

## 14. Performance Optimization (Mermaid)

```mermaid
graph TD
    A[Performance Monitoring] --> B[Bundle Analysis]
    A --> C[Component Profiling]
    A --> D[API Performance]
    
    B --> E[Code Splitting]
    B --> F[Lazy Loading]
    B --> G[Tree Shaking]
    
    C --> H[React.memo]
    C --> I[useMemo]
    C --> J[useCallback]
    
    D --> K[Request Caching]
    D --> L[Response Caching]
    D --> M[Pagination]
```

## 15. Error Handling Architecture (Mermaid)

```mermaid
graph TB
    subgraph "Error Boundaries"
        A[Global Error Boundary]
        B[Route Error Boundary]
        C[Component Error Boundary]
    end
    
    subgraph "Error Types"
        D[API Errors]
        E[Validation Errors]
        F[Network Errors]
        G[Authentication Errors]
    end
    
    subgraph "Error Handling"
        H[Error Logging]
        I[User Notifications]
        J[Fallback UI]
        K[Retry Mechanisms]
    end
    
    A --> D
    B --> E
    C --> F
    A --> G
    
    D --> H
    E --> I
    F --> J
    G --> K
```

## 16. Component Props Flow (Mermaid)

```mermaid
graph LR
    A[Parent Component] --> B[Props]
    B --> C[Child Component]
    C --> D[State Update]
    D --> E[Callback Function]
    E --> F[Parent State Update]
    F --> A
    
    G[Context Provider] --> H[Context Value]
    H --> I[Consumer Component]
    I --> J[Context Update]
    J --> G
```

## 17. Build and Deployment Flow (Mermaid)

```mermaid
graph TD
    A[Source Code] --> B[Vite Build]
    B --> C[Bundle Optimization]
    C --> D[Asset Generation]
    D --> E[Build Output]
    
    E --> F[Static Files]
    E --> G[HTML Files]
    E --> H[CSS Files]
    E --> I[JS Files]
    
    F --> J[Deployment]
    G --> J
    H --> J
    I --> J
    
    J --> K[Production Server]
    K --> L[CDN]
    L --> M[User Browser]
```

## 18. Component Reusability (Mermaid)

```mermaid
graph TB
    subgraph "Reusable Components"
        A[Button]
        B[Input]
        C[Card]
        D[Modal]
        E[Table]
        F[Form]
    end
    
    subgraph "Feature Components"
        G[ExamCard]
        H[AssignmentCard]
        I[UserCard]
        J[NotificationCard]
    end
    
    subgraph "Layout Components"
        K[DashboardLayout]
        L[PageLayout]
        M[FormLayout]
        N[ListLayout]
    end
    
    A --> G
    B --> H
    C --> I
    D --> J
    E --> K
    F --> L
    A --> M
    B --> N
```

## 19. State Management Patterns (Mermaid)

```mermaid
graph TD
    A[Component State] --> B[Local State]
    A --> C[Shared State]
    
    B --> D[useState]
    B --> E[useReducer]
    
    C --> F[Context API]
    C --> G[Custom Hooks]
    C --> H[Props Drilling]
    
    F --> I[Auth Context]
    F --> J[Theme Context]
    F --> K[Notification Context]
    
    G --> L[useApi]
    G --> M[useAuth]
    G --> N[useNotifications]
```

## 20. Component Composition (Mermaid)

```mermaid
graph TB
    A[Container Component] --> B[Presentation Component]
    A --> C[Logic Component]
    A --> D[Data Component]
    
    B --> E[UI Elements]
    C --> F[Business Logic]
    D --> G[API Calls]
    
    E --> H[Styling]
    F --> I[State Management]
    G --> J[Data Processing]
    
    H --> K[Theme Application]
    I --> L[Event Handling]
    J --> M[Data Transformation]
```

---

*These diagrams provide a comprehensive view of the frontend architecture, component relationships, and data flow patterns in the React application.*
