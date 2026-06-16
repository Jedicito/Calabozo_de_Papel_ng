import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Juego, Categoria } from '../models/juego.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usuarios: Usuario[] = [
    {
      nombre: 'Administrador',
      usuario: 'admin',
      email: 'admin@calabozo.cl',
      contrasena: 'Admin123!',
      tipoUsuario: 'admin',
      fechaNacimiento: '1990-01-15',
      direccion: 'Av. Siempre Viva 742, Santiago',
      fechaRegistro: '2024-01-01'
    },
    {
      nombre: 'Cesar',
      usuario: 'Cesar',
      email: 'cesar@correo.cl',
      contrasena: 'Cesar123!',
      tipoUsuario: 'cliente',
      fechaNacimiento: '1984-05-07',
      direccion: 'Almirante Latorre, Ancud',
      fechaRegistro: '2025-03-12'
    },
    {
      nombre: 'Carolina Fuentes',
      usuario: 'cfuentes',
      email: 'caro@correo.cl',
      contrasena: 'Carolina123!',
      tipoUsuario: 'cliente',
      fechaNacimiento: '1996-11-05',
      direccion: 'Camino a Ensenada, Puerto Varas',
      fechaRegistro: '2025-04-30'
    }
  ];

  private juegos: Juego[] = [
    // Estrategia
    {
      id: 1,
      nombre: 'Catan',
      categoria: 'estrategia',
      foto: 'https://cf.geekdo-images.com/0XODRpReiZBFUffEcqT5-Q__original/img/oRc0AomWA9ZtFqQDZiZbIyKE1j0=/0x0/filters:format(png)/pic9156909.png',
      precio: 34990,
      descripcion: 'El clásico moderno de colonización. Recolecta recursos, construye caminos y asentamientos, y comercia con otros jugadores para ser el primero en alcanzar 10 puntos de victoria en la isla de Catan.',
      tieneDescuento: true
    },
    {
      id: 2,
      nombre: 'Carcassonne',
      categoria: 'estrategia',
      foto: 'https://static.wikia.nocookie.net/board-games-galore/images/5/5e/Carcassonne-game.jpg/revision/latest?cb=20160721003130',
      precio: 27990,
      descripcion: 'Coloca losetas para construir un paisaje medieval de ciudades, caminos y monasterios. Despliega tus seguidores en el momento preciso para puntuar más que tus rivales en este juego de colocación de losetas.',
      tieneDescuento: false
    },
    {
      id: 3,
      nombre: 'Risk',
      categoria: 'estrategia',
      foto: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1128810/header.jpg?t=1777330343',
      precio: 29990,
      descripcion: 'El clásico juego de dominación mundial. Despliega tus ejércitos, negocia alianzas y lanza los dados para conquistar territorios en un conflicto épico que puede durar toda la noche.',
      tieneDescuento: true
    },
    // Familiares
    {
      id: 4,
      nombre: 'Monopoly Clásico',
      categoria: 'familiares',
      foto: 'img/familiares_monopoly.webp',
      precio: 24990,
      descripcion: 'El inmortal juego de propiedades y negocios. Compra terrenos, construye casas y hoteles, y arruina amablemente a tus familiares mientras te conviertes en el magnate inmobiliario del tablero.',
      tieneDescuento: false
    },
    {
      id: 5,
      nombre: 'Jenga',
      categoria: 'familiares',
      foto: 'img/familiares_jenga.png',
      precio: 19990,
      descripcion: 'Extrae bloques de madera de la torre sin derrumbarla. Un juego de pulso, concentración y nervios de acero que mantiene a todos al borde del asiento con cada pieza extraída.',
      tieneDescuento: true
    },
    {
      id: 6,
      nombre: 'Adivina Quién',
      categoria: 'familiares',
      foto: 'https://picsum.photos/seed/guess-who-faces/400/300',
      precio: 22990,
      descripcion: '¿Tiene bigote? ¿Lleva sombrero? Haz preguntas de sí o no para descubrir el personaje secreto de tu rival antes de que él descubra el tuyo. Un clásico de deducción para toda la familia.',
      tieneDescuento: false
    },
    // Fiestas
    {
      id: 7,
      nombre: 'Pictionary',
      categoria: 'fiestas',
      foto: 'https://picsum.photos/seed/pictionary-draw/400/300',
      precio: 25990,
      descripcion: 'Dibuja la palabra que te tocó y haz que tu equipo la adivine antes de que se acabe el tiempo. Un juego de dibujo y mímica que saca el artista (o el desastre creativo) que todos llevamos dentro.',
      tieneDescuento: true
    },
    {
      id: 8,
      nombre: 'Taboo',
      categoria: 'fiestas',
      foto: 'https://picsum.photos/seed/taboo-forbidden/400/300',
      precio: 23990,
      descripcion: 'Describe la palabra secreta sin usar las palabras prohibidas. Contrarreloj y con un rival listo para presionar el buzzer, Taboo pone a prueba tu vocabulario y creatividad bajo presión extrema.',
      tieneDescuento: true
    },
    {
      id: 9,
      nombre: 'Gestos',
      categoria: 'fiestas',
      foto: 'https://picsum.photos/seed/gestures-mime/400/300',
      precio: 18990,
      descripcion: 'Mímica pura: representa palabras, películas y frases usando solo tu cuerpo y sin emitir un solo sonido. El caos garantizado y las carcajadas aseguradas hacen de Gestos el rey de las noches de juegos.',
      tieneDescuento: false
    },
    // Cartas
    {
      id: 10,
      nombre: 'Mitos y Leyendas',
      categoria: 'cartas',
      foto: 'https://picsum.photos/seed/mitos-leyendas-chile/400/300',
      precio: 15990,
      descripcion: 'El TCG nacional que conquistó Latinoamérica. Convoca héroes y criaturas del folclore iberoamericano, lanza hechizos y tácticas ancestrales para derrotar a tu oponente en duelos épicos de cartas coleccionables.',
      tieneDescuento: true
    },
    {
      id: 11,
      nombre: 'Pokémon TCG',
      categoria: 'cartas',
      foto: 'https://picsum.photos/seed/pokemon-tcg-cards/400/300',
      precio: 32990,
      descripcion: 'El juego de cartas más famoso del planeta. Construye un mazo con tus Pokémon favoritos, elige tus Entrenadores y energías, y desafía a tus amigos en batallas estratégicas por convertirte en el mejor Entrenador.',
      tieneDescuento: false
    },
    {
      id: 12,
      nombre: 'Magic: The Gathering',
      categoria: 'cartas',
      foto: 'https://picsum.photos/seed/magic-gathering-fantasy/400/300',
      precio: 29990,
      descripcion: 'El fundador de los TCG modernos, con más de 30 años de historia. Conviértete en un planeswalker, lanza hechizos, invoca criaturas y dominios de maná en duelos de profundidad estratégica sin igual.',
      tieneDescuento: true
    }
  ];

  private categorias: Categoria[] = [
    {
      slug: 'estrategia',
      nombre: 'Juegos de Estrategia',
      icono: '⚔',
      subtitulo: 'Piensa, planifica y conquista',
      fotoPortada: 'img/estrategia_portada.png',
      descripcionCorta: 'Domina el tablero con ingenio y planificación.'
    },
    {
      slug: 'familiares',
      nombre: 'Juegos Familiares',
      icono: '🏠',
      subtitulo: 'Momentos que unen, risas que perduran',
      fotoPortada: 'img/familiares_portada.png',
      descripcionCorta: 'Diversión para toda la familia, de 6 a 96 años.'
    },
    {
      slug: 'fiestas',
      nombre: 'Juegos de Fiesta',
      icono: '🎉',
      subtitulo: 'La chispa de cada reunión',
      fotoPortada: 'img/fiestas_portada.png',
      descripcionCorta: 'El alma de cada reunión y celebración.'
    },
    {
      slug: 'cartas',
      nombre: 'Cartas Coleccionables',
      icono: '🃏',
      subtitulo: 'Construye tu mazo, forja tu leyenda',
      fotoPortada: 'img/cartas_portada.png',
      descripcionCorta: 'Construye tu mazo y conquista el duelo.'
    }
  ];

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getJuegos(): Juego[] {
    return this.juegos;
  }

  getJuegoById(id: number): Juego | undefined {
    return this.juegos.find(j => j.id === id);
  }

  getJuegosPorCategoria(categoria: string): Juego[] {
    return this.juegos.filter(j => j.categoria === categoria);
  }

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  getCategoriaBySlug(slug: string): Categoria | undefined {
    return this.categorias.find(c => c.slug === slug);
  }

  registrarUsuario(usuario: Usuario): void {
    usuario.fechaRegistro = new Date().toISOString().split('T')[0];
    this.usuarios.push(usuario);
  }

  eliminarUsuario(username: string): void {
    this.usuarios = this.usuarios.filter(u => u.usuario !== username);
  }

  formatearPrecio(precio: number): string {
    return '$' + precio.toLocaleString('es-CL');
  }
}
