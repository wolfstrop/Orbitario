import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SolarSystemComponent } from './components/solar-system/solar-system.component';


import { bootstrapApplication } from '@angular/platform-browser';
import { PruebaComponent } from './prueba/prueba.component';
import { CubeComponent } from './cube/cube.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';
import { CommonModule } from '@angular/common';
import { PlanetDataModalComponent } from "./components/planet-data-modal/planet-data-modal.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SolarSystemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orbitar.io';
}
