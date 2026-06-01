import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // 1. Agregá RouterModule aquí

@Component({
  selector: 'app-root',
  standalone: true, // Asegurate de que tenga esto si es un componente único
  imports: [RouterOutlet, RouterModule], // 2. Agregalo a la lista de imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('heladeria-app');
}