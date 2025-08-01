package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.TeacherAssignment;

public interface TeacherAssignmentRepository extends JpaRepository<TeacherAssignment, Integer> {
	List<TeacherAssignment> findByTeacher_TeacherId(Integer teacherId);
}
