package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.project01.entities.TicketStatusHistory;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class TicketHistory {
    private Long id;
    private String action;
    private EmployeeInfo employee;
    private EmployeeInfo manager;
    private Double amount;
    private String comment;
    private LocalDateTime timestamp;

    @Data
    @NoArgsConstructor
    public static class EmployeeInfo {
        private Long id;
        private String username;
    }

    public TicketHistory(TicketStatusHistory history) {
        this.id = history.getId();
        this.action = history.getAction().name();
        this.amount = history.getAmount();
        this.comment = history.getComment();
        this.timestamp = history.getTimestamp();

        if (history.getEmployee() != null) {
            this.employee = new EmployeeInfo();
            this.employee.setId(history.getEmployee().getId());
            this.employee.setUsername(history.getEmployee().getUsername());
        }

        if (history.getManager() != null) {
            this.manager = new EmployeeInfo();
            this.manager.setId(history.getManager().getId());
            this.manager.setUsername(history.getManager().getUsername());
        }
    }
}
