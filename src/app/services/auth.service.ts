import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { DataService } from './data.service';

/**
 * Servicio de autenticación y manejo de sesión.
 *
 * Gestiona el inicio y cierre de sesión validando las credenciales contra
 * los usuarios provistos por {@link DataService}, y mantiene en memoria al
 * usuario actualmente autenticado para controlar el acceso según su rol.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Usuario con la sesión iniciada actualmente, o `null` si no hay sesión. */
  private usuarioActual: Usuario | null = null;

  /**
   * @param dataService Servicio de datos del que se obtiene la lista de
   *   usuarios para validar las credenciales.
   */
  constructor(private dataService: DataService) {}

  /**
   * Valida las credenciales e inicia la sesión si son correctas.
   *
   * Acepta indistintamente el nombre de usuario o el correo electrónico.
   *
   * @param usernameOrEmail Nombre de usuario o correo de la cuenta.
   * @param contrasena Contraseña de la cuenta.
   * @returns `true` si las credenciales son válidas e inicia sesión;
   *   `false` en caso contrario.
   */
  login(usernameOrEmail: string, contrasena: string): boolean {
    const usuarios = this.dataService.getUsuarios();
    const encontrado = usuarios.find(
      u => (u.usuario === usernameOrEmail || u.email === usernameOrEmail) && u.contrasena === contrasena
    );
    if (encontrado) {
      this.usuarioActual = encontrado;
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión actual, descartando al usuario autenticado.
   */
  logout(): void {
    this.usuarioActual = null;
  }

  /**
   * Obtiene el usuario con la sesión iniciada.
   *
   * @returns El {@link Usuario} autenticado, o `null` si no hay sesión.
   */
  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  /**
   * Indica si existe una sesión activa.
   *
   * @returns `true` si hay un usuario autenticado; `false` si no.
   */
  estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }

  /**
   * Indica si el usuario autenticado tiene rol de administrador.
   *
   * @returns `true` si hay sesión y el rol es `'admin'`; `false` si no.
   */
  esAdmin(): boolean {
    return this.usuarioActual?.tipoUsuario === 'admin';
  }
}
