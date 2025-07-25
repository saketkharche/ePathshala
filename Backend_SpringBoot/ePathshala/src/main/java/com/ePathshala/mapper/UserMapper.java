package com.ePathshala.mapper;

import org.springframework.stereotype.Component;

import com.ePathshala.dto.UserDTO;
import com.ePathshala.entity.User;

@Component
public class UserMapper {

	public UserDTO toDTO(User user) {
		if (user == null)
			return null;

		UserDTO dto = new UserDTO();
		dto.setUserId(user.getUserId());
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setRole(user.getRole());
		dto.setAccountNumber(user.getAccountNumber());
		return dto;
	}

	public User toEntity(UserDTO dto) {
		if (dto == null)
			return null;

		User user = new User();
		user.setUserId(dto.getUserId());
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setRole(dto.getRole());
		user.setAccountNumber(dto.getAccountNumber());
		return user;
	}
}