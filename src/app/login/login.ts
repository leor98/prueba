import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // <-- Agregamos esto para manejar los inputs

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], // <-- Lo declaramos acá también
  templateUrl: './login.html', 
  styleUrls: ['./login.css']    
})
export class LoginComponent {
  
  public mode: string = 'initial'; 

  // Creamos estas variables para guardar lo que escriba el usuario
  public usernameField: string = '';
  public passwordField: string = '';

  constructor() {}

  changeMode(newMode: string): void {
    this.mode = newMode;
  }

  // FUNCIÓN PRO: Esta función manda los datos a tu PHP
  async iniciarSesion(event: Event): Promise<void> {
    event.preventDefault(); // Evita que la página se recargue

    const datosLogin = {
      username: this.usernameField,
      password: this.passwordField
    };

    try {
      // Le pegamos directo a tu archivo de XAMPP
      const response = await fetch('http://localhost/sistema-ventas/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosLogin)
      });

      const resultado = await response.json();

      if (response.ok) {
        alert('¡Login correcto! Bienvenido ' + resultado.username);
        // Acá el de Angular puede redirigir al Home del sistema
      } else {
        alert('Error: ' + resultado.mensaje);
      }

    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor backend.');
    }
  }
}