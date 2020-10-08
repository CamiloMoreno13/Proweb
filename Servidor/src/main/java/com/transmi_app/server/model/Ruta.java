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
public class Ruta {
    @Id
    @GeneratedValue
    Long id;

    private String codigo;
    @OneToMany(mappedBy = "ruta")
    @JsonIgnore
    private List<HorarioBus> horarioBuses;
    @OneToMany(mappedBy = "ruta")
    @JsonIgnore
    private List<HorarioRuta> horarios;
    
    @OneToMany( mappedBy = "ruta")
    @JsonIgnore
    private List<EstacionRutas> estaciones;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public List<HorarioBus> getHorarioBuses() {
        return horarioBuses;
    }

    public void setHorarioBuses(List<HorarioBus> horarioBuses) {
        this.horarioBuses = horarioBuses;
    }

    public List<HorarioRuta> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<HorarioRuta> horarios) {
        this.horarios = horarios;
    }

    public List<EstacionRutas>getEstaciones() {
        return estaciones;
    }

    public void setEstacionRutas(List<EstacionRutas> estaciones) {
        this.estaciones = estaciones;
    }

}