package com.epathshala.service;

import com.epathshala.entity.Parent;
import com.epathshala.entity.Student;
import com.epathshala.entity.Attendance;
import com.epathshala.entity.Grade;
import com.epathshala.repository.ParentRepository;
import com.epathshala.repository.AttendanceRepository;
import com.epathshala.repository.GradeRepository;
import com.epathshala.dto.LeaveApprovalDTO;
import com.epathshala.entity.LeaveRequest;
import com.epathshala.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ParentService {
    @Autowired
    private ParentRepository parentRepository;
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public List<Attendance> getChildAttendance(Long parentId) {
        Parent parent = parentRepository.findById(parentId).orElse(null);
        if (parent == null || parent.getStudent() == null) {
            return List.of();
        }
        Long studentId = parent.getStudent().getId();
        return attendanceRepository.findAll().stream()
            .filter(a -> a.getStudent().getId().equals(studentId))
            .toList();
    }

    public List<Grade> getChildGrades(Long parentId) {
        Parent parent = parentRepository.findById(parentId).orElse(null);
        if (parent == null || parent.getStudent() == null) {
            return List.of();
        }
        Long studentId = parent.getStudent().getId();
        return gradeRepository.findAll().stream()
            .filter(g -> g.getStudent().getId().equals(studentId))
            .toList();
    }

    public Map<String, Object> approveLeave(LeaveApprovalDTO dto) {
        LeaveRequest leave = leaveRequestRepository.findById(dto.getLeaveId()).orElse(null);
        if (leave == null) {
            return Map.of("error", "Leave request not found");
        }
        if ("PARENT".equalsIgnoreCase(dto.getApproverRole())) {
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
        return Map.of("leaveId", leave.getId(), "status", leave.getStatus());
    }
}