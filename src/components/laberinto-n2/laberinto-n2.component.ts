import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laberinto-n2',
  standalone: true,
  imports: [],
  templateUrl: './laberinto-n2.component.html',
  styleUrl: './laberinto-n2.component.css'
})
export class LaberintoN2Component implements OnInit{
  private M: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 3, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

  ngOnInit(): void {
    this.initScene();
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  private initScene(): void {
    this.canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
    this.scene.background = new THREE.Color(0x1A7481);

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

  private addBase(): void {
    const anchoCubo2 = 40;
    const altoCubo2 = 0;
    const profundidadCubo2 = 40;
    const geometry2 = new THREE.BoxGeometry(anchoCubo2, altoCubo2, profundidadCubo2);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x58D68D });

    const cube2 = new THREE.Mesh(geometry2, material2);
    this.scene.add(cube2);
    this.renderer.render(this.scene, this.camera);

  }

  private drawCubes(): void {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (this.M[y][x] === 1) {
          this.tableroPared.add(this.createCube(-19 + (x * 2), 19 - (y * 2)));
        }
        if (this.M[y][x] === 2) {
          this.tableroPared.add(this.createKey(-19 + (x * 2), 19 - (y * 2)));
        }
        if (this.M[y][x] === 3) {
          this.tableroPared.add(this.createGoal(-19 + (x * 2), 19 - (y * 2)));
        }
      }
    }
    this.scene.add(this.tableroPared);
  }

  private createCube(x: number, z: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x9B59B6 });
    const cubeNew = new THREE.Mesh(geometry, material);
    cubeNew.position.set(x, 1, z);
    return cubeNew;
  }

  private createGoal(x: number, z: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2, .1, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xFAFA49 });
    const cuboMeta = new THREE.Mesh(geometry, material);
    cuboMeta.position.set(x, .1, z);
    return cuboMeta;
  }

  private createKey(x: number, z: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2, .1, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xC0392B});
    const cuboLlave = new THREE.Mesh(geometry, material);
    cuboLlave.position.set(x, .1, z);
    return cuboLlave;
  }

  private addSphere(): void {
    const esferaGeometry = new THREE.SphereGeometry(.8, 50, 50);
    const esferaMaterial = new THREE.MeshBasicMaterial({ color: 0x161387, wireframe: false });
    this.esfera = new THREE.Mesh(esferaGeometry, esferaMaterial);
    this.esfera.position.set(1, .8, -13);
    this.scene.add(this.esfera);
  }

  private addLights(): void {
    const light = new THREE.DirectionalLight(0x58D68D,1.2);///(0xffffff, 1);
    light.position.set(-1, -1, -1);
    this.scene.add(light);

    const light3 = new THREE.DirectionalLight(0xffffff, 1.2);
    light3.position.set(4, 8, 12);
    this.scene.add(light3);
  }

  private teclado(e: KeyboardEvent): void {
    e.preventDefault();
    const key = e.keyCode;

    const CX = Math.trunc((this.esfera.position.x + 19) / 2);
    const CZ = Math.trunc((19 - this.esfera.position.z) / 2);

    if (this.M[CZ][CX] === 2) {
      this.cont += 1;
      this.M[CZ][CX] = 0;
    }

    if (this.M[CZ][CX] === 3 && this.cont === 2) {
      Swal.fire({
        title: 'Felicidades Ganaste el Nivel 2 ',
          text: "¿Deseas continuar con el siguiente nivel?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'NO',
          confirmButtonText: 'YES'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/laberintoN3'
          }
          else {
            window.location.href = '/laberinto'

          }
      });
    }

    if (key === this.keyCode.RIGHT_ARROW) { // Derecha
      if (this.M[CZ][CX + 1] === 0 || this.M[CZ][CX + 1] === 2 || this.M[CZ][CX + 1] === 3) {
        this.esfera.position.x += 2;
      }
    }
    if (key === this.keyCode.LEFT_ARROW) { // Izquierda
      if (this.M[CZ][CX - 1] === 0 || this.M[CZ][CX - 1] === 2 || this.M[CZ][CX - 1] === 3) {
        this.esfera.position.x -= 2;
      }
    }
    if (key === this.keyCode.UP_ARROW) { // Arriba
      if (CZ + 1 <= 19 && (this.M[CZ + 1][CX] === 0 || this.M[CZ + 1][CX] === 2 || this.M[CZ + 1][CX] === 3)) {
        this.esfera.position.z -= 2;
      }
    }
    if (key === this.keyCode.DOWN_ARROW) { // Abajo
      if (CZ - 1 >= 0 && (this.M[CZ - 1][CX] === 0 || this.M[CZ - 1][CX] === 2 || this.M[CZ - 1][CX] === 3)) {
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
