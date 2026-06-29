import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración global de la aplicación usada al arrancarla en `main.ts`.
 *
 * Registra la detección de cambios por zona y el enrutador con binding de
 * parámetros de ruta a `@Input` ({@link withComponentInputBinding}).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding())
  ]
};