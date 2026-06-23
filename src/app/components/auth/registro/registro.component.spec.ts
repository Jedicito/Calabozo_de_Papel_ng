import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent],
      providers: [provideRouter([])], // Router necesario por el constructor del componente
    }).compileComponents();

    const fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
  });

  // Prueba 1: validación de seguridad de la contraseña
  // (mínimo 6 caracteres, al menos una mayúscula y al menos un número)
  it('debe marcar la contraseña como inválida si no tiene mayúscula y número, y válida cuando los cumple', () => {
    const contrasena = component.registroForm.get('contrasena')!;

    // Sin mayúscula ni número -> inválida
    contrasena.setValue('abcdef');
    expect(contrasena.valid).toBe(false);
    expect(contrasena.errors?.['contrasenaInsegura']).toBe(true);

    // Demasiado corta -> inválida por minlength
    contrasena.setValue('Ab1');
    expect(contrasena.hasError('minlength')).toBe(true);

    // Cumple longitud, mayúscula y número -> válida
    contrasena.setValue('Abc123');
    expect(contrasena.valid).toBe(true);
  });

  // Prueba 2: validación de edad mínima (la persona no puede tener menos de 13 años)
  it('debe rechazar fechas de nacimiento de menores de 13 años y aceptar 13 o más', () => {
    const fecha = component.registroForm.get('fechaNacimiento')!;
    const hoy = new Date();

    // Persona de 10 años -> inválida
    const hace10 = new Date(hoy.getFullYear() - 10, hoy.getMonth(), hoy.getDate());
    fecha.setValue(hace10.toISOString().split('T')[0]);
    expect(fecha.errors?.['edadMinima']).toBe(true);

    // Persona de 20 años -> válida
    const hace20 = new Date(hoy.getFullYear() - 20, hoy.getMonth(), hoy.getDate());
    fecha.setValue(hace20.toISOString().split('T')[0]);
    expect(fecha.valid).toBe(true);
  });
});
