package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@Data
public class TicketDTO {
    private Double price;
    private String description;
    private Long createdById;
    private Timestamp createdAt;
}
