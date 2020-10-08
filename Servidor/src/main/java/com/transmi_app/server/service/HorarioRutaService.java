package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.HorarioRuta;
import com.transmi_app.server.model.Ruta;
import com.transmi_app.server.repository.HorarioRutaRepository;

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
 * HorarioRutaService
 */
@RestController
@RequestMapping("/admin")
public class HorarioRutaService {

    @Autowired
    HorarioRutaRepository repository;

    @Autowired
    RutaService rutaService;

    @GetMapping("horarioRutas")
    Iterable<HorarioRuta> getHorarioRutas() {
        return repository.findAll();
    }

    @GetMapping("horarioRutas/{id}")
    HorarioRuta findHorarioRuta(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encontro información del Horario de la Ruta"));
    }

    @PostMapping("horarioRutas/{id}")
    HorarioRuta createHorarioRuta(@RequestBody HorarioRuta horarioRuta, @PathVariable Long id) {
        Ruta ruta = rutaService.findRuta(id);
        horarioRuta.setRuta(ruta);
        return repository.save(horarioRuta);
    }

    @PutMapping("horarioRutas/{id}")
    HorarioRuta updateHorarioRuta(@PathVariable Long id, @RequestBody HorarioRuta HorarioRutaData) {

        HorarioRuta horarioRuta = findHorarioRuta(id);
        horarioRuta.setFechaFin(HorarioRutaData.getFechaFin());
        horarioRuta.setFechaInicio(HorarioRutaData.getFechaInicio());
        horarioRuta.setRuta(HorarioRutaData.getRuta());

        // How to update the employer Company?

        return repository.save(horarioRuta);
    }

    @DeleteMapping("horarioRutas/{id}")
    void deleteHorario(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }
}