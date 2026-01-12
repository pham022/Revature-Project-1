package org.example.project01.exceptions;

public class PasswordFailedException extends RuntimeException {
  public PasswordFailedException(String message) {
    super(message);
  }
}
