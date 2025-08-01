package com.ePathshala.entity;

import jakarta.persistence.Entity;
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
@Table(name = "TeacherAssignments")
@Data
public class TeacherAssignment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer assignmentId;

	@ManyToOne
	@JoinColumn(name = "teacherId")
	private Teacher teacher;

	@ManyToOne
	@JoinColumn(name = "classId")
	private ClassEntity classEntity;

	@ManyToOne
	@JoinColumn(name = "subjectId")
	private Subject subject;
}