package com.ePathshala.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
	Optional<Teacher> findByUser_UserId(Integer userId);
}
