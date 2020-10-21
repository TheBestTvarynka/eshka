package com.eshka.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class QueueDetailsNotFoundException extends RuntimeException {
    public QueueDetailsNotFoundException(String message) {
        super(message);
    }
}
