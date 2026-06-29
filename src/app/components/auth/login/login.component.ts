import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

/**
 * Componente de inicio de sesión.
 *
 * Presenta un formulario (basado en plantilla con `ngModel`) que delega la
 * validación de credenciales en {@link AuthService}. Ante un acceso
 * correcto redirige a la página de inicio; si falla, muestra un mensaje de
 * error.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class LoginComponent {

  /** Nombre de usuario o correo introducido en el formulario. */
  usuario: string = '';
  /** Contraseña introducida en el formulario. */
  contrasena: string = '';
  /** Mensaje de error mostrado al usuario cuando el login falla. */
  errorGeneral: string = '';
  /** Controla si la contraseña se muestra en texto plano o enmascarada. */
  mostrarContrasena: boolean = false;

  /**
   * Inyecta las dependencias del componente.
   *
   * @param authService Servicio que valida las credenciales.
   * @param router Router usado para redirigir tras un login exitoso.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Procesa el envío del formulario de inicio de sesión.
   *
   * Verifica que los campos estén completos, intenta autenticar mediante
   * {@link AuthService.login} y redirige al inicio si tiene éxito; en caso
   * contrario actualiza {@link errorGeneral} con el mensaje pertinente.
   */
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

  /**
   * Alterna la visibilidad de la contraseña en el campo del formulario.
   */
  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

