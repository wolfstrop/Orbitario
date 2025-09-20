package com.proyect.orbitario.dto;

public class PlanetDTO {
    private String id;
    private String nombre;
    private String textureURL;
    private String descripcion;
    private double x;
    private double y;
    private double z;
    
    
    
    public PlanetDTO(String id, String nombre, String textureURL, String descripcion, double x, double y, double z) {
        this.id = id;
        this.nombre = nombre;
        this.textureURL = textureURL;
        this.descripcion = descripcion;
        this.x = x;
        this.y = y;
        this.z = z;
    }



    public String getId() {
        return id;
    }



    public String getNombre() {
        return nombre;
    }



    public String getTextureURL() {
        return textureURL;
    }



    public String getDescripcion() {
        return descripcion;
    }



    public double getX() {
        return x;
    }



    public double getY() {
        return y;
    }



    public double getZ() {
        return z;
    }

    

}
