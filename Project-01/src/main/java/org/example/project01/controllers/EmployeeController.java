package org.example.project01.controllers;


import org.example.project01.dto.LoginDTO;
import org.example.project01.exceptions.PasswordFailedException;
import org.example.project01.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.project01.entities.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @PostMapping("/register")
    public ResponseEntity<Employee> insert(@RequestBody Employee employee) {
        employee = this.employeeService.insert(employee);
        if(employee != null) return new ResponseEntity<>(employee, HttpStatus.CREATED);
        else return new ResponseEntity<>(new Employee(), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(this.employeeService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAll() {
        return new ResponseEntity<>(this.employeeService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestBody LoginDTO loginDTO) throws PasswordFailedException {
        Employee employee = this.employeeService.login(loginDTO.getUsername(), loginDTO.getPassword());
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

}
