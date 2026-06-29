import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

/**
 * Componente de modificación de perfil del usuario autenticado.
 *
 * Al inicializarse carga los datos del usuario actual desde
 * {@link AuthService} en los campos del formulario y permite guardar los
 * cambios o cancelarlos restaurando los valores originales.
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule], // Faltaba esto
})
export class PerfilComponent implements OnInit {

  /** Nombre completo editable del usuario. */
  nombre: string = '';
  /** Nombre de usuario (solo lectura en el formulario). */
  usuario: string = '';
  /** Correo electrónico editable del usuario. */
  email: string = '';
  /** Fecha de nacimiento editable, en formato `YYYY-MM-DD`. */
  fechaNacimiento: string = '';
  /** Dirección de despacho editable del usuario. */
  direccion: string = '';

  /** Contraseña actual ingresada para validar el cambio de clave. */
  claveActual: string = '';
  /** Nueva contraseña ingresada por el usuario. */
  claveNueva: string = '';
  /** Repetición de la nueva contraseña para confirmarla. */
  claveRepetir: string = '';

  /** Controla la visibilidad del campo de contraseña actual. */
  mostrarActual: boolean = false;
  /** Controla la visibilidad del campo de nueva contraseña. */
  mostrarNueva: boolean = false;
  /** Controla la visibilidad del campo de repetir contraseña. */
  mostrarRepetir: boolean = false;

  /** Mensaje de confirmación mostrado tras guardar los cambios. */
  mensajeExito: string = '';

  /**
   * @param authService Servicio que provee el usuario autenticado y sus
   *   datos. Es público para poder consultarse desde la plantilla.
   */
  constructor(public authService: AuthService) {}

  /**
   * Hook de inicialización: carga los datos del usuario actual en los
   * campos del formulario.
   */
  ngOnInit(): void {
    const u = this.authService.getUsuarioActual();
    if (u) {
      this.nombre = u.nombre;
      this.usuario = u.usuario;
      this.email = u.email;
      this.fechaNacimiento = u.fechaNacimiento || '';
      this.direccion = u.direccion || '';
    }
  }

  /**
   * Guarda en el usuario autenticado los cambios realizados en el
   * formulario y muestra un mensaje de confirmación.
   */
  guardarCambios(): void {
    const u = this.authService.getUsuarioActual();
    if (u) {
      u.nombre = this.nombre;
      u.email = this.email;
      u.fechaNacimiento = this.fechaNacimiento;
      u.direccion = this.direccion;
      this.mensajeExito = '✔ Cambios guardados exitosamente.';
    }
  }

  /**
   * Descarta los cambios recargando los datos originales del usuario.
   */
  cancelar(): void {
    this.ngOnInit();
    this.mensajeExito = '';
  }
}

