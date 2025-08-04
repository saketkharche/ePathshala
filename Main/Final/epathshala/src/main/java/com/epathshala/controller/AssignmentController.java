package com.epathshala.controller;

import com.epathshala.dto.AssignmentDTO;
import com.epathshala.dto.AssignmentSubmissionDTO;
import com.epathshala.service.AssignmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assignments")
@Tag(name = "Assignments", description = "Assignment management APIs")
public class AssignmentController {
    
    @Autowired
    private AssignmentService assignmentService;
    
    // Create assignment (Teacher only)
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    @Operation(summary = "Create new assignment", description = "Create a new assignment with optional file upload")
    public ResponseEntity<AssignmentDTO> createAssignment(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("dueDate") String dueDate,
            @RequestParam("subject") String subject,
            @RequestParam("className") String className,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("teacherId") Long teacherId) throws IOException {
        
        AssignmentDTO dto = new AssignmentDTO();
        dto.setTitle(title);
        dto.setDescription(description);
        dto.setDueDate(java.time.LocalDate.parse(dueDate));
        dto.setSubject(subject);
        dto.setClassName(className);
        
        AssignmentDTO createdAssignment = assignmentService.createAssignment(dto, file, teacherId);
        return ResponseEntity.ok(createdAssignment);
    }
    
    // Get assignment by ID
    @GetMapping("/{id}")
    @Operation(summary = "Get assignment by ID", description = "Get assignment details by ID")
    public ResponseEntity<AssignmentDTO> getAssignmentById(@PathVariable Long id) {
        AssignmentDTO assignment = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(assignment);
    }
    
    // Get assignments by class
    @GetMapping("/class/{className}")
    @Operation(summary = "Get assignments by class", description = "Get all assignments for a specific class")
    public ResponseEntity<List<AssignmentDTO>> getAssignmentsByClass(@PathVariable String className) {
        List<AssignmentDTO> assignments = assignmentService.getAssignmentsByClass(className);
        return ResponseEntity.ok(assignments);
    }
    
    // Download assignment file
    @GetMapping("/download/{filename}")
    @Operation(summary = "Download assignment file", description = "Download assignment file by filename")
    public ResponseEntity<Resource> downloadAssignmentFile(@PathVariable String filename) {
        try {
            Resource resource = assignmentService.downloadAssignmentFile(filename);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Submit assignment (Student only)
    @PostMapping("/{assignmentId}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Submit assignment", description = "Submit assignment with optional file upload")
    public ResponseEntity<AssignmentSubmissionDTO> submitAssignment(
            @PathVariable Long assignmentId,
            @RequestParam("studentId") Long studentId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "submissionText", required = false) String submissionText) throws IOException {
        
        AssignmentSubmissionDTO submission = assignmentService.submitAssignment(assignmentId, studentId, file, submissionText);
        return ResponseEntity.ok(submission);
    }
    
    // Check if student has submitted
    @GetMapping("/{assignmentId}/submitted/{studentId}")
    @Operation(summary = "Check submission status", description = "Check if a student has submitted an assignment")
    public ResponseEntity<Map<String, Boolean>> hasStudentSubmitted(
            @PathVariable Long assignmentId,
            @PathVariable Long studentId) {
        
        Boolean hasSubmitted = assignmentService.hasStudentSubmitted(assignmentId, studentId);
        return ResponseEntity.ok(Map.of("hasSubmitted", hasSubmitted));
    }
} 