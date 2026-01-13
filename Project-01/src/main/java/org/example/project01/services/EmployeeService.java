package org.example.project01.services;

import org.example.project01.entities.Employee;
import org.example.project01.exceptions.PasswordFailedException;
import org.example.project01.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public Employee insert(Employee employee) {
        return employeeRepository.save(employee);
    }

//    public List<Employee> getAll() { return employeeRepository.findAll(); }

    public Employee login(String username, String password) throws PasswordFailedException {
        Employee employee = this.employeeRepository.findByUsername(username);
        if(employee.getPassword().equals(password)) return employee;
        else throw new PasswordFailedException("Invalid Password!");
    }

}
