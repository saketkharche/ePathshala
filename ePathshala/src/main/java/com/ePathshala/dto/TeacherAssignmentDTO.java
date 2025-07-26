package com.ePathshala.dto;

import lombok.Data;

@Data
public class TeacherAssignmentDTO {
	private Integer assignmentId;
	private Integer teacherId;
	private Integer classId;
	private Integer subjectId;
}