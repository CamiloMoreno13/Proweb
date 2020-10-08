package com.transmi_app.server.service;

import java.util.ArrayList;

import com.transmi_app.server.exceptions.*;
import com.transmi_app.server.model.Estacion;
import com.transmi_app.server.model.EstacionxEstacion;
import com.transmi_app.server.repository.EstacionRepository;

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
 * EstacionService
 */
@RestController
@RequestMapping("/admin")
public class EstacionService {

    @Autowired
    EstacionRepository repository;

    @GetMapping("/estaciones")
    Iterable<Estacion> getEstaciones() {
        return repository.findAll();
    }

    @GetMapping("/estaciones/{id}")
    Estacion findEstacion(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información de la Estacion"));
    }

    @GetMapping("/estaciones/{id}/estacionXEstacion")
    Iterable<EstacionxEstacion>findRutaHorario(@PathVariable Long id) {
        ArrayList<EstacionxEstacion> estaciones = new ArrayList<>();
        estaciones.addAll( repository.findById(id).get().getEstaciones_destino() );
        estaciones.addAll( repository.findById(id).get().getEstaciones_origen() );
        return estaciones;
        //return repository.findById(id).get().getEstaciones_destino();
    }

    @PostMapping("/estaciones")
    Estacion createEstacion(@RequestBody Estacion estacion) {
        return repository.save(estacion);
    }
    
    @PutMapping("/estaciones/{id}")
    Estacion updateEstacion(@PathVariable Long id, @RequestBody Estacion EstacionData) {

        Estacion estacion = findEstacion(id);
        estacion.setNombre(EstacionData.getNombre());
        estacion.setRutas(EstacionData.getRutas());
        estacion.setEstaciones_destino(EstacionData.getEstaciones_origen());
        estacion.setEstaciones_origen(EstacionData.getEstaciones_destino());
        
        // How to update the employer Company?

        return repository.save(estacion);
    }

    @DeleteMapping("/estaciones/{id}")
    void deleteEmployee(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   
}