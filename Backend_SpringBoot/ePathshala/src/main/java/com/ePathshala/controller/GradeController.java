package com.ePathshala.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePathshala.dto.GradeDTO;
import com.ePathshala.service.GradeService;

@RestController
@RequestMapping("/grades")
public class GradeController {

	@Autowired
	private GradeService gradeService;

	@GetMapping
	public List<GradeDTO> getAllGrades() {
		return gradeService.getAllGrades();
	}

	@PostMapping
	public GradeDTO createGrade(@RequestBody GradeDTO dto) {
		return gradeService.createGrade(dto);
	}

	@PutMapping("/{id}")
	public GradeDTO updateGrade(@PathVariable Long id, @RequestBody GradeDTO dto) {
		return gradeService.updateGrade(id, dto);
	}

	@DeleteMapping("/{id}")
	public void deleteGrade(@PathVariable Long id) {
		gradeService.deleteGrade(id);
	}
}