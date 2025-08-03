package com.epathshala.controller;

import com.epathshala.dto.ChatMessageDTO;
import com.epathshala.service.ChatService;
import com.epathshala.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Map;

@Controller
public class WebSocketChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessageDTO sendMessage(@Payload ChatMessageDTO chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            // Get current user from security context
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
                String email = auth.getName();
                var user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    chatMessage.setAuthorId(user.getId());
                    chatMessage.setAuthorName(user.getName());
                    chatMessage.setUserEmail(email);
                    chatMessage.setUserRole(user.getRole());
                    chatMessage.setTimestamp(LocalDateTime.now());
                    chatMessage.setSessionId("ws_" + System.currentTimeMillis());
                    chatMessage.setResponse("Message sent successfully");
                    
                    // Save message to database
                    ChatMessageDTO savedMessage = chatService.sendMessage(chatMessage, user.getId());
                    
                    // Broadcast to specific chat room
                    messagingTemplate.convertAndSend("/topic/chat." + chatMessage.getChatRoomId(), savedMessage);
                    
                    return savedMessage;
                }
            }
            
            // Return error message if user not authenticated
            ChatMessageDTO errorMessage = new ChatMessageDTO();
            errorMessage.setMessage("You must be logged in to send messages");
            errorMessage.setMessageType("SYSTEM");
            errorMessage.setTimestamp(LocalDateTime.now());
            return errorMessage;
            
        } catch (Exception e) {
            ChatMessageDTO errorMessage = new ChatMessageDTO();
            errorMessage.setMessage("Error sending message: " + e.getMessage());
            errorMessage.setMessageType("SYSTEM");
            errorMessage.setTimestamp(LocalDateTime.now());
            return errorMessage;
        }
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessageDTO addUser(@Payload ChatMessageDTO chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            // Get current user from security context
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
                String email = auth.getName();
                var user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    // Add username to web socket session
                    headerAccessor.getSessionAttributes().put("username", user.getName());
                    headerAccessor.getSessionAttributes().put("userEmail", email);
                    headerAccessor.getSessionAttributes().put("userId", user.getId());
                    
                    // Create join message
                    ChatMessageDTO joinMessage = new ChatMessageDTO();
                    joinMessage.setMessage(user.getName() + " joined the chat!");
                    joinMessage.setMessageType("SYSTEM");
                    joinMessage.setAuthorName("System");
                    joinMessage.setTimestamp(LocalDateTime.now());
                    joinMessage.setSessionId("ws_" + System.currentTimeMillis());
                    joinMessage.setResponse("User joined successfully");
                    joinMessage.setUserEmail(email);
                    joinMessage.setUserRole(user.getRole());
                    
                    return joinMessage;
                }
            }
            
            ChatMessageDTO errorMessage = new ChatMessageDTO();
            errorMessage.setMessage("Authentication required to join chat");
            errorMessage.setMessageType("SYSTEM");
            errorMessage.setTimestamp(LocalDateTime.now());
            return errorMessage;
            
        } catch (Exception e) {
            ChatMessageDTO errorMessage = new ChatMessageDTO();
            errorMessage.setMessage("Error joining chat: " + e.getMessage());
            errorMessage.setMessageType("SYSTEM");
            errorMessage.setTimestamp(LocalDateTime.now());
            return errorMessage;
        }
    }

    @MessageMapping("/chat.joinRoom")
    public void joinRoom(@Payload Map<String, Object> payload, SimpMessageHeaderAccessor headerAccessor) {
        try {
            Long roomId = Long.valueOf(payload.get("roomId").toString());
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
                String email = auth.getName();
                var user = userRepository.findByEmail(email).orElse(null);
                
                if (user != null) {
                    // Join the specific room
                    chatService.joinChatRoom(roomId, user.getId());
                    
                    // Subscribe user to room-specific topic
                    messagingTemplate.convertAndSendToUser(
                        email,
                        "/queue/room." + roomId,
                        Map.of("type", "JOIN", "roomId", roomId, "message", "Joined room " + roomId)
                    );
                    
                    // Notify other users in the room
                    ChatMessageDTO joinMessage = new ChatMessageDTO();
                    joinMessage.setMessage(user.getName() + " joined the room");
                    joinMessage.setMessageType("SYSTEM");
                    joinMessage.setAuthorName("System");
                    joinMessage.setTimestamp(LocalDateTime.now());
                    joinMessage.setChatRoomId(roomId);
                    
                    messagingTemplate.convertAndSend("/topic/chat." + roomId, joinMessage);
                }
            }
        } catch (Exception e) {
            // Send error to user
            String email = headerAccessor.getSessionAttributes().get("userEmail") != null ? 
                         headerAccessor.getSessionAttributes().get("userEmail").toString() : "anonymous";
            
            messagingTemplate.convertAndSendToUser(
                email,
                "/queue/errors",
                Map.of("error", "Failed to join room: " + e.getMessage())
            );
        }
    }

    @MessageMapping("/chat.leaveRoom")
    public void leaveRoom(@Payload Map<String, Object> payload, SimpMessageHeaderAccessor headerAccessor) {
        try {
            Long roomId = Long.valueOf(payload.get("roomId").toString());
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
                String email = auth.getName();
                var user = userRepository.findByEmail(email).orElse(null);
                
                if (user != null) {
                    // Leave the room
                    chatService.leaveChatRoom(roomId, user.getId());
                    
                    // Notify other users in the room
                    ChatMessageDTO leaveMessage = new ChatMessageDTO();
                    leaveMessage.setMessage(user.getName() + " left the room");
                    leaveMessage.setMessageType("SYSTEM");
                    leaveMessage.setAuthorName("System");
                    leaveMessage.setTimestamp(LocalDateTime.now());
                    leaveMessage.setChatRoomId(roomId);
                    
                    messagingTemplate.convertAndSend("/topic/chat." + roomId, leaveMessage);
                }
            }
        } catch (Exception e) {
            // Handle error
            String email = headerAccessor.getSessionAttributes().get("userEmail") != null ? 
                         headerAccessor.getSessionAttributes().get("userEmail").toString() : "anonymous";
            
            messagingTemplate.convertAndSendToUser(
                email,
                "/queue/errors",
                Map.of("error", "Failed to leave room: " + e.getMessage())
            );
        }
    }
} 