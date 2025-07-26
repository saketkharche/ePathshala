package com.ePathshala.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ePathshala.dto.AcademicEventDTO;
import com.ePathshala.dto.ParentDTO;
import com.ePathshala.dto.StudentDTO;
import com.ePathshala.dto.TeacherAssignmentDTO;
import com.ePathshala.dto.TeacherDTO;
import com.ePathshala.dto.UserDTO;
import com.ePathshala.enums.Role;
import com.ePathshala.service.AcademicEventService;
import com.ePathshala.service.ParentService;
import com.ePathshala.service.StudentService;
import com.ePathshala.service.TeacherAssignmentService;
import com.ePathshala.service.TeacherService;
import com.ePathshala.service.UserService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	@Autowired
	private UserService userService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private TeacherService teacherService;
	@Autowired
	private ParentService parentService;
	@Autowired
	private TeacherAssignmentService teacherAssignmentService;
	@Autowired
	private AcademicEventService academicEventService;

	// 🔐 Register a new student
	@PostMapping("/add-student")
	public ResponseEntity<StudentDTO> addStudent(@RequestBody StudentDTO dto) {
		StudentDTO student = studentService.createStudent(dto);
		return ResponseEntity.ok(student);
	}

	// 🔐 Register a new teacher
	@PostMapping("/add-teacher")
	public ResponseEntity<TeacherDTO> addTeacher(@RequestBody TeacherDTO dto) {
		TeacherDTO teacher = teacherService.registerTeacher(dto);
		return ResponseEntity.ok(teacher);
	}

	// 🔐 Register a new parent
	@PostMapping("/add-parent")
	public ResponseEntity<ParentDTO> addParent(@RequestBody ParentDTO dto) {
		ParentDTO parent = parentService.registerParent(dto);
		return ResponseEntity.ok(parent);
	}

	// 📚 Assign teacher to class and subject
	@PostMapping("/assign-teacher")
	public ResponseEntity<TeacherAssignmentDTO> assignTeacher(@RequestBody TeacherAssignmentDTO dto) {
		TeacherAssignmentDTO result = teacherAssignmentService.assignTeacherToSubject(dto);
		return ResponseEntity.ok(result);
	}

	// 📅 Add academic calendar event
	@PostMapping("/add-event")
	public ResponseEntity<AcademicEventDTO> addEvent(@RequestBody AcademicEventDTO dto) {
		AcademicEventDTO saved = academicEventService.createEvent(dto);
		return ResponseEntity.ok(saved);
	}

	// 👥 Get users by role
	@GetMapping("/users")
	public ResponseEntity<List<UserDTO>> getUsersByRole(@RequestParam Role role) {
		List<UserDTO> filtered = userService.getAllUsers().stream().filter(u -> u.getRole() == role).toList();
		return ResponseEntity.ok(filtered);
	}

	// 🧹 Delete any user
	@DeleteMapping("/delete-user/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}