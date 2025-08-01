package com.ePathshala.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "Fees")
@Data
public class Fee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer feeId;

	@ManyToOne
	@JoinColumn(name = "classId")
	private ClassEntity classEntity;

	private BigDecimal amount;
	private LocalDate dueDate;
}