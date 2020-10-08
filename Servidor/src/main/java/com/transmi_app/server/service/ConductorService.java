package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Conductor;
import com.transmi_app.server.model.HorarioConductor;
import com.transmi_app.server.repository.ConductorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * EmployeeService
 */
@RestController
@RequestMapping("/coord")
public class ConductorService {

    @Autowired
    ConductorRepository repository;

    @Autowired
    HorarioConductorService horarioConductorService;

    @GetMapping("/conductores")
    Iterable<Conductor> getConductores() {
        return repository.findAll();
    }

    @GetMapping("/conductores/{id}")
    Conductor findConductor(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información del Conductor"));
    }

    @GetMapping("/conductores/{id}/horarioConductor")
    Iterable<HorarioConductor> findconductorHorario(@PathVariable Long id) {
        return repository.findById(id).get().getHorarios();
    }
        
    @PostMapping("/conductores")
    Conductor createConductor(@RequestBody Conductor conductor) {
        return repository.save(conductor);
    }
    
    @PutMapping("/conductores/{id}")
    Conductor updateConductor(@PathVariable Long id, @RequestBody Conductor ConductorData) {

        Conductor conductor = findConductor(id);
        conductor.setCedula(ConductorData.getCedula());
        conductor.setDireccion(ConductorData.getDireccion());
        conductor.setHorarios(ConductorData.getHorarios());
        conductor.setNombre(ConductorData.getNombre());
        conductor.setTelefono(ConductorData.getTelefono());
        
        // How to update the employer Company?

        return repository.save(conductor);
    }

    @DeleteMapping("/conductores/{id}")
    void deleteEmployee(@PathVariable Long id) {
        if (repository.existsById(id)) {    
            Iterable<HorarioConductor> horarios = findconductorHorario(id);
            for( HorarioConductor hb : horarios){
                horarioConductorService.deleteHorarioConductor(hb.getId());
            }
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }  
    
    @DeleteMapping("/conductores/{idConductor}/horarioConductor/{idHorario}")
    void deleteHorarioBus(@PathVariable Long idConductor, @PathVariable Long idHorario){

        if( this.repository.existsById(idConductor)){
            this.horarioConductorService.deleteHorarioConductor( idHorario );
        }
    }
}