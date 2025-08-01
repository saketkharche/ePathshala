package com.ePathshala.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
	List<Attendance> findByStudent_StudentId(Integer studentId);

	List<Attendance> findByDate(LocalDate date);
}
