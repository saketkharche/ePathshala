package com.ePathshala.dto;

import com.ePathshala.entity.User;
import com.ePathshala.enums.Role;

import lombok.Data;

@Data
public class UserDTO {
	private Integer userId;
	private String name;
	private String email;
	private String accountNumber;
	private Role role;

	public static UserDTO fromEntity(User user) {
		UserDTO dto = new UserDTO();
		dto.setUserId(user.getUserId()); // assuming getId() matches userId
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setAccountNumber(user.getAccountNumber());
		dto.setRole(user.getRole());
		return dto;
	}

}