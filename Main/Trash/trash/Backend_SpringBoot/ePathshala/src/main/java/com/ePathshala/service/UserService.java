package com.ePathshala.service;

import java.util.List;
import java.util.Optional;

import com.ePathshala.dto.UserDTO;

public interface UserService {
	Optional<UserDTO> getUserById(Integer userId);

	List<UserDTO> getAllUsers();

	void deleteUser(Integer userId);

	UserDTO updateUser(Integer userId, UserDTO dto);

	UserDTO getUserById(Long id);

	UserDTO createUser(UserDTO dto);

	UserDTO updateUser(Long id, UserDTO dto);

	void deleteUser(Long id);
}