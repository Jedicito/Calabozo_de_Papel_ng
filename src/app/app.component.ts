import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
//import { FooterComponent } from './components/footer/footer.component';

/**
 * Componente raíz de la aplicación.
 *
 * Es el componente que se arranca en `main.ts`. Compone el layout principal
 * incluyendo la barra de navegación ({@link NavbarComponent}) y el
 * `RouterOutlet` donde se renderizan las distintas páginas según la ruta.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], //, FooterComponent
  templateUrl: './app.component.html'
  //styleUrl: './app.component.css'
})
export class AppComponent {
  /** Título identificador de la aplicación. */
  title = 'calabozo-de-papel-ng';
}