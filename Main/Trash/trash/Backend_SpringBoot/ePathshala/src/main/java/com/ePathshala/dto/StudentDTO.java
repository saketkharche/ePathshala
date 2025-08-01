package com.ePathshala.dto;

import lombok.Data;

@Data
public class StudentDTO {
	private Integer studentId;
	private UserDTO user;
	private Integer classId;
	private Integer parentId;
}