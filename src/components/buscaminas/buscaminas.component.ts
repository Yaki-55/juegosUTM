import { Component } from '@angular/core';

@Component({
  selector: 'app-buscaminas',
  templateUrl: './buscaminas.component.html',
  styleUrls: ['./buscaminas.component.css']
})
export class BuscaminasComponent {
  filas: number = 0;
  columnas: number = 0;
  dificultad: number = 0;
  minas: number = 0;
  lado: number = 30;
  marcas: number = 0;
  tablero: any[] = [];
  enJuego: boolean = true;
  juegoIniciado: boolean = false;

  nuevoJuego() {
    this.reiniciarVariables();
    this.generarTableroHTML();
    this.generarTableroJuego();
    this.añadirEventos();
    this.refrescarTablero();
  }

  crearTablero(filas: number, columnas: number) {
    this.filas = filas;
    this.columnas = columnas;
    this.nuevoJuego();
  }

  reiniciarVariables() {
    this.marcas = 0;
    this.enJuego = true;
    this.juegoIniciado = false;
  }

  generarTableroHTML() {
    this.dificultad = parseFloat((document.getElementById('dificultad') as HTMLSelectElement).value);
    this.minas = this.filas * this.columnas * this.dificultad;
    if (this.filas < 4 || this.filas > 30 || this.columnas < 4 || this.columnas > 30) {
      alert('El tamaño no puede ser menor de 4 ni mayor de 30');
      return;
    }

    let html = '';
    for (let f = 0; f < this.filas; f++) {
      html += `<tr>`;
      for (let c = 0; c < this.columnas; c++) {
        html += `<td id="celda-${c}-${f}" style="width:${this.lado}px;height:${this.lado}px"></td>`;
      }
      html += `</tr>`;
    }

    const tableroHTML = document.getElementById('tablero') as HTMLTableElement;
    tableroHTML.innerHTML = html;
    tableroHTML.style.width = this.columnas * this.lado + 'px';
    tableroHTML.style.height = this.filas * this.lado + 'px';
    tableroHTML.style.background = 'slategray';
  }

  añadirEventos() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        const celda = document.getElementById(`celda-${c}-${f}`) as HTMLTableCellElement;
        celda.addEventListener('dblclick', (me) => this.dobleClic(celda, c, f, me));
        celda.addEventListener('contextmenu', (me) => this.marcarCelda(celda, c, f, me));
        celda.addEventListener('click', (me) => this.clicSimple(celda, c, f, me));
      }
    }
  }
  

  marcarCelda(celda: HTMLTableCellElement, c: number, f: number, me: MouseEvent) {
    me.preventDefault(); // Evita que aparezca el menú contextual del navegador
    if (!this.enJuego) return;
    
    if (this.tablero[c][f].estado === 'marcado') {
      this.tablero[c][f].estado = undefined;
      this.marcas--;
    } else {
      this.tablero[c][f].estado = 'marcado';
      this.marcas++;
    }
    
    this.refrescarTablero();
  }

  dobleClic(celda: HTMLTableCellElement, c: number, f: number, me: MouseEvent) {
    if (!this.enJuego) return;
    this.abrirArea(c, f);
    this.refrescarTablero();
  }

  clicSimple(celda: HTMLTableCellElement, c: number, f: number, me: MouseEvent) {
    if (!this.enJuego || this.tablero[c][f].estado === 'descubierto') return;

    switch (me.button) {
      case 0:
        if (this.tablero[c][f].estado === 'marcado') break;
        while (!this.juegoIniciado && this.tablero[c][f].valor === -1) {
          this.generarTableroJuego();
        }
        this.tablero[c][f].estado = 'descubierto';
        this.juegoIniciado = true;
        if (this.tablero[c][f].valor === 0) this.abrirArea(c, f);
        break;
      case 2:
        if (this.tablero[c][f].estado === 'marcado') {
          this.tablero[c][f].estado = undefined;
          this.marcas--;
        } else {
          this.tablero[c][f].estado = 'marcado';
          this.marcas++;
        }
        break;
    }
    this.refrescarTablero();
  }

  abrirArea(c: number, f: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        try {
          if (this.tablero[c + i][f + j].estado !== 'descubierto' && this.tablero[c + i][f + j].estado !== 'marcado') {
            this.tablero[c + i][f + j].estado = 'descubierto';
            if (this.tablero[c + i][f + j].valor === 0) this.abrirArea(c + i, f + j);
          }
        } catch (e) {}
      }
    }
  }

  refrescarTablero() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        const celda = document.getElementById(`celda-${c}-${f}`) as HTMLTableCellElement;
        celda.style.boxShadow = 'inset 3px 3px 0 0 rgba(255,255,255,0.5), inset -3px -3px 0 0 rgba(0,0,0,0.5)';
  
        if (this.tablero[c][f].estado === 'descubierto') {
          celda.style.boxShadow = 'none';
          celda.style.border = '1px solid rgba(0, 0, 0, 0.25)'; // Agregar el borde gris
          switch (this.tablero[c][f].valor) {
            case -1:
              celda.innerHTML = '<i class="fa-solid fa-bomb" style="color: red; display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;"></i>';
              celda.style.background = 'transparent';
              break;
            case 0:
              celda.innerHTML = '';
              break;
            default:
              celda.innerHTML = `<span style="color: white; display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">${this.tablero[c][f].valor}</span>`;
              break;
          }
        }
  
        if (this.tablero[c][f].estado === 'marcado') {
          celda.innerHTML = '<i class="fa-solid fa-flag" style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;"></i>';
          celda.style.background = 'cadetblue';
        }
  
        if (this.tablero[c][f].estado === undefined) {
          celda.innerHTML = '';
          celda.style.background = '';
        }
      }
    }
    this.verificarGanador();
    this.verificarPerdedor();
  }
  
  
  
  

  verificarGanador() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.tablero[c][f].estado !== 'descubierto' && this.tablero[c][f].valor !== -1) return;
      }
    }

    const tableroHTML = document.getElementById('tablero') as HTMLTableElement;
    tableroHTML.style.background = '#132A90';
    this.enJuego = false;
  }

  verificarPerdedor() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.tablero[c][f].valor === -1 && this.tablero[c][f].estado === 'descubierto') {
          this.enJuego = false;
          break;
        }
      }
    }

    if (this.enJuego) return;

    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.tablero[c][f].valor === -1) {
          const celda = document.getElementById(`celda-${c}-${f}`) as HTMLTableCellElement;
          celda.innerHTML = '<i class="fa-solid fa-bomb"></i>';
          celda.style.color = 'black';
          celda.style.background = 'red';
        }
      }
    }
  }

  generarTableroJuego() {
    this.vaciarTablero();
    this.ponerMinas();
    this.contadorMinas();
  }

  vaciarTablero() {
    this.tablero = [];
    for (let c = 0; c < this.columnas; c++) {
      this.tablero.push([]);
    }
  }

  ponerMinas() {
    for (let i = 0; i < this.minas; i++) {
      let c: number;
      let f: number;
      do {
        c = Math.floor(Math.random() * this.columnas);
        f = Math.floor(Math.random() * this.filas);
      } while (this.tablero[c][f]);
      this.tablero[c][f] = { valor: -1 };
    }
  }

  contadorMinas() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (!this.tablero[c][f]) {
          let contador = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              try {
                if (this.tablero[c + i][f + j].valor === -1) contador++;
              } catch (e) {}
            }
          }
          this.tablero[c][f] = { valor: contador };
        }
      }
    }
  }
}
