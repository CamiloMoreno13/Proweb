package com.transmi_app.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Employee
 */
@Entity
public class EstacionxEstacion {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    //@JoinColumn( name = "estacion_origen")
    private Estacion estacionOrigen;

    @ManyToOne
    //@JoinColumn( name = "estacion_destino")
    private Estacion estacionDestino;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estacion getEstacionOrigen() {
        return estacionOrigen;
    }

    public void setEstacionOrigen(Estacion estacionOrigen) {
        this.estacionOrigen = estacionOrigen;
    }

    public Estacion getEstacionDestino() {
        return estacionDestino;
    }

    public void setEstacionDestino(Estacion estacionDestino) {
        this.estacionDestino = estacionDestino;
    }
    
    
}