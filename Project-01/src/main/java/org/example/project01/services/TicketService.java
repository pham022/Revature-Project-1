package org.example.project01.services;

import org.example.project01.dto.CreateTicketRequest;
import org.example.project01.dto.TicketDTO;
import org.example.project01.entities.Ticket;
import org.example.project01.entities.Employee;
import org.example.project01.enums.TicketStatus;
import org.example.project01.exceptions.InvalidTicketIdException;
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

    public Ticket getById(Long id) {
        return ticketRepository.findById(id).orElse(null);
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


}
