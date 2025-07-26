package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.entity.TeacherAssignment;

public interface TeacherAssignmentService {
	TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto);

	List<TeacherAssignmentDTO> getAssignmentsByTeacherId(Integer teacherId);

	List<TeacherAssignment> findByTeacherId(Integer teacherId); // 🔍 Custom method

}