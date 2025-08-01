package com.ePathshala.service;

import java.time.LocalDate;
import java.util.List;

import com.ePathshala.dto.AttendanceDTO;

public interface AttendanceService {
	AttendanceDTO markAttendance(AttendanceDTO dto);

	List<AttendanceDTO> getByStudentId(Integer studentId);

	List<AttendanceDTO> getByDate(LocalDate date);
}