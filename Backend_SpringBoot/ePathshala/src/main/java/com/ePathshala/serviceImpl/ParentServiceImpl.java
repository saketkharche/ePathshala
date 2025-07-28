package com.ePathshala.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.ParentDTO;
import com.ePathshala.dto.UserDTO;
import com.ePathshala.entity.Parent;
import com.ePathshala.entity.User;
import com.ePathshala.enums.Role;
import com.ePathshala.repository.ParentRepository;
import com.ePathshala.repository.UserRepository;
import com.ePathshala.service.ParentService;

@Service
public class ParentServiceImpl implements ParentService {

	private final ParentRepository parentRepository;
	private final UserRepository userRepository;

	public ParentServiceImpl(ParentRepository parentRepository, UserRepository userRepository) {
		this.parentRepository = parentRepository;
		this.userRepository = userRepository;
	}

	@Override
	public ParentDTO registerParent(ParentDTO dto) {
		// Convert DTO to Entity
		User user = new User();
		user.setUserId(dto.getUser().getUserId());
		user.setName(dto.getUser().getName());
		user.setEmail(dto.getUser().getEmail());
		user.setAccountNumber(dto.getUser().getAccountNumber());
		user.setRole(Role.Parent); // Make sure Role enum uses uppercase values

		User savedUser = userRepository.save(user);

		Parent parent = new Parent();
		parent.setUser(savedUser);

		Parent savedParent = parentRepository.save(parent);

		// Convert Entity back to DTO
		ParentDTO response = new ParentDTO();
		response.setParentId(savedParent.getParentId());

		UserDTO userDTO = new UserDTO();
		userDTO.setUserId(savedUser.getUserId());
		userDTO.setName(savedUser.getName());
		userDTO.setEmail(savedUser.getEmail());
		userDTO.setAccountNumber(savedUser.getAccountNumber());
		userDTO.setRole(savedUser.getRole());

		response.setUser(userDTO);
		return response;
	}

	@Override
	public Optional<ParentDTO> getParentByUserId(Integer userId) {
		return parentRepository.findByUser_UserId(userId).map(parent -> {
			ParentDTO dto = new ParentDTO();
			dto.setParentId(parent.getParentId());

			User user = parent.getUser();
			UserDTO userDTO = new UserDTO();
			userDTO.setUserId(user.getUserId());
			userDTO.setName(user.getName());
			userDTO.setEmail(user.getEmail());
			userDTO.setAccountNumber(user.getAccountNumber());
			userDTO.setRole(user.getRole());

			dto.setUser(userDTO);
			return dto;
		});
	}
}