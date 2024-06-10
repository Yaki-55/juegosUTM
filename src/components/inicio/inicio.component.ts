import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Opcional: Redirige automáticamente a /laberinto
    // this.router.navigate(['/laberinto']);
  }

  redirectToLaberinto(): void {
    this.router.navigate(['/laberinto']);
  }

  redirectToBuscaminas(): void {
    this.router.navigate(['/buscaminas']);
  }

  redirectToAjedrez(): void {
    this.router.navigate(['/ajedrez']);
  }

  redirectToBrickBreaker(): void {
    this.router.navigate(['/brickbreaker']);
  }

  redirectToLaberintoN1(): void {
    this.router.navigate(['/laberintoN1']);
  }

  redirectToLaberintoN2(): void {
    this.router.navigate(['/laberintoN2']);
  }

  redirectToLaberintoN3(): void {
    this.router.navigate(['/laberintoN3']);
  }

  redirectToHeroDetail(): void {
    this.router.navigate(['/hero-detail']);
  }
}

