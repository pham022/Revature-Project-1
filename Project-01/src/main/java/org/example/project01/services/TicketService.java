package org.example.project01.services;

import org.example.project01.entities.Ticket;
import org.example.project01.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public Ticket insert(Ticket ticket){
        return ticketRepository.save(ticket);
    }
}
