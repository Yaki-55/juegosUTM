import { Component } from '@angular/core';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js'
@Component({
  selector: 'app-ajedrez',
  standalone: true,
  imports: [],
  templateUrl: './ajedrez.component.html',
  styleUrl: './ajedrez.component.css'
})
export class AjedrezComponent {
  ngOnInit(){
    var x:any;
    var y:any;
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
      objLoader.load('../../assets/modelosBlancos/LP_King.obj',
      ( rey:any ) =>{
        rey.position.set(y*tamCubo,1.1,x*tamCubo)
        rey.scale.set(scale.x,scale.y,scale.z)
        //rey.rotation.y=90*Math.PI/180
        rey.userData['draggable']=true;
        rey.userData['name']='ReyBlanco';
        scene.add( rey );
        console.log(rey);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function torreBlanca(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('../../assets/modelosBlancos/Rook_Torre.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='TorreBlanca';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function alfilBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('../../assets/modelosBlancos/LP_Bishop.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='AlfilBlanco';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function caballoBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.008,y:0.008,z:0.008} //Escudo 1
      objLoader.load('../../assets/modelosBlancos/Low_Poly_Chess_-_Knight.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='CaballoBlanco';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reinaBlanca(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.011,y:0.011,z:0.011} //Escudo 1
      objLoader.load('../../assets/modelosBlancos/Low_Poly_Chess_-_Queen.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='ReinaBlanco';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function peonBlanco(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('../../assets/modelosBlancos/Low_Poly_Chess_-_Pawn.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='PeonBlanco';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
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
                      rey=!rey;
                      reyBlanco(r,c);
                  }
                  if(piezasblancas[r][c]==2){
                    reinaBlanca(r,c);
                  }
                  if(piezasblancas[r][c]==3){
                    torreBlanca(r,c);
                  }
                  if(piezasblancas[r][c]==4){
                    alfilBlanco(r,c);
                  }
                  if(piezasblancas[r][c]==5){
                    caballoBlanco(r,c);
                  }
                  if(piezasblancas[r][c]==6){
                    peonBlanco(r,c);
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
      objLoader.load('../../assets/modelosNegros/Low_Poly_Chess_Black_Pawn2.obj', (torre:any) =>{
      //var object = new THREE.Mesh(torre, new THREE.MeshBasicMaterial({color: 0x000000}));
        //object.scale.set(scale);
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        //console.log("aqui"+torre.Mesh)
        //console.log(torre);
        //torre.materialLibraries = 'assets/modelosNegros/material.lib'
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='PeonNegro';
        scene.add(torre);
        //console.log(object)
        //console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reyNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.007,y:0.007,z:0.007} //Escudo 1
      objLoader.load('../../assets/modelosNegros/LP_Black_King.obj',
      ( rey:any ) =>{
        rey.position.set(y*tamCubo,1.1,x*tamCubo)
        rey.scale.set(scale.x,scale.y,scale.z)
        //rey.rotation.y=90*Math.PI/180
        rey.userData['draggable']=true;
        rey.userData['name']='ReyNegro';
        scene.add( rey );
        console.log(rey);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function torreNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('../../assets/modelosNegros/Black_Rook_Torre.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='TorreNegro';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function alfilNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.006,y:0.006,z:0.006} //Escudo 1
      objLoader.load('../../assets/modelosNegros/LP_Black_Bishop.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.userData['draggable']=true;
        torre.userData['name']='AlfilNegro';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function caballoNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.008,y:0.008,z:0.008} //Escudo 1
      objLoader.load('../../assets/modelosNegros/Low_Poly_Chess_Black_Knight.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=0*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='CaballoNegro';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
        console.error( 'An error happened', error );
      },
      );
    }
    function reinaNegro(x:any, y:any){
      const objLoader = new OBJLoader();
      let scale={x:0.011,y:0.011,z:0.011} //Escudo 1
      objLoader.load('../../assets/modelosNegros/Low_Poly_Chess_Black_Queen.obj',
      ( torre:any ) =>{
        torre.position.set(y*tamCubo,1.1,x*tamCubo)
        torre.scale.set(scale.x,scale.y,scale.z)
        torre.rotation.y=180*Math.PI/180
        torre.userData['draggable']=true;
        torre.userData['name']='ReinaNegro';
        scene.add(torre);
        console.log(torre);
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
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
                  }
                  if(piezasnegras[r][c]==4){
                    alfilNegro(r,c);
                  }
                  if(piezasnegras[r][c]==5){
                    caballoNegro(r,c);
                  }
                  if(piezasnegras[r][c]==6){
                    peonNegro(r,c);
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
      var color= true;
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
      objLoader.load('../../assets/modelos/Tabuleiro3.3mf',
      ( obj:any ) =>{
        obj.position.set(pos.x,pos.y,pos.z)
        obj.scale.set(scale.x,scale.y,scale.z)
        obj.rotation.z=180*Math.PI/180
        scene.add( obj );
      },
      ( xhr:any ) =>{
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded obj` );
      },
      ( error:any ) =>{
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
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable;
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="TorreBlanca" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 3);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.parent?.position.x;
            x_old = intersects[i].object.parent?.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReinaBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 2);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="CaballoBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 5);
            draggable=intersects[0].object.parent ?? draggable; 
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="PeonBlanco" && turno == true){
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
                dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 6);
                y_old = bestia.position.x;
                x_old = bestia.position.z;
                console.log("x vieja= ", x_old);
                console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReyBlanco" && turno == true){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 1, 1);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = bestia.position.x;
            x_old = bestia.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }


          //NEGRAS
          if(intersects[i].object.parent?.userData['name']=="AlfilNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 4);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="TorreNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 3);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.parent?.position.x;
            x_old = intersects[i].object.parent?.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReinaNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 2);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
            console.log(bestia);
          }
          if(intersects[i].object.parent?.userData['name']=="CaballoNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 5);
            draggable=intersects[0].object.parent ?? draggable; 
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="PeonNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 6);
            draggable=intersects[0].object.parent ?? draggable;
            bestia=draggable
            y_old = intersects[i].object.position.x;
            x_old = intersects[i].object.position.z;
            console.log("x vieja= ", x_old);
            console.log("y vieja= ", y_old);
          }
          if(intersects[i].object.parent?.userData['name']=="ReyNegro" && turno == false){
            dibujaMovimiento(intersects[i].object.parent?.position.x, intersects[i].object.parent?.position.z, 2, 1);
            draggable=intersects[0].object.parent ?? draggable;   
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
            animar(x_old,y_old, x_new, y_new);
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasblancas[x_new][y_new]=piezasblancas[x_old][y_old];
            piezasblancas[x_old][y_old]=0;
            console.log(piezasblancas);
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
            bestia.position.set(y_new*tamCubo,1.1,x_new*tamCubo);
            piezasnegras[x_new][y_new]=piezasnegras[x_old][y_old];
            piezasnegras[x_old][y_old]=0;
            tentativas.clear();
            //turno= !turno;
        }
        console.log(intersects);
        console.log(intersects[0].object.userData['name']);
      console.log(pointer);
    }
    window.addEventListener('click',detectarClick);
    function draw(){
      dibujaBlanco();
      dibujaNegro();
    }
    function piezaBlancaDif(x:any, y:any){
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
    function piezaBlancaDif2(x:any, y:any){
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
    function piezaNegraDif(x:any, y:any){
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
    function piezaNegraDif2(x:any, y:any){
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
    function dibujaMovimiento(x:any, y:any, color:any, tipo:any){
        if(color==1){
            if(tipo==1){ //REY
                if(piezasblancas[7][4]==1 && piezasblancas[7][0]==3 && piezasblancas[7][1] == 0 && piezasblancas[7][2] == 0 && piezasblancas[7][3] == 0){
                    tentativas.add(piezaBlancaDif2(2,7));
                }
                if(piezasblancas[7][4]==1 && piezasblancas[7][7]==3 && piezasblancas[7][6] == 0 && piezasblancas[7][5] == 0){
                    tentativas.add(piezaBlancaDif2(6,7));
                }
                if(y>0 && piezasblancas[y-1][x]==0)//arriba
                    tentativas.add(piezaBlancaDif(x,y-1)) 
                if(y<7 && piezasblancas[y+1][x]==0)//abajo
                    tentativas.add(piezaBlancaDif(x,y+1)) 
                if(x>0 && piezasblancas[y][x-1]==0)//izquierda
                    tentativas.add(piezaBlancaDif(x-1,y)) 
                if(x<7 && piezasblancas[y][x+1]==0)//derecha
                    tentativas.add(piezaBlancaDif(x+1,y)) 
                if(x>0 && y>0 && piezasblancas[y-1][x-1]==0)//arriba izquierda
                    tentativas.add(piezaBlancaDif(x-1,y-1))
                if(x<7 && y<7 && piezasblancas[y+1][x+1]==0)//abajo derecha
                    tentativas.add(piezaBlancaDif(x+1,y+1))
                if(x>0 && y<7 && piezasblancas[y+1][x-1]==0)//abajo izquierda
                    tentativas.add(piezaBlancaDif(x-1,y+1))
                if(x<7 && y>0 && piezasblancas[y-1][x+1]==0)//arriba derecha
                    tentativas.add(piezaBlancaDif(x+1,y-1))
                scene.add(tentativas);
            }
            if(tipo==2){ //REINA
                //MOVIMIENTOS TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasblancas[y-n][x]==0){
                        tentativas.add(piezaBlancaDif(x,y-n));
                        if(piezasnegras[y-n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x,y+n));
                        if(piezasnegras[y+n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y));
                        if(piezasnegras[y][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y));
                        if(piezasnegras[y][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y+n));
                        if(piezasnegras[y+n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y-n));
                        if(piezasnegras[y-n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y+n));
                        if(piezasnegras[y+n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y-n));
                        if(piezasnegras[y-n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x,y-n));
                        if(piezasnegras[y-n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x,y+n));
                        if(piezasnegras[y+n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y));
                        if(piezasnegras[y][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y));
                        if(piezasnegras[y][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y+n));
                        if(piezasnegras[y+n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y-n));
                        if(piezasnegras[y-n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x-n,y+n));
                        if(piezasnegras[y+n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaBlancaDif(x+n,y-n));
                        if(piezasnegras[y-n][x+n]!=0){
                            salir=true;
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas);
            }
            if(tipo==5){ //CABALLO
                if(y>1 && 7>x && piezasblancas[y-2][x+1]==0)
                    tentativas.add(piezaBlancaDif(x+1,y-2));
                if(y>0 && x>0 && piezasblancas[y-2][x-1]==0)
                    tentativas.add(piezaBlancaDif(x-1,y-2));
                if(6>y && 7>x && piezasblancas[y+2][x+1]==0)
                    tentativas.add(piezaBlancaDif(x+1,y+2));
                if(6>y && x>0 && piezasblancas[y+2][x-1]==0)
                    tentativas.add(piezaBlancaDif(x-1,y+2));
                
                if(7>y && x>0 && piezasblancas[y+1][x-2]==0)
                    tentativas.add(piezaBlancaDif(x-2,y+1));
                if(x>1 && y>0 && piezasblancas[y-1][x-2]==0)
                    tentativas.add(piezaBlancaDif(x-2,y-1));
                if(6>x && y>0 && piezasblancas[y-1][x+2]==0)
                    tentativas.add(piezaBlancaDif(x+2,y-1));
                if(7>y && 6>x && piezasblancas[y+1][x+2]==0)
                    tentativas.add(piezaBlancaDif(x+2,y+1));/**/
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
                if(x>0 && piezasnegras[y-1][x-1]!=0)
                    tentativas.add(piezaBlancaDif(x-1,y-1))
                if(7>x&&piezasnegras[y-1][x+1]!=0)
                    tentativas.add(piezaBlancaDif(x+1, y-1))
                if(y!=6 && y!=0 && piezasnegras[y-1][x]==0 && piezasblancas[y-1][x]==0)
                    tentativas.add(piezaBlancaDif(x,y-1))
                scene.add(tentativas)
            }
        }else{
            if(tipo==1){ //REY
                if(piezasnegras[0][4]==1 && piezasnegras[0][0]==3 && piezasnegras[0][1] == 0 && piezasnegras[0][2] == 0 && piezasnegras[0][3] == 0){
                    tentativas.add(piezaNegraDif2(2,0));
                }
                if(piezasnegras[0][4]==1 && piezasnegras[0][7]==3 && piezasnegras[0][6] == 0 && piezasnegras[0][5] == 0){
                    tentativas.add(piezaNegraDif2(6,0));
                }
                if(y>0 && piezasnegras[y-1][x]==0)//arriba
                    tentativas.add(piezaNegraDif(x,y-1)) 
                if(y<7 && piezasnegras[y+1][x]==0)//abajo
                    tentativas.add(piezaNegraDif(x,y+1)) 
                if(x>0 && piezasnegras[y][x-1]==0)//izquierda
                    tentativas.add(piezaNegraDif(x-1,y)) 
                if(x<7 && piezasnegras[y][x+1]==0)//derecha
                    tentativas.add(piezaNegraDif(x+1,y)) 
                if(x>0 && y>0 && piezasnegras[y-1][x-1]==0)//arriba izquierda
                    tentativas.add(piezaNegraDif(x-1,y-1))
                if(x<7 && y<7 && piezasnegras[y+1][x+1]==0)//abajo derecha
                    tentativas.add(piezaNegraDif(x+1,y+1))
                if(x>0 && y<7 && piezasnegras[y+1][x-1]==0)//abajo izquierda
                    tentativas.add(piezaNegraDif(x-1,y+1))
                if(x<7 && y>0 && piezasnegras[y-1][x+1]==0)//arriba derecha
                    tentativas.add(piezaNegraDif(x+1,y-1))
                scene.add(tentativas);
            }
            if(tipo==2){ //REINA
                //MOVIMIENTOS TORRE
                var salir = false;
                var n = 1;
                while(salir==false && n<=y){ //arriba
                    if(piezasnegras[y-n][x]==0){
                        tentativas.add(piezaNegraDif(x,y-n));
                        if(piezasblancas[y-n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x,y+n));
                        if(piezasblancas[y+n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y));
                        if(piezasblancas[y][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y));
                        if(piezasblancas[y][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y+n));
                        if(piezasblancas[y+n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y-n));
                        if(piezasblancas[y-n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y+n));
                        if(piezasblancas[y+n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y-n));
                        if(piezasblancas[y-n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x,y-n));
                        if(piezasblancas[y-n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x,y+n));
                        if(piezasblancas[y+n][x]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y));
                        if(piezasblancas[y][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y));
                        if(piezasblancas[y][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y+n));
                        if(piezasblancas[y+n][x+n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y-n));
                        if(piezasblancas[y-n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x-n,y+n));
                        if(piezasblancas[y+n][x-n]!=0){
                            salir=true;
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
                        tentativas.add(piezaNegraDif(x+n,y-n));
                        if(piezasblancas[y-n][x+n]!=0){
                            salir=true;
                        }
                    }else{
                        salir=true;
                    }
                    n=n+1;
                }
                scene.add(tentativas);
            }
            if(tipo==5){ //CABALLO
                if(y>1 && 7>x && piezasnegras[y-2][x+1]==0)
                    tentativas.add(piezaNegraDif(x+1,y-2));
                if(y>0 && x>0 && piezasnegras[y-2][x-1]==0)
                    tentativas.add(piezaNegraDif(x-1,y-2));
                if(6>y && 7>x && piezasnegras[y+2][x+1]==0)
                    tentativas.add(piezaNegraDif(x+1,y+2));
                if(6>y && x>0 && piezasnegras[y+2][x-1]==0)
                    tentativas.add(piezaNegraDif(x-1,y+2));
                
                if(7>y && x>0 && piezasnegras[y+1][x-2]==0)
                    tentativas.add(piezaNegraDif(x-2,y+1));
                if(x>1 && y>0 && piezasnegras[y-1][x-2]==0)
                    tentativas.add(piezaNegraDif(x-2,y-1));
                if(6>x && y>0 && piezasnegras[y-1][x+2]==0)
                    tentativas.add(piezaNegraDif(x+2,y-1));
                if(7>y && 6>x && piezasnegras[y+1][x+2]==0)
                    tentativas.add(piezaNegraDif(x+2,y+1));
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
                if(x>0 && piezasblancas[y+1][x-1]!=0)
                    tentativas.add(piezaNegraDif(x-1,y+1))
                if(x<7 && piezasblancas[y+1][x+1]!=0)
                    tentativas.add(piezaNegraDif(x+1, y+1))
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
    //LLAMADAS A FUNCION
    dibujaEscenario();
    cargarModeloOBJ();
    draw();
    animate();
  }
}
