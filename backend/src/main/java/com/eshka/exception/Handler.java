package com.eshka.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class Handler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = WrongCredentialsException.class)
    public ResponseEntity<String> handleWrongCredentials() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Wrong username or password");
    }

    @ExceptionHandler(value = UserNotExistException.class)
    public ResponseEntity<String> handleUserNotExist() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("User with this credentials does not exist");
    }
}
