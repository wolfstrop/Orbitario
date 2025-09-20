import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { PlanetDataDTO, PlanetService } from '../../services/planet.service';
import { Plane } from 'three';


@Component({
  selector: 'app-planet-data-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-data-modal.component.html',
  styleUrl: './planet-data-modal.component.css'
})


export class PlanetDataModalComponent implements OnChanges{
  @Input() nombrePlaneta: string = '';
  data?: PlanetDataDTO;

  constructor(private planetService: PlanetService) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['nombrePlaneta'] && this.nombrePlaneta){
        this.loadPlanetData();
      }
  }


  private loadPlanetData(): void {
    this.planetService.getPlanetData(this.nombrePlaneta).subscribe(PData => {
      this.data = PData;
    });
  }
}
