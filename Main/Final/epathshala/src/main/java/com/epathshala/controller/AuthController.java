package com.epathshala.controller;

import com.epathshala.dto.LoginRequest;
import com.epathshala.dto.ForgotPasswordRequest;
import com.epathshala.dto.VerifyOtpRequest;
import com.epathshala.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticate user and return JWT token")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/logout")
    @Operation(summary = "User Logout", description = "Logout user and invalidate session")
    public ResponseEntity<?> logout(@RequestParam String sessionId) {
        return ResponseEntity.ok(authService.logout(sessionId));
    }

    @GetMapping("/session/{sessionId}")
    @Operation(summary = "Get Session Info", description = "Get information about a specific session")
    public ResponseEntity<?> getSessionInfo(@PathVariable String sessionId) {
        return ResponseEntity.ok(authService.getSessionInfo(sessionId));
    }

    @GetMapping("/sessions")
    @Operation(summary = "Get All Active Sessions", description = "Get information about all active sessions (Admin Only)")
    public ResponseEntity<?> getAllSessions() {
        return ResponseEntity.ok(authService.getAllActiveSessions());
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Forgot Password", description = "Request OTP for password reset")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(authService.forgotPassword(request.getEmail()));
    }

    @PostMapping("/verify-otp")
    @Operation(summary = "Verify OTP and Reset Password", description = "Verify OTP and reset password")
    public ResponseEntity<?> verifyOtpAndResetPassword(@RequestBody VerifyOtpRequest request) {
        return ResponseEntity.ok(authService.verifyOtpAndResetPassword(request));
    }
}