import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Juego } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class DetalleJuegoComponent implements OnInit {

  juego: Juego | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.juego = this.dataService.getJuegoById(id);
    });
  }

  volver(): void {
    if (this.juego) {
      this.router.navigate(['/categoria', this.juego.categoria]);
    } else {
      this.router.navigate(['/']);
    }
  }

  formatearPrecio(precio: number): string {
    return this.dataService.formatearPrecio(precio);
  }
}

