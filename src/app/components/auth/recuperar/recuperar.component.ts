import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

/**
 * Componente de recuperación de contraseña.
 *
 * Implementa un flujo de tres pasos: (1) verificar que el correo exista
 * entre los usuarios, (2) introducir y confirmar la nueva contraseña y
 * (3) mostrar la confirmación final. El estado del flujo se controla con
 * la propiedad {@link paso}.
 */
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class RecuperarComponent {

  /** Correo introducido por el usuario para recuperar su cuenta. */
  email: string = '';
  /** Nueva contraseña ingresada en el paso 2. */
  nuevaClave: string = '';
  /** Repetición de la nueva contraseña para confirmarla. */
  repetirClave: string = '';

  /** Paso actual del flujo de recuperación (1, 2 o 3). */
  paso: number = 1;
  /** Correo ya verificado como existente, usado en los pasos siguientes. */
  emailVerificado: string = '';
  /** Mensaje de error mostrado si el correo no corresponde a una cuenta. */
  errorEmail: string = '';

  /** Controla la visibilidad del campo de nueva contraseña. */
  mostrarNueva: boolean = false;
  /** Controla la visibilidad del campo de repetir contraseña. */
  mostrarRepetir: boolean = false;

  /**
   * Inyecta las dependencias del componente.
   *
   * @param dataService Servicio de datos usado para verificar el correo.
   */
  constructor(private dataService: DataService) {}

  /**
   * Verifica que el correo introducido corresponda a un usuario existente.
   *
   * Si existe, avanza al paso 2; si no, muestra un mensaje de error.
   */
  verificarEmail(): void {
    this.errorEmail = '';
    const usuarios = this.dataService.getUsuarios();
    const existe = usuarios.find(u => u.email === this.email);
    if (existe) {
      this.emailVerificado = this.email;
      this.paso = 2;
    } else {
      this.errorEmail = 'No encontramos una cuenta asociada a ese correo.';
    }
  }

  /**
   * Confirma el cambio de contraseña y avanza al paso final (paso 3).
   */
  guardarNuevaClave(): void {
    this.paso = 3;
  }

  /**
   * Reinicia el flujo de recuperación volviendo al paso 1 y limpiando los
   * campos introducidos.
   */
  volverAlPaso1(): void {
    this.paso = 1;
    this.email = '';
    this.nuevaClave = '';
    this.repetirClave = '';
    this.errorEmail = '';
  }
}

