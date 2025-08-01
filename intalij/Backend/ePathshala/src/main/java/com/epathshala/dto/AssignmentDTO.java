package com.epathshala.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentDTO {
    private String title;
    private String fileUrl;
    private LocalDate dueDate;
    private String subject;
    private String className;
}