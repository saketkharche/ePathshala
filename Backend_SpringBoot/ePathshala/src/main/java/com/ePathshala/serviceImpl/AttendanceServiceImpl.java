package com.ePathshala.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.AttendanceDTO;
import com.ePathshala.repository.AttendanceRepository;
import com.ePathshala.service.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService {

	private final AttendanceRepository attendanceRepository;

	public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
		this.attendanceRepository = attendanceRepository;
	}

	@Override
	public AttendanceDTO markAttendance(AttendanceDTO dto) {
		return null;
	}

	@Override
	public List<AttendanceDTO> getByStudentId(Integer studentId) {
		return null;
	}

	@Override
	public List<AttendanceDTO> getByDate(LocalDate date) {
		return null;
	}
}