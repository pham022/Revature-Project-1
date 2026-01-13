package org.example.project01.services;

import org.example.project01.dto.TicketDTO;
import org.example.project01.entities.Ticket;
import org.example.project01.entities.Employee;
import org.example.project01.repositories.TicketRepository;
import org.example.project01.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Ticket create(TicketDTO ticketDTO){
        Employee createdById = employeeRepository.getById(ticketDTO.getCreatedById())

    }
}
