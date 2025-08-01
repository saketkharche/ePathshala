package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ePathshala.dto.AcademicEventDTO;
import com.ePathshala.dto.ParentDTO;
import com.ePathshala.dto.StudentDTO;
import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.dto.TeacherDTO;
import com.ePathshala.dto.UserDTO;
import com.ePathshala.enums.Role;
import com.ePathshala.repository.UserRepository;
import com.ePathshala.service.AcademicEventService;
import com.ePathshala.service.AdminService;
import com.ePathshala.service.ParentService;
import com.ePathshala.service.StudentService;
import com.ePathshala.service.TeacherAssignmentService;
import com.ePathshala.service.TeacherService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentService studentService;
	@Autowired
	private TeacherService teacherService;
	@Autowired
	private ParentService parentService;
	@Autowired
	private TeacherAssignmentService teacherAssignmentService;
	@Autowired
	private AcademicEventService academicEventService;

	@Override
	public StudentDTO createStudent(StudentDTO dto) {
		return studentService.createStudent(dto);
	}

	@Override
	public TeacherDTO registerTeacher(TeacherDTO dto) {
		return teacherService.registerTeacher(dto);
	}

	@Override
	public ParentDTO registerParent(ParentDTO dto) {
		return parentService.registerParent(dto);
	}

	@Override
	public TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto) {
		return teacherAssignmentService.assignTeacherToSubject(dto);
	}

	@Override
	public AcademicEventDTO createEvent(AcademicEventDTO dto) {
		return academicEventService.createEvent(dto);
	}

	@Override
	public List<UserDTO> getUsersByRole(String role) {
		Role r = Role.valueOf(role.toUpperCase());
		return userRepository.findAll().stream().filter(u -> u.getRole() == r).map(UserDTO::fromEntity).toList();
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id.intValue());
	}
}