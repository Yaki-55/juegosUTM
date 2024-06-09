import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {BuscaminasComponent} from '../components/buscaminas/buscaminas.component'
import {AjedrezComponent} from '../components/ajedrez/ajedrez.component'
import {LaberintoComponent} from '../components/laberinto/laberinto.component'
import { BrickBreakerComponent } from '../components/brick-breaker/brick-breaker.component';
import { LaberintoN1Component } from '../components/laberinto-n1/laberinto-n1.component';
import { LaberintoN2Component } from '../components/laberinto-n2/laberinto-n2.component';
import { LaberintoN3Component } from '../components/laberinto-n3/laberinto-n3.component';

export const routes: Routes = [
  { path: 'buscaminas', component: BuscaminasComponent },
  { path: 'ajedrez', component: AjedrezComponent },
  { path: 'laberinto', component: LaberintoComponent },
  { path: 'brickbreaker', component: BrickBreakerComponent},
  { path: 'laberintoN1', component: LaberintoN1Component },
  { path: 'laberintoN2', component: LaberintoN2Component },
  { path: 'laberintoN3', component: LaberintoN3Component },
];
