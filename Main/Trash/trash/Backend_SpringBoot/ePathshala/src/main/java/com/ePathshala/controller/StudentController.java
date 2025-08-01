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

import com.ePathshala.dto.StudentDTO;
import com.ePathshala.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@GetMapping
	public List<StudentDTO> getAllStudents() {
		return studentService.getAllStudents();
	}

	@GetMapping("/{id}")
	public StudentDTO getStudent(@PathVariable Long id) {
		return studentService.getStudentById(id);
	}

	@PostMapping
	public StudentDTO createStudent(@RequestBody StudentDTO dto) {
		return studentService.createStudent(dto);
	}

	@PutMapping("/{id}")
	public StudentDTO updateStudent(@PathVariable Long id, @RequestBody StudentDTO dto) {
		return studentService.updateStudent(id, dto);
	}

	@DeleteMapping("/{id}")
	public void deleteStudent(@PathVariable Long id) {
		studentService.deleteStudent(id);
	}
}