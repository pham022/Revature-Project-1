package org.example.project01.controllers;

import org.example.project01.dto.CreateTicketRequest;
import org.example.project01.dto.TicketDTO;
import org.example.project01.entities.Ticket;
import org.example.project01.services.TicketService;
import org.example.project01.exceptions.InvalidTicketIdException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getById(id);

        if (ticket != null) {
            TicketDTO responseDTO = new TicketDTO(ticket);
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAll();
        List<TicketDTO> responseDTOs = tickets.stream()
                .map(TicketDTO::new)
                .toList();
        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping
    public ResponseEntity<TicketDTO> create(@RequestBody CreateTicketRequest request) {
        Ticket ticket = ticketService.create(request);
        TicketDTO responseDTO = new TicketDTO(ticket);
        if (ticket != null) {
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
