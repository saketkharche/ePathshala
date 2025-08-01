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

import com.ePathshala.dto.TimetableDTO;
import com.ePathshala.service.TimetableService;

@RestController
@RequestMapping("/timetable")
public class TimetableController {

	@Autowired
	private TimetableService timetableService;

	@GetMapping
	public List<TimetableDTO> getAllTimetables() {
		return timetableService.getAllTimetables();
	}

	@PostMapping
	public TimetableDTO createTimetable(@RequestBody TimetableDTO dto) {
		return timetableService.createTimetable(dto);
	}

	@PutMapping("/{id}")
	public TimetableDTO updateTimetable(@PathVariable Long id, @RequestBody TimetableDTO dto) {
		return timetableService.updateTimetable(id, dto);
	}

	@DeleteMapping("/{id}")
	public void deleteTimetable(@PathVariable Long id) {
		timetableService.deleteTimetable(id);
	}
}