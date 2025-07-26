package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
	List<Grade> findByStudent_StudentId(Integer studentId);

	List<Grade> findByTeacher_TeacherId(Integer teacherId);
}
