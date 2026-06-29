import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { Usuario } from '../models/usuario.model';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataService] });
    service = TestBed.inject(DataService);
  });

  // Prueba 5: consultas del catálogo (búsqueda por id y filtro por categoría)
  it('debe buscar un juego por id y filtrar los juegos por categoría', () => {
    // Búsqueda por id existente
    const catan = service.getJuegoById(1);
    expect(catan).toBeDefined();
    expect(catan?.nombre).toBe('Catan');

    // Id inexistente -> undefined
    expect(service.getJuegoById(999)).toBeUndefined();

    // Todos los juegos filtrados deben pertenecer a la categoría pedida
    const estrategia = service.getJuegosPorCategoria('estrategia');
    expect(estrategia.length).toBeGreaterThan(0);
    expect(estrategia.every(j => j.categoria === 'estrategia')).toBe(true);
  });

  // Prueba 6: el formato de precio usa separador de miles chileno y prefijo '$'
  it('debe formatear los precios como moneda chilena (CLP)', () => {
    expect(service.formatearPrecio(34990)).toBe('$34.990');
    expect(service.formatearPrecio(1000000)).toBe('$1.000.000');
  });

  // Prueba 7: registrar y eliminar usuarios modifica correctamente la colección
  it('debe registrar un usuario nuevo y luego eliminarlo de la lista', () => {
    const totalInicial = service.getUsuarios().length;

    const nuevo: Usuario = {
      nombre: 'Usuario Prueba',
      usuario: 'pruebaQA',
      email: 'prueba@correo.cl',
      contrasena: 'Prueba123!',
      tipoUsuario: 'cliente',
    };

    // Al registrar, la lista crece y se asigna fecha de registro automáticamente
    service.registrarUsuario(nuevo);
    expect(service.getUsuarios().length).toBe(totalInicial + 1);
    expect(nuevo.fechaRegistro).toBeTruthy();

    // Al eliminar, la lista vuelve a su tamaño original y el usuario ya no existe
    service.eliminarUsuario('pruebaQA');
    expect(service.getUsuarios().length).toBe(totalInicial);
    expect(service.getUsuarios().some(u => u.usuario === 'pruebaQA')).toBe(false);
  });
});
