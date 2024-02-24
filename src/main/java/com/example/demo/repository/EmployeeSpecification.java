package com.example.demo.repository;

import com.example.demo.model.Employee;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EmployeeSpecification {
    public static Specification<Employee> getEmployeesByCriteria(Map<String, String> searchParams) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            searchParams.forEach((key, value) -> {
                if (value != null && !value.trim().isEmpty()) {
                    predicates.add(builder.like(root.get(key), "%" + value + "%"));
                }
            });
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
