package com.ePathshala.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PaymentDTO {
	private Integer paymentId;
	private Integer studentId;
	private Integer feeId;
	private BigDecimal amountPaid;
	private LocalDateTime paymentDate;
}