package com.transmi_app.server.service;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.EstacionRutas;
import com.transmi_app.server.model.HorarioRuta;
import com.transmi_app.server.model.Ruta;
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
@RequestMapping("/public")
public class UserRutaService {

    @Autowired
    RutaRepository repository;

    @GetMapping("/rutas")
    Iterable<Ruta> getRutas() {
        return repository.findAll();
    }

    @GetMapping("/rutas/{id}")
    Ruta findRuta(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información de la Ruta"));
    }

    @GetMapping("/rutas/{id}/estaciones")
    Iterable<EstacionRutas> findRutaEstaciones(@PathVariable Long id) {
        return repository.findById(id).get().getEstaciones();
    }
    
    @GetMapping("/rutas/{id}/horarioRuta")
    Iterable<HorarioRuta> findRutaHorario(@PathVariable Long id) {
        return repository.findById(id).get().getHorarios();
    }
   
}