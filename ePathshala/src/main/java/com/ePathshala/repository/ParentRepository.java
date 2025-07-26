package com.ePathshala.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Parent;

public interface ParentRepository extends JpaRepository<Parent, Integer> {
	Optional<Parent> findByUser_UserId(Integer userId);
}
