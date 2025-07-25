package com.ePathshala.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class FeedbackDTO {
	private Integer feedbackId;
	private String name;
	private String email;
	private String message;
	private LocalDateTime submittedAt;
}