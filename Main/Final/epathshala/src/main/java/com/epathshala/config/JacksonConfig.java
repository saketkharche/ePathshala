package com.epathshala.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        
        SimpleModule module = new SimpleModule();
        
        // Create a flexible LocalDateTime deserializer that can handle multiple formats
        DateTimeFormatter[] formatters = {
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
        };
        
        LocalDateTimeDeserializer deserializer = new LocalDateTimeDeserializer(formatters[0]) {
            @Override
            public LocalDateTime deserialize(com.fasterxml.jackson.core.JsonParser p, 
                                          com.fasterxml.jackson.databind.DeserializationContext ctxt) 
                    throws java.io.IOException {
                String text = p.getText();
                for (DateTimeFormatter formatter : formatters) {
                    try {
                        return LocalDateTime.parse(text, formatter);
                    } catch (Exception e) {
                        // Continue to next formatter
                    }
                }
                throw new IllegalArgumentException("Cannot parse LocalDateTime: " + text);
            }
        };
        
        LocalDateTimeSerializer serializer = new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
        
        module.addDeserializer(LocalDateTime.class, deserializer);
        module.addSerializer(LocalDateTime.class, serializer);
        
        mapper.registerModule(module);
        return mapper;
    }
} 