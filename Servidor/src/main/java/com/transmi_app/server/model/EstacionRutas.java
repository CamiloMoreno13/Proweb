package com.transmi_app.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Employee
 */
@Entity
public class EstacionRutas {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    private Ruta ruta;
    
    @ManyToOne
    private Estacion estacion;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }

    public Estacion getEstacion() {
        return estacion;
    }

    public void setEstacion(Estacion estacion) {
        this.estacion = estacion;
    }

    
    
    
}