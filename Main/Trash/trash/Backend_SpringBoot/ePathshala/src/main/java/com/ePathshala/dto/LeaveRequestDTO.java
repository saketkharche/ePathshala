package com.ePathshala.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ePathshala.enums.ApprovalStatus;
import com.ePathshala.enums.LeaveRequester;

import lombok.Data;

@Data
public class LeaveRequestDTO {
	private Integer leaveId;
	private Integer studentId;
	private String reason;
	private LocalDate fromDate;
	private LocalDate toDate;
	private LeaveRequester requestedBy;
	private ApprovalStatus teacherApproval;
	private ApprovalStatus parentApproval;
	private String finalStatus;
	private LocalDateTime createdAt;
}