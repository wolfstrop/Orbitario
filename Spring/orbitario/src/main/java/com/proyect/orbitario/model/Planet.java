package com.proyect.orbitario.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document("Planets")
public class Planet {
    
    @Id
    private String id;
    private String nombre;
    private String textureURL;

    private double ejeMayor;
    private double excentricidad;
    private double inclinacion;
    private double longitudNodoAsc;
    private double argumentoPeriastro;
    private double anomaliaMediaEpoch;
    private double periodoDias;
    private double periodoRotacionesHora;

    private String descripcion;
    private Instant creadoEn;


    


    public Planet(String id, String nombre, String textureURL, double ejeMayor, double excentricidad,
            double inclinacion, double longitudNodoAsc, double argumentoPeriastro, double anomaliaMediaEpoch,
            double periodoDias, double periodoRotacionesHora, String descripcion, Instant creadoEn) {
        
        
                this.id = id;
        this.nombre = nombre;
        this.textureURL = textureURL;
        this.ejeMayor = ejeMayor;
        this.excentricidad = excentricidad;
        this.inclinacion = inclinacion;
        this.longitudNodoAsc = longitudNodoAsc;
        this.argumentoPeriastro = argumentoPeriastro;
        this.anomaliaMediaEpoch = anomaliaMediaEpoch;
        this.periodoDias = periodoDias;
        this.periodoRotacionesHora = periodoRotacionesHora;
        this.descripcion = descripcion;
        this.creadoEn = creadoEn;


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
    public String getTextureURL() {
        return textureURL;
    }
    public void setTextureURL(String textureURL) {
        this.textureURL = textureURL;
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
    public double getAnomaliaMediaEpoch() {
        return anomaliaMediaEpoch;
    }
    public void setAnomaliaMediaEpoch(double anomaliaMediaEpoch) {
        this.anomaliaMediaEpoch = anomaliaMediaEpoch;
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
    public Instant getCreadoEn() {
        return creadoEn;
    }
    public void setCreadoEn(Instant creadoEn) {
        this.creadoEn = creadoEn;
    }

    


}
