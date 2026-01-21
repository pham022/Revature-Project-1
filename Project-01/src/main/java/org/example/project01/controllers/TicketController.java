package org.example.project01.controllers;

import org.example.project01.dto.CreateTicketRequest;
import org.example.project01.dto.TicketDTO;
import org.example.project01.dto.UpdateTicketRequest;
import org.example.project01.entities.Ticket;
import org.example.project01.services.TicketService;
import org.example.project01.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) throws InvalidTicketIdException {
        Ticket ticket = ticketService.getById(id);
        TicketDTO responseDTO = new TicketDTO(ticket);
        return ResponseEntity.ok(responseDTO);
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
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> update(@PathVariable Long id, @RequestBody UpdateTicketRequest request) throws InvalidTicketIdException {
        Ticket ticket = ticketService.update(id, request);
        TicketDTO responseDTO = new TicketDTO(ticket);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws InvalidTicketIdException {
        ticketService.delete(id);
        return new ResponseEntity<>("Ticket was deleted!", HttpStatus.OK);
    }
}
