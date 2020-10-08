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
@RequestMapping("/admin")
public class RutaService {

    @Autowired
    RutaRepository repository;

    @Autowired
    HorarioRutaService horarioRutaService;

    @Autowired
    EstacionRutasService estacionRutasService;

    @GetMapping("/rutas")
    Iterable<Ruta> getRutas() {
        return repository.findAll();
    }

    @GetMapping("/rutas/{id}")
    Ruta findRuta(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontro información de la Ruta"));
    }

    @GetMapping("/rutas/{id}/horarioRuta")
    Iterable<HorarioRuta> findRutaHorario(@PathVariable Long id) {
        return repository.findById(id).get().getHorarios();
    }

    @GetMapping("/rutas/{id}/estaciones")
    Iterable<EstacionRutas> findRutaEstaciones(@PathVariable Long id) {
        return repository.findById(id).get().getEstaciones();
    }

    @PostMapping("/rutas")
    Ruta createRuta(@RequestBody Ruta ruta) {
        return repository.save(ruta);
    }
    
    @PutMapping("/rutas/{id}")
    Ruta updateRuta(@PathVariable Long id, @RequestBody Ruta RutaData) {

        Ruta ruta = findRuta(id);
        ruta.setCodigo(RutaData.getCodigo());
        return repository.save(ruta);
    }

    @DeleteMapping("/rutas/{id}")
    void deleteRuta(@PathVariable Long id) {
        Ruta ruta = findRuta(id);
        
        if ( ruta.getHorarioBuses().size() == 0 ) {
            Iterable<EstacionRutas> estaciones = findRutaEstaciones(id);
            for( EstacionRutas hb : estaciones){
                estacionRutasService.deleteEstacionRutas(hb.getId());
            }
            Iterable<HorarioRuta> horarios = findRutaHorario(id);
            for( HorarioRuta hb : horarios){
                horarioRutaService.deleteHorario(hb.getId());
            }
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }   

    @DeleteMapping("/rutas/{idRuta}/horarioRuta/{idHorario}")
    void deleteHorarioBus(@PathVariable Long idRuta, @PathVariable Long idHorario){

        if( this.repository.existsById(idRuta)){
            this.horarioRutaService.deleteHorario( idHorario );
        }
    }

    @DeleteMapping("/rutas/{idRuta}/estaciones/{idEstacion}")
    void deleteEstacion(@PathVariable Long idRuta, @PathVariable Long idEstacion){
        if( this.repository.existsById(idRuta)){
            this.estacionRutasService.deleteEstacionRutas( idEstacion );
        }
    }
}