package com.epathshala.service;

import com.epathshala.dto.LoginRequest;
import com.epathshala.entity.User;
import com.epathshala.repository.UserRepository;
import com.epathshala.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private com.epathshala.security.CustomUserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public Map<String, Object> login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
            .orElseThrow(() -> new BadCredentialsException("User not found"));
        if (!user.getRole().equalsIgnoreCase(req.getRole())) {
            throw new BadCredentialsException("Role mismatch");
        }
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(req.getEmail());
        String token = jwtUtil.generateToken(userDetails, user.getRole());
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("role", user.getRole());
        resp.put("userId", user.getId());
        resp.put("name", user.getName());
        return resp;
    }

    public Map<String, Object> forgotPassword(String email) {
        // In a real app, send email with reset link/token
        if (!userRepo.findByEmail(email).isPresent()) {
            return Map.of("error", "User not found");
        }
        return Map.of("message", "Password reset link sent to email (demo: use reset endpoint)");
    }

    public Map<String, Object> resetPassword(String email, String newPassword) {
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            return Map.of("error", "User not found");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        return Map.of("message", "Password reset successful");
    }
}