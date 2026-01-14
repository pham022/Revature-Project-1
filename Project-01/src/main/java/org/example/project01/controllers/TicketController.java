package org.example.project01.controllers;

import org.example.project01.dto.TicketDTO;
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
    public ResponseEntity<TicketDTO> create(@RequestBody TicketDTO ticketDTO) {
        Ticket ticket = ticketService.create(ticketDTO);
        TicketDTO responseDTO = new TicketDTO(ticket);
        if (ticket != null) {
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
