import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Para que funcione el routerLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // <--- Agregalo aquí también
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent { }