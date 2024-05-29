import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {BuscaminasComponent} from '../components/buscaminas/buscaminas.component'
import {AjedrezComponent} from '../components/ajedrez/ajedrez.component'
import {LaberintoComponent} from '../components/laberinto/laberinto.component'
import { BrickBreakerComponent } from '../components/brick-breaker/brick-breaker.component';

export const routes: Routes = [
  { path: 'buscaminas', component: BuscaminasComponent },
  { path: 'ajedrez', component: AjedrezComponent },
  { path: 'laberinto', component: LaberintoComponent },
  { path: 'brickbreaker', component: BrickBreakerComponent},
  
];
