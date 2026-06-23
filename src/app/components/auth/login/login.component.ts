import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  errorGeneral: string = '';
  mostrarContrasena: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorGeneral = '';
    if (!this.usuario || !this.contrasena) {
      this.errorGeneral = 'Por favor completa todos los campos.';
      return;
    }
    const exito = this.authService.login(this.usuario, this.contrasena);
    if (exito) {
      this.router.navigate(['/']);
    } else {
      this.errorGeneral = 'Usuario o contraseña incorrectos.';
    }
  }

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

