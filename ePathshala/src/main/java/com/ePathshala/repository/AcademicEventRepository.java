package com.ePathshala.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.AcademicEvent;

public interface AcademicEventRepository extends JpaRepository<AcademicEvent, Integer> {
	List<AcademicEvent> findByEventDateBetween(LocalDate start, LocalDate end);
}