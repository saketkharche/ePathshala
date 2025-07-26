package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.SubjectDTO;
import com.ePathshala.repository.SubjectRepository;
import com.ePathshala.service.SubjectService;

@Service
public class SubjectServiceImpl implements SubjectService {

	private final SubjectRepository subjectRepository;

	public SubjectServiceImpl(SubjectRepository subjectRepository) {
		this.subjectRepository = subjectRepository;
	}

	@Override
	public SubjectDTO createSubject(SubjectDTO dto) {
		return null;
	}

	@Override
	public List<SubjectDTO> getSubjectsByClassId(Integer classId) {
		return null;
	}
}