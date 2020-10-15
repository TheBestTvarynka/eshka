package com.eshka.controller;

import com.eshka.dto.request.UserDTO;
import com.eshka.entity.User;
import com.eshka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/test")
    public String test() {
        return "{\"message\":\"Allow!\"";
    }

    @GetMapping
    public UserDTO getUserData(@AuthenticationPrincipal User user) {
        return userService.buildUserDtoFromUser(user);
    }

}
