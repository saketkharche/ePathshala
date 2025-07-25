package com.ePathshala.service;

import java.util.Optional;

import com.ePathshala.dto.ClassDTO;

public interface ClassService {
	ClassDTO createClass(ClassDTO dto);

	Optional<ClassDTO> getClassById(Integer classId);
}