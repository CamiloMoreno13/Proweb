package com.transmi_app.server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Employee
 */
@Entity
public class Bus {
    @Id
    @GeneratedValue
    Long id;

    private String placa;
    private String modelo;
    
    @OneToMany(mappedBy = "bus")
    @JsonIgnore
    private List<HorarioBus> horariosBus;

    @OneToMany(mappedBy = "bus")
    @JsonIgnore
    private List<HorarioConductor> horarioConductores;
    
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }
    
    public List<HorarioConductor> getHorarioConductores() {
        return horarioConductores;
    }

    public void setHorarioConductores(List<HorarioConductor> horarioConductores) {
        this.horarioConductores = horarioConductores;
    }

    public List<HorarioBus> getHorariosBus() {
        return horariosBus;
    }

    public void setHorariosBus(List<HorarioBus> horariosBus) {
        this.horariosBus = horariosBus;
    }

    
        
}