import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual: Usuario | null = null;

  constructor(private dataService: DataService) {}

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

  logout(): void {
    this.usuarioActual = null;
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }

  esAdmin(): boolean {
    return this.usuarioActual?.tipoUsuario === 'admin';
  }
}
