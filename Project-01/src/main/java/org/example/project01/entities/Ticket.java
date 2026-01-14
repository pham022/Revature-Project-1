package org.example.project01.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.project01.enums.TicketStatus;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private Double price;

    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.PENDING;

    private String description;

    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private Employee createdBy;
}
