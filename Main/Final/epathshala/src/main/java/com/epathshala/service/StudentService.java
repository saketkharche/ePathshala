package com.epathshala.service;

import com.epathshala.entity.Attendance;
import com.epathshala.repository.AttendanceRepository;
import com.epathshala.entity.Grade;
import com.epathshala.repository.GradeRepository;
import com.epathshala.entity.Assignment;
import com.epathshala.repository.AssignmentRepository;
import com.epathshala.dto.LeaveRequestDTO;
import com.epathshala.entity.LeaveRequest;
import com.epathshala.repository.LeaveRequestRepository;
import com.epathshala.entity.Student;
import com.epathshala.repository.StudentRepository;
import com.epathshala.entity.User;
import com.epathshala.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;

    private Student findStudentByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            System.out.println("❌ User not found for ID: " + userId);
            return null;
        }
        
        Student student = studentRepository.findAll().stream()
            .filter(s -> s.getUser().getId().equals(userId))
            .findFirst()
            .orElse(null);
            
        if (student == null) {
            System.out.println("❌ Student not found for User ID: " + userId);
            return null;
        }
        
        System.out.println("✅ Found student: " + student.getUser().getName() + " (ID: " + student.getId() + ") for User ID: " + userId);
        return student;
    }

    public List<Attendance> getAttendance(Long userId) {
        System.out.println("🔍 Getting attendance for user ID: " + userId);
        Student student = findStudentByUserId(userId);
        if (student == null) {
            System.out.println("❌ No student found for user ID: " + userId);
            return List.of();
        }
        
        List<Attendance> allAttendance = attendanceRepository.findAll();
        System.out.println("📊 Total attendance records in DB: " + allAttendance.size());
        
        List<Attendance> studentAttendance = allAttendance.stream()
            .filter(a -> a.getStudent().getId().equals(student.getId()))
            .toList();
        
        System.out.println("✅ Found " + studentAttendance.size() + " attendance records for student " + student.getId());
        return studentAttendance;
    }

    public List<Grade> getGrades(Long userId) {
        System.out.println("🔍 Getting grades for user ID: " + userId);
        Student student = findStudentByUserId(userId);
        if (student == null) {
            System.out.println("❌ No student found for user ID: " + userId);
            return List.of();
        }
        
        List<Grade> allGrades = gradeRepository.findAll();
        System.out.println("📊 Total grade records in DB: " + allGrades.size());
        
        List<Grade> studentGrades = allGrades.stream()
            .filter(g -> g.getStudent().getId().equals(student.getId()))
            .toList();
        
        System.out.println("✅ Found " + studentGrades.size() + " grade records for student " + student.getId());
        return studentGrades;
    }

    public List<Assignment> getAssignmentsByClass(String className) {
        System.out.println("🔍 Getting assignments for class: " + className);
        List<Assignment> allAssignments = assignmentRepository.findAll();
        System.out.println("📊 Total assignment records in DB: " + allAssignments.size());
        
        List<Assignment> classAssignments = allAssignments.stream()
            .filter(a -> className.equals(a.getClassName()))
            .toList();
        
        System.out.println("✅ Found " + classAssignments.size() + " assignment records for class " + className);
        return classAssignments;
    }

    public Map<String, Object> submitLeave(LeaveRequestDTO dto) {
        Student student = findStudentByUserId(dto.getStudentId());
        if (student == null) {
            return Map.of("error", "Student not found");
        }
        
        LeaveRequest leave = new LeaveRequest();
        leave.setStudent(student);
        leave.setReason(dto.getReason());
        leave.setFromDate(dto.getFromDate());
        leave.setToDate(dto.getToDate());
        leave.setTeacherApproval("Pending");
        leave.setParentApproval("Pending");
        leave.setStatus("Pending");
        leaveRequestRepository.save(leave);
        return Map.of("leaveId", leave.getId());
    }

    public List<LeaveRequest> getLeaveStatus(Long userId) {
        System.out.println("🔍 Getting leave status for user ID: " + userId);
        Student student = findStudentByUserId(userId);
        if (student == null) {
            System.out.println("❌ No student found for user ID: " + userId);
            return List.of();
        }
        
        List<LeaveRequest> allLeaves = leaveRequestRepository.findAll();
        System.out.println("📊 Total leave records in DB: " + allLeaves.size());
        
        List<LeaveRequest> studentLeaves = allLeaves.stream()
            .filter(l -> l.getStudent().getId().equals(student.getId()))
            .toList();
        
        System.out.println("✅ Found " + studentLeaves.size() + " leave records for student " + student.getId());
        return studentLeaves;
    }
}