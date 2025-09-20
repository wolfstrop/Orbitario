import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetService, PlanetDTO } from '../../services/planet.service';


@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})



export class PlanetDetailComponent implements OnInit{
  planet?: PlanetDTO;
  loading = true;
  error = '';

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
      this.planetService.getPlanet('Tierra').subscribe({
        next: data => {
          this.planet = data;
          this.loading = false;
        },
        error: err => {
          this.error = 'No se pudo cargar el planeta';
          this.loading = false;
        }
      })
  }
}
