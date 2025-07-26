package com.ePathshala.service;

import java.util.List;
import java.util.Optional;

import com.ePathshala.dto.StudentDTO;

public interface StudentService {
	StudentDTO registerStudent(StudentDTO dto);

	List<StudentDTO> getStudentsByClassId(Integer classId);

	Optional<StudentDTO> getStudentByUserId(Integer userId);

	List<StudentDTO> getAllStudents();

	StudentDTO getStudentById(Long id);

	StudentDTO createStudent(StudentDTO dto);

	StudentDTO updateStudent(Long id, StudentDTO dto);

	void deleteStudent(Long id);
}