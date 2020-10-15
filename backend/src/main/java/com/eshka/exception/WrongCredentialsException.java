package com.eshka.exception;

public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String message) {
        super(message);
    }

    public WrongCredentialsException() {
        super("Wrong credentials");
    }
}
