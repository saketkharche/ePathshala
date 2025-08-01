package com.epathshala.config;

import com.epathshala.entity.*;
import com.epathshala.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private ParentRepository parentRepository;
    
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private GradeRepository gradeRepository;
    
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Only initialize if no data exists
        if (userRepository.count() == 0) {
            System.out.println("🚀 Initializing sample data...");
            initializeSampleData();
            System.out.println("🎉 Sample data initialization completed!");
            System.out.println("📋 Available test accounts:");
            System.out.println("   👨‍💼 Admin: admin@epathshala.com / admin123");
            System.out.println("   👨‍🏫 Teacher: teacher1@epathshala.com / teacher123");
            System.out.println("   👨‍🎓 Student: student1@epathshala.com / student123");
            System.out.println("   👨‍👩‍👧‍👦 Parent: parent1@epathshala.com / parent123");
        } else {
            System.out.println("✅ Database already contains data, skipping initialization.");
        }
    }

    @Transactional
    private void initializeSampleData() {
        // Create Admin User
        User admin = createUser("Admin User", "admin@epathshala.com", "admin123", "ADMIN");
        userRepository.save(admin);
        System.out.println("✅ Admin user created");

        // Create Teachers
        User teacher1 = createUser("John Smith", "teacher1@epathshala.com", "teacher123", "TEACHER");
        User teacher2 = createUser("Sarah Johnson", "teacher2@epathshala.com", "teacher123", "TEACHER");
        User teacher3 = createUser("Mike Wilson", "teacher3@epathshala.com", "teacher123", "TEACHER");
        
        userRepository.save(teacher1);
        userRepository.save(teacher2);
        userRepository.save(teacher3);

        Teacher t1 = new Teacher();
        t1.setUser(teacher1);
        t1.setSubject("Mathematics");
        t1.setAssignedClass("Class 10A");
        teacherRepository.save(t1);

        Teacher t2 = new Teacher();
        t2.setUser(teacher2);
        t2.setSubject("Science");
        t2.setAssignedClass("Class 10B");
        teacherRepository.save(t2);

        Teacher t3 = new Teacher();
        t3.setUser(teacher3);
        t3.setSubject("English");
        t3.setAssignedClass("Class 9A");
        teacherRepository.save(t3);
        System.out.println("✅ Sample teachers created");

        // Create Parents
        User parent1 = createUser("Robert Johnson", "parent1@epathshala.com", "parent123", "PARENT");
        User parent2 = createUser("Mary Williams", "parent2@epathshala.com", "parent123", "PARENT");
        User parent3 = createUser("David Brown", "parent3@epathshala.com", "parent123", "PARENT");
        
        userRepository.save(parent1);
        userRepository.save(parent2);
        userRepository.save(parent3);

        Parent p1 = new Parent();
        p1.setUser(parent1);
        parentRepository.save(p1);

        Parent p2 = new Parent();
        p2.setUser(parent2);
        parentRepository.save(p2);

        Parent p3 = new Parent();
        p3.setUser(parent3);
        parentRepository.save(p3);
        System.out.println("✅ Sample parents created");

        // Create Students
        User student1 = createUser("Alice Johnson", "student1@epathshala.com", "student123", "STUDENT");
        User student2 = createUser("Bob Smith", "student2@epathshala.com", "student123", "STUDENT");
        User student3 = createUser("Charlie Brown", "student3@epathshala.com", "student123", "STUDENT");
        
        userRepository.save(student1);
        userRepository.save(student2);
        userRepository.save(student3);

        Student s1 = new Student();
        s1.setUser(student1);
        s1.setStudentClass("Class 10A");
        s1.setParent(p1);
        studentRepository.save(s1);

        Student s2 = new Student();
        s2.setUser(student2);
        s2.setStudentClass("Class 10B");
        s2.setParent(p2);
        studentRepository.save(s2);

        Student s3 = new Student();
        s3.setUser(student3);
        s3.setStudentClass("Class 9A");
        s3.setParent(p3);
        studentRepository.save(s3);
        System.out.println("✅ Sample students created");

        // Create Sample Data for all students
        createSampleDataForStudent(s1, t1, "Class 10A");
        createSampleDataForStudent(s2, t2, "Class 10B");
        createSampleDataForStudent(s3, t3, "Class 9A");
    }

    private User createUser(String name, String email, String password, String role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return user;
    }

    @Transactional
    private void createSampleDataForStudent(Student student, Teacher teacher, String className) {
        System.out.println("📊 Creating sample data for " + student.getUser().getName() + " (" + className + ")");
        
        // Create sample attendance records
        for (int i = 0; i < 5; i++) {
            Attendance attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setDate(LocalDate.now().minusDays(i));
            attendance.setStatus(i % 2 == 0 ? "Present" : "Absent");
            attendance.setMarkedBy(teacher);
            attendanceRepository.save(attendance);
        }
        
        // Create sample grades
        String[] subjects = {"Mathematics", "Science", "English"};
        for (String subject : subjects) {
            Grade grade = new Grade();
            grade.setStudent(student);
            grade.setSubject(subject);
            grade.setMarks(85.0 + Math.random() * 15.0);
            grade.setTeacher(teacher);
            gradeRepository.save(grade);
        }
        
        // Create sample assignments
        String[] assignmentTitles = {"Math Homework", "Science Project", "English Essay"};
        String[] fileUrls = {
            "/api/files/assignments/1753983287395_database.pdf",
            "/api/files/assignments/1754043875194_database.pdf", 
            "/api/files/assignments/1753983287395_database.pdf"
        };
        for (int i = 0; i < assignmentTitles.length; i++) {
            Assignment assignment = new Assignment();
            assignment.setTitle(assignmentTitles[i]);
            assignment.setSubject(subjects[i]);
            assignment.setClassName(className);
            assignment.setDueDate(LocalDate.now().plusDays(7));
            assignment.setFileUrl(fileUrls[i]);
            assignment.setTeacher(teacher);
            assignmentRepository.save(assignment);
        }
        
        // Create sample leave requests
        String[] reasons = {"Medical appointment", "Family function", "Personal emergency"};
        for (int i = 0; i < reasons.length; i++) {
            LeaveRequest leaveRequest = new LeaveRequest();
            leaveRequest.setStudent(student);
            leaveRequest.setReason(reasons[i]);
            leaveRequest.setFromDate(LocalDate.now().plusDays(i + 1));
            leaveRequest.setToDate(LocalDate.now().plusDays(i + 2));
            leaveRequest.setTeacherApproval("Pending");
            leaveRequest.setParentApproval("Pending");
            leaveRequest.setStatus("Pending");
            leaveRequestRepository.save(leaveRequest);
        }
        
        System.out.println("✅ Sample data created for " + student.getUser().getName());
    }
} 