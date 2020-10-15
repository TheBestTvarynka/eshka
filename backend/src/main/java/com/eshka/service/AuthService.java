package com.eshka.service;

import com.eshka.config.security.AppProperties;
import com.eshka.dto.auth.LoginDTO;
import com.eshka.dto.auth.AfterLoginDTO;
import com.eshka.dto.auth.RegisterDTO;
import com.eshka.entity.User;
import com.eshka.entity.UserSession;
import com.eshka.entity.enums.Role;
import com.eshka.exception.UserAlreadyExist;
import com.eshka.repository.UserRepository;
import com.eshka.repository.UserSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserSessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AppProperties appProperties;

    public ResponseEntity<AfterLoginDTO> login(LoginDTO credentials) {
        Optional<User> userOptional = userRepository.findByUsername(credentials.getUsername());
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();
        if (passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
            String sessionId = this.tokenService.createToken();
            Date expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + appProperties.getCookieMaxAge().getSeconds() * 1000L);

            UserSession userSession = UserSession.builder()
                    .id(sessionId)
                    .user(user)
                    .expirationDate(expirationDate)
                    .build();
            sessionRepository.save(userSession);

	    AfterLoginDTO afterLogin = AfterLoginDTO.builder()
		    .fullName(user.getFullName())
		    .username(user.getUsername())
		    .email(user.getEmail())
            .role(user.getRole())
		    .sessionId(sessionId)
		    .build();
            return ResponseEntity.ok()
                    .body(afterLogin);
        }
        return null;
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
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return new ResponseEntity<>("registered", HttpStatus.OK);
    }

}
