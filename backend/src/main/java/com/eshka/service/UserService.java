package com.eshka.service;


import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;
import com.eshka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDTO buildUserDtoFromUser(User user) {
        return UserDTO.fromUser(user);
    }

}
