package com.epathshala.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/assignment")
    public void notifyAssignment(@RequestBody Map<String, Object> assignment) {
        messagingTemplate.convertAndSend("/topic/assignment", assignment);
    }

    @PostMapping("/leaveApproval")
    public void notifyLeaveApproval(@RequestBody Map<String, Object> leave) {
        messagingTemplate.convertAndSend("/topic/leaveApproval", leave);
    }
}