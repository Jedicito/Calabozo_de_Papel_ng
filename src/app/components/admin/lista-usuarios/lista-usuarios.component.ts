import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

/**
 * Componente del mantenedor de usuarios (vista de administrador).
 *
 * Lista los usuarios registrados, permite filtrarlos por nombre, usuario o
 * correo, y eliminarlos mediante un modal de confirmación. Es una de las
 * vistas exclusivas del rol `'admin'`.
 */
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule], // Faltaba esto
})
export class ListaUsuariosComponent implements OnInit {

  /** Lista completa de usuarios cargada desde el servicio. */
  usuarios: Usuario[] = [];
  /** Subconjunto de {@link usuarios} que coincide con el filtro actual. */
  usuariosFiltrados: Usuario[] = [];
  /** Texto introducido en el buscador para filtrar la lista. */
  textoBuscador: string = '';

  /** Nombre de usuario seleccionado para eliminar (pendiente de confirmar). */
  usuarioAEliminar: string = '';
  /** Nombre completo del usuario a eliminar, mostrado en el modal. */
  nombreAEliminar: string = '';
  /** Controla la visibilidad del modal de confirmación de eliminación. */
  mostrarModalEliminar: boolean = false;

  /**
   * Inyecta las dependencias del componente.
   *
   * @param dataService Servicio de datos con las operaciones sobre usuarios.
   */
  constructor(private dataService: DataService) {}

  /**
   * Hook de inicialización: carga la lista de usuarios.
   */
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * Carga (o recarga) la lista de usuarios desde el servicio y reinicia el
   * listado filtrado.
   */
  cargarUsuarios(): void {
    this.usuarios = this.dataService.getUsuarios();
    this.usuariosFiltrados = [...this.usuarios];
  }

  /**
   * Filtra la lista de usuarios según {@link textoBuscador}, comparando
   * contra el nombre, el usuario y el correo (sin distinguir mayúsculas).
   */
  filtrar(): void {
    const texto = this.textoBuscador.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.usuario.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  }

  /**
   * Prepara la eliminación de un usuario y abre el modal de confirmación.
   *
   * @param usuario Usuario que se desea eliminar.
   */
  confirmarEliminar(usuario: Usuario): void {
    this.usuarioAEliminar = usuario.usuario;
    this.nombreAEliminar = usuario.nombre;
    this.mostrarModalEliminar = true;
  }

  /**
   * Elimina definitivamente el usuario seleccionado, cierra el modal y
   * recarga la lista.
   */
  eliminarUsuario(): void {
    this.dataService.eliminarUsuario(this.usuarioAEliminar);
    this.mostrarModalEliminar = false;
    this.cargarUsuarios();
  }

  /**
   * Cancela la eliminación pendiente y cierra el modal de confirmación.
   */
  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioAEliminar = '';
    this.nombreAEliminar = '';
  }
}

