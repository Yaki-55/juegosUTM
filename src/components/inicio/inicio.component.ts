import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {
  private One: boolean = true
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.createParticles();
    
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

  createParticles(): void {
    const container = this.el.nativeElement.querySelector('.animated-bg');
    if (container) {
      for (let i = 0; i < 100; i++) {
        const particle = this.renderer.createElement('div');
        this.renderer.addClass(particle, 'particle');
        this.renderer.setStyle(particle, 'top', `${Math.random() * 100}vh`);
        this.renderer.setStyle(particle, 'left', `${Math.random() * 100}vw`);
        this.renderer.setStyle(particle, 'animation-duration', `${Math.random() * 10 + 5}s`);
        this.renderer.setStyle(particle, 'animation-delay', `${Math.random() * 5}s`);
        this.renderer.setStyle(particle, '--direction', Math.random() > 0.5 ? '1' : '-1');
        this.renderer.appendChild(container, particle);
      }
    } else {
      console.error('Contenedor .animated-bg no encontrado');
    }
  }
}
