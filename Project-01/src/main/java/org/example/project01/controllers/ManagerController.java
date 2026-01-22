package org.example.project01.controllers;

import org.example.project01.dto.TicketDTO;
import org.example.project01.dto.TicketDecisionRequest;
import org.example.project01.dto.UpdateTicketRequest;
import org.example.project01.entities.Ticket;
import org.example.project01.enums.TicketStatus;
import org.example.project01.exceptions.InvalidTicketIdException;
import org.example.project01.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/managers")
public class ManagerController {

    @Autowired
    private TicketService ticketService;

    /**
     * Get all pending tickets for manager review
     */
    @GetMapping("/tickets/pending")
    public ResponseEntity<List<TicketDTO>> getPendingTickets() {
        List<Ticket> allTickets = ticketService.getAll();
        List<Ticket> pendingTickets = allTickets.stream()
                .filter(ticket -> ticket.getStatus() == TicketStatus.PENDING)
                .collect(Collectors.toList());
        
        List<TicketDTO> responseDTOs = pendingTickets.stream()
                .map(TicketDTO::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(responseDTOs);
    }

    /**
     * Get all tickets (for managers to view all employee tickets)
     */
    @GetMapping("/tickets/all")
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAll();
        List<TicketDTO> responseDTOs = tickets.stream()
                .map(TicketDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    /**
     * Approve or deny a ticket with comment
     */
    @PostMapping("/tickets/decide")
    public ResponseEntity<TicketDTO> decideTicket(@RequestBody TicketDecisionRequest request) throws InvalidTicketIdException {
        if (request.getTicketId() == null || request.getDecision() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        UpdateTicketRequest updateRequest = new UpdateTicketRequest();
        updateRequest.setStatus(request.getDecision());
        
        // Store comment in description field for now (you may want to add a comment field to Ticket entity)
        if (request.getComment() != null && !request.getComment().trim().isEmpty()) {
            updateRequest.setDescription(request.getComment());
        }
        
        Ticket ticket = ticketService.update(request.getTicketId(), updateRequest);
        TicketDTO responseDTO = new TicketDTO(ticket);
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * Approve a ticket (alternative endpoint)
     */
    @PostMapping("/tickets/{id}/approve")
    public ResponseEntity<TicketDTO> approveTicket(
            @PathVariable Long id,
            @RequestBody(required = false) TicketDecisionRequest request) throws InvalidTicketIdException {
        
        UpdateTicketRequest approveRequest = new UpdateTicketRequest();
        approveRequest.setStatus(TicketStatus.APPROVED);
        
        if (request != null && request.getComment() != null) {
            approveRequest.setDescription(request.getComment());
        }
        
        Ticket ticket = ticketService.update(id, approveRequest);
        TicketDTO responseDTO = new TicketDTO(ticket);
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * Deny a ticket (alternative endpoint)
     */
    @PostMapping("/tickets/{id}/deny")
    public ResponseEntity<TicketDTO> denyTicket(
            @PathVariable Long id,
            @RequestBody(required = false) TicketDecisionRequest request) throws InvalidTicketIdException {
        
        UpdateTicketRequest denyRequest = new UpdateTicketRequest();
        denyRequest.setStatus(TicketStatus.DENIED);
        
        if (request != null && request.getComment() != null) {
            denyRequest.setDescription(request.getComment());
        }
        
        Ticket ticket = ticketService.update(id, denyRequest);
        TicketDTO responseDTO = new TicketDTO(ticket);
        return ResponseEntity.ok(responseDTO);
    }
}
