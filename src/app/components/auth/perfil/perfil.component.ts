import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule], // Faltaba esto
})
export class PerfilComponent implements OnInit {

  nombre: string = '';
  usuario: string = '';
  email: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';

  claveActual: string = '';
  claveNueva: string = '';
  claveRepetir: string = '';

  mostrarActual: boolean = false;
  mostrarNueva: boolean = false;
  mostrarRepetir: boolean = false;

  mensajeExito: string = '';

  constructor(public authService: AuthService) {}

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

  cancelar(): void {
    this.ngOnInit();
    this.mensajeExito = '';
  }
}

