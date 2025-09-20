import { 
  Component, ElementRef, HostListener,
  OnDestroy, OnInit, ViewChild 
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})


export class CubeComponent implements OnInit {
  @ViewChild('canvas3d', { static:true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Object3D;
  private cube1!: THREE.Object3D;
  private raycaster!: THREE.Raycaster;


  //cubo orbital
  private cubeOrbit!: THREE.Object3D;
  private orbitAngle: number = 0;
  private orbitRadiusX: number = 4;
  private orbitRadiusZ : number = 2;
  private orbitSpeed: number = 0.02;
  private orbitPath!: THREE.Line;


  //movimiento mouse
  private targetCameraX = 0;
  private targetCameraY = 0;


  private isAnimating = false;

  //listener para el mouse
  @HostListener('document:mousemove', ['$event'])
  OnMouseMove(event: MouseEvent): void {

    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    this.targetCameraX = x * 5;
    this.targetCameraY = y * 5;
  }



  //listener para el click
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();

    const mouseVector = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    )


    this.raycaster.setFromCamera( mouseVector , this.camera);

    const intersects = this.raycaster.intersectObject(this.cube, true);

    if (intersects.length > 0){
      this.startScaleAnimation();
      this.emitParticles();
    }
  }



  ngOnInit(): void {
      this.initThree();
      this.animate();
  }





  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);



    //escena
    this.scene = new THREE.Scene();




    //camara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5






    //grupo del cubo
    const cubeGroup = new THREE.Group();

    //objeto, en este caso cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    cubeGroup.add(this.cube)


    //estos son los vertices y aristas del cubo
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const lines = new THREE.LineSegments(edges, lineMaterial);
    cubeGroup.add(lines);

    this.scene.add(cubeGroup);

    this.cube = cubeGroup;



    //cubo inverso
    const edges1 = new THREE.EdgesGeometry(geometry);
    const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0x000000 });
    const lines1 = new THREE.LineSegments(edges1, lineMaterial1);
    this.scene.add(lines1);

    this.cube1 = lines1;

    this.raycaster = new THREE.Raycaster();



    //cubo orbitante
    const orbitGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);

    const orbitGroup = new THREE.Group();
    orbitGroup.add(orbitMesh);

    const orbitEdges = new THREE.EdgesGeometry(orbitGeometry);
    const orbitLineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const orbitLines = new THREE.LineSegments(orbitEdges, orbitLineMaterial);
    orbitGroup.add(orbitLines);

    this.scene.add(orbitGroup);
    this.cubeOrbit = orbitGroup;

    this.updateOrbitPosition();



    const orbitPoints = [];
    const segments = 64;
    for(let i = 0; i <= segments; i++){
      const angle = (i / segments) * Math.PI * 2;
      orbitPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * this.orbitRadiusX,
          0,
          Math.sin(angle) * this.orbitRadiusZ
        )
      );
    }

    const orbitPathGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitLine = new THREE.Line(
      orbitPathGeometry,
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    this.orbitPath = orbitLine;
    this.scene.add(this.orbitPath);

  }

  //animacion de click
  private startScaleAnimation(){
    if (this.isAnimating) return;
    this.isAnimating = true;

    const initialScale = 1;
    const targetScale = 1.5;
    const duration = 300;

    const startTime = performance.now();

    const animateScale = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const scale = initialScale + (targetScale - initialScale) * Math.sin(progress * Math.PI);

      this.cube.scale.set(scale, scale, scale);

      if (progress < 1){
        requestAnimationFrame(animateScale);
      } 
      else {
        this.isAnimating = false;
      }
    };

    requestAnimationFrame(animateScale);
  }

  //emision de particulas al hacer click
  private emitParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities: number[] = [];

    for(let i=0; i< particleCount; i++){
      positions.push(0,0,0);
      velocities.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 1,
        (Math.random() - 0.5) * 10
      ); 
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 1,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.copy(this.cube.position);
    this.scene.add(particles);

    const startTime = performance.now();
    const duration = 1000;

    const animateParticles = (time:number) => {
      const elapsed = time - startTime;
      const progress = elapsed / duration;

      const positions = geometry.attributes['position'].array as Float32Array;

      for (let i = 0; i < particleCount; i++){
        positions[i * 3] += velocities[i * 3] * 0.02;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * 0.02;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * 0.02;
      }

      geometry.attributes['position'].needsUpdate = true;
      material.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animateParticles);
      }
      else {
        this.scene.remove(particles);
        geometry.dispose();
        material.dispose();
      }
    };

    requestAnimationFrame(animateParticles);


  }


  private updateOrbitPosition(): void {
    this.orbitAngle += this.orbitSpeed;

    const x = Math.cos(this.orbitAngle) * this.orbitRadiusX;
    const z = Math.sin(this.orbitAngle) * this.orbitRadiusZ;

    this.cubeOrbit.position.set(x, 0, z);

    this.cubeOrbit.rotation.x += 0.02;
    this.cubeOrbit.rotation.y += 0.02;
  }



  //movimiento
  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.015;

    this.cube1.rotation.x -= 0.015;
    this.cube1.rotation.y -= 0.01;

    this.updateOrbitPosition();

    this.camera.position.x += (this.targetCameraX - this.camera.position.x) * 1;
    this.camera.position.y += (this.targetCameraY - this.camera.position.y) * 1;
    this.camera.lookAt(0,0,0);

    this.renderer.render(this.scene, this.camera);
  };

}
