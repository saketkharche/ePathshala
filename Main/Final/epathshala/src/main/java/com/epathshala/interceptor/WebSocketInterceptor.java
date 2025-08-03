package com.epathshala.interceptor;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class WebSocketInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            // Extract user information from headers
            String userEmail = accessor.getFirstNativeHeader("userEmail");
            String userId = accessor.getFirstNativeHeader("userId");
            String userName = accessor.getFirstNativeHeader("userName");
            
            if (userEmail != null) {
                // Store user information in session attributes
                accessor.setUser(() -> userEmail);
                accessor.getSessionAttributes().put("userEmail", userEmail);
                if (userId != null) {
                    accessor.getSessionAttributes().put("userId", userId);
                }
                if (userName != null) {
                    accessor.getSessionAttributes().put("userName", userName);
                }
            }
        }
        
        return message;
    }
} 