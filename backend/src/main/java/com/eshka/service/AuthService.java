package com.eshka.service;

import com.eshka.config.security.AppProperties;
import com.eshka.config.security.AuthCookieFilter;
import com.eshka.dto.auth.LoginDTO;
import com.eshka.dto.auth.AfterLoginDTO;
import com.eshka.dto.auth.RegisterDTO;
import com.eshka.entity.User;
import com.eshka.entity.UserSession;
import com.eshka.entity.enums.Role;
import com.eshka.exception.UserAlreadyExist;
import com.eshka.exception.UserNotExistException;
import com.eshka.exception.WrongCredentialsException;
import com.eshka.repository.UserRepository;
import com.eshka.repository.UserSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
            throw new UserNotExistException();
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

            ResponseCookie cookie = ResponseCookie
                    .from(AuthCookieFilter.COOKIE_NAME, sessionId)
                    .maxAge(this.appProperties.getCookieMaxAge())
                    .sameSite("Strict")
                    .path("/").httpOnly(true)
                    .secure(this.appProperties.isSecureCookie())
                    .build();
            AfterLoginDTO afterLogin = AfterLoginDTO.builder()
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .sessionId(sessionId)
                .build();
                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(afterLogin);
        } else {
            throw new WrongCredentialsException();
        }
    }

    public void register(RegisterDTO registerData) {
        if (userRepository.findByUsername(registerData.getUsername()).isPresent()) {
            throw new UserAlreadyExist("User already exist");
        }
        User user = User.builder()
                .fullName(registerData.getFullName())
                .username(registerData.getUsername())
                .email(registerData.getEmail())
                .password(passwordEncoder.encode(registerData.getPassword()))
                .active(true)
                .role(Role.USER)
                .build();
        userRepository.save(user);
    }

}
