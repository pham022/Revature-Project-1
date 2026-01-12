package org.example.project01.entities;

import org.example.project01.enums.TicketStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price;

    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.PENDING;

    private String description;
    private LocalDateTime createdAt;

    @ManyToOne
    private Employee createdBy;
}