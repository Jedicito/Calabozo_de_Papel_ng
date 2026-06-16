import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule], // Faltaba esto
})
export class RegistroComponent {

  nombre: string = '';
  usuario: string = '';
  email: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';

  mostrarContrasena: boolean = false;
  mostrarRepetir: boolean = false;
  registroExitoso: boolean = false;
  usuarioCreado: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit(): void {
    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      usuario: this.usuario,
      email: this.email,
      contrasena: this.contrasena,
      tipoUsuario: 'cliente',
      fechaNacimiento: this.fechaNacimiento,
      direccion: this.direccion
    };
    this.dataService.registrarUsuario(nuevoUsuario);
    this.usuarioCreado = this.usuario;
    this.registroExitoso = true;
    this.limpiar();
  }

  limpiar(): void {
    this.nombre = '';
    this.usuario = '';
    this.email = '';
    this.contrasena = '';
    this.repetirContrasena = '';
    this.fechaNacimiento = '';
    this.direccion = '';
  }

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleRepetir(): void {
    this.mostrarRepetir = !this.mostrarRepetir;
  }
}

