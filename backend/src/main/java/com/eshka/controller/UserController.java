package com.eshka.controller;

import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;
import com.eshka.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserMapper mapper;

    @GetMapping
    public ResponseEntity<UserDTO> getUserData(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(mapper.userToUserDto(user),
                HttpStatus.OK);
    }

}
