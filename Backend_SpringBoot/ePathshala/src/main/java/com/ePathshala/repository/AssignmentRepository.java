package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
	List<Assignment> findByClassEntity_ClassId(Integer classId);

	List<Assignment> findByTeacher_TeacherId(Integer teacherId);
}