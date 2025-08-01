package com.ePathshala.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.ClassEntity;

public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
	Optional<ClassEntity> findByClassName(String className);
}
