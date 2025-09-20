package com.proyect.orbitario.controller;

import com.proyect.orbitario.service.PlanetService;
import com.proyect.orbitario.dto.PlanetDTO;
import com.proyect.orbitario.dto.PlanetDataDTO;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/api/planets")
public class PlanetController {
    public final PlanetService service;

    public PlanetController(PlanetService service){
        this.service = service;
    }

    @GetMapping("/{nombre}/position")
    public ResponseEntity<PlanetDTO> getPlanetP(@PathVariable String nombre){
        try{
            PlanetDTO dto = service.getPlanetWithPosition(nombre);
            return ResponseEntity.ok(dto);
        }
        catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{nombre}/data")
    public ResponseEntity<PlanetDataDTO> getPlanetD(@PathVariable String nombre){
        try{
            PlanetDataDTO dto = service.getPlanetData(nombre);
            return ResponseEntity.ok(dto);
        }
        catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public List<PlanetDTO> getAllPlanets(){
        return service.getAllPlanets();
    }
    
}
