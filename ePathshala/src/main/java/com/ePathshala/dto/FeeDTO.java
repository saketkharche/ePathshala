package com.ePathshala.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class FeeDTO {
	private Integer feeId;
	private Integer classId;
	private BigDecimal amount;
	private LocalDate dueDate;
}