import { Component, OnInit } from '@angular/core'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js'
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver'
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-ajedrez',
  standalone: true,
  imports: [],
  templateUrl: './ajedrez.component.html',
  styleUrl: './ajedrez.component.css'
})
export class AjedrezComponent implements OnInit {

  constructor(private router: Router) {}
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void{
    var x;
    var y;
    var xinicial=-1;
    var yinicial=-1;
    var xfinal=-1;
    var yfinal=-1;
    var x_old;
    var y_old;
    var x_new;
    var y_new;
    var turno=true;
    var detectaPosicion=false;
    var posicion=false;

    const tentativas=new THREE.Group();
    var t=0;
    var h=0;
    var aN=0;
    var tN=0;
    var cN=0;
    var aB=0;
    var tB=0;
    var cB=0;
    var g=0;
    var g2=0;
    var reyB = new THREE.Object3D();
    var reinaB = new THREE.Object3D();
    var torreB1 = new THREE.Object3D();
    var torreB2 = new THREE.Object3D();
    var alfilB1 = new THREE.Object3D();
    var alfilB2 = new THREE.Object3D();
    var caballoB1 = new THREE.Object3D();
    var caballoB2 = new THREE.Object3D();
    var peonB1 = new THREE.Object3D();
    var peonB2 = new THREE.Object3D();
    var peonB3 = new THREE.Object3D();
    var peonB4 = new THREE.Object3D();
    var peonB5 = new THREE.Object3D();
    var peonB6 = new THREE.Object3D();
    var peonB7 = new THREE.Object3D();
    var peonB8 = new THREE.Object3D();

    var reyN = new THREE.Object3D();
    var reinaN = new THREE.Object3D();
    var torreN1 = new THREE.Object3D();
    var torreN2 = new THREE.Object3D();
    var alfilN1 = new THREE.Object3D();
    var alfilN2 = new THREE.Object3D();
    var caballoN1 = new THREE.Object3D();
    var caballoN2 = new THREE.Object3D();
    var peonN1 = new THREE.Object3D();
    var peonN2 = new THREE.Object3D();
    var peonN3 = new THREE.Object3D();
    var peonN4 = new THREE.Object3D();
    var peonN5 = new THREE.Object3D();
    var peonN6 = new THREE.Object3D();
    var peonN7 = new THREE.Object3D();
    var peonN8 = new THREE.Object3D();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x979797);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 11;
    camera.position.y = 8;
    camera.position.x = 11;
    const renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled=true
    document.body.appendChild(renderer.domElement);

    var tamCubo = 1;
    var xEscenario = 0;
    var yEscenario = 0;
    var radioFicha = tamCubo/2;
    var colorBlancas = 0xFF00FF;
    var colorNegras = 0x00FF00;
    var colorNegro = 0x00FF00;
    const movimientos: string[] = [];

    var piezasblancas=[
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6,6],
      [3,5,4,2,1,4,5,3]
    ];
    var piezasnegras=[
      [3,5,4,2,1,4,5,3],
      [6,6,6,6,6,6,6,6],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ];
    // 1: Rey
    // 2: Reina
    // 3: Torre
    // 4: Alfil
    // 5: Caballo
    // 6: Peon
       
    const color = 0x404040;
    const intensity = 1;
    const luz= new THREE.AmbientLight(color);
    const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
    light.position.set(-3, 3, 3);
    luz.add(light)
    scene.add(luz);
    

    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.render(scene, camera);
    function animate(){
      requestAnimationFrame(animate)
      controls.update();
      renderer.render(scene, camera)
    }
    //FICHAS BLANCAS
    function reyBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('assets/modelosBlancos/LP_King.obj',
      ( rey ) =>{
        rey.position.set(y*tamCubo,1.1,x*tamCubo)
        rey.scale.set(scale.x,scale.y,scale.z)
        //rey.rotation.y=90*Math.PI/180
        rey.userData['draggable']=true;
        rey.userData['name']='ReyBlanco';
        reyB = rey
        scene.add(reyB);
        console.log(rey);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function torreBlanca(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('assets/modelosBlancos/Rook_Torre.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='TorreBlanca';
        if(tB==0){
            torreB1 = torre;
            tB++;
            scene.add(torreB1);
        }else{
            torreB2 = torre;
            scene.add(torreB2);
        }
        console.log(torre);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function alfilBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('assets/modelosBlancos/LP_Bishop.obj',
      ( alfil ) =>{
        alfil.position.set(y*tamCubo,1.1,x*tamCubo)
        alfil.scale.set(scale.x,scale.y,scale.z)
        alfil.userData['draggable']=true;
        alfil.userData['name']='AlfilBlanco';
        if(aB==0){
            alfilB1 = alfil;
            aB++;
            scene.add(alfilB1);
        }else{
            alfilB2 = alfil;
            scene.add(alfilB2);
        }
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function caballoBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.008,y:0.008,z:0.008} //Escudo 1
      objLoader.load('assets/modelosBlancos/Low_Poly_Chess_-_Knight.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='CaballoBlanco';
        if(cB==0){
            caballoB1 = torre;
            cB++;
            scene.add(caballoB1);
        }else{
            caballoB2 = torre;
            scene.add(caballoB2);
        }
        console.log(torre);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reinaBlanca(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.011,y:0.011,z:0.011} //Escudo 1
      objLoader.load('assets/modelosBlancos/Low_Poly_Chess_-_Queen.obj',
      ( reina ) =>{
        reina.position.set(y*tamCubo,1.1,x*tamCubo)
        reina.scale.set(scale.x,scale.y,scale.z)
        reina.rotation.y=180*Math.PI/180
        reina.userData['draggable']=true;
        reina.userData['name']='ReinaBlanco';
        reinaB=reina
        scene.add(reinaB);
        console.log(reina);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function peonBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('assets/modelosBlancos/Low_Poly_Chess_-_Pawn.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='PeonBlanco';
        if(t==0){
            peonB1 = torre;
            scene.add(peonB1);
        }else if(t==1){
            peonB2 = torre;
            scene.add(peonB2);
        }else if(t==2){
            peonB3 = torre;
            scene.add(peonB3);
        }else if(t==3){
            peonB4 = torre;
            scene.add(peonB4);
        }else if(t==4){
            peonB5 = torre;
            scene.add(peonB5);
        }else if(t==5){
            peonB6 = torre;
            scene.add(peonB6);
        }else if(t==6){
            peonB7 = torre;
            scene.add(peonB7);
        }else if(t==7){
            peonB8 = torre;
            scene.add(peonB8);
        }
        t++;
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function dibujaBlanco(){
      var rey=false;
      for(var c=0;c<8;c++){
          for(var r=0;r<8;r++){
              if(piezasblancas[r][c]!=0){
                  if(piezasblancas[0][c]==6){
                    piezasblancas[0][c]=2;
                  }
                  if(piezasblancas[r][c]==1){
                    rey=true;
                    reyBlanco(r,c);
                  }
                  if(piezasblancas[r][c]==2){
                    reinaBlanca(r,c);
                  }
                  if(piezasblancas[r][c]==3){
                    torreBlanca(r,c);
                    t=0;
                  }
                  if(piezasblancas[r][c]==4){
                    alfilBlanco(r,c);
                    t=0;
                  }
                  if(piezasblancas[r][c]==5){
                    caballoBlanco(r,c);
                    t=0;
                  }
                  if(piezasblancas[r][c]==6){
                    peonBlanco(r,c);
                    t=0;
                  }
              }
             
          }
      }
      if(rey==false){
          //alert("Piezas Negras Ganan");
      }
  
    }

    //FICHAS NEGRAS
    function peonNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('assets/modelosNegros/Low_Poly_Chess_Black_Pawn2.obj', (torre) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='PeonNegro';
        if(h==0){
            peonN1 = torre;
            scene.add(peonN1);
        }else if(h==1){
            peonN2 = torre;
            scene.add(peonN2);
        }else if(h==2){
            peonN3 = torre;
            scene.add(peonN3);
        }else if(h==3){
            peonN4 = torre;
            scene.add(peonN4);
        }else if(h==4){
            peonN5 = torre;
            scene.add(peonN5);
        }else if(h==5){
            peonN6 = torre;
            scene.add(peonN6);
        }else if(h==6){
            peonN7 = torre;
            scene.add(peonN7);
        }else if(h==7){
            peonN8 = torre;
            scene.add(peonN8);
        }
        h++;
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reyNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('assets/modelosNegros/LP_Black_King.obj',
      ( rey ) =>{
        rey.position.set(y*tamCubo,1.1,x*tamCubo)
        rey.scale.set(scale.x,scale.y,scale.z)
        rey.userData['draggable']=true;
        rey.userData['name']='ReyNegro';
        reyN = rey;
        scene.add(reyN);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function torreNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('assets/modelosNegros/Black_Rook_Torre.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='TorreNegro';
        if(tN==0){
            torreN1 = torre;
            tN++;
            scene.add(torreN1);
        }else{
            torreN2 = torre;
            scene.add(torreN2);
        }
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function alfilNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('assets/modelosNegros/LP_Black_Bishop.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='AlfilNegro';
        if(aN==0){
            alfilN1 = torre;
            aN++;
            scene.add(alfilN1);
        }else{
            alfilN2 = torre;
            scene.add(alfilN2);
        }
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function caballoNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.008,y:0.008,z:0.008} //Escudo 1
      objLoader.load('assets/modelosNegros/Low_Poly_Chess_Black_Knight.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=0*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='CaballoNegro';
        if(cN==0){
            caballoN1 = torre;
            cN++;
            scene.add(caballoN1);
        }else{
            caballoN2 = torre;
            scene.add(caballoN2);
        }
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reinaNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.011,y:0.011,z:0.011} //Escudo 1
      objLoader.load('assets/modelosNegros/Low_Poly_Chess_Black_Queen.obj',
      ( torre ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='ReinaNegro';
        reinaN= torre;
        scene.add(reinaN);
        console.log(torre);
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function dibujaNegro(){
        var rey=false;
      for(var c=0;c<8;c++){
          for(var r=0;r<8;r++){
              if(piezasnegras[r][c]!=0){
                  if(piezasnegras[0][c]==6){
                      piezasnegras[0][c]=2;
                  }
                  if(piezasnegras[r][c]==1){
                      rey=true;
                      reyNegro(r,c);
                  }
                  if(piezasnegras[r][c]==2){
                    reinaNegro(r,c);
                  }
                  if(piezasnegras[r][c]==3){
                    torreNegro(r,c);
                    //g=0;
                  }
                  if(piezasnegras[r][c]==4){
                    alfilNegro(r,c);
                    //g=0;
                  }
                  if(piezasnegras[r][c]==5){
                    caballoNegro(r,c);
                    //g=0;
                  }
                  if(piezasnegras[r][c]==6){
                    peonNegro(r,c);
                    //h=0;
                  }  
              }
             
          }
      }
      if(rey==false){
          //alert("Piezas Blancas Ganan");
      }
    }

    //ESCENARIO
    //var colorBlancas = 0xFFFFFF;
    function pintaNegro(positionX:any, positionY:any){
      const anchoCubo = tamCubo;
      const altoCubo = 0.2;
      const profundidadCubo = tamCubo;
      const geometry = new THREE.BoxGeometry(anchoCubo, altoCubo, profundidadCubo);
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      var x=positionX;
      var y=positionY;
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 1, y);
      scene.add(cube);
      renderer.render(scene, camera);
    }
    function pintaBlanco(positionX:any, positionY:any){
      const anchoCubo = tamCubo;
      const altoCubo = 0.2;
      const profundidadCubo = tamCubo;
      const geometry = new THREE.BoxGeometry(anchoCubo, altoCubo, profundidadCubo);
      const material = new THREE.MeshPhongMaterial({ color: 0x804000 });
      var x=positionX;
      var y=positionY;
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 1, y);
      scene.add(cube);
      renderer.render(scene, camera);
    }
    function dibujaEscenario(){
      var color= false;
      for(var c=0; c<8; c++){
        for(var r=0; r<8; r++){
          if(color==true){
            pintaBlanco(xEscenario,yEscenario);
          }
          else{
            pintaNegro(xEscenario, yEscenario);
          }
          xEscenario=xEscenario+tamCubo;
          color=!color;
        }
        xEscenario=0;
        yEscenario=yEscenario+tamCubo;
        color=!color;
      }
      yEscenario=0;
    }
    function cargarModeloOBJ(){
      const objLoader = new ThreeMFLoader();
      let scale={x:0.101,y:0.101,z:0.101} //Escudo 1
      let pos={x:3.5,y:0.899,z:3.5}
      objLoader.load('assets/modelos/Tabuleiro3.3mf',
      ( obj) =>{
        obj.position.set(pos.x,pos.y,pos.z)
        obj.scale.set(scale.x,scale.y,scale.z)
        obj.rotation.z=180*Math.PI/180
        scene.add( obj );
      },
      ( xhr ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    //JUGABILIDAD
    var draggable= new THREE.Object3D;
    var bestia= new THREE.Object3D;
    var turno=true;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    function detectarClick(event:any){
      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  pointer.y = -( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(pointer,camera)
      
      const intersects = raycaster.intersectObjects( scene.children );
        var i=0;
        if(intersects[i].object.parent?.userData['draggable']){
          console.log(intersects[i].object.parent?.userData['name']);
          console.log(intersects);
          x=Math.abs(intersects[i].object.parent?.position.z ?? 0);
          y=Math.abs(intersects[i].object.parent?.position.x ?? 0);
          console.log("x: "+x);
          console.log("y: "+y);tentativas.clear();
          if(intersects[i].object.parent?.userData['name']=="AlfilBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 4);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="TorreBlanca" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 3);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable 
            bestia=draggable
            y_old = intersects[i].object.parent?.position.x;
            x_old = intersects[i].object.parent?.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReinaBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 2);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="CaballoBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 5);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="PeonBlanco" && turno == true){
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
                dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 6);
                y_old = bestia.position.x;
                x_old = bestia.position.z;
                console.log("x vieja= ", x_old);
                console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReyBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 1);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }

          //NEGRAS
          if(intersects[i].object.parent?.userData['name']=="AlfilNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 4);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="TorreNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 3);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.parent?.position.x;
            x_old = intersects[i].object.parent?.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReinaNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 2);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="CaballoNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 5);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="PeonNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 6);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReyNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 1);
            draggable=intersects[0].object.parent? intersects[0].object.parent : draggable
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
        }
        if(intersects[0].object.userData['name']=="posiWhite"){
            var salir = true;
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            var x = x_old;
            var y = y_old;
            var espx = 0;
            var espy = 0;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            if(bestia.userData['name']=="PeonBlanco" && x_new == 0){
                bestia.clear();
                reinaBlanca(x_new,y_new);
                piezasblancas[x_old][y_old]=2;
            }
            if(bestia.userData['name']=="TorreBlanca"){
                piezasblancas[x_old][y_old]=8;
            }
            if(bestia.userData['name']=="ReyBlanco"){
                piezasblancas[x_old][y_old]=7;
            }
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);
            console.log(piezasblancas[x_old][y_old]);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasblancas[x_new][y_new]=piezasblancas[x_old][y_old];
            piezasblancas[x_old][y_old]=0;
            console.log(piezasblancas);
            tentativas.clear();
            registrarMovimiento(bestia.userData['name'], x_old, y_old, x_new, y_new);
            turno= !turno;
          }
        if(intersects[0].object.userData['name']=="posiBlack"){
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            if(bestia.userData['name']=="PeonNegro" && x_new == 7){
                bestia.clear();
                reinaNegro(x_new,y_new);
                piezasnegras[x_old][y_old]=2;
            }
            if(bestia.userData['name']=="TorreNegro"){
                piezasnegras[x_old][y_old]=8;
            }
            if(bestia.userData['name']=="ReyNegro"){
                piezasnegras[x_old][y_old]=7;
            }
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);
            console.log(piezasnegras[x_old][y_old]);
            animar(x_old,y_old, x_new, y_new);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasnegras[x_new][y_new]=piezasnegras[x_old][y_old];
            piezasnegras[x_old][y_old]=0;
            console.log(piezasnegras);
            registrarMovimiento(bestia.userData['name'], x_old, y_old, x_new, y_new);
            tentativas.clear();
            turno= !turno;
          }
        if(intersects[0].object.userData['name']=="espWhite"){
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);
            console.log(piezasblancas[x_old][y_old]);     
            piezasblancas[x_old][y_old]=7
            if(y_new == 2){
                torreB1.position.set(3*tamCubo,1.1,x_new*tamCubo)
                piezasblancas[7][0]=0
                piezasblancas[7][3]=8
            }
            if(y_new == 6){
                torreB2.position.set(5*tamCubo,1.1,x_new*tamCubo)
                piezasblancas[7][7]=0
                piezasblancas[7][5]=8
            }
            animar(x_old,y_old, x_new, y_new);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasblancas[x_new][y_new]=piezasblancas[x_old][y_old];
            piezasblancas[x_old][y_old]=0;
            console.log(piezasblancas);
            registrarMovimiento("Enroque", x_old, y_old, x_new, y_new);
            tentativas.clear();
            turno= !turno;
        }
        if(intersects[0].object.userData['name']=="espBlack"){
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);  
            piezasnegras[x_old][y_old]=7
            animar(x_old,y_old, x_new, y_new);
            if(y_new == 2){
                torreN1.position.set(3*tamCubo,1.1,x_new*tamCubo)
                piezasnegras[0][0]=0
                piezasnegras[0][3]=8
            }
            if(y_new == 6){
                torreN2.position.set(5*tamCubo,1.1,x_new*tamCubo)
                piezasnegras[0][7]=0
                piezasnegras[0][5]=8
            }
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasnegras[x_new][y_new]=piezasnegras[x_old][y_old];
            piezasnegras[x_old][y_old]=0;
            registrarMovimiento("Enroque", x_old, y_old, x_new, y_new);
            tentativas.clear();
            turno= !turno;
        }
        if(intersects[0].object.userData['name']=="enemigo"){
            //var bestia2 = new THREE.Object3D()
            if (reyN.position.x == intersects[0].object.position.x && reyN.position.z == intersects[0].object.position.z) {
                let nota = `Jaque Mate, blancas ganan`;
                movimientos.push(nota);
                actualizarTablaMovimientos();
                reyN.clear();
                Swal.fire({
                    title: 'FIN DEL JUEGO',
                    icon: 'info',
                    text: 'Piezas blancas ganan',
                    confirmButtonText: 'Nuevo Juego',
                    showDenyButton: true,
                    denyButtonText: 'Descargar movimientos',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else if (result.isDenied) {
                        // Convertir la lista de movimientos a una cadena de texto
                        const textoMovimientos = movimientos.join('\n');
                        // Crear un nuevo Blob con el texto
                        const blob = new Blob([textoMovimientos], { type: 'text/plain;charset=utf-8' });
                        // Descargar el archivo
                        saveAs(blob, 'movimientos.txt');
                        location.reload();
                    }
                });
            }
            if(reinaN.position.x == intersects[0].object.position.x && reinaN.position.z == intersects[0].object.position.z)
                reinaN.clear();
            if(torreN1.position.x == intersects[0].object.position.x && torreN1.position.z == intersects[0].object.position.z)
                torreN1.clear();
            if(torreN2.position.x == intersects[0].object.position.x && torreN2.position.z == intersects[0].object.position.z)
                torreN2.clear();
            if(alfilN1.position.x == intersects[0].object.position.x && alfilN1.position.z == intersects[0].object.position.z)
                alfilN1.clear();
            if(alfilN2.position.x == intersects[0].object.position.x && alfilN2.position.z == intersects[0].object.position.z)
                alfilN2.clear();
            if(caballoN1.position.x == intersects[0].object.position.x && caballoN1.position.z == intersects[0].object.position.z)
                caballoN1.clear();
            if(caballoN2.position.x == intersects[0].object.position.x && caballoN2.position.z == intersects[0].object.position.z)
                caballoN2.clear();
            if(peonN1.position.x == intersects[0].object.position.x && peonN1.position.z == intersects[0].object.position.z)
                peonN1.clear();
            if(peonN2.position.x == intersects[0].object.position.x && peonN2.position.z == intersects[0].object.position.z)
                peonN2.clear();
            if(peonN3.position.x == intersects[0].object.position.x && peonN3.position.z == intersects[0].object.position.z)
                peonN3.clear();
            if(peonN4.position.x == intersects[0].object.position.x && peonN4.position.z == intersects[0].object.position.z)
                peonN4.clear();
            if(peonN5.position.x == intersects[0].object.position.x && peonN5.position.z == intersects[0].object.position.z)
                peonN5.clear();
            if(peonN6.position.x == intersects[0].object.position.x && peonN6.position.z == intersects[0].object.position.z)
                peonN6.clear();
            if(peonN7.position.x == intersects[0].object.position.x && peonN7.position.z == intersects[0].object.position.z)
                peonN7.clear();
            if(peonN8.position.x == intersects[0].object.position.x && peonN8.position.z == intersects[0].object.position.z)
                peonN8.clear();
            piezasnegras[intersects[0].object.position.z][intersects[0].object.position.x]=0
            var salir = true;
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            var x = x_old;
            var y = y_old;
            var espx = 0;
            var espy = 0;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            if(bestia.userData['name']=="PeonBlanco" && x_new == 0){
                bestia.clear();
                reinaBlanca(x_new,y_new);
                piezasblancas[x_old][y_old]=2;
            }
            if(bestia.userData['name']=="TorreBlanca"){
                piezasblancas[x_old][y_old]=8;
            }
            if(bestia.userData['name']=="ReyBlanco"){
                piezasblancas[x_old][y_old]=7;
            }
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);
            console.log(piezasblancas[x_old][y_old]);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasblancas[x_new][y_new]=piezasblancas[x_old][y_old];
            piezasblancas[x_old][y_old]=0;
            console.log(piezasblancas);
            registrarMovimiento(bestia.userData['name'], x_old, y_old, x_new, y_new);
            let nota = "Captura"
            movimientos.push(nota)
            actualizarTablaMovimientos();
            tentativas.clear();
            turno= !turno;
        }
        if(intersects[0].object.userData['name']=="enemigo1"){
            if(reyB.position.x == intersects[0].object.position.x && reyB.position.z == intersects[0].object.position.z){
                let nota = `Jaque Mate, negras ganan`;
                movimientos.push(nota);
                actualizarTablaMovimientos();
                reyB.clear();
                Swal.fire({
                    title: 'FIN DEL JUEGO',
                    icon: 'info',
                    text: 'Piezas negras ganan',
                    confirmButtonText: 'Nuevo Juego',
                    showDenyButton: true,
                    denyButtonText: 'Descargar movimientos',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else if (result.isDenied) {
                        // Convertir la lista de movimientos a una cadena de texto
                        const textoMovimientos = movimientos.join('\n');
                        // Crear un nuevo Blob con el texto
                        const blob = new Blob([textoMovimientos], { type: 'text/plain;charset=utf-8' });
                        // Descargar el archivo
                        saveAs(blob, 'movimientos.txt');
                        location.reload();
                    }
                });
            }
            if(reinaB.position.x == intersects[0].object.position.x && reinaB.position.z == intersects[0].object.position.z)
                reinaB.clear();
            if(torreB1.position.x == intersects[0].object.position.x && torreB1.position.z == intersects[0].object.position.z)
                torreB1.clear();
            if(torreB2.position.x == intersects[0].object.position.x && torreB2.position.z == intersects[0].object.position.z)
                torreB2.clear();
            if(alfilB1.position.x == intersects[0].object.position.x && alfilB1.position.z == intersects[0].object.position.z)
                alfilB1.clear();
            if(alfilB2.position.x == intersects[0].object.position.x && alfilB2.position.z == intersects[0].object.position.z)
                alfilB2.clear();
            if(caballoB1.position.x == intersects[0].object.position.x && caballoB1.position.z == intersects[0].object.position.z)
                caballoB1.clear();
            if(caballoB2.position.x == intersects[0].object.position.x && caballoB2.position.z == intersects[0].object.position.z)
                caballoB2.clear();
            if(peonB1.position.x == intersects[0].object.position.x && peonB1.position.z == intersects[0].object.position.z)
                peonB1.clear();
            if(peonB2.position.x == intersects[0].object.position.x && peonB2.position.z == intersects[0].object.position.z)
                peonB2.clear();
            if(peonB3.position.x == intersects[0].object.position.x && peonB3.position.z == intersects[0].object.position.z)
                peonB3.clear();
            if(peonB4.position.x == intersects[0].object.position.x && peonB4.position.z == intersects[0].object.position.z)
                peonB4.clear();
            if(peonB5.position.x == intersects[0].object.position.x && peonB5.position.z == intersects[0].object.position.z)
                peonB5.clear();
            if(peonB6.position.x == intersects[0].object.position.x && peonB6.position.z == intersects[0].object.position.z)
                peonB6.clear();
            if(peonB7.position.x == intersects[0].object.position.x && peonB7.position.z == intersects[0].object.position.z)
                peonB7.clear();
            if(peonB8.position.x == intersects[0].object.position.x && peonB8.position.z == intersects[0].object.position.z)
                peonB8.clear();
            piezasblancas[intersects[0].object.position.z][intersects[0].object.position.x]=0
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            x_new = intersects[0].object.position.z;
            y_new = intersects[0].object.position.x;
            if(bestia.userData['name']=="PeonNegro" && x_new == 7){
                bestia.clear();
                reinaNegro(x_new,y_new);
                piezasnegras[x_old][y_old]=2;
            }
            if(bestia.userData['name']=="TorreNegro"){
                piezasnegras[x_old][y_old]=8;
            }
            if(bestia.userData['name']=="ReyNegro"){
                piezasnegras[x_old][y_old]=7;
            }
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log("X: ",x_new);
            console.log("Y: ",y_new);
            console.log(piezasnegras[x_old][y_old]);
            animar(x_old,y_old, x_new, y_new);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasnegras[x_new][y_new]=piezasnegras[x_old][y_old];
            piezasnegras[x_old][y_old]=0;
            console.log(piezasnegras);
            registrarMovimiento(bestia.userData['name'], x_old, y_old, x_new, y_new);
            let nota = "Captura"
            movimientos.push(nota)
            actualizarTablaMovimientos();
            tentativas.clear();
            turno= !turno;
        }
        console.log(intersects);
        console.log(intersects[0].object.userData['name']);
        console.log(pointer);
    }
    window.addEventListener('click',detectarClick);
    window.addEventListener('unload',destroy);
    function draw(){
      dibujaBlanco();
      dibujaNegro();
    }
    function piezaBlancaDif(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha,0.02,32);
      const material = new THREE.MeshPhongMaterial({ color: colorBlancas });
      let pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=.5;
      pieza.castShadow=true;
      pieza.receiveShadow=true;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='posiWhite';
      return pieza;
    }
    function piezaBlancaDif2(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha,0.02,32);
      const material = new THREE.MeshPhongMaterial({ color: colorBlancas });
      let pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=.5;
      pieza.castShadow=true;
      pieza.receiveShadow=true;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='espWhite';
      return pieza;
    }
    function piezaNegraDif(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha,0.02,32);
      const material = new THREE.MeshPhongMaterial({ color: colorNegras });
      const pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=.5;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='posiBlack';
      return pieza;
    }
    function piezaNegraDif2(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha,0.02,32);
      const material = new THREE.MeshPhongMaterial({ color: colorNegras });
      const pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=.5;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='espBlack';
      return pieza;
    }
    function piezaEnemigaDif(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha-0.1,4.1,3);
      const material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      const pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=0;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='enemigo';
      return pieza;
    }
    function piezaEnemiga(x:any,y:any){
        const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha,0.02,32);
      const material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      const pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=1;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='enemy';
      return pieza;
    }
    function piezaEnemigaDif2(x:any,y:any){
      const geometry = new THREE.CylinderGeometry(radioFicha,radioFicha-0.1,4.1,3);
      const material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
      const pieza = new THREE.Mesh(geometry, material);
      pieza.material.transparent=true
      pieza.material.opacity=0;
      pieza.position.set(x,1.11,y);
      pieza.userData['draggable']=true;
      pieza.userData['name']='enemigo1';
      return pieza;
    }
    function dibujaMovimiento(x:any, y:any, color:any, tipo:any){
        if(color==1){
            if(tipo==1){ //REY
                //ENROQUES
                if(piezasblancas[7][4]==1 && piezasblancas[7][0]==3 && piezasblancas[7][1] == 0 && piezasblancas[7][2] == 0 && piezasblancas[7][3] == 0){
                    if(piezasnegras[7][1] == 0 && piezasnegras[7][2] == 0 && piezasnegras[7][3] == 0){
                        tentativas.add(piezaBlancaDif2(2,7));
                    }
                }
                if(piezasblancas[7][4]==1 && piezasblancas[7][7]==3 && piezasblancas[7][6] == 0 && piezasblancas[7][5] == 0){
                    if(piezasnegras[7][6] == 0 && piezasnegras[7][5] == 0){
                        tentativas.add(piezaBlancaDif2(6,7));
                    }
                }
                //MOV NORMALES
                if(y>0 && piezasblancas[y-1][x]==0){//arriba
                    if(piezasnegras[y-1][x]!=0){
                        tentativas.add(piezaEnemigaDif(x,y-1))
                        tentativas.add(piezaEnemiga(x,y-1))
                    }else{
                        tentativas.add(piezaBlancaDif(x,y-1));
                    }
                }
                if(y<7 && piezasblancas[y+1][x]==0){//abajo
                    if(piezasnegras[y+1][x]!=0){
                        tentativas.add(piezaEnemigaDif(x,y+1))
                        tentativas.add(piezaEnemiga(x,y+1))
                    }else{
                        tentativas.add(piezaBlancaDif(x,y+1));
                    }
                }
                if(x>0 && piezasblancas[y][x-1]==0){//izquierda
                    if(piezasnegras[y][x-1]!=0){
                        tentativas.add(piezaEnemigaDif(x-1,y))
                        tentativas.add(piezaEnemiga(x-1,y))
                    }else{
                        tentativas.add(piezaBlancaDif(x-1,y));
                    }
                }
                if(x<7 && piezasblancas[y][x+1]==0){//derecha
                    if(piezasnegras[y][x+1]!=0){
                        tentativas.add(piezaEnemigaDif(x+1,y))
                        tentativas.add(piezaEnemiga(x+1,y))
                    }else{
                        tentativas.add(piezaBlancaDif(x+1,y));
                    }
                } 
                if(x>0 && y>0 && piezasblancas[y-1][x-1]==0){//arriba izquierda
                    if(piezasnegras[y-1][x-1]!=0){
                        tentativas.add(piezaEnemigaDif(x-1,y-1))
                        tentativas.add(piezaEnemiga(x-1,y-1))
                    }else{
                        tentativas.add(piezaBlancaDif(x-1,y-1));
                    }
                }
                if(x<7 && y<7 && piezasblancas[y+1][x+1]==0){//abajo derecha
                    if(piezasnegras[y+1][x+1]!=0){
                        tentativas.add(piezaEnemigaDif(x+1,y+1))
                        tentativas.add(piezaEnemiga(x+1,y+1))
                    }else{
                        tentativas.add(piezaBlancaDif(x+1,y+1));
                    }
                }
                if(x>0 && y<7 && piezasblancas[y+1][x-1]==0){//abajo izquierda
                    if(piezasnegras[y+1][x-1]!=0){
                        tentativas.add(piezaEnemigaDif(x-1,y+1))
                        tentativas.add(piezaEnemiga(x-1,y+1))
                    }else{
                        tentativas.add(piezaBlancaDif(x-1,y+1));
                    }
                }
                if(x<7 && y>0 && piezasblancas[y-1][x+1]==0){//arriba derecha
                    if(piezasnegras[y-1][x+1]!=0){
                        tentativas.add(piezaEnemigaDif(x+1,y-1))
                        tentativas.add(piezaEnemiga(x+1,y-1))
                    }else{
                        tentativas.add(piezaBlancaDif(x+1,y-1));
                    }
                }
                scene.add(tentativas);
            }
            if(tipo==2){ //REINA
                //MOVIMIENTOS TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasblancas[y-n][x]==0){
                        if(piezasnegras[y-n][x]!=0){
                            tentativas.add(piezaEnemigaDif(x,y-n))
                            tentativas.add(piezaEnemiga(x,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x,y-n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-y){ //abajo
                    if(piezasblancas[y+n][x]==0){
                        if(piezasnegras[y+n][x]!=0){
                            tentativas.add(piezaEnemigaDif(x,y+n))
                            tentativas.add(piezaEnemiga(x,y+1))
                            salir=true;
                        }else{
                           tentativas.add(piezaBlancaDif(x,y+n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-x){ //derecha
                    if(piezasblancas[y][x+n]==0){
                        if(piezasnegras[y][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y))
                            tentativas.add(piezaEnemiga(x+n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=x){ //izquierda
                    if(piezasblancas[y][x-n]==0){
                        if(piezasnegras[y][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y))
                            tentativas.add(piezaEnemiga(x-n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                //MOVIMIENTOS ALFIL
                salir = false;
                n = 1;
                while(salir==false && n<=7-x && n<=7-y){ //derecha abajo
                    if(piezasblancas[y+n][x+n]==0){
                        if(piezasnegras[y+n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y+n))
                            tentativas.add(piezaEnemiga(x+n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=y){ //izquierda arriba
                    if(piezasblancas[y-n][x-n]==0){
                        if(piezasnegras[y-n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y-n))
                            tentativas.add(piezaEnemiga(x-n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=7-y){ //izquierda abajo
                    if(piezasblancas[y+n][x-n]==0){
                        if(piezasnegras[y+n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y+n))
                            tentativas.add(piezaEnemiga(x-n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=7-x && n<=y){ //derecha arriba
                    if(piezasblancas[y-n][x+n]==0){
                        if(piezasnegras[y-n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y-n))
                            tentativas.add(piezaEnemiga(x+n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas)
            }
            if(tipo==3){ //TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasblancas[y-n][x]==0){
                        if(piezasnegras[y-n][x]!=0){
                            tentativas.add(piezaEnemigaDif(x,y-n))
                            tentativas.add(piezaEnemiga(x,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x,y-n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-y){ //abajo
                    if(piezasblancas[y+n][x]==0){
                        if(piezasnegras[y+n][x]!=0){
                            tentativas.add(piezaEnemigaDif(x,y+n))
                            tentativas.add(piezaEnemiga(x,y+1))
                            salir=true;
                        }else{
                           tentativas.add(piezaBlancaDif(x,y+n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-x){ //derecha
                    if(piezasblancas[y][x+n]==0){
                        if(piezasnegras[y][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y))
                            tentativas.add(piezaEnemiga(x+n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=x){ //izquierda
                    if(piezasblancas[y][x-n]==0){
                        if(piezasnegras[y][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y))
                            tentativas.add(piezaEnemiga(x-n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas)
            }
            if(tipo==4){ //ALFIL
                var salir = false;
                var n = 1;
                while(salir==false && n<=7-x && n<=7-y){ //derecha abajo
                    if(piezasblancas[y+n][x+n]==0){
                        if(piezasnegras[y+n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y+n))
                            tentativas.add(piezaEnemiga(x+n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=y){ //izquierda arriba
                    if(piezasblancas[y-n][x-n]==0){
                        if(piezasnegras[y-n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y-n))
                            tentativas.add(piezaEnemiga(x-n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=7-y){ //izquierda abajo
                    if(piezasblancas[y+n][x-n]==0){
                        if(piezasnegras[y+n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif(x-n,y+n))
                            tentativas.add(piezaEnemiga(x-n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x-n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=7-x && n<=y){ //derecha arriba
                    if(piezasblancas[y-n][x+n]==0){
                        if(piezasnegras[y-n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif(x+n,y-n))
                            tentativas.add(piezaEnemiga(x+n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaBlancaDif(x+n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas);
            }
            if(tipo==5){ //CABALLO
                if(y>1 && 7>x && piezasblancas[y-2][x+1]==0){
                    if(piezasnegras[y-2][x+1]!=0){
                        tentativas.add(piezaEnemigaDif(x+1,y-2))
                        tentativas.add(piezaEnemiga(x+1,y-2))
                    }else{
                        tentativas.add(piezaBlancaDif(x+1,y-2));
                    }
                }
                if(y>1 && x>0 && piezasblancas[y-2][x-1]==0){
                    if(piezasnegras[y-2][x-1]!=0){
                        tentativas.add(piezaEnemigaDif(x-1,y-2))
                        tentativas.add(piezaEnemiga(x-1,y-2))

                    }else{
                        tentativas.add(piezaBlancaDif(x-1,y-2));
                    }
                }
                if(6>y && 7>x && piezasblancas[y+2][x+1]==0){
                    if(piezasnegras[y+2][x+1]!=0){
                        tentativas.add(piezaEnemigaDif(x+1,y+2))
                        tentativas.add(piezaEnemiga(x+1,y+2))
                    }else{
                        tentativas.add(piezaBlancaDif(x+1,y+2));
                    }
                }
                if(6>y && x>0 && piezasblancas[y+2][x-1]==0){
                    if(piezasnegras[y+2][x-1]!=0){
                        tentativas.add(piezaEnemigaDif(x-1,y+2))
                        tentativas.add(piezaEnemiga(x-1,y+2))
                    }else{
                        tentativas.add(piezaBlancaDif(x-1,y+2));
                    }
                }
                if(7>y && x>1 && piezasblancas[y+1][x-2]==0){
                    if(piezasnegras[y+1][x-2]!=0){
                        tentativas.add(piezaEnemigaDif(x-2,y+1))
                        tentativas.add(piezaEnemiga(x-2,y+1))
                    }else{
                        tentativas.add(piezaBlancaDif(x-2,y+1));
                    }
                }
                if(x>1 && y>0 && piezasblancas[y-1][x-2]==0){
                    if(piezasnegras[y-1][x-2]!=0){
                        tentativas.add(piezaEnemigaDif(x-2,y-1))
                        tentativas.add(piezaEnemiga(x-2,y-1))
                    }else{
                        tentativas.add(piezaBlancaDif(x-2,y-1));
                    }
                }
                if(6>x && y>0 && piezasblancas[y-1][x+2]==0){
                    if(piezasnegras[y-1][x+2]!=0){
                        tentativas.add(piezaEnemigaDif(x+2,y-1))
                        tentativas.add(piezaEnemiga(x+2,y-1))
                    }else{
                        tentativas.add(piezaBlancaDif(x+2,y-1));
                    }
                }
                if(7>y && 6>x && piezasblancas[y+1][x+2]==0){
                    if(piezasnegras[y+1][x+2]!=0){
                        tentativas.add(piezaEnemigaDif(x+2,y+1))
                        tentativas.add(piezaEnemiga(x+2,y+1))
                    }else{
                        tentativas.add(piezaBlancaDif(x+2,y+1));
                    }
                }
                scene.add(tentativas)
            }
            if(tipo==6){ //PEON
                if(y==6){
                    if(piezasblancas[y-1][x]==0 && piezasnegras[y-1][x]==0){
                        tentativas.add(piezaBlancaDif(x,y-1));
                        if(piezasblancas[y-2][x]==0 && piezasnegras[y-2][x]==0)
                            tentativas.add(piezaBlancaDif(x,y-2));
                    }
                }
                if(x>0 && piezasnegras[y-1][x-1]!=0){
                    tentativas.add(piezaEnemigaDif(x-1,y-1))
                    tentativas.add(piezaEnemiga(x-1,y-1))
                }
                if(7>x&&piezasnegras[y-1][x+1]!=0){
                    tentativas.add(piezaEnemigaDif(x+1, y-1))
                    tentativas.add(piezaEnemiga(x+1,y-1))
                }
                if(y!=6 && y!=0 && piezasnegras[y-1][x]==0 && piezasblancas[y-1][x]==0)
                    tentativas.add(piezaBlancaDif(x,y-1))
                scene.add(tentativas)
            }
        }else{
            if(tipo==1){ //REY
                //ENROQUES
                if(piezasnegras[0][4]==1 && piezasnegras[0][0]==3 && piezasnegras[0][1] == 0 && piezasnegras[0][2] == 0 && piezasnegras[0][3] == 0){
                    if(piezasblancas[0][1] == 0 && piezasblancas[0][2] == 0 && piezasblancas[0][3] == 0){
                        tentativas.add(piezaNegraDif2(2,0));
                    }
                }
                if(piezasnegras[0][4]==1 && piezasnegras[0][7]==3 && piezasnegras[0][6] == 0 && piezasnegras[0][5] == 0){
                    if(piezasblancas[0][6] == 0 && piezasblancas[0][5] == 0){
                        tentativas.add(piezaNegraDif2(6,0));
                    }
                }
                //MOV NORMALES
                if(y>0 && piezasnegras[y-1][x]==0){//arriba
                    if(piezasblancas[y-1][x]!=0){
                        tentativas.add(piezaEnemigaDif2(x,y-1))
                        tentativas.add(piezaEnemiga(x,y-1))
                    }else{
                        tentativas.add(piezaNegraDif(x,y-1));
                    }
                }
                if(y<7 && piezasnegras[y+1][x]==0){//abajo
                    if(piezasblancas[y+1][x]!=0){
                        tentativas.add(piezaEnemigaDif2(x,y+1))
                        tentativas.add(piezaEnemiga(x,y+1))
                    }else{
                        tentativas.add(piezaNegraDif(x,y+1));
                    }
                }
                if(x>0 && piezasnegras[y][x-1]==0){//izquierda
                    if(piezasblancas[y][x-1]!=0){
                        tentativas.add(piezaEnemigaDif2(x-1,y))
                        tentativas.add(piezaEnemiga(x-1,y))
                    }else{
                        tentativas.add(piezaNegraDif(x-1,y));
                    }
                }
                if(x<7 && piezasnegras[y][x+1]==0){//derecha
                    if(piezasblancas[y][x+1]!=0){
                        tentativas.add(piezaEnemigaDif2(x+1,y))
                        tentativas.add(piezaEnemiga(x+1,y))
                    }else{
                        tentativas.add(piezaNegraDif(x+1,y));
                    }
                } 
                if(x>0 && y>0 && piezasnegras[y-1][x-1]==0){//arriba izquierda
                    if(piezasblancas[y-1][x-1]!=0){
                        tentativas.add(piezaEnemigaDif2(x-1,y-1))
                        tentativas.add(piezaEnemiga(x-1,y-1))
                    }else{
                        tentativas.add(piezaNegraDif(x-1,y-1));
                    }
                }
                if(x<7 && y<7 && piezasnegras[y+1][x+1]==0){//abajo derecha
                    if(piezasblancas[y+1][x+1]!=0){
                        tentativas.add(piezaEnemigaDif2(x+1,y+1))
                        tentativas.add(piezaEnemiga(x+1,y+1))
                    }else{
                        tentativas.add(piezaNegraDif(x+1,y+1));
                    }
                }
                if(x>0 && y<7 && piezasnegras[y+1][x-1]==0){//abajo izquierda
                    if(piezasblancas[y+1][x-1]!=0){
                        tentativas.add(piezaEnemigaDif2(x-1,y+1))
                        tentativas.add(piezaEnemiga(x-1,y+1))
                    }else{
                        tentativas.add(piezaNegraDif(x-1,y+1));
                    }
                }
                if(x<7 && y>0 && piezasnegras[y-1][x+1]==0){//arriba derecha
                    if(piezasblancas[y-1][x+1]!=0){
                        tentativas.add(piezaEnemigaDif2(x+1,y-1))
                        tentativas.add(piezaEnemiga(x+1,y-1))
                    }else{
                        tentativas.add(piezaNegraDif(x+1,y-1));
                    }
                }
                scene.add(tentativas);
            }
            if(tipo==2){ //REINA
                //MOVIMIENTOS TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasnegras[y-n][x]==0){
                        if(piezasblancas[y-n][x]!=0){
                            tentativas.add(piezaEnemigaDif2(x,y-n))
                            tentativas.add(piezaEnemiga(x,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x,y-n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-y){ //abajo
                    if(piezasnegras[y+n][x]==0){
                        if(piezasblancas[y+n][x]!=0){
                            tentativas.add(piezaEnemigaDif2(x,y+n))
                            tentativas.add(piezaEnemiga(x,y+n))
                            salir=true;
                        }else{
                           tentativas.add(piezaNegraDif(x,y+n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-x){ //derecha
                    if(piezasnegras[y][x+n]==0){
                        if(piezasblancas[y][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y))
                            tentativas.add(piezaEnemiga(x+n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=x){ //izquierda
                    if(piezasnegras[y][x-n]==0){
                        if(piezasblancas[y][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y))
                            tentativas.add(piezaEnemiga(x-n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                //MOVIMIENTOS ALFIL
                salir = false;
                n = 1;
                while(salir==false && n<=7-x && n<=7-y){ //derecha abajo
                    if(piezasnegras[y+n][x+n]==0){
                        if(piezasblancas[y+n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y+n))
                            tentativas.add(piezaEnemiga(x+n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=y){ //izquierda arriba
                    if(piezasnegras[y-n][x-n]==0){
                        if(piezasblancas[y-n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y-n))
                            tentativas.add(piezaEnemiga(x-n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=7-y){ //izquierda abajo
                    if(piezasnegras[y+n][x-n]==0){
                        if(piezasblancas[y+n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y+n))
                            tentativas.add(piezaEnemiga(x-n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=7-x && n<=y){ //derecha arriba
                    if(piezasnegras[y-n][x+n]==0){
                        if(piezasblancas[y-n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y-n))
                            tentativas.add(piezaEnemiga(x+n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas)
            }
            if(tipo==3){ //TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasnegras[y-n][x]==0){
                        if(piezasblancas[y-n][x]!=0){
                            tentativas.add(piezaEnemigaDif2(x,y-n))
                            tentativas.add(piezaEnemiga(x,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x,y-n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-y){ //abajo
                    if(piezasnegras[y+n][x]==0){
                        if(piezasblancas[y+n][x]!=0){
                            tentativas.add(piezaEnemigaDif2(x,y+n))
                            tentativas.add(piezaEnemiga(x,y+n))
                            salir=true;
                        }else{
                           tentativas.add(piezaNegraDif(x,y+n)); 
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=7-x){ //derecha
                    if(piezasnegras[y][x+n]==0){
                        if(piezasblancas[y][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y))
                            tentativas.add(piezaEnemiga(x+n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n = 1;
                while(salir==false && n<=x){ //izquierda
                    if(piezasnegras[y][x-n]==0){
                        if(piezasblancas[y][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y))
                            tentativas.add(piezaEnemiga(x-n,y))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas)
            }
            if(tipo==4){ //ALFIL
                var salir = false;
                var n = 1;
                while(salir==false && n<=7-x && n<=7-y){ //derecha abajo
                    if(piezasnegras[y+n][x+n]==0){
                        if(piezasblancas[y+n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y+n))
                            tentativas.add(piezaEnemiga(x+n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=y){ //izquierda arriba
                    if(piezasnegras[y-n][x-n]==0){
                        if(piezasblancas[y-n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y-n))
                            tentativas.add(piezaEnemiga(x-n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=x && n<=7-y){ //izquierda abajo
                    if(piezasnegras[y+n][x-n]==0){
                        if(piezasblancas[y+n][x-n]!=0){
                            tentativas.add(piezaEnemigaDif2(x-n,y+n))
                            tentativas.add(piezaEnemiga(x-n,y+n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x-n,y+n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                salir = false;
                n=1;
                while(salir==false && n<=7-x && n<=y){ //derecha arriba
                    if(piezasnegras[y-n][x+n]==0){
                        if(piezasblancas[y-n][x+n]!=0){
                            tentativas.add(piezaEnemigaDif2(x+n,y-n))
                            tentativas.add(piezaEnemiga(x+n,y-n))
                            salir=true;
                        }else{
                            tentativas.add(piezaNegraDif(x+n,y-n));
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas);
            }
            if(tipo==5){ //CABALLO
                if(y>1 && 7>x && piezasnegras[y-2][x+1]==0){
                    if(piezasblancas[y-2][x+1]!=0){
                        tentativas.add(piezaEnemigaDif2(x+1,y-2))
                        tentativas.add(piezaEnemiga(x+1,y-2))
                    }else{
                        tentativas.add(piezaNegraDif(x+1,y-2));
                    }
                }
                if(y>1 && x>0 && piezasnegras[y-2][x-1]==0){
                    if(piezasblancas[y-2][x-1]!=0){
                        tentativas.add(piezaEnemigaDif2(x-1,y-2))
                        tentativas.add(piezaEnemiga(x-1,y-2))
                    }else{
                        tentativas.add(piezaNegraDif(x-1,y-2));
                    }
                }
                if(6>y && 7>x && piezasnegras[y+2][x+1]==0){
                    if(piezasblancas[y+2][x+1]!=0){
                        tentativas.add(piezaEnemigaDif2(x+1,y+2))
                        tentativas.add(piezaEnemiga(x+1,y+2))
                    }else{
                        tentativas.add(piezaNegraDif(x+1,y+2));
                    }
                }
                if(6>y && x>0 && piezasnegras[y+2][x-1]==0){
                    if(piezasblancas[y+2][x-1]!=0){
                        tentativas.add(piezaEnemigaDif2(x-1,y+2))
                        tentativas.add(piezaEnemiga(x-1,y+2))
                    }else{
                        tentativas.add(piezaNegraDif(x-1,y+2));
                    }
                }
                if(7>y && x>0 && piezasnegras[y+1][x-2]==0){
                    if(piezasblancas[y+1][x-2]!=0){
                        tentativas.add(piezaEnemigaDif2(x-2,y+1))
                        tentativas.add(piezaEnemiga(x-2,y+1))
                    }else{
                        tentativas.add(piezaNegraDif(x-2,y+1));
                    }
                }
                if(x>1 && y>0 && piezasnegras[y-1][x-2]==0){
                    if(piezasblancas[y-1][x-2]!=0){
                        tentativas.add(piezaEnemigaDif2(x-2,y-1))
                        tentativas.add(piezaEnemiga(x-2,y-1))
                    }else{
                        tentativas.add(piezaNegraDif(x-2,y-1));
                    }
                }
                if(6>x && y>0 && piezasnegras[y-1][x+2]==0){
                    if(piezasblancas[y-1][x+2]!=0){
                        tentativas.add(piezaEnemigaDif2(x+2,y-1))
                        tentativas.add(piezaEnemiga(x+2,y-1))
                    }else{
                        tentativas.add(piezaNegraDif(x+2,y-1));
                    }
                }
                if(7>y && 6>x && piezasnegras[y+1][x+2]==0){
                    if(piezasblancas[y+1][x+2]!=0){
                        tentativas.add(piezaEnemigaDif2(x+2,y+1))
                        tentativas.add(piezaEnemiga(x+2,y+1))
                    }else{
                        tentativas.add(piezaNegraDif(x+2,y+1));
                    }
                }
                scene.add(tentativas)
            }
            if(tipo==6){ //PEON
                if(y==1){
                    if(piezasnegras[y+1][x]==0 && piezasblancas[y+1][x]==0){
                        tentativas.add(piezaNegraDif(x,y+1));
                        if(piezasnegras[y+2][x]==0 && piezasblancas[y+2][x]==0)
                            tentativas.add(piezaNegraDif(x,y+2));
                    }
                }
                if(x>0 && piezasblancas[y+1][x-1]!=0){
                    tentativas.add(piezaEnemigaDif2(x-1,y+1))
                    tentativas.add(piezaEnemiga(x-1,y+1))
                }
                if(x<7 && piezasblancas[y+1][x+1]!=0){
                    tentativas.add(piezaEnemigaDif2(x+1, y+1))
                    tentativas.add(piezaEnemiga(x+1,y+1))
                }
                if(y!=1 && y!=7 && piezasblancas[y+1][x]==0 && piezasnegras[y+1][x]==0)
                    tentativas.add(piezaNegraDif(x,y+1))
                scene.add(tentativas)
            }
        }
    }
    function animar(x:any, y:any, x1:any, y1:any){
        var xmov;
        var ymov;
        var salir=true;
        var espx=0;
        var espy=0;
        if(x<x1){
            xmov=0.01;
        }else{
            xmov=-0.01;
        }
        if(y<y1){
            ymov=0.01;
        }else{
            ymov=-0.01;
        }
        while(salir){
            if(x<x1){
                bestia.position.x += xmov;
                x += xmov;
            }else{
                espx=1;
            }
            if(y<y1){
                bestia.position.z += ymov;
                y += ymov;
            }else{
                espy=1;
            }
            if(espx==1 && espy==1){
                salir=false;
            }
        }
    }

    //EXTRAS
    function registrarMovimiento(pieza:any, x_old:any, y_old:any, x_new:any, y_new:any) {
        let nota = `${pieza} de (${x_old}, ${y_old}) a (${x_new}, ${y_new})`;
        movimientos.push(nota);
        console.log(nota);
        actualizarTablaMovimientos();
    }
    function actualizarTablaMovimientos() {
        const tabla = document.getElementById('tabla-movimientos') as HTMLTableElement;
        const tbody = tabla.getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpiar el contenido del tbody
        
        movimientos.forEach((movimiento, index) => {
            let row = tbody.insertRow();
            let cell = row.insertCell();
            cell.innerText = movimiento;
        });
    }
    function destroy():void{
        renderer.domElement.remove();
        scene.clear();
    }
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
        if (event instanceof NavigationStart && event.url === '/inicio') {
          destroy();
        }
    });

    //LLAMADAS A FUNCION
    dibujaEscenario();
    cargarModeloOBJ();
    draw();
    animate();
  }
  navigateToInicio() {
    this.router.navigate(['/inicio']);
  }
}
