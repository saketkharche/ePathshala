package com.ePathshala.dto;

import com.ePathshala.enums.Role;

import lombok.Data;

@Data
public class LoginResponse {
	private String jwtToken;
	private Role role;
	private String name;
}