package com.eshka.controller;

import com.eshka.dto.request.UserDTO;
import com.eshka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/registration")
    public void createNewUser(@RequestBody UserDTO userDTO) {
        userService.createNewUser(userDTO);
    }

}
