package com.epathshala.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String sessionId;
    
    @Column(nullable = false)
    private String message;
    
    @Column(nullable = false)
    private String response;
    
    @Column(nullable = false)
    private String userRole;
    
    @Column(nullable = false)
    private String userEmail;
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    @Column(nullable = false)
    private Boolean isUserMessage = true;
    
    public ChatMessage(String sessionId, String message, String response, String userRole, String userEmail) {
        this.sessionId = sessionId;
        this.message = message;
        this.response = response;
        this.userRole = userRole;
        this.userEmail = userEmail;
        this.timestamp = LocalDateTime.now();
    }
} 