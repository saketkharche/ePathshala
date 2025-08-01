package com.ePathshala.service;

import java.util.Optional;

import com.ePathshala.dto.TeacherDTO;

public interface TeacherService {
	TeacherDTO registerTeacher(TeacherDTO dto);

	Optional<TeacherDTO> getTeacherByUserId(Integer userId);
}