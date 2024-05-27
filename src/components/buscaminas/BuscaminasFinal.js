/*let quitarBorder=document.querySelector(".td");*/
/*var botonGenerar = document.querySelector('.btn-generar');*/
var	filas=document.getElementById("numFilas").value;
var	columnas=document.getElementById("numColumnas").value;
var dificultad = document.getElementById("dificultad").value;
var minas = filas * columnas * dificultad;
var lado=30;
var marcas=0;
let tablero = [];
var enJuego=true;
var juegoIniciado=false

function nuevoJuego(){
	reiniciarVariables();
	generarTableroHTML();
	generarTableroJuego();
	añadirEventos();
	refrescarTablero();
	
}
function facil() {
    filas = 10;
    columnas = 10;
	console.log(filas);
    nuevoJuego();
}
function reiniciarVariables(){
	marcas=0;
	enJuego=true;
	juegoIniciado=false;
}
function generarTableroHTML() {
	filas=document.getElementById("numFilas").value;
	columnas=document.getElementById("numColumnas").value;
	dificultad = document.getElementById("dificultad").value;
	minas=filas*columnas*dificultad;
	if (filas<4 || filas>30 && columnas<4 || columnas>30) {
            alert(`El tamaño no puede ser menor de 4 ni mayor de 30`);
            return;
     }
	let html="";
	for(let f=0; f<filas; f++){
		html+=`<tr>`;
		for (let c=0;c<columnas; c++){
			html+=`<td id="celda-${c}-${f}" style="width:${lado}px;height:${lado}px">`;
			/*	html+=`${c},${f}`;*/
			html+=`</td>`;
		}
		html+=`</tr>`;
	}
	let tableroHTML=document.getElementById("tablero");
	tableroHTML.innerHTML=html;
	tableroHTML.style.width=columnas*lado+"px";
	tableroHTML.style.height=filas*lado+"px";
	tableroHTML.style.background = "slategray"
}
function crearTablero(filas, columnas) {
    document.getElementById("numFilas").value = filas;
    document.getElementById("numColumnas").value = columnas;
    nuevoJuego();
}
function añadirEventos(){

	for(let f=0;f<filas;f++){
		for(let c=0; c<columnas;c++){
			let celda=document.getElementById(`celda-${c}-${f}`);
			celda.addEventListener(`dblclick`,me=>{
				dobleClic(celda,c,f,me);
			})
			celda.addEventListener(`mouseup`,me=>{
				clicSimple(celda,c,f,me);
			})
		}
			
	}
}
function dobleClic(celda,c,f,me){

	if(!enJuego){
		return;
	}
	abrirArea(c,f);
	refrescarTablero();
}
function clicSimple(celda,c,f,me){
	if(!enJuego){
		return;
	}
	if(tablero[c][f].estado=="descubierto"){
		return;
	}
	switch(me.button){
		case 0:
			if(tablero[c][f].estado=="marcado"){
				break;
			}
			while(!juegoIniciado && tablero[c][f].valor==-1){
				generarTableroJuego();
			}
			tablero[c][f].estado="descubierto";
			juegoIniciado=true;

			if(tablero[c][f].valor==0){
				abrirArea(c,f);
			}

			break;
		case 1:
			break;
		case 2:
			if(tablero[c][f].estado=="marcado"){
				tablero[c][f].estado=undefined;
				marcas--;
			}else{
				tablero[c][f].estado="marcado";
				marcas++;
			}
			break;
		default:
			break;
	}
	refrescarTablero();
}
function abrirArea(c,f){

	for(let i=-1;i<=1;i++){
		for(let j=-1; j<=1;j++){
			if(i==0 && j==0){
				continue;
			}
			try{
				if(tablero[c+i][f+j].estado!="descubierto"){
					if(tablero[c+i][f+j].estado!="marcado"){
						tablero[c+i][f+j].estado="descubierto";
						if (tablero[c+i][f+j].valor==0) {
							abrirArea(c+i,f+j);
						}
					}
				}

			}catch(e){}
		}
	}
}
function refrescarTablero(){

	for(let f=0; f<filas; f++){
		for(let c=0; c<columnas; c++){
			let celda=document.getElementById(`celda-${c}-${f}`);

			if(tablero[c][f].estado=="descubierto")
			{
				celda.style.boxShadow="none";
				switch(tablero[c][f].valor){
					case -1:
						celda.innerHTML=`<i class="fa-solid fa-bomb"></i>`;
						celda.style.color="black";
						celda.style.background="red";
						break;
					case 0:
						break;
					default:
						celda.innerHTML=tablero[c][f].valor;
						break;
				}	
			}
			if(tablero[c][f].estado=="marcado"){
				celda.innerHTML=`<i class="fa-solid fa-flag"></i>`;
				celda.style.background=`cadetblue`;
			}
			if(tablero[c][f].estado==undefined){
				celda.innerHTML=``;
				celda.style.background=``;
			}	
		}
	}
	verificarGanador();
	verificarPerdedor();
}
function verificarGanador(){

	for(let f=0; f<filas; f++){
		for( let c=0; c<columnas;c++){
			if(tablero[c][f].estado!=`descubierto`){
				if(tablero[c][f].valor==-1){
					continue;
				}else{
					return;
				}
			}		
		}
	}

	let tableroHTML=document.getElementById("tablero");
	tableroHTML.style.background="#132A90";

	enJuego=false;
}
function verificarPerdedor(){

	for(let f=0; f<filas; f++){
		for( let c=0; c<columnas;c++){
			if(tablero[c][f].valor==-1){
				if(tablero[c][f].estado==`descubierto`){
					enJuego=false;
				}
			}
		}
	}
	if(enJuego){
		return;
	}
	for(let f=0; f<filas; f++){
		for( let c=0; c<columnas;c++){
			if(tablero[c][f].valor==-1){
				let celda=document.getElementById(`celda-${c}-${f}`);
				celda.innerHTML=`<i class="fa-solid fa-bomb"></i>`;	
				celda.style.color="black";
				celda.style.background="red";
			}
		}
	}
}
function generarTableroJuego(){
	vaciarTablero();
	ponerMinas();
	contadorMinas();
}
function vaciarTablero(){

	tablero=[];
	for(let c=0;c<columnas;c++){
		tablero.push([]);
	}

}
function ponerMinas(){
	for(let i=0; i<minas; i++){
		let c;
		let f ;
		do{
			c=Math.floor(Math.random()*columnas);
			f=Math.floor(Math.random()*filas);
		}while(tablero[c][f]);
		tablero[c][f]={valor:-1};
	}
}
function contadorMinas(){
	for(let f=0 ; f<filas;f++){
		for(let c=0; c<columnas; c++){
			if(!tablero[c][f]){
				let contador=0;
				for(let i=-1; i<=1;i++){
					for(let j=-1; j<=1; j++){
						if(i==0 && j==0){
							continue;
						}
						try{
							if(tablero[c+i][f+j].valor==-1){
								contador++;
							}
						} catch(e){}
					}
				}
				tablero[c][f]={valor:contador}
			}
		}
	}

}