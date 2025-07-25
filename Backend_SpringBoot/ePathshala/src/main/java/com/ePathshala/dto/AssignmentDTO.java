package com.ePathshala.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AssignmentDTO {
	private Integer assignmentId;
	private String title;
	private String description;
	private String filePath;
	private LocalDate dueDate;
	private Integer teacherId;
	private Integer classId;
	private Integer subjectId;
}