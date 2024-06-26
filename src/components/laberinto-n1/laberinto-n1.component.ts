import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laberinto-n1',
  standalone: true,
  imports: [],
  templateUrl: './laberinto-n1.component.html',
  styleUrl: './laberinto-n1.component.css'
})
export class LaberintoN1Component implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  private M: number[][] = [
    [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//1
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//2
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],//3
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//4
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],//5
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//2
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],//3
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//4
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],//5
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],//2
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],//3
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],//4
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],//5
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],//2
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],//3
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],//4
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],//5
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],//18//
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],//4
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],//19
  ];

  private cont: number = 0;

  private keyCode = {
    ENTER: 13,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
  };

  private tableroPared = new THREE.Group();
  private canvas!: HTMLCanvasElement;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private esfera!: THREE.Mesh;
  private timer: number = 0;
  private intervalId: any;
  private timerStarted: boolean = false;

  ngOnInit(): void {
    this.initScene();
    //this.startTimer();
    this.positionButton(); // Posicionar el botón
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private initScene(): void {
    this.canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
    this.scene.background = new THREE.Color(0x69BB9);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 70, 30);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.addBase();
    this.drawCubes();
    this.addSphere();
    this.addLights();

    this.controls = new OrbitControls(this.camera, this.canvas);

    window.addEventListener('keydown', (e) => this.teclado(e));

    this.animate();
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timer++;
      const timeScoreElement = document.getElementById('timeScore');
      if (timeScoreElement) {
        timeScoreElement.innerText = `Time: ${this.timer}s`;
      }
    }, 1000);
  }

  private positionButton(): void {
    const canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
    const button = document.getElementById('miBoton') as HTMLButtonElement;

    // Posicionar el botón dentro del canvas
    const rect = canvas.getBoundingClientRect();
    button.style.top = (rect.top + 100) + 'px'; 
    button.style.left = (rect.left + 80) + 'px';  
  }


  InicioLaberinto() {
    this.router.navigate(['/laberinto']);
  }

  private addBase(): void {
    const anchoCubo2 = 40;
    const altoCubo2 = 0;
    const profundidadCubo2 = 40;
    const geometry2 = new THREE.BoxGeometry(anchoCubo2, altoCubo2, profundidadCubo2);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x73C6B6 });

    const cube2 = new THREE.Mesh(geometry2, material2);
    this.scene.add(cube2);
    this.renderer.render(this.scene, this.camera);

  }

  private drawCubes(): void {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (this.M[y][x] == 1)
          this.tableroPared.add(this.createCube(-19 + (x * 2), 19 - (y * 2)))
        if (this.M[y][x] == 2)
          this.tableroPared.add(this.createGoal(-19 + (x * 2), 19 - (y * 2)))
      }
    }
    this.scene.add(this.tableroPared)
  }

  private createCube(x: number, z: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xF5B7B1  });
    const cubeNew = new THREE.Mesh(geometry, material);
    cubeNew.position.set(x, 1, z);
    return cubeNew;
  }

  private createGoal(x: number, z: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2, .1, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xFD03F5});
    const cuboMeta = new THREE.Mesh(geometry, material);
    cuboMeta.position.set(x, .1, z);
    return cuboMeta;
  }
  private addSphere(): void {
    const esferaGeometry = new THREE.SphereGeometry(.8, 50, 50);
    const esferaMaterial = new THREE.MeshBasicMaterial({ color: 0x17202A , wireframe: false });
    this.esfera = new THREE.Mesh(esferaGeometry, esferaMaterial);
    this.esfera.position.set(-17, .8, 19);
    this.scene.add(this.esfera);
  }

  private addLights(): void {
    const light = new THREE.DirectionalLight(0x73C6B6,1.3);///(0xffffff, 1);
    light.position.set(-1, -1, -1);
    this.scene.add(light);

    const light3 = new THREE.DirectionalLight(0xffffff, 1.2);
    light3.position.set(4, 8, 12);
    this.scene.add(light3);
  }

  private teclado(e: KeyboardEvent): void {
    e.preventDefault();
    const key = e.keyCode;

    if (!this.timerStarted && (key === this.keyCode.RIGHT_ARROW || key === this.keyCode.LEFT_ARROW || key === this.keyCode.UP_ARROW || key === this.keyCode.DOWN_ARROW)) {
      this.startTimer();
      this.timerStarted = true;
    }

    const CX = Math.trunc((this.esfera.position.x + 19) / 2);
    const CZ = Math.trunc((19 - this.esfera.position.z) / 2);

  
    if (this.M[CZ][CX] == 2) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      Swal.fire({
          title: 'Felicidades Ganastes el Nivel Uno ',
          //text: "¿Deseas continuar con el siguiente Nivel?",
          text: `Tiempo: ${this.timer}s.
          ¿Deseas continuar con el siguiente Nivel?`,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'NO',
          confirmButtonText: 'YES',
          customClass: {
            title: 'my-swalert-title'
          }
        }).then((result:any) => {
          if (result.isConfirmed) {
            window.location.href = '/laberintoN2'
          }
          else {
            window.location.href = '/laberinto'

          }
      });
    }

    if (key === this.keyCode.RIGHT_ARROW) { // Derecha
      if (this.M[CZ][CX + 1] == 0 || this.M[CZ][CX + 1] == 2) {
        this.esfera.position.x += 1;
      }
    }
    if (key === this.keyCode.LEFT_ARROW) { // Izquierda
      if (this.M[CZ][CX - 1] == 0 || this.M[CZ][CX - 1] == 2) {
        this.esfera.position.x -= 2;
      }
    }
    if (key === this.keyCode.UP_ARROW) { // Arriba
      if (this.M[CZ + 1][CX] == 0 || this.M[CZ + 1][CX] == 2) {
        this.esfera.position.z -= 1;
      }
    }
    if (key === this.keyCode.DOWN_ARROW) { // Abajo
      if (this.M[CZ - 1][CX] == 0 || this.M[CZ - 1][CX] == 0) {
        this.esfera.position.z += 2;
      }
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}