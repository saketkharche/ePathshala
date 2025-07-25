package com.ePathshala.service;

import com.ePathshala.dto.LoginRequest;
import com.ePathshala.dto.LoginResponse;
import com.ePathshala.dto.RegisterUserRequest;
import com.ePathshala.dto.UserDTO;

public interface AuthService {
	LoginResponse login(LoginRequest request);

	UserDTO register(RegisterUserRequest request);
}