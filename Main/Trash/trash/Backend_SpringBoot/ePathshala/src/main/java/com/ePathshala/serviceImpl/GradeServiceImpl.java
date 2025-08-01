package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.GradeDTO;
import com.ePathshala.repository.GradeRepository;
import com.ePathshala.service.GradeService;

@Service
public class GradeServiceImpl implements GradeService {

	private final GradeRepository gradeRepository;

	public GradeServiceImpl(GradeRepository gradeRepository) {
		this.gradeRepository = gradeRepository;
	}

	@Override
	public GradeDTO enterGrade(GradeDTO dto) {
		return null;
	}

	@Override
	public List<GradeDTO> getGradesByStudentId(Integer studentId) {
		return null;
	}

	@Override
	public List<GradeDTO> getGradesByTeacherId(Integer teacherId) {
		return null;
	}

	@Override
	public GradeDTO updateGrade(Long id, GradeDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteGrade(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public GradeDTO createGrade(GradeDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<GradeDTO> getAllGrades() {
		// TODO Auto-generated method stub
		return null;
	}
}