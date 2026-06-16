import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/tienda/home/home.component';
import { ListaJuegosComponent } from './components/tienda/lista-juegos/lista-juegos.component';
import { DetalleJuegoComponent } from './components/tienda/detalle-juego/detalle-juego.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { PerfilComponent } from './components/auth/perfil/perfil.component';
import { RecuperarComponent } from './components/auth/recuperar/recuperar.component';
import { ListaUsuariosComponent } from './components/admin/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categoria/:categoria', component: ListaJuegosComponent },
  { path: 'categoria/juego/:id', component: DetalleJuegoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'admin/usuarios', component: ListaUsuariosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
