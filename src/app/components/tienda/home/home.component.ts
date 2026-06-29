import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Categoria } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]
import { RouterModule } from '@angular/router'; // Obligatorio para [routerLink]

/**
 * Componente de la página de inicio de la tienda.
 *
 * Muestra las categorías disponibles obtenidas desde {@link DataService}
 * como portadas de acceso al catálogo.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterModule], // Faltaba esto
})
export class HomeComponent implements OnInit {

  /** Categorías que se muestran como portadas en la página de inicio. */
  categorias: Categoria[] = [];

  /**
   * Inyecta las dependencias del componente.
   *
   * @param dataService Servicio de datos del que se obtienen las categorías.
   */
  constructor(private dataService: DataService) {}

  /**
   * Hook de inicialización: carga las categorías del catálogo.
   */
  ngOnInit(): void {
    this.categorias = this.dataService.getCategorias();
  }
}

