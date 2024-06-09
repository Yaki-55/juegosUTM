import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laberinto',
  standalone: true,
  imports: [],
  templateUrl: './laberinto.component.html',
  styleUrl: './laberinto.component.css'
})
export class LaberintoComponent {
  constructor(private router: Router) {}
  /*
  navigateToNivel1() {
    this.router.navigate(['/laberinto/laberintoN1']);
  }

  navigateToNivel2() {
    this.router.navigate(['/laberinto/laberintoN2']);
  }

  navigateToNivel3() {
    this.router.navigate(['/laberinto/laberintoN3']);
  } 
  */
  navigateToNivel1() {
    this.router.navigate(['/laberintoN1']);
  }

  navigateToNivel2() {
    this.router.navigate(['/laberintoN2']);
  }

  navigateToNivel3() {
    this.router.navigate(['/laberintoN3']);
  } 
}
