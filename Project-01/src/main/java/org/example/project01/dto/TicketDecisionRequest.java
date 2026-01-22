package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.project01.enums.TicketStatus;

@NoArgsConstructor
@Data
public class TicketDecisionRequest {
    private Long ticketId;
    private TicketStatus decision; // APPROVED or DENIED
    private String comment;
}
