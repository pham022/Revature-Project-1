package org.example.project01.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Reference;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;
    private double price;
    private String status;
    private String description;
    private Timestamp created;

}
