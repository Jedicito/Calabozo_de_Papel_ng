import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule], // Faltaba esto
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  textoBuscador: string = '';

  usuarioAEliminar: string = '';
  nombreAEliminar: string = '';
  mostrarModalEliminar: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarios = this.dataService.getUsuarios();
    this.usuariosFiltrados = [...this.usuarios];
  }

  filtrar(): void {
    const texto = this.textoBuscador.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.usuario.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  }

  confirmarEliminar(usuario: Usuario): void {
    this.usuarioAEliminar = usuario.usuario;
    this.nombreAEliminar = usuario.nombre;
    this.mostrarModalEliminar = true;
  }

  eliminarUsuario(): void {
    this.dataService.eliminarUsuario(this.usuarioAEliminar);
    this.mostrarModalEliminar = false;
    this.cargarUsuarios();
  }

  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioAEliminar = '';
    this.nombreAEliminar = '';
  }
}

