import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common'; // Obligatorio para *ngIf y *ngFor
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'; // Formularios reactivos

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Se reemplaza FormsModule por ReactiveFormsModule
})
export class RegistroComponent {

  registroForm: FormGroup;

  mostrarContrasena: boolean = false;
  mostrarRepetir: boolean = false;
  registroExitoso: boolean = false;
  usuarioCreado: string = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        usuario: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            RegistroComponent.contrasenaSeguraValidator,
          ],
        ],
        repetirContrasena: ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, RegistroComponent.edadMinimaValidator(13)]],
        direccion: [''], // Opcional: sin validadores
      },
      { validators: RegistroComponent.contrasenasIgualesValidator }
    );
  }

  // Acceso rápido a los controles desde el HTML
  get f() {
    return this.registroForm.controls;
  }

  // Validador: la contraseña debe tener al menos una mayúscula y al menos un número
  static contrasenaSeguraValidator(control: AbstractControl): ValidationErrors | null {
    const valor: string = control.value || '';
    if (!valor) {
      return null; // 'required' se encarga del campo vacío
    }
    const tieneMayuscula = /[A-Z]/.test(valor);
    const tieneNumero = /[0-9]/.test(valor);
    return tieneMayuscula && tieneNumero ? null : { contrasenaInsegura: true };
  }

  // Validador con parámetro: la persona debe tener al menos 'min' años
  static edadMinimaValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // 'required' se encarga del campo vacío
      }
      const nacimiento = new Date(control.value);
      if (isNaN(nacimiento.getTime())) {
        return { fechaInvalida: true };
      }
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad >= min ? null : { edadMinima: true };
    };
  }

  // Validador a nivel de grupo: las dos contraseñas deben ser iguales
  static contrasenasIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const contrasena = group.get('contrasena')?.value;
    const repetir = group.get('repetirContrasena')?.value;
    if (!repetir) {
      return null; // 'required' se encarga del campo vacío
    }
    return contrasena === repetir ? null : { contrasenasNoCoinciden: true };
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched(); // Muestra los errores en pantalla
      return;
    }

    const datos = this.registroForm.value;
    const nuevoUsuario: Usuario = {
      nombre: datos.nombre,
      usuario: datos.usuario,
      email: datos.email,
      contrasena: datos.contrasena,
      tipoUsuario: 'cliente',
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion,
    };
    this.dataService.registrarUsuario(nuevoUsuario);
    this.usuarioCreado = datos.usuario;
    this.registroExitoso = true;
    this.limpiar();
  }

  limpiar(): void {
    this.registroForm.reset();
  }

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleRepetir(): void {
    this.mostrarRepetir = !this.mostrarRepetir;
  }
}
