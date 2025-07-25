package com.ePathshala.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

import lombok.Data;

@Data
public class TimetableDTO {
	private Integer timetableId;
	private Integer classId;
	private DayOfWeek dayOfWeek;
	private LocalTime startTime;
	private LocalTime endTime;
	private Integer subjectId;
	private Integer teacherId;
}