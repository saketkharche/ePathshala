package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Fee;

public interface FeeRepository extends JpaRepository<Fee, Integer> {
	List<Fee> findByClassEntity_ClassId(Integer classId);
}
