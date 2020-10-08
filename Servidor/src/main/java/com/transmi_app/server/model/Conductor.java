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
public class Conductor {
    @Id
    @GeneratedValue
    Long id;

    private String nombre;
    private String cedula;
    private String telefono;
    private String direccion;
    @OneToMany(mappedBy = "conductor")
    @JsonIgnore
    private List<HorarioConductor> horarios;

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

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<HorarioConductor> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<HorarioConductor> horarios) {
        this.horarios = horarios;
    }
    

}