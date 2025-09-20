import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PlanetDTO {
  id: string;
  nombre: string;
  textureURL: string;
  descripcion: string;
  x: number;
  y: number;
  z: number;
}

export interface PlanetDataDTO {
  id: string;
  nombre: string;
  ejeMayor: number;
  excentricidad: number;
  inclinacion: number;
  longitudNodoAsc: number;
  argumentoPeriastro: number;
  periodoDias: number;
  periodoRotacionesHora: number;
  descripcion: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private apiURL = 'http://localhost:8080/api/planets';
  constructor(private http: HttpClient) { }

  getPlanet(nombre: String): Observable<PlanetDTO>{
    return this.http.get<PlanetDTO>(`${this.apiURL}/${nombre}/position`);
  }

  getPlanetData(nombre: String): Observable<PlanetDataDTO>{
    return this.http.get<PlanetDataDTO>(`${this.apiURL}/${nombre}/data`);
  }

  getAllPlanets(): Observable<PlanetDTO[]>{
    return this.http.get<PlanetDTO[]>(`${this.apiURL}/all`);
  }
}
