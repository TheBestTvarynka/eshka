package com.eshka.service;


import com.eshka.dto.request.UserLoginDTO;
import com.eshka.entity.User;
import com.eshka.entity.enums.Role;
import com.eshka.exception.UserAlreadyExist;
import com.eshka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void createNewUser(UserLoginDTO userLoginDTO) {
        if(userRepository.findByUsername(userLoginDTO.getUsername()).isPresent()){
            throw new UserAlreadyExist("user already exist");
        }

        User user = buildNewUserFromDTO(userLoginDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("crate new user - {}", user);
        userRepository.save(user);
    }

    private User buildNewUserFromDTO(UserLoginDTO userLoginDTO) {
        return User.builder()
                .username(userLoginDTO.getUsername())
                .password(userLoginDTO.getPassword())
                .active(true)
                .role(Role.USER.name())
                .build();
    }
}
