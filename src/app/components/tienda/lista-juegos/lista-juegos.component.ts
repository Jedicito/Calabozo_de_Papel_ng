import { Component, Input } from '@angular/core'; // <- Cambiamos OnInit por Input
import { Router, RouterModule } from '@angular/router'; // <- Quitamos ActivatedRoute
import { DataService } from '../../../services/data.service';
import { Juego, Categoria } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListaJuegosComponent {

  categoria: Categoria | undefined;
  juegos: Juego[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  // Este bloque reemplaza por completo al ngOnInit.
  // Angular detecta que la ruta tiene un parámetro ":nombre" y se lo inyecta 
  // automáticamente a esta función cada vez que haces clic en el Navbar.
  @Input() set nombre(slug: string) {
    if (slug) {
      this.categoria = this.dataService.getCategoriaBySlug(slug);
      const juegosEncontrados = this.dataService.getJuegosPorCategoria(slug);
      
      // Mantenemos la clonación para forzar al HTML a redibujar
      this.juegos = [...juegosEncontrados];
    }
  }

  verDetalle(id: number): void {
    this.router.navigate(['/juego', id]);
  }

  formatearPrecio(precio: number): string {
    return this.dataService.formatearPrecio(precio);
  }
}