package com.epathshala.controller;

import com.epathshala.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.epathshala.dto.LeaveRequestDTO;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<?> getAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getAttendance(studentId));
    }

    @GetMapping("/grades/{studentId}")
    public ResponseEntity<?> getGrades(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getGrades(studentId));
    }

    @GetMapping("/assignments/{className}")
    public ResponseEntity<?> getAssignments(@PathVariable String className) {
        return ResponseEntity.ok(studentService.getAssignmentsByClass(className));
    }

    @PostMapping("/leave")
    public ResponseEntity<?> submitLeave(@RequestBody LeaveRequestDTO dto) {
        return ResponseEntity.ok(studentService.submitLeave(dto));
    }

    @GetMapping("/leave/{studentId}")
    public ResponseEntity<?> getLeaveStatus(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getLeaveStatus(studentId));
    }
}