/**
 * Modelo de dominio que representa un juego de mesa del catálogo de la tienda.
 */
export interface Juego {
  /** Identificador numérico único del juego. */
  id: number;
  /** Nombre comercial del juego. */
  nombre: string;
  /** Categoría a la que pertenece el juego dentro del catálogo. */
  categoria: 'estrategia' | 'familiares' | 'fiestas' | 'cartas';
  /** Ruta o URL de la imagen de portada del juego. */
  foto: string;
  /** Precio del juego en pesos chilenos (CLP), sin formato. */
  precio: number;
  /** Descripción comercial del juego que se muestra en el detalle. */
  descripcion: string;
  /** Indica si el juego tiene una etiqueta de descuento activa. */
  tieneDescuento: boolean;
}

/**
 * Modelo de dominio que representa una categoría del catálogo. Cada categoría
 * agrupa varios {@link Juego} y se utiliza para la navegación del menú y las
 * portadas de la página de inicio.
 */
export interface Categoria {
  /** Identificador legible usado en las rutas (ej. `'estrategia'`). */
  slug: string;
  /** Nombre visible de la categoría. */
  nombre: string;
  /** Icono (emoji) que acompaña a la categoría en la interfaz. */
  icono: string;
  /** Frase corta descriptiva que se muestra bajo el nombre. */
  subtitulo: string;
  /** Ruta o URL de la imagen de portada de la categoría. */
  fotoPortada: string;
  /** Descripción breve usada en las tarjetas de la página de inicio. */
  descripcionCorta: string;
}
