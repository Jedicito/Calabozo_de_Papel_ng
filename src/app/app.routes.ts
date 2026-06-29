import { Routes } from '@angular/router';

// Tienda
import { HomeComponent } from './components/tienda/home/home.component';
import { ListaJuegosComponent } from './components/tienda/lista-juegos/lista-juegos.component';
import { DetalleJuegoComponent } from './components/tienda/detalle-juego/detalle-juego.component';

// Auth y Usuarios
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { PerfilComponent } from './components/auth/perfil/perfil.component';
import { RecuperarComponent } from './components/auth/recuperar/recuperar.component';

// Admin
import { ListaUsuariosComponent } from './components/admin/lista-usuarios/lista-usuarios.component';

/**
 * Tabla de rutas de la aplicación.
 *
 * Define las rutas públicas (tienda, login, registro, recuperar), las de
 * usuario autenticado (perfil) y la del mantenedor de administración
 * (`admin/usuarios`). La ruta comodín redirige al inicio.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categoria/:nombre', component: ListaJuegosComponent },
  { path: 'juego/:id', component: DetalleJuegoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'admin/usuarios', component: ListaUsuariosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];