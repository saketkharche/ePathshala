package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.LeaveRequest;
import com.ePathshala.enums.ApprovalStatus;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {
	List<LeaveRequest> findByStudent_StudentId(Integer studentId);

	List<LeaveRequest> findByTeacherApproval(ApprovalStatus status);
}