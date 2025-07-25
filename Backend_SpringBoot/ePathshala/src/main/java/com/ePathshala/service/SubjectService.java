package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.SubjectDTO;

public interface SubjectService {
	SubjectDTO createSubject(SubjectDTO dto);

	List<SubjectDTO> getSubjectsByClassId(Integer classId);
}