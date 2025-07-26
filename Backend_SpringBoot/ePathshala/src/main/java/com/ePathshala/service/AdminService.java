package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.AcademicEventDTO;
import com.ePathshala.dto.ParentDTO;
import com.ePathshala.dto.StudentDTO;
import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.dto.TeacherDTO;
import com.ePathshala.dto.UserDTO;

public interface AdminService {

	StudentDTO createStudent(StudentDTO dto);

	TeacherDTO registerTeacher(TeacherDTO dto);

	ParentDTO registerParent(ParentDTO dto);

	TeacherAssignmentDTO assignTeacherToSubject(TeacherAssignmentDTO dto);

	AcademicEventDTO createEvent(AcademicEventDTO dto);

	List<UserDTO> getUsersByRole(String role);

	void deleteUser(Long id);
}