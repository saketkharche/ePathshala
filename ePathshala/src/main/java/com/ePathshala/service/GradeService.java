package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.GradeDTO;

public interface GradeService {
	GradeDTO enterGrade(GradeDTO dto);

	List<GradeDTO> getGradesByStudentId(Integer studentId);

	List<GradeDTO> getGradesByTeacherId(Integer teacherId);

	GradeDTO updateGrade(Long id, GradeDTO dto);

	void deleteGrade(Long id);

	GradeDTO createGrade(GradeDTO dto);

	List<GradeDTO> getAllGrades();
}