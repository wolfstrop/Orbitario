package com.proyect.orbitario.service;

import com.proyect.orbitario.model.Planet;
import com.proyect.orbitario.dto.PlanetDTO;
import com.proyect.orbitario.dto.PlanetDataDTO;
import com.proyect.orbitario.dto.Position;
import com.proyect.orbitario.repository.PlanetRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.List;

@Service 
public class PlanetService {


    private final PlanetRepository repo;

    public PlanetService(PlanetRepository repo){
        this.repo = repo;

    }

    public PlanetDTO getPlanetWithPosition(String nombre) {
        Planet p = repo.findByNombreIgnoreCase(nombre).orElseThrow(() -> new NoSuchElementException("Planeta no encontrado"));
    
        
        Instant now = Instant.now();
        double epoch = p.getAnomaliaMediaEpoch();
        //double T = p.getPeriodoDias() * 86400;
        double n = 360.0 / (p.getPeriodoDias());
        double daysElapsed = Duration.between(Instant.EPOCH, now).toDays();
        double M = epoch + n * daysElapsed;
    
        Position pos = KeplerCalculator.computePosition(p, M);

        return new PlanetDTO(p.getId(), p.getNombre(), p.getTextureURL(), p.getDescripcion(), pos.getX(), pos.getY(), pos.getZ());

    }




    public PlanetDataDTO getPlanetData(String nombre){
        Planet p = repo.findByNombreIgnoreCase(nombre).orElseThrow(() -> new NoSuchElementException("Planeta no encontrado"));

        return new PlanetDataDTO(
            p.getId(),
            p.getNombre(),
            p.getEjeMayor(),
            p.getExcentricidad(),
            p.getInclinacion(),
            p.getLongitudNodoAsc(),
            p.getArgumentoPeriastro(),
            p.getPeriodoDias(),
            p.getPeriodoRotacionesHora(),
            p.getDescripcion()
        );
    }


    public List<PlanetDTO> getAllPlanets() {

        return repo.findAll().stream().map(p -> getPlanetWithPosition(p.getNombre())).collect(Collectors.toList());
    }
}
