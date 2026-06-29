import { Component } from '@angular/core';

/**
 * Componente de pie de página.
 *
 * Componente de presentación sin lógica: muestra la marca y el aviso de
 * derechos reservados mediante una plantilla en línea.
 */
@Component({
  selector: 'app-footer',
  template: `
    <footer class="site-footer" role="contentinfo">
      <p class="footer-brand">⚔ El Calabozo de Papel</p>
      <p class="footer-text">Catálogo de Juegos de Mesa &mdash; Todos los derechos reservados &copy; 2025</p>
    </footer>
  `
})
export class FooterComponent {}

