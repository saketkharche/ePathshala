package com.ePathshala.entity;

import java.math.BigDecimal;

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
@Table(name = "Grades")
@Data
public class Grade {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer gradeId;

	@ManyToOne
	@JoinColumn(name = "studentId")
	private Student student;

	@ManyToOne
	@JoinColumn(name = "subjectId")
	private Subject subject;

	private BigDecimal marks;

	@ManyToOne
	@JoinColumn(name = "teacherId")
	private Teacher teacher;
}
