export interface Juego {
  id: number;
  nombre: string;
  categoria: 'estrategia' | 'familiares' | 'fiestas' | 'cartas';
  foto: string;
  precio: number;
  descripcion: string;
  tieneDescuento: boolean;
}

export interface Categoria {
  slug: string;
  nombre: string;
  icono: string;
  subtitulo: string;
  fotoPortada: string;
  descripcionCorta: string;
}
