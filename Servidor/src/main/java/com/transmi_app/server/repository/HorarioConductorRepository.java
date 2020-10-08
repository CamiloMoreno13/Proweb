
package com.transmi_app.server.repository;

import com.transmi_app.server.model.*;

import org.springframework.data.repository.CrudRepository;

/**
 * EmployeeRepository
 */
public interface HorarioConductorRepository extends CrudRepository<HorarioConductor, Long> {
    
    // @Query("SELECT * FROM HORARIO_CONDUCTOR HC WHERE HC.bud_id")
}