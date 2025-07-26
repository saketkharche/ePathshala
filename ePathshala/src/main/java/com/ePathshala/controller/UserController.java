package com.ePathshala.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePathshala.dto.UserDTO;
import com.ePathshala.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/{id}")
	public UserDTO getUser(@PathVariable Long id) {
		return userService.getUserById(id);
	}

	@PostMapping
	public UserDTO createUser(@RequestBody UserDTO dto) {
		return userService.createUser(dto);
	}

	@PutMapping("/{id}")
	public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
		return userService.updateUser(id, dto);
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
}