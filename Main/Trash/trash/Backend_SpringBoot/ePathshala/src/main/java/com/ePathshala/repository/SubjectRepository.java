package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
	List<Subject> findByClassEntity_ClassId(Integer classId);
}
