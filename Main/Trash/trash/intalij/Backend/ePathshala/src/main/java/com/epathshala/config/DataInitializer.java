package com.epathshala.config;

import com.epathshala.entity.User;
import com.epathshala.entity.Student;
import com.epathshala.entity.Teacher;
import com.epathshala.entity.Parent;
import com.epathshala.repository.UserRepository;
import com.epathshala.repository.StudentRepository;
import com.epathshala.repository.TeacherRepository;
import com.epathshala.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createAdminUser();
        createSampleTeachers();
        createSampleParents();
        createSampleStudents();
        
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
            // Create teacher user
            User teacherUser = new User();
            teacherUser.setName("John Smith");
            teacherUser.setEmail("teacher@epathshala.com");
            teacherUser.setPassword(passwordEncoder.encode("teacher123"));
            teacherUser.setRole("TEACHER");
            teacherUser.setAccountNumber("TCH001");
            userRepository.save(teacherUser);

            // Create teacher entity
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
            // Create parent user
            User parentUser = new User();
            parentUser.setName("Robert Johnson");
            parentUser.setEmail("parent@epathshala.com");
            parentUser.setPassword(passwordEncoder.encode("parent123"));
            parentUser.setRole("PARENT");
            parentUser.setAccountNumber("PRT001");
            userRepository.save(parentUser);

            // Create parent entity
            Parent parent = new Parent();
            parent.setUser(parentUser);
            parentRepository.save(parent);
            
            System.out.println("✅ Sample parent created successfully!");
        }
    }

    private void createSampleStudents() {
        if (!userRepository.findByEmail("student@epathshala.com").isPresent()) {
            // Create student user
            User studentUser = new User();
            studentUser.setName("Alice Johnson");
            studentUser.setEmail("student@epathshala.com");
            studentUser.setPassword(passwordEncoder.encode("student123"));
            studentUser.setRole("STUDENT");
            studentUser.setAccountNumber("STD001");
            userRepository.save(studentUser);

            // Get the parent for linking
            User parentUser = userRepository.findByEmail("parent@epathshala.com").orElse(null);
            Parent parent = parentUser != null ? parentRepository.findByUser(parentUser).orElse(null) : null;

            // Create student entity
            Student student = new Student();
            student.setUser(studentUser);
            student.setStudentClass("Class 10A");
            student.setParent(parent);
            studentRepository.save(student);
            
            System.out.println("✅ Sample student created successfully!");
        }
    }
} 