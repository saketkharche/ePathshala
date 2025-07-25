package com.ePathshala.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePathshala.dto.LoginRequest;
import com.ePathshala.dto.LoginResponse;
import com.ePathshala.dto.RegisterUserRequest;
import com.ePathshala.dto.UserDTO;
import com.ePathshala.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		LoginResponse response = authService.login(request);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<UserDTO> register(@RequestBody RegisterUserRequest request) {
		UserDTO createdUser = authService.register(request);
		return ResponseEntity.ok(createdUser);
	}
}