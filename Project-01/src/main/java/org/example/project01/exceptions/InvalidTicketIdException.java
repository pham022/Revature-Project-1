package org.example.project01.exceptions;

public class InvalidTicketIdException extends Exception {
    public InvalidTicketIdException(Long id) {
        super("Ticket not found with id: " + id);
    }
}