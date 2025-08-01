package com.ePathshala.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.ClassDTO;
import com.ePathshala.repository.ClassRepository;
import com.ePathshala.service.ClassService;

@Service
public class ClassServiceImpl implements ClassService {

	private final ClassRepository classRepository;

	public ClassServiceImpl(ClassRepository classRepository) {
		this.classRepository = classRepository;
	}

	@Override
	public ClassDTO createClass(ClassDTO dto) {
		return null;
	}

	@Override
	public Optional<ClassDTO> getClassById(Integer classId) {
		return null;
	}
}