package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.TimetableDTO;
import com.ePathshala.repository.TimetableRepository;
import com.ePathshala.service.TimetableService;

@Service
public class TimetableServiceImpl implements TimetableService {

	private final TimetableRepository timetableRepository;

	public TimetableServiceImpl(TimetableRepository timetableRepository) {
		this.timetableRepository = timetableRepository;
	}

	@Override
	public TimetableDTO createTimetable(TimetableDTO dto) {
		return null;
	}

	@Override
	public List<TimetableDTO> getByClassId(Integer classId) {
		return null;
	}

	@Override
	public List<TimetableDTO> getByTeacherId(Integer teacherId) {
		return null;
	}

	@Override
	public void deleteTimetable(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public TimetableDTO updateTimetable(Long id, TimetableDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TimetableDTO> getAllTimetables() {
		// TODO Auto-generated method stub
		return null;
	}
}