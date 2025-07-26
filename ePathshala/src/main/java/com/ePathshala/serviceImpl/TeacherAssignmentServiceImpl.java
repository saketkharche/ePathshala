package com.ePathshala.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.entity.TeacherAssignment;
import com.ePathshala.repository.TeacherAssignmentRepository;
import com.ePathshala.service.TeacherAssignmentService;

@Service
public class TeacherAssignmentServiceImpl implements TeacherAssignmentService {

	@Autowired
	private TeacherAssignmentRepository teacherAssignmentRepository;

	@Override
	public TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto) {
		TeacherAssignment assignment = new TeacherAssignment();
		assignment.setTeacherId(dto.getTeacherId());
		assignment.setClassId(dto.getClassId());
		assignment.setSubjectId(dto.getSubjectId());

		TeacherAssignment saved = teacherAssignmentRepository.save(assignment);

		// Return DTO
		TeacherAssignmentDTO response = new TeacherAssignmentDTO();
		response.setId(saved.getId());
		response.setTeacherId(saved.getTeacherId());
		response.setClassId(saved.getClassId());
		response.setSubjectId(saved.getSubjectId());

		return response;
	}

	@Override
	public List<TeacherAssignmentDTO> getAssignmentsByTeacherId(Integer teacherId) {
		List<TeacherAssignment> assignments = teacherAssignmentRepository.findByTeacherId(teacherId);

		return assignments.stream().map(assignment -> {
			TeacherAssignmentDTO dto = new TeacherAssignmentDTO();
			dto.setId(assignment.getId());
			dto.setTeacherId(assignment.getTeacherId());
			dto.setClassId(assignment.getClassId());
			dto.setSubjectId(assignment.getSubjectId());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<TeacherAssignment> findByTeacherId(Integer teacherId) {
		// TODO Auto-generated method stub
		return null;
	}
}