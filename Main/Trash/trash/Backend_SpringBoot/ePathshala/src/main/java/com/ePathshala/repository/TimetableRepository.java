package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Timetable;

public interface TimetableRepository extends JpaRepository<Timetable, Integer> {
	List<Timetable> findByClassEntity_ClassId(Integer classId);

	List<Timetable> findByTeacher_TeacherId(Integer teacherId);
}