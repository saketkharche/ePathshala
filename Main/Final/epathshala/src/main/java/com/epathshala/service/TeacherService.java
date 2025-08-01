package com.epathshala.service;

import com.epathshala.dto.AttendanceDTO;
import com.epathshala.entity.Attendance;
import com.epathshala.entity.Student;
import com.epathshala.entity.Teacher;
import com.epathshala.repository.AttendanceRepository;
import com.epathshala.repository.StudentRepository;
import com.epathshala.repository.TeacherRepository;
import com.epathshala.dto.GradeDTO;
import com.epathshala.entity.Grade;
import com.epathshala.repository.GradeRepository;
import com.epathshala.dto.AssignmentDTO;
import com.epathshala.entity.Assignment;
import com.epathshala.repository.AssignmentRepository;
import com.epathshala.dto.LeaveRequestDTO;
import com.epathshala.dto.LeaveApprovalDTO;
import com.epathshala.entity.LeaveRequest;
import com.epathshala.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.web.client.RestTemplate;

@Service
public class TeacherService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    private void notifyAssignment(Assignment assignment) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForObject("http://localhost:8081/api/notify/assignment", Map.of("title", assignment.getTitle()), String.class);
        } catch (Exception ignored) {}
    }
    private void notifyLeaveApproval(String status) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForObject("http://localhost:8081/api/notify/leaveApproval", Map.of("status", status), String.class);
        } catch (Exception ignored) {}
    }

    public Map<String, Object> markAttendance(AttendanceDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId()).orElse(null);
        if (student == null) {
            return Map.of("error", "Student not found");
        }
        // For demo, assume teacher is the first in the repo (in real app, get from auth context)
        Teacher teacher = teacherRepository.findAll().stream().findFirst().orElse(null);
        if (teacher == null) {
            return Map.of("error", "Teacher not found");
        }
        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setDate(dto.getDate() != null ? dto.getDate() : LocalDate.now());
        attendance.setStatus(dto.getStatus());
        attendance.setMarkedBy(teacher);
        attendanceRepository.save(attendance);
        return Map.of("attendanceId", attendance.getId());
    }

    public List<Attendance> getAttendanceByClass(String className) {
        // Fetch all students in the class
        List<Student> students = studentRepository.findAll();
        List<Long> studentIds = students.stream()
            .filter(s -> className.equals(s.getStudentClass()))
            .map(Student::getId)
            .toList();
        // Fetch attendance for these students
        List<Attendance> attendanceList = attendanceRepository.findAll();
        return attendanceList.stream()
            .filter(a -> studentIds.contains(a.getStudent().getId()))
            .toList();
    }

    public Map<String, Object> enterGrade(GradeDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId()).orElse(null);
        if (student == null) {
            return Map.of("error", "Student not found");
        }
        // For demo, assume teacher is the first in the repo (in real app, get from auth context)
        Teacher teacher = teacherRepository.findAll().stream().findFirst().orElse(null);
        if (teacher == null) {
            return Map.of("error", "Teacher not found");
        }
        Grade grade = new Grade();
        grade.setStudent(student);
        grade.setSubject(dto.getSubject());
        grade.setMarks(dto.getMarks());
        grade.setTeacher(teacher);
        gradeRepository.save(grade);
        return Map.of("gradeId", grade.getId());
    }

    public List<Grade> getGradesByClass(String className) {
        List<Student> students = studentRepository.findAll();
        List<Long> studentIds = students.stream()
            .filter(s -> className.equals(s.getStudentClass()))
            .map(Student::getId)
            .toList();
        List<Grade> grades = gradeRepository.findAll();
        return grades.stream()
            .filter(g -> studentIds.contains(g.getStudent().getId()))
            .toList();
    }

    public Map<String, Object> uploadAssignment(AssignmentDTO dto) {
        // For demo, assume teacher is the first in the repo (in real app, get from auth context)
        Teacher teacher = teacherRepository.findAll().stream().findFirst().orElse(null);
        if (teacher == null) {
            return Map.of("error", "Teacher not found");
        }
        Assignment assignment = new Assignment();
        assignment.setTitle(dto.getTitle());
        assignment.setFileUrl(dto.getFileUrl());
        assignment.setDueDate(dto.getDueDate());
        assignment.setSubject(dto.getSubject());
        assignment.setClassName(dto.getClassName());
        assignment.setTeacher(teacher);
        assignmentRepository.save(assignment);
        notifyAssignment(assignment);
        return Map.of("assignmentId", assignment.getId());
    }

    public List<Assignment> getAssignmentsByClass(String className) {
        return assignmentRepository.findAll().stream()
            .filter(a -> className.equals(a.getClassName()))
            .toList();
    }

    public List<LeaveRequest> getLeavesByClass(String className) {
        List<Student> students = studentRepository.findAll();
        List<Long> studentIds = students.stream()
            .filter(s -> className.equals(s.getStudentClass()))
            .map(Student::getId)
            .toList();
        return leaveRequestRepository.findAll().stream()
            .filter(l -> studentIds.contains(l.getStudent().getId()))
            .toList();
    }

    public Map<String, Object> approveLeave(LeaveApprovalDTO dto) {
        LeaveRequest leave = leaveRequestRepository.findById(dto.getLeaveId()).orElse(null);
        if (leave == null) {
            return Map.of("error", "Leave request not found");
        }
        if ("TEACHER".equalsIgnoreCase(dto.getApproverRole())) {
            leave.setTeacherApproval(dto.getApprovalStatus());
        } else if ("PARENT".equalsIgnoreCase(dto.getApproverRole())) {
            leave.setParentApproval(dto.getApprovalStatus());
        }
        // Final status logic
        if ("Approved".equalsIgnoreCase(leave.getTeacherApproval()) && "Approved".equalsIgnoreCase(leave.getParentApproval())) {
            leave.setStatus("Approved");
        } else if ("Rejected".equalsIgnoreCase(leave.getTeacherApproval()) || "Rejected".equalsIgnoreCase(leave.getParentApproval())) {
            leave.setStatus("Rejected");
        } else {
            leave.setStatus("Pending");
        }
        leaveRequestRepository.save(leave);
        notifyLeaveApproval(leave.getStatus());
        return Map.of("leaveId", leave.getId(), "status", leave.getStatus());
    }
}