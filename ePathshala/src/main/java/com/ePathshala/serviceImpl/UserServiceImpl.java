package com.ePathshala.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.UserDTO;
import com.ePathshala.entity.User;
import com.ePathshala.mapper.UserMapper;
import com.ePathshala.repository.UserRepository;
import com.ePathshala.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;

	public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
	}

	@Override
	public Optional<UserDTO> getUserById(Integer userId) {
		return userRepository.findById(userId).map(userMapper::toDTO);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream().map(userMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public void deleteUser(Integer userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public UserDTO updateUser(Integer userId, UserDTO dto) {
		User user = userRepository.findById(userId).orElseThrow();
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setRole(dto.getRole());
		user.setAccountNumber(dto.getAccountNumber());
		return userMapper.toDTO(userRepository.save(user));
	}

	@Override
	public UserDTO getUserById(Long id) {
		return userRepository.findById(id.intValue()).map(userMapper::toDTO)
				.orElseThrow(() -> new RuntimeException("User not found"));
	}

	@Override
	public UserDTO createUser(UserDTO dto) {
		User user = userMapper.toEntity(dto);
		User saved = userRepository.save(user);
		return userMapper.toDTO(saved);
	}

	@Override
	public UserDTO updateUser(Long id, UserDTO dto) {
		return updateUser(id.intValue(), dto);
	}

	@Override
	public void deleteUser(Long id) {
		deleteUser(id.intValue());
	}
}