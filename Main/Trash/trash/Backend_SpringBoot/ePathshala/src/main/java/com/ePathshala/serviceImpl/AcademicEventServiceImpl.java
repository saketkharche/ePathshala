package com.ePathshala.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.AcademicEventDTO;
import com.ePathshala.repository.AcademicEventRepository;
import com.ePathshala.service.AcademicEventService;

@Service
public class AcademicEventServiceImpl implements AcademicEventService {

	private final AcademicEventRepository academicEventRepository;

	public AcademicEventServiceImpl(AcademicEventRepository academicEventRepository) {
		this.academicEventRepository = academicEventRepository;
	}

	@Override
	public AcademicEventDTO createEvent(AcademicEventDTO dto) {
		return null;
	}

	@Override
	public List<AcademicEventDTO> getEventsBetween(LocalDate start, LocalDate end) {
		return null;
	}
}