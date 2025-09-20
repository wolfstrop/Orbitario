package com.proyect.orbitario.dto;

public class PlanetDataDTO {

    private String id;
    private String nombre;
    private double ejeMayor;
    private double excentricidad;
    private double inclinacion;
    private double longitudNodoAsc;
    private double argumentoPeriastro;
    private double periodoDias;
    private double periodoRotacionesHora;
    private String descripcion;

    
    public PlanetDataDTO(String id, String nombre, double ejeMayor, double excentricidad,
            double inclinacion, double longitudNodoAsc, double argumentoPeriastro,
            double periodoDias, double periodoRotacionesHora, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.ejeMayor = ejeMayor;
        this.excentricidad = excentricidad;
        this.inclinacion = inclinacion;
        this.longitudNodoAsc = longitudNodoAsc;
        this.argumentoPeriastro = argumentoPeriastro;
        this.periodoDias = periodoDias;
        this.periodoRotacionesHora = periodoRotacionesHora;
        this.descripcion = descripcion;
    }


    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
    }


    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public double getEjeMayor() {
        return ejeMayor;
    }


    public void setEjeMayor(double ejeMayor) {
        this.ejeMayor = ejeMayor;
    }


    public double getExcentricidad() {
        return excentricidad;
    }


    public void setExcentricidad(double excentricidad) {
        this.excentricidad = excentricidad;
    }


    public double getInclinacion() {
        return inclinacion;
    }


    public void setInclinacion(double inclinacion) {
        this.inclinacion = inclinacion;
    }


    public double getLongitudNodoAsc() {
        return longitudNodoAsc;
    }


    public void setLongitudNodoAsc(double longitudNodoAsc) {
        this.longitudNodoAsc = longitudNodoAsc;
    }


    public double getArgumentoPeriastro() {
        return argumentoPeriastro;
    }


    public void setArgumentoPeriastro(double argumentoPeriastro) {
        this.argumentoPeriastro = argumentoPeriastro;
    }

    public double getPeriodoDias() {
        return periodoDias;
    }


    public void setPeriodoDias(double periodoDias) {
        this.periodoDias = periodoDias;
    }


    public double getPeriodoRotacionesHora() {
        return periodoRotacionesHora;
    }


    public void setPeriodoRotacionesHora(double periodoRotacionesHora) {
        this.periodoRotacionesHora = periodoRotacionesHora;
    }


    public String getDescripcion() {
        return descripcion;
    }


    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    
}
