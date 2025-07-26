package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.LeaveRequestDTO;
import com.ePathshala.enums.ApprovalStatus;
import com.ePathshala.repository.LeaveRequestRepository;
import com.ePathshala.service.LeaveRequestService;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

	private final LeaveRequestRepository leaveRequestRepository;

	public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository) {
		this.leaveRequestRepository = leaveRequestRepository;
	}

	@Override
	public LeaveRequestDTO submitLeaveRequest(LeaveRequestDTO dto) {
		return null;
	}

	@Override
	public LeaveRequestDTO updateApprovalStatus(Integer leaveId, ApprovalStatus teacher, ApprovalStatus parent) {
		return null;
	}

	@Override
	public List<LeaveRequestDTO> getByStudentId(Integer studentId) {
		return null;
	}

	@Override
	public List<LeaveRequestDTO> getAllLeaveRequests() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteLeaveRequest(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public LeaveRequestDTO updateLeaveRequest(Long id, LeaveRequestDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}
}