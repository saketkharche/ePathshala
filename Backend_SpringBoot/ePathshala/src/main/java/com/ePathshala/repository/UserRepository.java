package com.ePathshala.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ePathshala.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	boolean existsByAccountNumber(String accountNumber);
}