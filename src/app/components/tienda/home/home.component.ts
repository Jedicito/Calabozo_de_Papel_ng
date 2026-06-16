import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Categoria } from '../../../models/juego.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]
import { RouterModule } from '@angular/router'; // Obligatorio para [routerLink]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterModule], // Faltaba esto
})
export class HomeComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.categorias = this.dataService.getCategorias();
  }
}

