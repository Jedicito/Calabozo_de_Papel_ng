import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Juego } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

/**
 * Componente de detalle de un juego.
 *
 * Lee el identificador del juego desde los parámetros de la ruta, obtiene
 * sus datos de {@link DataService} y permite volver a la categoría
 * correspondiente.
 */
@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class DetalleJuegoComponent implements OnInit {

  /** Juego que se está mostrando, o `undefined` si el id no existe. */
  juego: Juego | undefined;

  /**
   * Inyecta las dependencias del componente.
   *
   * @param route Ruta activa de la que se obtiene el parámetro `id`.
   * @param router Router usado para la navegación de regreso.
   * @param dataService Servicio de datos del catálogo.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  /**
   * Hook de inicialización: se suscribe a los parámetros de la ruta y carga
   * el juego correspondiente al `id` recibido.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.juego = this.dataService.getJuegoById(id);
    });
  }

  /**
   * Vuelve a la lista de la categoría del juego actual; si no hay juego
   * cargado, redirige a la página de inicio.
   */
  volver(): void {
    if (this.juego) {
      this.router.navigate(['/categoria', this.juego.categoria]);
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Da formato de moneda a un precio, delegando en {@link DataService}.
   *
   * @param precio Precio sin formato.
   * @returns Precio formateado como moneda chilena.
   */
  formatearPrecio(precio: number): string {
    return this.dataService.formatearPrecio(precio);
  }
}

