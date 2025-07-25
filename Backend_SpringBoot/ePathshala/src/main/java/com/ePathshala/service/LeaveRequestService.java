package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.LeaveRequestDTO;
import com.ePathshala.enums.ApprovalStatus;

public interface LeaveRequestService {
	LeaveRequestDTO submitLeaveRequest(LeaveRequestDTO dto);

	LeaveRequestDTO updateApprovalStatus(Integer leaveId, ApprovalStatus teacher, ApprovalStatus parent);

	List<LeaveRequestDTO> getByStudentId(Integer studentId);

	List<LeaveRequestDTO> getAllLeaveRequests();

	LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto);

	void deleteLeaveRequest(Long id);

	LeaveRequestDTO updateLeaveRequest(Long id, LeaveRequestDTO dto);
}