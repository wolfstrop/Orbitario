import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';

export interface PlanetConfig {
  id: string;
  name: string;
  textureUrl: string;
  position: { x: number; y: number; z: number };
  radius: number;
}




@Component({
  selector: 'app-planet-mesh',
  standalone: true,
  imports: [],
  templateUrl: './planet-mesh.component.html',
  styleUrls: ['./planet-mesh.component.css'],
})


export class PlanetMeshComponent implements OnChanges {
  public static textureCache: { [url: string]: THREE.Texture } = {};

  @Input() config!: PlanetConfig;
  
  @Output() meshCreated = new EventEmitter<THREE.Mesh>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.buildMesh(this.config);
    }
  }

  buildMesh(cfg: PlanetConfig): void {
    if (PlanetMeshComponent.textureCache[cfg.textureUrl]) {
      this.createMesh(cfg, PlanetMeshComponent.textureCache[cfg.textureUrl]);
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(
      cfg.textureUrl,
      (texture) => {
        PlanetMeshComponent.textureCache[cfg.textureUrl] = texture;
        this.createMesh(cfg, texture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }

  private createMesh(cfg: PlanetConfig, texture: THREE.Texture): void {

    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI / 2;

    const geometry = new THREE.SphereGeometry(cfg.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.2,
      roughness: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
   
    
    mesh.userData = { id: cfg.id, name: cfg.name, baseRadius: cfg.radius };

    this.meshCreated.emit(mesh);
  }
}
