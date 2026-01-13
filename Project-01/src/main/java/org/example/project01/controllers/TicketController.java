package org.example.project01.controllers;

import org.example.project01.entities.Ticket;
import org.example.project01.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/ticket")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        ticket = this.ticketService.create(ticket);
        if (ticket != null) {
            return new ResponseEntity<>(ticket, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(new Ticket(), HttpStatus.BAD_REQUEST);
        }
    }
}
