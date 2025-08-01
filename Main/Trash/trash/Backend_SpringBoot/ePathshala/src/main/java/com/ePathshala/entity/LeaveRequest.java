package com.ePathshala.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ePathshala.enums.ApprovalStatus;
import com.ePathshala.enums.LeaveRequester;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "LeaveRequests")
@Data
public class LeaveRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer leaveId;

	@ManyToOne
	@JoinColumn(name = "studentId")
	private Student student;

	@Enumerated(EnumType.STRING)
	private LeaveRequester requestedBy;

	@Enumerated(EnumType.STRING)
	private ApprovalStatus teacherApproval;

	@Enumerated(EnumType.STRING)
	private ApprovalStatus parentApproval;

	private String reason;
	private LocalDate fromDate;
	private LocalDate toDate;

	private LocalDateTime createdAt;

	@Transient
	public String getFinalStatus() {
		if (teacherApproval == ApprovalStatus.Approved && parentApproval == ApprovalStatus.Approved)
			return "Approved";
		else if (teacherApproval == ApprovalStatus.Rejected || parentApproval == ApprovalStatus.Rejected)
			return "Rejected";
		else
			return "Pending";
	}
}