package com.ePathshala.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Parents")
@Data
public class Parent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer parentId;

	@OneToOne
	@JoinColumn(name = "userId")
	private User user;
}