import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';

interface Brick {
  x: number;
  y: number;
  status: 1 | 0; // Usamos 1 para visible, 0 para destruido
}


@Component({
  selector: 'app-brick-breaker',
  standalone: true,
  imports: [],
  templateUrl: './brick-breaker.component.html',
  styleUrl: './brick-breaker.component.css'
})
export class BrickBreakerComponent implements OnInit, AfterViewInit{
  
  @ViewChild('brickBreakerCanvas') canvasRef!: ElementRef<HTMLCanvasElement>; // ViewChild no nulo
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  bricks: Brick[][] = []; // Arreglo bidimensional para los ladrillos

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {} 



  //context: any;
  interval: any;
  intervalSpeed?: number;
  width?: number;
  height?: number;
  xPosition?: number;
  yPosition?: number;
  xOffset = 2;
  yOffset = -2;
  ballRadius = 10;
  paddleHeight = 10;
  paddleWidth = 100;
  paddlePosition?: number;
  brickRows = 5;
  brickColumns = 3;
  brickWidth = 100;
  brickHeight = 20;
  brickPadding = 10;
  brickOffset = 100;
  //bricks = [];
  movingRight = false;
  movingLeft = false;
  gameStatus = 'Presiona Empezar para jugar!';
  gameOn = false;
  score = 0;
  highScore?: number;

  wallHitSound = new Audio('../../assets/audios/break.mp3'); // Reemplaza con tu ruta
  gameOverSound = new Audio('../../assets/audios/music.mp3');
  paddleSound = new Audio('../../assets/audios/bigger.mp3');

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { // Inicializamos canvas y contexto después de que la vista esté lista
    if (isPlatformBrowser(this.platformId)) { // Check for browser environment
      this.canvas = this.canvasRef.nativeElement;
      this.context = this.canvas.getContext('2d')!; // Aseguramos que el contexto no sea null
      this.width = this.canvas.width;
      this.height = this.canvas.height;

      this.highScore = this.getHighScore(); // Extraer la lógica para obtener el puntaje más alto
    } else {
      // Mock canvas context or do nothing on the server
    }
  }

  startGame() {
    this.intervalSpeed = 10;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('Brick Breaker')!, 10) || 0;
    this.gameOn = true;
    this.gameStatus = 'Playing, good luck!';
    if (this.width) {
      this.xPosition = this.width / 2;
      this.paddlePosition = (this.width - this.paddleWidth) / 2;
    }
    if (this.height) {
      this.yPosition = this.height - 50;
    }
    this.xOffset = 2;
    this.yOffset = -2;
    this.generateBricks();
    this.interval = setInterval(() => {
      this.drawBoard();
    }, this.intervalSpeed);
    this.resetBallAndPaddle(); // Método para reiniciar la posición de la bola y la paleta
    this.interval = setInterval(() => this.drawBoard(), this.intervalSpeed); // Usar arrow function para el contexto    
  }

  drawBoard() {
    this.context.clearRect(0, 0, this.width ?? 0, this.height ?? 0);

    this.drawBall();
    this.checkWallCollision();
    this.drawPaddle();
    this.drawBricks();
    this.drawScore();
    this.checkBrickCollision();

    this.xPosition! += this.xOffset;
    this.yPosition! += this.yOffset;
  }

  drawBall() {
    if (this.xPosition !== undefined && this.yPosition !== undefined) { 
      this.context.beginPath();
      this.context.arc(this.xPosition, this.yPosition, this.ballRadius, 0, Math.PI * 2);
      this.context.fillStyle = 'red';
      this.context.fill();
      this.context.closePath();
    }
  }

  drawPaddle() {
    this.context.beginPath();

    // Aplica la clase CSS a la paleta
    this.context.rect(
      this.paddlePosition!, 
      this.height! - this.paddleHeight, 
      this.paddleWidth, 
      this.paddleHeight
    );

    // Obtener estilos calculados y aplicarlos a fillStyle
    const paddleStyle = getComputedStyle(document.documentElement); 
    this.context.fillStyle = '#db5908';
    
    this.context.fill();
    this.context.closePath();

    if (this.movingLeft) {
      this.paddlePosition! -= 10;
      if (this.paddlePosition! < 0) {
        this.paddlePosition = 0;
      }
    } else if (this.movingRight) {
    
      this.paddlePosition! += 10;
      if (this.paddlePosition! + this.paddleWidth > this.width!) {
        this.paddlePosition = this.width! - this.paddleWidth;
      }
    }
  }

  drawBricks() {
    this.bricks.forEach((row, i) => {
      row.forEach((brick, j) => {
        if (brick.status === 1) {// Solo dibujamos ladrillos visibles
          this.context.beginPath();
          this.context.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
          const purpleShades = ['#c5f126', '#00eeff', '#56f326']; // Ejemplos
          this.context.fillStyle = purpleShades[Math.floor(Math.random() * purpleShades.length)];
          this.context.fill();
          this.context.closePath();
        }
      });
    });
  }

  drawScore() {
    this.context.font = '20px Arial';
    this.context.fillStyle = 'yellow';
    this.context.fillText(`Score: ${this.score} Highscore: ${this.highScore}`, 8, 20);
  }

  checkWallCollision() {
    if (this.yPosition! + this.yOffset < this.ballRadius) {
      this.yOffset = - this.yOffset;
    } else if (this.yPosition! + this.yOffset > this.height! - this.ballRadius) {
      if (this.xPosition! > this.paddlePosition! && this.xPosition! < this.paddlePosition! + this.paddleWidth) {
        this.yOffset = -this.yOffset;
        this.wallHitSound.play(); // Sonido al chocar con el paddle
      } else {
        clearInterval(this.interval);
        this.gameStatus = 'Game Over!';
        this.gameOn = false;  

        // Configurar estilo del texto
        this.context.font = "50px Arial"; // Tamaño y fuente
        this.context.fillStyle = "yellow"; // Color amarillo

        // Escribir el texto en el centro de la pantalla (aproximadamente)
        this.context.fillText(this.gameStatus, this.width! / 2 - 70, this.height! / 2); 


        if (this.score > this.highScore!) {
          localStorage.setItem('brickBreakerScore', this.score.toString());
          this.highScore = this.score;
        }
        this.gameOverSound.play(); // Sonido al perder el juego
      }
    }
    if (this.xPosition! + this.xOffset < this.ballRadius || this.xPosition! + this.xOffset > this.width! - this.ballRadius) {
      this.xOffset = - this.xOffset;
    }
  }

  checkBrickCollision() {
    this.bricks.forEach((row, i) => {
      row.forEach((brick, j) => {
        if (brick.status === 1 && this.ballCollidesWith(brick)) {
          this.yOffset = -this.yOffset;
          brick.status = 0;
          this.score++;
          this.paddleSound.play(); 
          // ... (lógica de aumento de nivel)
        }
      });
    });
  }

  ballCollidesWith(brick: Brick): boolean {
    return (
      this.xPosition! + this.ballRadius > brick.x &&
      this.xPosition! - this.ballRadius < brick.x + this.brickWidth &&
      this.yPosition! + this.ballRadius > brick.y &&
      this.yPosition! - this.ballRadius < brick.y + this.brickHeight
    );
  } 

  generateBricks() {
    for (let i = 0; i < this.brickRows; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.brickColumns; j++) {
        this.bricks[i][j] = {
          x: i * (this.brickWidth + this.brickPadding) + this.brickOffset,
          y: j * (this.brickHeight + this.brickPadding) + this.brickOffset,
          status: 1
        };
      }
    }
  }

  getHighScore(): number {
    return parseInt(localStorage.getItem('brickBreakerScore') ?? '0', 10);
  }

  resetBallAndPaddle() {
    if (this.width) {
      this.xPosition = this.width / 2;
      this.paddlePosition = (this.width - this.paddleWidth) / 2;
    }
    if (this.height) {
      this.yPosition = this.height - 50;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const key = event.key;
    if ((key === 'ArrowLeft' || key === 'a')) {
      this.movingLeft = true;
    } else if ((key === 'ArrowRight' || key === 'd')) {
      this.movingRight = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent) {
    const key = event.key;
    if ((key === 'ArrowLeft' || key === 'a')) {
      this.movingLeft = false;
    } else if ((key === 'ArrowRight' || key === 'd')) {
      this.movingRight = false;
    }
  }
}
