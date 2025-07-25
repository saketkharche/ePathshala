package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.TeacherAssignmentDTO;

public interface TeacherAssignmentService {
	TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto);

	List<TeacherAssignmentDTO> getAssignmentsByTeacherId(Integer teacherId);
}