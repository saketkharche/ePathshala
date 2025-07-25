package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.AssignmentDTO;
import com.ePathshala.repository.AssignmentRepository;
import com.ePathshala.service.AssignmentService;

@Service
public class AssignmentServiceImpl implements AssignmentService {

	private final AssignmentRepository assignmentRepository;

	public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
		this.assignmentRepository = assignmentRepository;
	}

	@Override
	public AssignmentDTO uploadAssignment(AssignmentDTO dto) {
		return null;
	}

	@Override
	public List<AssignmentDTO> getByClassId(Integer classId) {
		return null;
	}

	@Override
	public List<AssignmentDTO> getByTeacherId(Integer teacherId) {
		return null;
	}
}