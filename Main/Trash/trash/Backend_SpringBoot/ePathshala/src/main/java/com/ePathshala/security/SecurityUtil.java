package com.ePathshala.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

	private final JwtService jwtService;

	public SecurityUtil(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	public String extractEmailFromToken(String token) {
		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		return jwtService.extractUsername(token);
	}

	public boolean isAdmin(Authentication authentication) {
		return authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}
}