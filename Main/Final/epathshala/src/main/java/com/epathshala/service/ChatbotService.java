package com.epathshala.service;

import com.epathshala.dto.ChatRequest;
import com.epathshala.dto.ChatResponse;
import com.epathshala.entity.ChatMessage;
import com.epathshala.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatbotService {
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    @Transactional
    public ChatResponse processMessage(ChatRequest request) {
        String sessionId = request.getSessionId() != null ? request.getSessionId() : UUID.randomUUID().toString();
        String userMessage = request.getMessage().toLowerCase();
        String userRole = request.getUserRole();
        String userEmail = request.getUserEmail();
        
        // Generate response based on message content and user role
        String response = generateResponse(userMessage, userRole);
        
        // Save the chat message
        ChatMessage chatMessage = new ChatMessage(sessionId, request.getMessage(), response, userRole, userEmail);
        chatMessageRepository.save(chatMessage);
        
        // Get chat history
        List<ChatMessage> chatHistory = chatMessageRepository.getChatHistory(sessionId);
        
        // Convert to DTO
        List<ChatResponse.ChatMessageDTO> chatHistoryDTO = chatHistory.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        ChatResponse chatResponse = new ChatResponse();
        chatResponse.setMessage(request.getMessage());
        chatResponse.setResponse(response);
        chatResponse.setSessionId(sessionId);
        chatResponse.setTimestamp(LocalDateTime.now());
        chatResponse.setChatHistory(chatHistoryDTO);
        
        return chatResponse;
    }
    
    private String generateResponse(String message, String userRole) {
        // Greeting responses
        if (message.contains("hello") || message.contains("hi") || message.contains("hey")) {
            return "Hello! I'm the ePathshala Assistant. How can I help you today?";
        }
        
        // Help responses
        if (message.contains("help") || message.contains("support")) {
            return "I'm here to help! You can ask me about:\n" +
                   "• Academic calendar and events\n" +
                   "• Attendance and grades\n" +
                   "• Leave requests\n" +
                   "• Assignments and submissions\n" +
                   "• General information about the school";
        }
        
        // Role-specific responses
        if (userRole != null) {
            switch (userRole.toUpperCase()) {
                case "ADMIN":
                    return generateAdminResponse(message);
                case "STUDENT":
                    return generateStudentResponse(message);
                case "TEACHER":
                    return generateTeacherResponse(message);
                case "PARENT":
                    return generateParentResponse(message);
            }
        }
        
        // General responses
        if (message.contains("calendar") || message.contains("event")) {
            return "You can view the academic calendar in your dashboard. It shows all important events, holidays, and exam schedules.";
        }
        
        if (message.contains("attendance") || message.contains("present")) {
            return "Attendance records are available in your dashboard. Teachers can mark attendance, and students/parents can view their attendance history.";
        }
        
        if (message.contains("grade") || message.contains("mark") || message.contains("score")) {
            return "Grades and marks are updated by teachers and can be viewed in your dashboard. Check the grades section for detailed information.";
        }
        
        if (message.contains("leave") || message.contains("absent")) {
            return "Leave requests can be submitted through the dashboard. Students can request leave, and teachers/parents can approve them.";
        }
        
        if (message.contains("assignment") || message.contains("homework")) {
            return "Assignments are posted by teachers and can be viewed/downloaded by students. Check the assignments section in your dashboard.";
        }
        
        if (message.contains("password") || message.contains("login")) {
            return "If you're having trouble logging in, you can use the 'Forgot Password' feature to reset your password via OTP.";
        }
        
        if (message.contains("contact") || message.contains("support")) {
            return "For technical support or general inquiries, please contact the school administration or visit the Contact Us page.";
        }
        
        if (message.contains("thank")) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        if (message.contains("bye") || message.contains("goodbye")) {
            return "Goodbye! Have a great day! Feel free to chat with me anytime you need help.";
        }
        
        // Default response
        return "I understand you're asking about '" + message + "'. " +
               "Could you please be more specific? I can help you with academic calendar, attendance, grades, leave requests, assignments, and general information.";
    }
    
    private String generateAdminResponse(String message) {
        if (message.contains("user") || message.contains("manage")) {
            return "As an admin, you can manage users through the Admin Dashboard. You can add/edit students, teachers, and parents, and view all user sessions.";
        }
        
        if (message.contains("session") || message.contains("login")) {
            return "You can monitor active sessions and manage user logins through the Session Management section in your Admin Dashboard.";
        }
        
        if (message.contains("calendar") || message.contains("event")) {
            return "You can add and manage academic calendar events through the Admin Dashboard. This helps keep everyone informed about important dates.";
        }
        
        return "As an admin, you have access to comprehensive management features. Check your Admin Dashboard for user management, session monitoring, and calendar management.";
    }
    
    private String generateStudentResponse(String message) {
        if (message.contains("grade") || message.contains("mark")) {
            return "You can view your grades and marks in the Student Dashboard. Teachers update grades regularly, so check back often.";
        }
        
        if (message.contains("attendance")) {
            return "Your attendance records are available in the Student Dashboard. You can see your attendance history and current status.";
        }
        
        if (message.contains("assignment")) {
            return "Assignments are posted by your teachers and can be found in the Student Dashboard. You can download and submit assignments there.";
        }
        
        if (message.contains("leave")) {
            return "You can submit leave requests through the Student Dashboard. Your requests will be reviewed by teachers and parents.";
        }
        
        return "As a student, you can access your grades, attendance, assignments, and leave requests through the Student Dashboard.";
    }
    
    private String generateTeacherResponse(String message) {
        if (message.contains("grade") || message.contains("mark")) {
            return "You can update student grades through the Teacher Dashboard. This helps students and parents track academic progress.";
        }
        
        if (message.contains("attendance")) {
            return "You can mark student attendance and view attendance records through the Teacher Dashboard.";
        }
        
        if (message.contains("assignment")) {
            return "You can post assignments and view student submissions through the Teacher Dashboard.";
        }
        
        if (message.contains("leave")) {
            return "You can review and approve student leave requests through the Teacher Dashboard.";
        }
        
        return "As a teacher, you can manage grades, attendance, assignments, and leave requests through the Teacher Dashboard.";
    }
    
    private String generateParentResponse(String message) {
        if (message.contains("child") || message.contains("student")) {
            return "You can view your child's academic information including grades, attendance, and leave requests through the Parent Dashboard.";
        }
        
        if (message.contains("grade") || message.contains("progress")) {
            return "Your child's grades and academic progress are available in the Parent Dashboard. Check regularly for updates.";
        }
        
        if (message.contains("attendance")) {
            return "You can monitor your child's attendance records through the Parent Dashboard.";
        }
        
        if (message.contains("leave")) {
            return "You can review and approve your child's leave requests through the Parent Dashboard.";
        }
        
        return "As a parent, you can monitor your child's academic progress, attendance, and leave requests through the Parent Dashboard.";
    }
    
    private ChatResponse.ChatMessageDTO convertToDTO(ChatMessage chatMessage) {
        ChatResponse.ChatMessageDTO dto = new ChatResponse.ChatMessageDTO();
        dto.setMessage(chatMessage.getMessage());
        dto.setResponse(chatMessage.getResponse());
        dto.setIsUserMessage(chatMessage.getIsUserMessage());
        dto.setTimestamp(chatMessage.getTimestamp());
        return dto;
    }
    
    @Transactional
    public void clearChatHistory(String sessionId) {
        chatMessageRepository.deleteBySessionId(sessionId);
    }
} 