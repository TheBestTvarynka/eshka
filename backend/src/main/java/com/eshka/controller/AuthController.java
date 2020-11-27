package com.eshka.controller;

import com.eshka.dto.auth.LoginDTO;
import com.eshka.dto.auth.AfterLoginDTO;
import com.eshka.dto.auth.RegisterDTO;
import com.eshka.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AfterLoginDTO> login(@RequestBody LoginDTO credentials) {
        return this.authService.login(credentials);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterDTO registerData) {
        this.authService.register(registerData);
    }

    @GetMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout() {
    }

}
