package com.example.demo.repository;


import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByLastNameContainingIgnoreCase(String lastName);
    List<Employee> findByFirstNameContainingIgnoreCase(String firstName);
    List<Employee> findByPatronymicContainingIgnoreCase(String patronymic);
    List<Employee> findByPhoneNumberContaining(String phoneNumber);
    List<Employee> findByEmailContainingIgnoreCase(String email);
    List<Employee> findByCountryContainingIgnoreCase(String country);
    List<Employee> findByCityContainingIgnoreCase(String city);
}

