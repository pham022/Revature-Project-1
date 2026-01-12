package org.example.project01.controllers;

import org.example.project01.entities.Employee;
import org.example.project01.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employees")
    public ResponseEntity<Employee> insert(@RequestBody Employee employee) {
        employee = this.employeeService.insert(employee);
        if(employee != null) return new ResponseEntity<>(employee, HttpStatus.CREATED);
        else return new ResponseEntity<>(new Employee(), HttpStatus.BAD_REQUEST);
    }
}
