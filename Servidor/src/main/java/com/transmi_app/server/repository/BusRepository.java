package com.transmi_app.server.repository;

import com.transmi_app.server.model.*;

import org.springframework.data.repository.CrudRepository;

/**
 * EmployeeRepository
 */
public interface BusRepository extends CrudRepository<Bus, Long> {
    
}