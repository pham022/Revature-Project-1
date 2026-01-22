package org.example.project01.services;

import org.example.project01.dto.CreateTicketRequest;
import org.example.project01.dto.UpdateTicketRequest;
import org.example.project01.entities.Ticket;
import org.example.project01.entities.Employee;
import org.example.project01.entities.TicketStatusHistory;
import org.example.project01.enums.TicketStatus;
import org.example.project01.exceptions.*;
import org.example.project01.repositories.TicketRepository;
import org.example.project01.repositories.EmployeeRepository;
import org.example.project01.repositories.TicketStatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TicketStatusHistoryRepository historyRepository;

    public Ticket getById(Long id) throws InvalidTicketIdException {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new InvalidTicketIdException(id));
    }

    public List<Ticket> getAll() {
        return ticketRepository.findAll();
    }

    @Transactional
    public Ticket create(CreateTicketRequest request) {
        Employee createdBy = employeeRepository.getById(request.getCreatedById());

        Ticket ticket = new Ticket();
        ticket.setPrice(request.getPrice());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(TicketStatus.PENDING);
        ticket.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        ticket.setCreatedBy(createdBy);

        ticket = ticketRepository.save(ticket);

        // Create history entry for ticket creation
        TicketStatusHistory history = new TicketStatusHistory();
        history.setTicket(ticket);
        history.setEmployee(createdBy);
        history.setAction(TicketStatusHistory.Action.CREATED);
        history.setAmount(ticket.getPrice());
        history.setComment("Ticket created");
        historyRepository.save(history);

        return ticket;
    }

    @Transactional
    public Ticket update(Long id, UpdateTicketRequest request) throws InvalidTicketIdException {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new InvalidTicketIdException(id));
        TicketStatus oldStatus = ticket.getStatus();

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

        ticket = ticketRepository.save(ticket);

        // Create history entry if status changed and manager info is provided
        if (request.getStatus() != null && !request.getStatus().equals(oldStatus) && request.getManagerId() != null) {
            Employee manager = employeeRepository.getById(request.getManagerId());
            TicketStatusHistory.Action action = request.getStatus() == TicketStatus.APPROVED 
                ? TicketStatusHistory.Action.APPROVED 
                : TicketStatusHistory.Action.DENIED;

            TicketStatusHistory history = new TicketStatusHistory();
            history.setTicket(ticket);
            history.setEmployee(ticket.getCreatedBy());
            history.setManager(manager);
            history.setAction(action);
            history.setAmount(ticket.getPrice());
            history.setComment(request.getComment());
            historyRepository.save(history);
        }

        return ticket;
    }

    public void delete(Long id) throws InvalidTicketIdException {
        if (!ticketRepository.existsById(id)) {
            throw new InvalidTicketIdException(id);
        }
        ticketRepository.deleteById(id);
    }

    public List<TicketStatusHistory> getHistoryByTicketId(Long ticketId) {
        return historyRepository.findByTicketIdOrderByTimestampAsc(ticketId);
    }
}
