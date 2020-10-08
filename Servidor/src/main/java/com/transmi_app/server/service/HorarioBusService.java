package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Bus;
import com.transmi_app.server.model.HorarioBus;
import com.transmi_app.server.model.Ruta;
import com.transmi_app.server.repository.HorarioBusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HorarioBusService
 */
@RestController
@RequestMapping("/coord")
public class HorarioBusService {

    @Autowired
    HorarioBusRepository repository;

    @Autowired
    BusService busService;

    @Autowired
    RutaService rutaService;

    @GetMapping("/horarioBuses")
    Iterable<HorarioBus> getHorarioBuses() {
        return repository.findAll();
    }

    @GetMapping("/horarioBuses/{id}")
    HorarioBus findHorarioBus(@PathVariable Long id) {
        
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información del Horario del Bus"));
    
    }

    @PostMapping("/horarioBuses/{idBus}/{idRuta}")
    HorarioBus createHorarioBus(@RequestBody HorarioBus horarioBus, @PathVariable Long idBus, @PathVariable Long idRuta) {
        
        Ruta ruta = rutaService.findRuta(idRuta);
        Bus bus = busService.findBus(idBus);

        horarioBus.setRuta(ruta);
        horarioBus.setBus(bus);
        
        return repository.save(horarioBus);
    }
    /*
    @PutMapping("/horarioBuses/{id}")
    HorarioBus updateHorarioBus(@PathVariable Long id, @RequestBody HorarioBus HorarioBusData) {

        HorarioBus horarioBus = findHorarioBus(id);
        horarioBus.setFecha(HorarioBusData.getFecha());
        horarioBus.setRuta(HorarioBusData.getRuta());
        horarioBus.setBus(HorarioBusData.getBus());
        
        // How to update the employer Company?

        return repository.save(horarioBus);
    }*/

    @DeleteMapping("/horarioBuses/{id}")
    void deleteHorarioBus(@PathVariable Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   
}