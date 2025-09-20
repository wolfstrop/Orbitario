package com.proyect.orbitario.repository;

import com.proyect.orbitario.model.Planet;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;


public interface PlanetRepository extends MongoRepository<Planet, String> {
    Optional<Planet> findByNombreIgnoreCase(String nombre);
}
