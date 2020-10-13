package com.eshka.service;


import com.eshka.dto.request.UserDTO;
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

import java.util.Collections;

@Log4j2
@Service
@RequiredArgsConstructor
//public class UserService implements UserDetailsService {
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

//    @Override
//    public User loadUserByUsername(String s) {
//        return userRepository.findByUsername(s).orElseThrow(
//                () -> new UsernameNotFoundException("-"));
//    }

    public void createNewUser(UserDTO userDTO) {
        if(userRepository.findByUsername(userDTO.getUsername()).isPresent()){
            throw new UserAlreadyExist("user already exist");
        }

        User user = buildNewUserFromDTO(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("crate new user - {}", user);
        userRepository.save(user);
    }

    private User buildNewUserFromDTO(UserDTO userDTO) {
        return User.builder()
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .active(true)
                .roles(Collections.singleton(Role.USER))
                .build();
    }
}
