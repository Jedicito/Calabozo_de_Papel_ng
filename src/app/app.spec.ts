import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])], // La navbar usa routerLink, por eso se provee el router
    }).compileComponents();
  });

  // Prueba 1: el componente raíz se crea correctamente (smoke test)
  it('debe crear el componente raíz de la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Prueba 2: el título de la aplicación es el esperado
  it("debe tener el título 'calabozo-de-papel-ng'", () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toBe('calabozo-de-papel-ng');
  });
});
