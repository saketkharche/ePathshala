package com.epathshala.controller;

import com.epathshala.dto.UserDTO;
import com.epathshala.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.epathshala.dto.AcademicCalendarDTO;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Management", description = "Admin-specific APIs for user and system management")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/add-student")
    @Operation(summary = "Add Student", description = "Create a new student account")
    public ResponseEntity<?> addStudent(@RequestBody UserDTO dto) {
        return ResponseEntity.ok(adminService.addStudent(dto));
    }

    @PostMapping("/add-teacher")
    @Operation(summary = "Add Teacher", description = "Create a new teacher account")
    public ResponseEntity<?> addTeacher(@RequestBody UserDTO dto) {
        return ResponseEntity.ok(adminService.addTeacher(dto));
    }

    @PostMapping("/add-parent")
    @Operation(summary = "Add Parent", description = "Create a new parent account")
    public ResponseEntity<?> addParent(@RequestBody UserDTO dto) {
        return ResponseEntity.ok(adminService.addParent(dto));
    }

    @GetMapping("/students")
    @Operation(summary = "Get All Students", description = "Retrieve all student accounts")
    public ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/teachers")
    @Operation(summary = "Get All Teachers", description = "Retrieve all teacher accounts")
    public ResponseEntity<?> getAllTeachers() {
        return ResponseEntity.ok(adminService.getAllTeachers());
    }

    @GetMapping("/parents")
    @Operation(summary = "Get All Parents", description = "Retrieve all parent accounts")
    public ResponseEntity<?> getAllParents() {
        return ResponseEntity.ok(adminService.getAllParents());
    }

    @DeleteMapping("/user/{id}")
    @Operation(summary = "Delete User", description = "Delete a user account by ID")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/assign-teacher")
    @Operation(summary = "Assign Teacher", description = "Assign a teacher to a class")
    public ResponseEntity<?> assignTeacher(@RequestBody UserDTO dto) {
        return ResponseEntity.ok(adminService.assignTeacher(dto));
    }

    @PostMapping("/calendar")
    @Operation(summary = "Add Calendar Event", description = "Add a new academic calendar event")
    public ResponseEntity<?> addEvent(@RequestBody AcademicCalendarDTO dto) {
        return ResponseEntity.ok(adminService.addEvent(dto));
    }

    @GetMapping("/calendar")
    @Operation(summary = "Get Calendar Events", description = "Retrieve all academic calendar events")
    public ResponseEntity<?> getEvents() {
        return ResponseEntity.ok(adminService.getEvents());
    }

    @DeleteMapping("/calendar/{eventId}")
    @Operation(summary = "Delete Calendar Event", description = "Delete an academic calendar event by ID")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId) {
        adminService.deleteEvent(eventId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dashboard-summary")
    @Operation(summary = "Get Dashboard Summary", description = "Get admin dashboard statistics and summary")
    public ResponseEntity<?> getDashboardSummary() {
        return ResponseEntity.ok(adminService.getDashboardSummary());
    }
}