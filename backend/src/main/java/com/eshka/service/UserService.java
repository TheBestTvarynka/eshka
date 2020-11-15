package com.eshka.service;

import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;

public interface UserService {
    UserDTO buildUserDtoFromUser(User user);

    User findById(Long id);

    User getCurrentUser();
}
