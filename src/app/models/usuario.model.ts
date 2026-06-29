/**
 * Modelo de dominio que representa a un usuario registrado en
 * "El Calabozo de Papel".
 *
 * Se utiliza tanto para las cuentas precargadas (administrador y clientes
 * de ejemplo) como para los usuarios que se dan de alta desde el formulario
 * de registro.
 */
export interface Usuario {
  /** Nombre completo de la persona. */
  nombre: string;
  /** Nombre de usuario único con el que inicia sesión. */
  usuario: string;
  /** Correo electrónico de la cuenta (también sirve para iniciar sesión). */
  email: string;
  /** Contraseña de la cuenta en texto plano (solo para fines académicos). */
  contrasena: string;
  /**
   * Rol del usuario dentro de la aplicación. Determina los privilegios:
   * `'admin'` accede al mantenedor de usuarios y `'cliente'` solo a la tienda.
   */
  tipoUsuario: 'admin' | 'cliente';
  /** Fecha de nacimiento en formato `YYYY-MM-DD`. Opcional. */
  fechaNacimiento?: string;
  /** Dirección de despacho del usuario. Opcional. */
  direccion?: string;
  /** Fecha de alta de la cuenta en formato `YYYY-MM-DD`. Opcional. */
  fechaRegistro?: string;
}
