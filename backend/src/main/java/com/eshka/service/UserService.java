package com.eshka.service;

import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;

public interface UserService {
    User findById(Long id);

    User getCurrentUser();
}
