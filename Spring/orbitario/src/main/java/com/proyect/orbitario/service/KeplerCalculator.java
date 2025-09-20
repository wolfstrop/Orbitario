package com.proyect.orbitario.service;

import com.proyect.orbitario.model.Planet;
import com.proyect.orbitario.dto.Position;

public class KeplerCalculator {
    

    public static Position computePosition(Planet p, double Mdeg){
        
        //lo hacemos radianes
        double M = Math.toRadians(Mdeg % 360);
        
        //aproximacion de que E = M
        double e = p.getExcentricidad();
        double E = M;
        for (int i = 0; i < 10; i++){
            E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        }

        //Anomalia verdadera
        double nu = 2 * Math.atan2(
            Math.sqrt(1 + e) * Math.sin(E / 2),
            Math.sqrt(1 - e) * Math.sin(E / 2)
        );


        //radio
        double a = p.getEjeMayor();
        double r = a * (1 - e * Math.cos(E));


        //cordenadas en plano orbital
        double xOrb = r * Math.cos(nu);
        double yOrb = r * Math.sin(nu);


        //rotaciones de Ω, i, ω (simplificado: solo plano XY)
        return new Position(xOrb, yOrb, 0);

    }
}
