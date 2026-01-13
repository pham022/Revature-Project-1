package org.example.project01.controllers;


import org.example.project01.dto.LoginDTO;
import org.example.project01.exceptions.PasswordFailedException;
import org.example.project01.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.project01.entities.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

//    @GetMapping("/employees")
//    public ResponseEntity<List<Employee>> getAll()

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestBody LoginDTO loginDTO) throws PasswordFailedException {
        Employee employee = this.employeeService.login(loginDTO.getUsername(), loginDTO.getPassword());
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

}
