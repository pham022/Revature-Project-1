package org.example.project01.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreateTicketRequest {
    // body request format to send to endpoint
    private Double price;
    private String description;
    private Long createdById;
}