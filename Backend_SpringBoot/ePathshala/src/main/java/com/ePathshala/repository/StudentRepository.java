package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	List<Student> findByClassEntity_ClassId(Integer classId);

	List<Student> findByParent_ParentId(Integer parentId);
}
