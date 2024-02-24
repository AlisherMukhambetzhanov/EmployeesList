package com.example.demo.service;


import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

        employee.setLastName(employeeDetails.getLastName());
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setPatronymic(employeeDetails.getPatronymic());
        employee.setPhoneNumber(employeeDetails.getPhoneNumber());
        employee.setEmail(employeeDetails.getEmail());
        employee.setCountry(employeeDetails.getCountry());
        employee.setCity(employeeDetails.getCity());

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
        employeeRepository.delete(employee);
    }

    public List<Employee> searchByLastName(String lastName) {
        return employeeRepository.findByLastNameContainingIgnoreCase(lastName);
    }

    public List<Employee> searchByFirstName(String firstName) {
        return employeeRepository.findByFirstNameContainingIgnoreCase(firstName);
    }

    public List<Employee> searchByPatronymic(String patronymic) {
        return employeeRepository.findByPatronymicContainingIgnoreCase(patronymic);
    }

    public List<Employee> searchByPhoneNumber(String phoneNumber) {
        return employeeRepository.findByPhoneNumberContaining(phoneNumber);
    }

    public List<Employee> searchByEmail(String mail) {
        return employeeRepository.findByEmailContainingIgnoreCase(mail);
    }

    public List<Employee> searchByCountry(String country) {
        return employeeRepository.findByCountryContainingIgnoreCase(country);
    }

    public List<Employee> searchByCity(String city) {
        return employeeRepository.findByCityContainingIgnoreCase(city);
    }
}

