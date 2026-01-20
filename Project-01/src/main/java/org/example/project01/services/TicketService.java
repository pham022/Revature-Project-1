package org.example.project01.services;

import org.example.project01.dto.CreateTicketRequest;
import org.example.project01.dto.UpdateTicketRequest;
import org.example.project01.entities.Ticket;
import org.example.project01.entities.Employee;
import org.example.project01.enums.TicketStatus;
import org.example.project01.exceptions.*;
import org.example.project01.repositories.TicketRepository;
import org.example.project01.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Ticket getById(Long id) throws InvalidTicketIdException {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new InvalidTicketIdException(id));
    }

    public List<Ticket> getAll() {
        return ticketRepository.findAll();
    }

    public Ticket create(CreateTicketRequest request) {
        Employee createdBy = employeeRepository.getById(request.getCreatedById());

        Ticket ticket = new Ticket();
        ticket.setPrice(request.getPrice());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(TicketStatus.PENDING);
        ticket.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        ticket.setCreatedBy(createdBy);

        return ticketRepository.save(ticket);
    }

    public Ticket update(Long id, UpdateTicketRequest request) throws InvalidTicketIdException {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new InvalidTicketIdException(id));

        // Update only non-null fields
        if (request.getPrice() != null) {
            ticket.setPrice(request.getPrice());
        }
        if (request.getDescription() != null) {
            ticket.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            ticket.setStatus(request.getStatus());
        }

        return ticketRepository.save(ticket);
    }

    public void delete(Long id) throws InvalidTicketIdException {
        if (!ticketRepository.existsById(id)) {
            throw new InvalidTicketIdException(id);
        }
        ticketRepository.deleteById(id);
    }
}
