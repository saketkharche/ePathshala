package com.ePathshala.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByEmail(String email);
}