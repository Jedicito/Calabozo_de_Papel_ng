import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    // DataService es un singleton real con usuarios precargados; se usa tal cual.
    TestBed.configureTestingModule({
      providers: [AuthService, DataService],
    });
    service = TestBed.inject(AuthService);
  });

  // Prueba 3: el login distingue credenciales correctas de incorrectas
  it('debe iniciar sesión con credenciales válidas y rechazar las inválidas', () => {
    // Credenciales correctas del administrador precargado -> true
    expect(service.login('admin', 'Admin123!')).toBe(true);
    expect(service.estaLogueado()).toBe(true);
    expect(service.getUsuarioActual()?.usuario).toBe('admin');

    // También debe aceptar el correo como identificador
    expect(service.login('cesar@correo.cl', 'Cesar123!')).toBe(true);

    // Contraseña incorrecta -> false
    expect(service.login('admin', 'claveErrada')).toBe(false);
  });

  // Prueba 4: esAdmin() refleja correctamente el rol del usuario en sesión
  it('debe identificar el rol de administrador y limpiar la sesión al cerrarla', () => {
    // El admin tiene rol 'admin'
    service.login('admin', 'Admin123!');
    expect(service.esAdmin()).toBe(true);

    // Un cliente NO es admin
    service.login('Cesar', 'Cesar123!');
    expect(service.esAdmin()).toBe(false);

    // Tras cerrar sesión no hay usuario ni privilegios
    service.logout();
    expect(service.estaLogueado()).toBe(false);
    expect(service.esAdmin()).toBe(false);
  });
});
