package com.epathshala.controller;

import com.epathshala.dto.NotificationDTO;
import com.epathshala.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/announcements")
    public List<NotificationDTO> getGlobalAnnouncements() {
        return notificationService.getGlobalAnnouncements();
    }

    @PostMapping("/assignment")
    public void notifyAssignment(@RequestBody Map<String, Object> assignment) {
        messagingTemplate.convertAndSend("/topic/assignment", assignment);
    }

    @PostMapping("/leaveApproval")
    public void notifyLeaveApproval(@RequestBody Map<String, Object> leave) {
        messagingTemplate.convertAndSend("/topic/leaveApproval", leave);
    }
}