package com.epathshala.config;

import com.epathshala.entity.User;
import com.epathshala.entity.Student;
import com.epathshala.entity.Teacher;
import com.epathshala.entity.Parent;
import com.epathshala.entity.Attendance;
import com.epathshala.entity.Grade;
import com.epathshala.entity.Assignment;
import com.epathshala.repository.UserRepository;
import com.epathshala.repository.StudentRepository;
import com.epathshala.repository.TeacherRepository;
import com.epathshala.repository.ParentRepository;
import com.epathshala.repository.AttendanceRepository;
import com.epathshala.repository.GradeRepository;
import com.epathshala.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createAdminUser();
        createSampleTeachers();
        createSampleParents();
        createSampleStudents();
        createSampleData();
        System.out.println("🎉 Sample data initialization completed!");
        System.out.println("📋 Available test accounts:");
        System.out.println("   👨‍💼 Admin: admin@epathshala.com / admin123");
        System.out.println("   👨‍🏫 Teacher: teacher@epathshala.com / teacher123");
        System.out.println("   👨‍🎓 Student: student@epathshala.com / student123");
        System.out.println("   👨‍👩‍👧‍👦 Parent: parent@epathshala.com / parent123");
    }

    private void createAdminUser() {
        if (!userRepository.findByEmail("admin@epathshala.com").isPresent()) {
            User adminUser = new User();
            adminUser.setName("System Administrator");
            adminUser.setEmail("admin@epathshala.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole("ADMIN");
            adminUser.setAccountNumber("ADMIN001");
            userRepository.save(adminUser);
            System.out.println("✅ Admin user created successfully!");
        }
    }

    private void createSampleTeachers() {
        if (!userRepository.findByEmail("teacher@epathshala.com").isPresent()) {
            User teacherUser = new User();
            teacherUser.setName("John Smith");
            teacherUser.setEmail("teacher@epathshala.com");
            teacherUser.setPassword(passwordEncoder.encode("teacher123"));
            teacherUser.setRole("TEACHER");
            teacherUser.setAccountNumber("TCH001");
            userRepository.save(teacherUser);
            Teacher teacher = new Teacher();
            teacher.setUser(teacherUser);
            teacher.setSubject("Mathematics");
            teacher.setAssignedClass("Class 10A");
            teacherRepository.save(teacher);
            System.out.println("✅ Sample teacher created successfully!");
        }
    }

    private void createSampleParents() {
        if (!userRepository.findByEmail("parent@epathshala.com").isPresent()) {
            User parentUser = new User();
            parentUser.setName("Robert Johnson");
            parentUser.setEmail("parent@epathshala.com");
            parentUser.setPassword(passwordEncoder.encode("parent123"));
            parentUser.setRole("PARENT");
            parentUser.setAccountNumber("PRT001");
            userRepository.save(parentUser);
            Parent parent = new Parent();
            parent.setUser(parentUser);
            parentRepository.save(parent);
            System.out.println("✅ Sample parent created successfully!");
        }
    }

    private void createSampleStudents() {
        if (!userRepository.findByEmail("student@epathshala.com").isPresent()) {
            User studentUser = new User();
            studentUser.setName("Alice Johnson");
            studentUser.setEmail("student@epathshala.com");
            studentUser.setPassword(passwordEncoder.encode("student123"));
            studentUser.setRole("STUDENT");
            studentUser.setAccountNumber("STD001");
            userRepository.save(studentUser);
            User parentUser = userRepository.findByEmail("parent@epathshala.com").orElse(null);
            Parent parent = parentUser != null ? parentRepository.findByUser(parentUser).orElse(null) : null;
            Student student = new Student();
            student.setUser(studentUser);
            student.setStudentClass("Class 10A");
            student.setParent(parent);
            studentRepository.save(student);
            System.out.println("✅ Sample student created successfully!");
        }
    }

    private void createSampleData() {
        // Get the sample student and teacher
        List<Student> students = studentRepository.findAll();
        List<Teacher> teachers = teacherRepository.findAll();
        Student student = students.isEmpty() ? null : students.get(0);
        Teacher teacher = teachers.isEmpty() ? null : teachers.get(0);
        
        if (student != null && teacher != null) {
            // Create sample attendance records
            if (attendanceRepository.findAll().isEmpty()) {
                for (int i = 1; i <= 5; i++) {
                    Attendance attendance = new Attendance();
                    attendance.setStudent(student);
                    attendance.setDate(LocalDate.now().minusDays(i));
                    attendance.setStatus(i % 3 == 0 ? "ABSENT" : "PRESENT");
                    attendanceRepository.save(attendance);
                }
                System.out.println("✅ Sample attendance records created!");
            }

            // Create sample grades
            if (gradeRepository.findAll().isEmpty()) {
                String[] subjects = {"Mathematics", "Science", "English", "History"};
                for (String subject : subjects) {
                    Grade grade = new Grade();
                    grade.setStudent(student);
                    grade.setSubject(subject);
                    grade.setMarks(75.0 + (Math.random() * 25)); // Random marks between 75-100
                    grade.setTeacher(teacher);
                    gradeRepository.save(grade);
                }
                System.out.println("✅ Sample grades created!");
            }

            // Create sample assignments
            if (assignmentRepository.findAll().isEmpty()) {
                String[] titles = {"Math Homework", "Science Project", "English Essay", "History Report"};
                String[] subjects = {"Mathematics", "Science", "English", "History"};
                for (int i = 0; i < titles.length; i++) {
                    Assignment assignment = new Assignment();
                    assignment.setTitle(titles[i]);
                    assignment.setSubject(subjects[i]);
                    assignment.setClassName("Class 10A");
                    assignment.setDueDate(LocalDate.now().plusDays(7 + i));
                    assignment.setTeacher(teacher);
                    assignmentRepository.save(assignment);
                }
                System.out.println("✅ Sample assignments created!");
            }
        }
    }
} 