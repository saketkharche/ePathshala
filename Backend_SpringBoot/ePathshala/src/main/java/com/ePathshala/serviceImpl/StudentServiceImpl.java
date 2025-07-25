package com.ePathshala.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.StudentDTO;
import com.ePathshala.repository.ClassRepository;
import com.ePathshala.repository.ParentRepository;
import com.ePathshala.repository.StudentRepository;
import com.ePathshala.repository.UserRepository;
import com.ePathshala.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	private final StudentRepository studentRepository;
	private final ClassRepository classRepository;
	private final ParentRepository parentRepository;
	private final UserRepository userRepository;

	public StudentServiceImpl(StudentRepository studentRepository, ClassRepository classRepository,
			ParentRepository parentRepository, UserRepository userRepository) {
		this.studentRepository = studentRepository;
		this.classRepository = classRepository;
		this.parentRepository = parentRepository;
		this.userRepository = userRepository;
	}

	@Override
	public StudentDTO registerStudent(StudentDTO dto) {
		return null;
	}

	@Override
	public List<StudentDTO> getStudentsByClassId(Integer classId) {
		return null;
	}

	@Override
	public Optional<StudentDTO> getStudentByUserId(Integer userId) {
		return null;
	}

	@Override
	public List<StudentDTO> getAllStudents() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StudentDTO getStudentById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StudentDTO createStudent(StudentDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StudentDTO updateStudent(Long id, StudentDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteStudent(Long id) {
		// TODO Auto-generated method stub

	}
}