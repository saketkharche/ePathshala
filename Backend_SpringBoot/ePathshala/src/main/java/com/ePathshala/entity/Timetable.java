package com.ePathshala.entity;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Timetables")
@Data
public class Timetable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer timetableId;

	@ManyToOne
	@JoinColumn(name = "classId")
	private ClassEntity classEntity;

	@Enumerated(EnumType.STRING)
	private DayOfWeek dayOfWeek;

	private LocalTime startTime;
	private LocalTime endTime;

	@ManyToOne
	@JoinColumn(name = "subjectId")
	private Subject subject;

	@ManyToOne
	@JoinColumn(name = "teacherId")
	private Teacher teacher;
}