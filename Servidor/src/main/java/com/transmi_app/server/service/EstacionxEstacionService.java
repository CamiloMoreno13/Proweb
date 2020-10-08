package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Estacion;
import com.transmi_app.server.model.EstacionxEstacion;
import com.transmi_app.server.repository.EstacionxEstacionRepository;

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
 * EstacionxEstacionService
 */
@RestController
@RequestMapping("/admin")
public class EstacionxEstacionService {

    @Autowired
    EstacionxEstacionRepository repository;

    @Autowired
    EstacionService estacionService;

    @GetMapping("/estacionxEstacion")
    Iterable<EstacionxEstacion> getEstacionxEstacion() {
        return repository.findAll();
    }

    @GetMapping("/estacionxEstacion/{id}")
    EstacionxEstacion findEstacionxEstacion(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información de la EstacionxEstacion"));
    }

    
    

    @PostMapping("/estacionxEstacion/{idEstacionOrigen}/{idEstacionDestino}")
    EstacionxEstacion createEstacionxEstacion(@RequestBody EstacionxEstacion estacionxEstacion, @PathVariable Long idEstacionOrigen, @PathVariable Long idEstacionDestino) {
        Estacion estacionOrigen = estacionService.findEstacion(idEstacionOrigen);
        Estacion estacionDestino = estacionService.findEstacion(idEstacionDestino);
        estacionxEstacion.setEstacionOrigen(estacionOrigen);
        estacionxEstacion.setEstacionDestino(estacionDestino);
        return repository.save(estacionxEstacion);
    }
    
    @PutMapping("/estacionxEstacion/{id}")
    EstacionxEstacion updateEstacionxEstacion(@PathVariable Long id, @RequestBody EstacionxEstacion EstacionxEstacionData) {

        EstacionxEstacion estacionxEstacion = findEstacionxEstacion(id);
        estacionxEstacion.setEstacionDestino(EstacionxEstacionData.getEstacionDestino());
        estacionxEstacion.setEstacionOrigen(EstacionxEstacionData.getEstacionOrigen());
        
        // How to update the employer Company?

        return repository.save(estacionxEstacion);
    }

    @DeleteMapping("/estacionxEstacion/{id}")
    void deleteEmployee(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   
}