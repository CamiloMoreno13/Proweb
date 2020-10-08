package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Bus;
import com.transmi_app.server.model.HorarioBus;
import com.transmi_app.server.repository.BusRepository;

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
public class BusService {

    @Autowired
    BusRepository repository;

    @Autowired
    HorarioBusService horarioBusSerice; 

    @GetMapping("/buses")
    Iterable<Bus> getBuses() {
        return repository.findAll();
    }

    @GetMapping("/buses/{id}")
    Bus findBus(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información del bus"));
    }

    @GetMapping("/buses/{id}/horarioBus")
    Iterable<HorarioBus> findBusHorario(@PathVariable Long id) {
        return repository.findById(id).get().getHorariosBus();
    }

    @PostMapping("/buses")
    Bus createBus(@RequestBody Bus bus) {
        return repository.save(bus);
    }
    
    @PutMapping("/buses/{id}")
    Bus updateBus(@PathVariable Long id, @RequestBody Bus busData) {

        Bus bus = findBus(id);
        bus.setModelo(busData.getModelo());
        bus.setPlaca(busData.getPlaca());
        bus.setHorarioConductores(busData.getHorarioConductores());
        bus.setHorariosBus(busData.getHorariosBus());
        // How to update the employer Company?

        return repository.save(bus);
    }

    @DeleteMapping("/buses/{id}")
    void deleteBus(@PathVariable Long id) {
        Bus bus = findBus(id);

        if ( bus.getHorarioConductores().size() == 0) {
            Iterable<HorarioBus> horarios = findBusHorario(id);
            for( HorarioBus hb : horarios){
                horarioBusSerice.deleteHorarioBus(hb.getId());
            }
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   

    @DeleteMapping("/buses/{idBus}/horarioBus/{idHorario}")
    void deleteHorarioBus(@PathVariable Long idBus, @PathVariable Long idHorario){
           if( this.repository.existsById(idBus)){
                this.horarioBusSerice.deleteHorarioBus( idHorario );
            }
    }
}