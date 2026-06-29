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

/**
 * Componente de registro de nuevos usuarios.
 *
 * Usa formularios reactivos con validaciones a nivel de campo y de grupo:
 * exige nombre, usuario, correo válido, contraseña segura (longitud,
 * mayúscula y número), confirmación de contraseña coincidente y una edad
 * mínima a partir de la fecha de nacimiento. Al validar correctamente,
 * delega el alta en {@link DataService}.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Se reemplaza FormsModule por ReactiveFormsModule
})
export class RegistroComponent {

  /** Formulario reactivo con todos los campos y validadores del registro. */
  registroForm: FormGroup;

  /** Controla la visibilidad del campo de contraseña. */
  mostrarContrasena: boolean = false;
  /** Controla la visibilidad del campo de repetir contraseña. */
  mostrarRepetir: boolean = false;
  /** Indica si el último registro se completó con éxito (muestra el aviso). */
  registroExitoso: boolean = false;
  /** Nombre de usuario recién creado, usado en el mensaje de éxito. */
  usuarioCreado: string = '';

  /**
   * Construye el formulario reactivo y registra todos sus validadores.
   *
   * @param fb Constructor de formularios reactivos.
   * @param dataService Servicio donde se persiste el nuevo usuario.
   * @param router Router de la aplicación (navegación posterior al alta).
   */
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

  /**
   * Acceso rápido a los controles del formulario desde la plantilla HTML.
   *
   * @returns El diccionario de controles de {@link registroForm}.
   */
  get f() {
    return this.registroForm.controls;
  }

  /**
   * Validador de contraseña segura: exige al menos una letra mayúscula y
   * al menos un número. El requisito de longitud lo cubren otros
   * validadores (`minLength`/`maxLength`).
   *
   * @param control Control de la contraseña a validar.
   * @returns `null` si es válida; `{ contrasenaInsegura: true }` si no.
   */
  static contrasenaSeguraValidator(control: AbstractControl): ValidationErrors | null {
    const valor: string = control.value || '';
    if (!valor) {
      return null; // 'required' se encarga del campo vacío
    }
    const tieneMayuscula = /[A-Z]/.test(valor);
    const tieneNumero = /[0-9]/.test(valor);
    return tieneMayuscula && tieneNumero ? null : { contrasenaInsegura: true };
  }

  /**
   * Crea un validador que exige una edad mínima a partir de la fecha de
   * nacimiento indicada en el control.
   *
   * @param min Edad mínima requerida en años.
   * @returns Una {@link ValidatorFn} que devuelve `null` si cumple la edad,
   *   `{ edadMinima: true }` si es menor, o `{ fechaInvalida: true }` si la
   *   fecha no es válida.
   */
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

  /**
   * Validador a nivel de grupo: comprueba que la contraseña y su
   * repetición coincidan.
   *
   * @param group Grupo del formulario que contiene ambos controles.
   * @returns `null` si coinciden (o aún no se repite); en caso contrario
   *   `{ contrasenasNoCoinciden: true }`.
   */
  static contrasenasIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const contrasena = group.get('contrasena')?.value;
    const repetir = group.get('repetirContrasena')?.value;
    if (!repetir) {
      return null; // 'required' se encarga del campo vacío
    }
    return contrasena === repetir ? null : { contrasenasNoCoinciden: true };
  }

  /**
   * Procesa el envío del formulario de registro.
   *
   * Si el formulario es inválido marca los campos como tocados para mostrar
   * los errores. Si es válido, arma el objeto {@link Usuario}, lo registra
   * mediante {@link DataService.registrarUsuario} y limpia el formulario.
   */
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

  /**
   * Restablece el formulario a su estado inicial vacío.
   */
  limpiar(): void {
    this.registroForm.reset();
  }

  /**
   * Alterna la visibilidad del campo de contraseña.
   */
  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  /**
   * Alterna la visibilidad del campo de repetir contraseña.
   */
  toggleRepetir(): void {
    this.mostrarRepetir = !this.mostrarRepetir;
  }
}
