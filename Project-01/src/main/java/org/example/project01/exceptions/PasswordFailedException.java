package org.example.project01.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PasswordFailedException extends RuntimeException {
    public PasswordFailedException(String message) {
        super(message);
    }
}
