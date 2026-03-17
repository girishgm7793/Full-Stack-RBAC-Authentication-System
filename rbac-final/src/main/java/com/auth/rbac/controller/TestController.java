package com.auth.rbac.controller;

import com.auth.rbac.dto.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "2. Access Control", description = "Public, User and Admin endpoints")
public class TestController {

    @GetMapping("/public")
    @Operation(summary = "Public - no token needed")
    public ResponseEntity<MessageResponse> publicAccess() {
        return ResponseEntity.ok(
                new MessageResponse("Public Content: Everyone can see this!"));
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "User only - requires USER role",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<MessageResponse> userAccess() {
        return ResponseEntity.ok(
                new MessageResponse("User Content: Welcome, User! This is your private area."));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Admin only - requires ADMIN role",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<MessageResponse> adminAccess() {
        return ResponseEntity.ok(
                new MessageResponse("Admin Content: Welcome, Admin! Full access granted."));
    }
}
