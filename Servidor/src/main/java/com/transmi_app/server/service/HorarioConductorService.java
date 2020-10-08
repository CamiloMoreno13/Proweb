package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Bus;
import com.transmi_app.server.model.Conductor;
import com.transmi_app.server.model.HorarioConductor;
import com.transmi_app.server.repository.HorarioConductorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HorarioConductorService
 */
@RestController
@RequestMapping("/coord")
public class HorarioConductorService {

    @Autowired
    HorarioConductorRepository repository;

    @Autowired
    BusService busService;

    @Autowired
    ConductorService conductorService;

    @GetMapping("/horarioConductores")
    Iterable<HorarioConductor> getHorarioConductores() {
        return repository.findAll();
    }

    @GetMapping("/horarioConductores/{id}")
    HorarioConductor findHorarioConductor(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información del Horario del Conductor"));
    }

    @PostMapping("/horarioConductores/{idConductor}/{idBus}")
    HorarioConductor createHorarioConductor(@RequestBody HorarioConductor horarioConductor, @PathVariable Long idBus, @PathVariable Long idConductor ) {
        //horarioConductor.setBus( );
        Conductor conductor = conductorService.findConductor(idConductor);
        Bus bus = busService.findBus(idBus);
        horarioConductor.setConductor(conductor);
        horarioConductor.setBus(bus);
        return repository.save(horarioConductor);
    }
    
    /*
    @PutMapping("/horarioConductores/{idConductor}/{idBus}")
    HorarioConductor updateHorarioConductor(@RequestBody HorarioConductor horarioConductor, @PathVariable Long idBus, @PathVariable Long idConductor ) {

        HorarioConductor horarioConductor = findHorarioConductor(id);
        horarioConductor.setFecha(HorarioConductorData.getFecha());
        
        return repository.save(horarioConductor);
    }*/

    @DeleteMapping("/horarioConductores/{id}")
    void deleteHorarioConductor(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   
}