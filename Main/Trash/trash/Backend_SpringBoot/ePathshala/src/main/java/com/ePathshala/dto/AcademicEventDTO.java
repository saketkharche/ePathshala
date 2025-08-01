package com.ePathshala.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AcademicEventDTO {
	private Integer eventId;
	private String title;
	private String description;
	private LocalDate eventDate;
}