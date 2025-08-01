package com.ePathshala.service;

import java.time.LocalDate;
import java.util.List;

import com.ePathshala.dto.AcademicEventDTO;

public interface AcademicEventService {
	AcademicEventDTO createEvent(AcademicEventDTO dto);

	List<AcademicEventDTO> getEventsBetween(LocalDate start, LocalDate end);
}