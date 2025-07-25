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

import com.ePathshala.dto.LeaveRequestDTO;
import com.ePathshala.service.LeaveRequestService;

@RestController
@RequestMapping("/leave-requests")
public class LeaveRequestController {

	@Autowired
	private LeaveRequestService leaveRequestService;

	@GetMapping
	public List<LeaveRequestDTO> getAllLeaveRequests() {
		return leaveRequestService.getAllLeaveRequests();
	}

	@PostMapping
	public LeaveRequestDTO createLeaveRequest(@RequestBody LeaveRequestDTO dto) {
		return leaveRequestService.createLeaveRequest(dto);
	}

	@PutMapping("/{id}")
	public LeaveRequestDTO updateLeaveRequest(@PathVariable Long id, @RequestBody LeaveRequestDTO dto) {
		return leaveRequestService.updateLeaveRequest(id, dto);
	}

	@DeleteMapping("/{id}")
	public void deleteLeaveRequest(@PathVariable Long id) {
		leaveRequestService.deleteLeaveRequest(id);
	}
}