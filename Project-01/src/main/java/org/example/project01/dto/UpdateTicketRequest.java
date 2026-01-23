package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.project01.enums.TicketStatus;

@NoArgsConstructor
@Data
public class UpdateTicketRequest {
    private Double price;
    private String description;
    private TicketStatus status;
    private Long managerId; // ID of manager making the decision (for history tracking)
    private String comment; // Comment from manager (for history tracking)
}