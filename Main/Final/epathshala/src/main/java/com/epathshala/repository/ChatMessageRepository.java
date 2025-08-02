package com.epathshala.repository;

import com.epathshala.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    List<ChatMessage> findBySessionIdOrderByTimestampAsc(String sessionId);
    
    List<ChatMessage> findByUserEmailOrderByTimestampDesc(String userEmail);
    
    @Query("SELECT c FROM ChatMessage c WHERE c.sessionId = :sessionId ORDER BY c.timestamp ASC")
    List<ChatMessage> getChatHistory(@Param("sessionId") String sessionId);
    
    void deleteBySessionId(String sessionId);
} 