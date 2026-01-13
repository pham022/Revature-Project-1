package org.example.project01.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private boolean isManager;

}
