package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.TimetableDTO;

public interface TimetableService {
	TimetableDTO createTimetable(TimetableDTO dto);

	List<TimetableDTO> getByClassId(Integer classId);

	List<TimetableDTO> getByTeacherId(Integer teacherId);

	void deleteTimetable(Long id);

	TimetableDTO updateTimetable(Long id, TimetableDTO dto);

	List<TimetableDTO> getAllTimetables();
}