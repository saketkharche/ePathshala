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

    public List<Attendance> getAttendance(Long studentId) {
        return attendanceRepository.findAll().stream()
            .filter(a -> a.getStudent().getId().equals(studentId))
            .toList();
    }

    public List<Grade> getGrades(Long studentId) {
        return gradeRepository.findAll().stream()
            .filter(g -> g.getStudent().getId().equals(studentId))
            .toList();
    }

    public List<Assignment> getAssignmentsByClass(String className) {
        return assignmentRepository.findAll().stream()
            .filter(a -> className.equals(a.getClassName()))
            .toList();
    }

    public Map<String, Object> submitLeave(LeaveRequestDTO dto) {
        LeaveRequest leave = new LeaveRequest();
        leave.setStudent(studentRepository.findById(dto.getStudentId()).orElse(null));
        leave.setReason(dto.getReason());
        leave.setFromDate(dto.getFromDate());
        leave.setToDate(dto.getToDate());
        leave.setTeacherApproval("Pending");
        leave.setParentApproval("Pending");
        leave.setStatus("Pending");
        leaveRequestRepository.save(leave);
        return Map.of("leaveId", leave.getId());
    }

    public List<LeaveRequest> getLeaveStatus(Long studentId) {
        return leaveRequestRepository.findAll().stream()
            .filter(l -> l.getStudent().getId().equals(studentId))
            .toList();
    }
}