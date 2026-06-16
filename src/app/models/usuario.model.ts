export interface Usuario {
  nombre: string;
  usuario: string;
  email: string;
  contrasena: string;
  tipoUsuario: 'admin' | 'cliente';
  fechaNacimiento?: string;
  direccion?: string;
  fechaRegistro?: string;
}
