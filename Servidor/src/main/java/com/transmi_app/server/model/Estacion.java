package com.transmi_app.server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Employee
 */
@Entity
public class Estacion {
    @Id
    @GeneratedValue
    Long id;

    private String nombre;
    @OneToMany(mappedBy = "estacion")
    @JsonIgnore
    private List<EstacionRutas> rutas;

    @OneToMany(mappedBy = "estacionOrigen")
    @JsonIgnore
    private List<EstacionxEstacion> estaciones_origen;
    @OneToMany(mappedBy = "estacionDestino")
    @JsonIgnore
    private List<EstacionxEstacion> estaciones_destino;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    

    public List<EstacionxEstacion> getEstaciones_origen() {
        return estaciones_origen;
    }

    public void setEstaciones_origen(List<EstacionxEstacion> estaciones_origen) {
        this.estaciones_origen = estaciones_origen;
    }

    public List<EstacionxEstacion> getEstaciones_destino() {
        return estaciones_destino;
    }

    public void setEstaciones_destino(List<EstacionxEstacion> estaciones_destino) {
        this.estaciones_destino = estaciones_destino;
    }

    public List<EstacionRutas> getRutas() {
        return rutas;
    }

    public void setRutas(List<EstacionRutas> rutas) {
        this.rutas = rutas;
    }
    
}