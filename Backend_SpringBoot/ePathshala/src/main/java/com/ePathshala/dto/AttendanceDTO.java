package com.ePathshala.dto;

import java.time.LocalDate;

import com.ePathshala.enums.AttendanceStatus;

import lombok.Data;

@Data
public class AttendanceDTO {
	private Integer attendanceId;
	private Integer studentId;
	private Integer subjectId;
	private LocalDate date;
	private AttendanceStatus status;
	private Integer markedByTeacherId;
}