package com.epathshala.controller;

import com.epathshala.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.epathshala.dto.LeaveApprovalDTO;

@RestController
@RequestMapping("/api/parent")
@PreAuthorize("hasRole('PARENT')")
public class ParentController {
    @Autowired
    private ParentService parentService;

    @GetMapping("/attendance/{parentId}")
    public ResponseEntity<?> getChildAttendance(@PathVariable Long parentId) {
        return ResponseEntity.ok(parentService.getChildAttendance(parentId));
    }

    @GetMapping("/grades/{parentId}")
    public ResponseEntity<?> getChildGrades(@PathVariable Long parentId) {
        return ResponseEntity.ok(parentService.getChildGrades(parentId));
    }

    @PostMapping("/leave/approve")
    public ResponseEntity<?> approveLeave(@RequestBody LeaveApprovalDTO dto) {
        return ResponseEntity.ok(parentService.approveLeave(dto));
    }
}