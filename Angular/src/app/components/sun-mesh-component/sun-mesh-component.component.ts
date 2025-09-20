import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

export interface SunConfig {
  textureUrl: string;
  position: { x: number; y: number; z: number };
  baseSize: number; 
}



@Component({
  selector: 'app-sun-mesh-component',
  standalone: true,
  imports: [],
  templateUrl: './sun-mesh-component.component.html',
  styleUrl: './sun-mesh-component.component.css'
})


export class SunMeshComponentComponent implements OnInit {
  @Input() config!: SunConfig;
  @Input() camera!: THREE.Camera;


  @Output() sunCreated = new EventEmitter<{mesh: THREE.Mesh; light: THREE.PointLight}>();

  private sunMesh!: THREE.Mesh;
  private pointLight!: THREE.PointLight;

  constructor() {}

  ngOnInit(): void {
    
    const loader = new THREE.TextureLoader();
    loader.load(
      this.config.textureUrl,
      (texture) => {
        const geometry = new THREE.SphereGeometry(this.config.baseSize, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 1,
          metalness: 1,
          roughness: 1,
        });

        this.sunMesh = new THREE.Mesh(geometry, material);
        this.sunMesh.name = 'SUN_MESH';
        this.sunMesh.position.set(
          this.config.position.x,
          this.config.position.y,
          this.config.position.z
        );

        this.pointLight = new THREE.PointLight(0xffffff, 500, 150);
        this.pointLight.name = 'SUN_LIGHT';
        this.pointLight.position.set(
          this.config.position.x,
          this.config.position.y,
          this.config.position.z
        );

        this.sunCreated.emit({ mesh: this.sunMesh, light: this.pointLight});
      },
      undefined,
      (err) => {
        console.error('error cargando textura del Sol', err);
      }
    );
  }


  public updateScale(camera: THREE.Camera): void {
    if(!this.sunMesh) return;

    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);

    const sunPos = new THREE.Vector3(
      this.config.position.x,
      this.config.position.y,
      this.config.position.z
    );

    const distance = camPos.distanceTo(sunPos);

    const factor = 10;
    const scale = (factor * this.config.baseSize) / distance;
    this.sunMesh.scale.set(scale, scale, scale);
  }


}
