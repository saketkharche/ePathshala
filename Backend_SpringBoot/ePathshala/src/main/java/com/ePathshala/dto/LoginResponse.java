package com.ePathshala.dto;

import com.ePathshala.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor

@Data
public class LoginResponse {
	private String jwtToken;
	private Role role;
	private String name;
}