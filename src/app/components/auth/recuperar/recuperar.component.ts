import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';   // Obligatorio para [(ngModel)]

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  standalone: true, // Faltaba esto
  imports: [CommonModule, FormsModule, RouterLink], // Faltaba esto
})
export class RecuperarComponent {

  email: string = '';
  nuevaClave: string = '';
  repetirClave: string = '';

  paso: number = 1;
  emailVerificado: string = '';
  errorEmail: string = '';

  mostrarNueva: boolean = false;
  mostrarRepetir: boolean = false;

  constructor(private dataService: DataService) {}

  verificarEmail(): void {
    this.errorEmail = '';
    const usuarios = this.dataService.getUsuarios();
    const existe = usuarios.find(u => u.email === this.email);
    if (existe) {
      this.emailVerificado = this.email;
      this.paso = 2;
    } else {
      this.errorEmail = 'No encontramos una cuenta asociada a ese correo.';
    }
  }

  guardarNuevaClave(): void {
    this.paso = 3;
  }

  volverAlPaso1(): void {
    this.paso = 1;
    this.email = '';
    this.nuevaClave = '';
    this.repetirClave = '';
    this.errorEmail = '';
  }
}

