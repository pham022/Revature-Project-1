package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.project01.entities.Ticket;
import org.example.project01.enums.TicketStatus;

import java.sql.Timestamp;

@NoArgsConstructor
@Data
public class TicketDTO {
    private Long id;
    private Double price;
    private String description;
    private TicketStatus status;
    private Timestamp createdAt;
    private Long createdById;

    private EmployeeInfo createdBy;

    @Data
    @NoArgsConstructor
    public static class EmployeeInfo {
        private Long id;
        private String username;
        private boolean manager;
    }

    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.price = ticket.getPrice();
        this.description = ticket.getDescription();
        this.status = ticket.getStatus();
        this.createdAt = ticket.getCreatedAt();

        if (ticket.getCreatedBy() != null) {
            this.createdBy = new EmployeeInfo();
            this.createdBy.setId(ticket.getCreatedBy().getId());
            this.createdBy.setUsername(ticket.getCreatedBy().getUsername());
            this.createdBy.setManager(ticket.getCreatedBy().isManager());
        }
    }

}
