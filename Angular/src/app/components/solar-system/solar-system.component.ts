import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';

import { CommonModule } from '@angular/common';
import { PlanetService, PlanetDTO } from '../../services/planet.service';
import {
  PlanetMeshComponent,
  PlanetConfig,
} from '../planet-mesh/planet-mesh.component';
import { PlanetDataModalComponent } from '../planet-data-modal/planet-data-modal.component';
import { lightPosition } from 'three/src/nodes/TSL.js';
import {
  SunMeshComponentComponent,
  SunConfig,
} from '../sun-mesh-component/sun-mesh-component.component';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [
    CommonModule,
    PlanetMeshComponent,
    PlanetDataModalComponent,
    SunMeshComponentComponent,
  ],
  templateUrl: './solar-system.component.html',
  styleUrl: './solar-system.component.css',
})
export class SolarSystemComponent implements OnInit, OnDestroy {
  @ViewChild('canvas3d', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private globalClickHandler!: (event: MouseEvent) => void;

  private scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private clickableMeshes: THREE.Mesh[] = [];
  private orbitSpeed = 0.2;
  private orbitAngle = 0;

  private planetDistances: number[] = [];

  planets: PlanetDTO[] = [];
  showDataModal = false;
  selectedPlanetName = '';

  private animationFrameId!: number;
  private maxFPS = 15;
  private interval = 1000 / this.maxFPS;
  private then = performance.now();
  private shouldRender = true;

  sunConfig: SunConfig = {
    textureUrl: '/img/planets/2k_sun.jpg',
    position: { x: 0, y: 0, z: 0 },
    baseSize: 4,
  };

  private cameraTargetPosition: THREE.Vector3 | null = null;
  private cameraTargetLookAt: THREE.Vector3 | null = null;
  private cameraAnimationProgress = 0;
  private cameraAnimationDuration = 30;
  private initialCameraPosition = new THREE.Vector3(0, -50, 30);
  private initialCameraLookAt = new THREE.Vector3(0, 0, 0);
  private selectedPlanetMesh: THREE.Mesh | null = null;
  private cameraFollowDistance = 13;

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.initThree();
    this.planetService.getAllPlanets().subscribe((list) => {
      this.planets = list;

      for (const planet of this.planets) {
        const distance = Math.sqrt(
          planet.x * planet.x + planet.y * planet.y + planet.z * planet.z
        );

        const scaledDistance = distance * 10;

        const orbit = this.createOrbit(scaledDistance);

        this.scene.add(orbit);
        this.planetDistances.push(scaledDistance);
      }
    });
  }

  onSunCreated(event: { mesh: THREE.Mesh; light: THREE.PointLight }) {
    this.scene.add(event.mesh);
    this.scene.add(event.light);
  }

  onMeshCreated(mesh: THREE.Mesh) {
    this.scene.add(mesh);
    this.clickableMeshes.push(mesh);
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.copy(this.initialCameraPosition);
    this.camera.lookAt(this.initialCameraLookAt);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);

    this.animate();
  }

  private UpdateOrbitPosition(): void {
    this.orbitAngle += this.orbitSpeed;

    this.planets.forEach((p, i) => {
      const mesh = this.clickableMeshes[i];
      const distance = this.planetDistances[i];

      if (mesh && distance) {
        /* const initialPos = new THREE.Vector3(
          p.x * 10, 
          p.y * 10,
          p.z * 10
        )
        const angle = Math.atan2(initialPos.z, initialPos.x) + this.orbitAngle;

        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        
        mesh.position.set(x, initialPos.y, z);

*/

        const angle = this.orbitAngle + i;
        const x = Math.cos(angle / 100) * distance; //esto modifica la velocidad a la que se traslada
        const y = Math.sin(angle / 100) * distance;

        mesh.position.set(x, y, 0);

        mesh.rotation.z += 0.05; //esto modifica la velocidad de rotacion de los planetas
      }
    });

    this.orbitAngle += this.orbitSpeed;

    const x = Math.cos(this.orbitAngle);

    if (Math.abs(this.orbitSpeed) > 0.001) {
      this.shouldRender = true;
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const now = performance.now();
    const delta = now - this.then;

    if (delta >= this.interval) {
      this.then = now - (delta % this.interval);
      this.UpdateOrbitPosition();

      const sunMesh = this.scene.getObjectByName('SUN_MESH');
      if (sunMesh instanceof THREE.Mesh) {
        const camPos = new THREE.Vector3();
        this.camera.getWorldPosition(camPos);
        const sunPos = new THREE.Vector3(
          this.sunConfig.position.x,
          this.sunConfig.position.y,
          this.sunConfig.position.z
        );

        const distance = camPos.distanceTo(sunPos);
        const factor = 10;
        const scale = (factor * this.sunConfig.baseSize) / distance;
        sunMesh.scale.set(scale, scale, scale);
      }

      this.clickableMeshes.forEach((mesh) => {
        const baseRadius: number = mesh.userData['baseRadius'];
        if (!baseRadius) return;

        const camPos = new THREE.Vector3();
        this.camera.getWorldPosition(camPos);

        const planetPos = new THREE.Vector3();
        mesh.getWorldPosition(planetPos);

        const distanceToCam = camPos.distanceTo(planetPos);
        const planetFactor = 70;
        const scale = (planetFactor * baseRadius) / distanceToCam;
        mesh.scale.set(scale, scale, scale);
      });

      this.renderer.render(this.scene, this.camera);

      //console.log('Rendered frame at', now, 'Delta:', delta);
    }

    if (this.cameraTargetPosition && this.cameraTargetLookAt){
      this.cameraAnimationProgress++;
      const t = Math.min(
        this.cameraAnimationProgress / this.cameraAnimationDuration,
        1
      );

      // Interpolación suave
      const currentPos = new THREE.Vector3().lerpVectors(
        this.camera.position,
        this.cameraTargetPosition,
        t
      );
      this.camera.position.copy(currentPos);

      const currentLookAt = new THREE.Vector3().lerpVectors(
        this.initialCameraLookAt,
        this.cameraTargetLookAt,
        t
      );
      this.camera.lookAt(currentLookAt);

      if (t >= 1) {
        // Detener animación
        this.cameraTargetPosition = null;
        this.cameraTargetLookAt = null;
      }
    }
    else if (this.selectedPlanetMesh) {
      // Seguimiento dinámico al planeta seleccionado
      const planetPos = new THREE.Vector3();
      this.selectedPlanetMesh.getWorldPosition(planetPos);

      const sunPos = new THREE.Vector3(
        this.sunConfig.position.x,
        this.sunConfig.position.y,
        this.sunConfig.position.z
      );

      const dir = new THREE.Vector3().subVectors(planetPos, sunPos).normalize();
      
      

      const cameraPos = planetPos.clone().add(
        
        dir.clone().multiplyScalar(this.cameraFollowDistance)
      );
      

      this.camera.position.copy(cameraPos);
      this.camera.lookAt(planetPos);
    }

    this.renderer.render(this.scene, this.camera);

    
  }

  @HostListener('window:resize')
  onResize() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);
    this.then = performance.now();

    this.shouldRender = true;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    const clickedInsideModal = (e.target as HTMLElement).closest(
      '.modal-content'
    );
    if (clickedInsideModal) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.clickableMeshes);

    if (hits.length > 0) {
      this.selectedPlanetName = hits[0].object.userData['name'];
      this.showDataModal = true;
      this.selectedPlanetMesh = hits[0].object as THREE.Mesh;

      // Animar cámara hacia el planeta
      const planetPos = new THREE.Vector3();
      hits[0].object.getWorldPosition(planetPos);

      // Calcular dirección del sol al planeta
      const sunPos = new THREE.Vector3(
        this.sunConfig.position.x,
        this.sunConfig.position.y,
        this.sunConfig.position.z
      );
      const dir = new THREE.Vector3().subVectors(planetPos, sunPos).normalize();

      // Posición de la cámara: detrás del planeta, mirando al planeta
      const cameraDistance = 15; // Ajusta la distancia deseada
      const cameraPos = planetPos
        .clone()
        .add(dir.clone().multiplyScalar(cameraDistance));
      this.animateCameraTo(cameraPos, planetPos);
    } else {
      this.showDataModal = false;
      this.selectedPlanetMesh = null;
      // Animar cámara de regreso a la posición inicial
      this.animateCameraTo(
        this.initialCameraPosition,
        this.initialCameraLookAt
      );
    }
  }

  closeModal() {
    this.showDataModal = false;

    this.selectedPlanetName = '';
    this.selectedPlanetMesh = null;
  }

  public getConfigs(): PlanetConfig[] {
    return this.planets.map((p) => ({
      id: p.id,
      name: p.nombre,
      textureUrl: `/img/planets/${p.textureURL}`,
      position: { x: p.x, y: p.y, z: p.z },
      radius: 1,
    }));
  }

  //orbitas
  private createOrbit(radius: number): THREE.Line {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      2 * Math.PI,
      false,
      0
    );

    const points = curve.getPoints(100);
    const orbitPoints = points.map((p) => new THREE.Vector3(p.x, p.y, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const elipse = new THREE.LineLoop(geometry, material);

    return elipse;
  }

  private animateCameraTo(targetPos: THREE.Vector3, lookAt: THREE.Vector3) {
    this.cameraTargetPosition = targetPos.clone();
    this.cameraTargetLookAt = lookAt.clone();
    this.cameraAnimationProgress = 0;
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => material.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });

    for (const url in PlanetMeshComponent.textureCache) {
      PlanetMeshComponent.textureCache[url].dispose();
    }
    PlanetMeshComponent.textureCache = {};

    this.renderer.dispose();

    document.removeEventListener('click', this.globalClickHandler); // Clean up global click handler
  }
}
