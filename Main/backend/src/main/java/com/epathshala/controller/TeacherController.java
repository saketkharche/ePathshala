package com.epathshala.controller;

import com.epathshala.dto.AttendanceDTO;
import com.epathshala.dto.GradeDTO;
import com.epathshala.dto.AssignmentDTO;
import com.epathshala.dto.LeaveApprovalDTO;
import com.epathshala.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/teacher")
@PreAuthorize("hasRole('TEACHER')")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceDTO dto) {
        return ResponseEntity.ok(teacherService.markAttendance(dto));
    }

    @GetMapping("/attendance/{className}")
    public ResponseEntity<?> getAttendanceByClass(@PathVariable String className) {
        return ResponseEntity.ok(teacherService.getAttendanceByClass(className));
    }

    @PostMapping("/grades")
    public ResponseEntity<?> enterGrade(@RequestBody GradeDTO dto) {
        return ResponseEntity.ok(teacherService.enterGrade(dto));
    }

    @GetMapping("/grades/{className}")
    public ResponseEntity<?> getGradesByClass(@PathVariable String className) {
        return ResponseEntity.ok(teacherService.getGradesByClass(className));
    }

    @PostMapping("/assignments")
    public ResponseEntity<?> uploadAssignment(@RequestBody AssignmentDTO dto) {
        return ResponseEntity.ok(teacherService.uploadAssignment(dto));
    }

    @PostMapping("/assignments/upload")
    public ResponseEntity<?> uploadAssignmentFile(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/assignments";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            String fileUrl = "/" + uploadDir + "/" + fileName;
            return ResponseEntity.ok().body(fileUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/assignments/{className}")
    public ResponseEntity<?> getAssignmentsByClass(@PathVariable String className) {
        return ResponseEntity.ok(teacherService.getAssignmentsByClass(className));
    }

    @GetMapping("/leaves/{className}")
    public ResponseEntity<?> getLeavesByClass(@PathVariable String className) {
        return ResponseEntity.ok(teacherService.getLeavesByClass(className));
    }

    @PostMapping("/leave/approve")
    public ResponseEntity<?> approveLeave(@RequestBody LeaveApprovalDTO dto) {
        return ResponseEntity.ok(teacherService.approveLeave(dto));
    }
}