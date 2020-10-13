package com.eshka.service;

import com.eshka.dto.auth.LoginDTO;
import com.eshka.dto.auth.RegisterDTO;
import com.eshka.entity.User;
import com.eshka.entity.enums.Role;
import com.eshka.exception.UserAlreadyExist;
import com.eshka.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<String> login(LoginDTO credentials) {
        return new ResponseEntity<>("logged", HttpStatus.OK);
    }

    public ResponseEntity<String> register(RegisterDTO registerData) {
        if (userRepository.findByUsername(registerData.getUsername()).isPresent()) {
            throw new UserAlreadyExist("User already exist");
        }
        User user = User.builder()
                .fullName(registerData.getFullName())
                .username(registerData.getUsername())
                .password(passwordEncoder.encode(registerData.getPassword()))
                .active(true)
                .roles(Collections.singleton(Role.USER))
                .build();
        userRepository.save(user);
        return new ResponseEntity<>("registered", HttpStatus.OK);
    }

}
