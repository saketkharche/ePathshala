package com.ePathshala.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ePathshala.dto.LoginRequest;
import com.ePathshala.dto.LoginResponse;
import com.ePathshala.dto.RegisterUserRequest;
import com.ePathshala.dto.UserDTO;
import com.ePathshala.entity.User;
import com.ePathshala.mapper.UserMapper;
import com.ePathshala.repository.UserRepository;
import com.ePathshala.security.JwtService;
import com.ePathshala.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final UserMapper userMapper;

	public AuthServiceImpl(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder,
			UserMapper userMapper) {
		this.userRepository = userRepository;
		this.jwtService = jwtService;
		this.passwordEncoder = passwordEncoder;
		this.userMapper = userMapper;
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!user.getRole().equals(request.getRole())) {
			throw new RuntimeException("Role mismatch");
		}

		if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
			throw new RuntimeException("Invalid credentials");
		}

		String jwtToken = jwtService
				.generateToken(new org.springframework.security.core.userdetails.User(user.getEmail(),
						user.getPasswordHash(), List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))));

		LoginResponse response = new LoginResponse();
		response.setJwtToken(jwtToken);
		response.setRole(user.getRole());
		response.setName(user.getName());

		return response;
	}

	@Override
	public UserDTO register(RegisterUserRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already in use");
		}

		User user = User.builder().name(request.getName()).email(request.getEmail())
				.passwordHash(passwordEncoder.encode(request.getPassword())).role(request.getRole())
				.accountNumber(UUID.randomUUID().toString().substring(0, 10)) // optional
				.createdAt(LocalDateTime.now()).build();

		User savedUser = userRepository.save(user);
		return userMapper.toDTO(savedUser);
	}
}