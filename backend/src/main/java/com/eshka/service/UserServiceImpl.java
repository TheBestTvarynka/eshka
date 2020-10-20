package com.eshka.service;


import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;
import com.eshka.exception.UserNotExistException;
import com.eshka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDTO buildUserDtoFromUser(User user) {
        return UserDTO.fromUser(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotExistException::new);
    }

}
