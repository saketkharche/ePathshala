package com.ePathshala.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.entity.ClassEntity;
import com.ePathshala.entity.Subject;
import com.ePathshala.entity.Teacher;
import com.ePathshala.entity.TeacherAssignment;
import com.ePathshala.repository.ClassRepository;
import com.ePathshala.repository.SubjectRepository;
import com.ePathshala.repository.TeacherAssignmentRepository;
import com.ePathshala.repository.TeacherRepository;
import com.ePathshala.service.TeacherAssignmentService;

@Service
public class TeacherAssignmentServiceImpl implements TeacherAssignmentService {

	private final TeacherAssignmentRepository assignmentRepository;
	private final TeacherRepository teacherRepository;
	private final ClassRepository classRepository;
	private final SubjectRepository subjectRepository;

	public TeacherAssignmentServiceImpl(TeacherAssignmentRepository assignmentRepository,
			TeacherRepository teacherRepository, ClassRepository classRepository, SubjectRepository subjectRepository) {

		this.assignmentRepository = assignmentRepository;
		this.teacherRepository = teacherRepository;
		this.classRepository = classRepository;
		this.subjectRepository = subjectRepository;
	}

	@Override
	public TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto) {
		Teacher teacher = teacherRepository.findById(dto.getTeacherId())
				.orElseThrow(() -> new RuntimeException("Teacher not found"));
		ClassEntity classEntity = classRepository.findById(dto.getClassId())
				.orElseThrow(() -> new RuntimeException("Class not found"));
		Subject subject = subjectRepository.findById(dto.getSubjectId())
				.orElseThrow(() -> new RuntimeException("Subject not found"));

		TeacherAssignment assignment = new TeacherAssignment();
		assignment.setTeacher(teacher);
		assignment.setClassEntity(classEntity);
		assignment.setSubject(subject);

		TeacherAssignment saved = assignmentRepository.save(assignment);

		TeacherAssignmentDTO response = new TeacherAssignmentDTO();
		response.setAssignmentId(saved.getAssignmentId());
		response.setTeacherId(saved.getTeacher().getTeacherId());
		response.setClassId(saved.getClassEntity().getClassId());
		response.setSubjectId(saved.getSubject().getSubjectId());

		return response;
	}

	@Override
	public List<TeacherAssignmentDTO> getAssignmentsByTeacherId(Integer teacherId) {
		List<TeacherAssignment> assignments = assignmentRepository.findByTeacher_TeacherId(teacherId);

		return assignments.stream().map(assignment -> {
			TeacherAssignmentDTO dto = new TeacherAssignmentDTO();
			dto.setAssignmentId(assignment.getAssignmentId());
			dto.setTeacherId(assignment.getTeacher().getTeacherId());
			dto.setClassId(assignment.getClassEntity().getClassId());
			dto.setSubjectId(assignment.getSubject().getSubjectId());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<TeacherAssignment> findByTeacherId(Integer teacherId) {
		// TODO Auto-generated method stub
		return null;
	}
}