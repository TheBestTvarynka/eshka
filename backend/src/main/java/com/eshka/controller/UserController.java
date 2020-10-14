package com.eshka.controller;

import com.eshka.dto.request.UserLoginDTO;
import com.eshka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/registration")
    public void createNewUser(@RequestBody UserLoginDTO userLoginDTO) {
        userService.createNewUser(userLoginDTO);
    }

    @GetMapping("/test")
    public String test() {
        return "{\"message\":\"Allow!\"";
    }

}
