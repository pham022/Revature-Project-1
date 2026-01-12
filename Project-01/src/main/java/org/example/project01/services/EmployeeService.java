package org.example.project01.services;

import org.example.project01.entities.Employee;
import org.example.project01.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public Employee insert(Employee employee) {
        return employeeRepository.save(employee);
    }

}
