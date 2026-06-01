import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home'; // El que acabas de crear

export const routes: Routes = [
  { path: '', component: HomeComponent },    // ESTO hace que la heladería se vea al principio
  { path: 'login', component: LoginComponent } // ESTO hace que cambie al login
];