package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.AssignmentDTO;

public interface AssignmentService {
	AssignmentDTO uploadAssignment(AssignmentDTO dto);

	List<AssignmentDTO> getByClassId(Integer classId);

	List<AssignmentDTO> getByTeacherId(Integer teacherId);
}