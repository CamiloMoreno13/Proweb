package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Estacion;
import com.transmi_app.server.model.EstacionRutas;
import com.transmi_app.server.model.HorarioRuta;
import com.transmi_app.server.model.Ruta;
import com.transmi_app.server.repository.EstacionRutasRepository;
import com.transmi_app.server.repository.RutaRepository;

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
 * RutaService
 */
@RestController
@RequestMapping("/admin")
public class EstacionRutasService {

    @Autowired
    EstacionRutasRepository repository;

    @Autowired
    RutaService rutaService;

    @Autowired
    EstacionService estacionService;

    @GetMapping("/estacionRutas")
    Iterable<EstacionRutas> getEstacionRutas() {
        return repository.findAll();
    }

    @PostMapping("/estacionRutas/{idRuta}/{idEstacion}")
    EstacionRutas createEstacionRutas(@PathVariable Long idRuta,@PathVariable Long idEstacion) {
        EstacionRutas er = new EstacionRutas();
        Ruta ruta = rutaService.findRuta(idRuta);
        Estacion estacion = estacionService.findEstacion(idEstacion);
        
        er.setRuta(ruta);
        er.setEstacion(estacion);

        return repository.save(er);
    }

    @DeleteMapping("/estacionRutas/{id}")
    void deleteEstacionRutas(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   
   
}