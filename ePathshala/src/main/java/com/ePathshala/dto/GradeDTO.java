package com.ePathshala.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class GradeDTO {
	private Integer gradeId;
	private Integer studentId;
	private Integer subjectId;
	private BigDecimal marks;
	private Integer teacherId;
}