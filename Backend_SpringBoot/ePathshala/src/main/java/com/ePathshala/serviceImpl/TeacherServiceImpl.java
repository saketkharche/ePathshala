package com.ePathshala.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.TeacherDTO;
import com.ePathshala.repository.TeacherRepository;
import com.ePathshala.service.TeacherService;

@Service
public class TeacherServiceImpl implements TeacherService {

	private final TeacherRepository teacherRepository;

	public TeacherServiceImpl(TeacherRepository teacherRepository) {
		this.teacherRepository = teacherRepository;
	}

	@Override
	public TeacherDTO registerTeacher(TeacherDTO dto) {
		return null;
	}

	@Override
	public Optional<TeacherDTO> getTeacherByUserId(Integer userId) {
		return null;
	}
}