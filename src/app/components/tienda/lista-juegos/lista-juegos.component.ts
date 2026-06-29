import { Component, Input } from '@angular/core'; // <- Cambiamos OnInit por Input
import { Router, RouterModule } from '@angular/router'; // <- Quitamos ActivatedRoute
import { DataService } from '../../../services/data.service';
import { Juego, Categoria } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

/**
 * Componente que lista los juegos de una categoría.
 *
 * Recibe el slug de la categoría como parámetro de ruta a través de un
 * setter con `@Input` (binding de rutas de Angular) y carga la categoría y
 * sus juegos desde {@link DataService}.
 */
@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListaJuegosComponent {

  /** Categoría actualmente mostrada, o `undefined` si el slug no existe. */
  categoria: Categoria | undefined;
  /** Juegos pertenecientes a la categoría actual. */
  juegos: Juego[] = [];

  /**
   * Inyecta las dependencias del componente.
   *
   * @param router Router usado para navegar al detalle de un juego.
   * @param dataService Servicio de datos del catálogo.
   */
  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  /**
   * Setter enlazado al parámetro de ruta `:nombre`. Angular lo invoca
   * automáticamente cada vez que cambia la categoría seleccionada,
   * sustituyendo la lógica que tradicionalmente iría en `ngOnInit`.
   *
   * @param slug Slug de la categoría tomado de la URL.
   */
  @Input() set nombre(slug: string) {
    if (slug) {
      this.categoria = this.dataService.getCategoriaBySlug(slug);
      const juegosEncontrados = this.dataService.getJuegosPorCategoria(slug);
      
      // Mantenemos la clonación para forzar al HTML a redibujar
      this.juegos = [...juegosEncontrados];
    }
  }

  /**
   * Navega a la página de detalle del juego indicado.
   *
   * @param id Identificador del juego a mostrar.
   */
  verDetalle(id: number): void {
    this.router.navigate(['/juego', id]);
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