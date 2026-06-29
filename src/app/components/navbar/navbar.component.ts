import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

/**
 * Componente de la barra de navegación principal.
 *
 * Muestra los enlaces del menú y, según el estado de sesión y el rol del
 * usuario (consultados a {@link AuthService}), las opciones disponibles.
 * Permite además cerrar la sesión.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // Importaciones necesarias para su HTML
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  /**
   * @param authService Servicio de sesión; público para consultarse desde
   *   la plantilla (estado de login y rol).
   * @param router Router usado para redirigir tras cerrar sesión.
   */
  constructor(public authService: AuthService, private router: Router) {}

  /**
   * Cierra la sesión del usuario y redirige a la página de inicio.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}