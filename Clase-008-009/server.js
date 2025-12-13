import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// DATABASE INITIALIZATION
// ============================================

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error abriendo la base de datos:', err.message);
  } else {
    console.log('Base de datos SQLite inicializada en memoria.');
    initDatabase();
  }
});

// Promisificar db.run para facilitar el manejo
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

// Promisificar db.get
const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Promisificar db.all
const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

function initDatabase() {
  // Crear tabla si no existe
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      genre TEXT NOT NULL,
      developer TEXT NOT NULL,
      release_year INTEGER NOT NULL,
      rating REAL NOT NULL CHECK(rating >= 0 AND rating <= 10),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creando tabla:', err.message);
    } else {
      console.log('Tabla "games" creada o ya existe.');
      // Insertar datos iniciales
      insertInitialGames();
    }
  });
}

function insertInitialGames() {
  const initialGames = [
    {
      title: 'Celeste',
      description: 'Un juego de plataformas desafiante sobre una chica que intenta escalar una montaña mística llena de peligros y emociones.',
      genre: 'Plataforma',
      developer: 'Maddy Makes Games',
      release_year: 2018,
      rating: 9.2
    },
    {
      title: 'Hades',
      description: 'Un roguelike de acción en el que escapas del inframundo usando armas divinas y conociendo a dioses griegos.',
      genre: 'Roguelike',
      developer: 'Supergiant Games',
      release_year: 2020,
      rating: 9.5
    },
    {
      title: 'Hollow Knight',
      description: 'Un metroidvania oscuro donde exploras un reino subterráneo lleno de criaturas y secretos enigmáticos.',
      genre: 'Metroidvania',
      developer: 'Team Cherry',
      release_year: 2017,
      rating: 8.8
    },
    {
      title: 'Stardew Valley',
      description: 'Un simulador de granja relajante donde cultivas, pescas y construyes relaciones en un pueblo pintoresco.',
      genre: 'Simulación',
      developer: 'ConcernedApe',
      release_year: 2016,
      rating: 9.4
    },
    {
      title: 'Undertale',
      description: 'Un RPG único que rompe las convenciones del género con diálogos ingeniosos y sistemas de combate innovadores.',
      genre: 'RPG',
      developer: 'Toby Fox',
      release_year: 2015,
      rating: 9.1
    },
    {
      title: 'Cuphead',
      description: 'Un shoot\'em up clásico con un estilo visual único inspirado en caricaturas de los años 30.',
      genre: 'Shoot\'em up',
      developer: 'Studio MDHR',
      release_year: 2017,
      rating: 8.7
    },
    {
      title: 'Hyper Light Drifter',
      description: 'Un acción-aventura visualmente deslumbrante con combate fluido y una atmósfera post-apocalíptica cautivadora.',
      genre: 'Acción',
      developer: 'Heart Machine',
      release_year: 2016,
      rating: 8.5
    },
    {
      title: 'Outer Wilds',
      description: 'Un juego de exploración espacial que desafía tu comprensión del universo con un sistema solar cautivador.',
      genre: 'Aventura',
      developer: 'Mobius Digital',
      release_year: 2019,
      rating: 9.3
    },
    {
      title: 'Return of the Obra Dinn',
      description: 'Un misterio visual en 1-bit donde debes desentrañar lo que sucedió en un barco abandonado.',
      genre: 'Puzle',
      developer: 'Lucas Pope',
      release_year: 2018,
      rating: 8.9
    },
    {
      title: 'Gris',
      description: 'Un plataforma artístico sin diálogos donde exploras emociones a través del color y la música.',
      genre: 'Plataforma',
      developer: 'Nomada Studio',
      release_year: 2018,
      rating: 8.2
    }
  ];

  // Verificar si ya existen datos
  dbAll('SELECT COUNT(*) as count FROM games').then((result) => {
    if (result[0].count === 0) {
      initialGames.forEach((game) => {
        const id = uuidv4();
        dbRun(
          `INSERT INTO games (id, title, description, genre, developer, release_year, rating) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, game.title, game.description, game.genre, game.developer, game.release_year, game.rating]
        ).catch(err => {
          console.error(`Error insertando juego ${game.title}:`, err.message);
        });
      });
      console.log('10 videojuegos indie iniciales insertados.');
    } else {
      console.log('La base de datos ya contiene datos.');
    }
  });
}

// ============================================
// MIDDLEWARE DE ERROR
// ============================================

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ============================================
// ENDPOINTS API
// ============================================

/**
 * GET /api/games
 * Obtiene todos los videojuegos
 */
app.get('/api/games', asyncHandler(async (req, res) => {
  const games = await dbAll('SELECT * FROM games ORDER BY created_at DESC');
  res.status(200).json({
    success: true,
    data: games,
    count: games.length
  });
}));

/**
 * GET /api/games/:id
 * Obtiene un videojuego específico por ID
 */
app.get('/api/games/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validar que id sea un UUID válido
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    return res.status(400).json({
      success: false,
      error: 'ID inválido. Debe ser un UUID válido.'
    });
  }

  const game = await dbGet('SELECT * FROM games WHERE id = ?', [id]);

  if (!game) {
    return res.status(404).json({
      success: false,
      error: 'Videojuego no encontrado.'
    });
  }

  res.status(200).json({
    success: true,
    data: game
  });
}));

/**
 * POST /api/games
 * Crea un nuevo videojuego
 * Body: { title, description, genre, developer, release_year, rating }
 */
app.post('/api/games', asyncHandler(async (req, res) => {
  const { title, description, genre, developer, release_year, rating } = req.body;

  // Validaciones
  if (!title || !description || !genre || !developer || release_year === undefined || rating === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos requeridos: title, description, genre, developer, release_year, rating'
    });
  }

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'El título debe ser una cadena de texto no vacía.'
    });
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'La descripción debe ser una cadena de texto no vacía.'
    });
  }

  if (!Number.isInteger(release_year) || release_year < 2000 || release_year > new Date().getFullYear()) {
    return res.status(400).json({
      success: false,
      error: `El año debe ser un número entero entre 2000 y ${new Date().getFullYear()}.`
    });
  }

  if (typeof rating !== 'number' || rating < 0 || rating > 10) {
    return res.status(400).json({
      success: false,
      error: 'La calificación debe ser un número entre 0 y 10.'
    });
  }

  try {
    const id = uuidv4();
    await dbRun(
      `INSERT INTO games (id, title, description, genre, developer, release_year, rating) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title.trim(), description.trim(), genre.trim(), developer.trim(), release_year, rating]
    );

    const newGame = await dbGet('SELECT * FROM games WHERE id = ?', [id]);

    res.status(201).json({
      success: true,
      message: 'Videojuego creado exitosamente.',
      data: newGame
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({
        success: false,
        error: 'El título ya existe en la base de datos.'
      });
    }
    throw error;
  }
}));

/**
 * PUT /api/games/:id
 * Actualiza completamente un videojuego
 */
app.put('/api/games/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, developer, release_year, rating } = req.body;

  // Validar UUID
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    return res.status(400).json({
      success: false,
      error: 'ID inválido. Debe ser un UUID válido.'
    });
  }

  // Verificar que el juego existe
  const existingGame = await dbGet('SELECT * FROM games WHERE id = ?', [id]);
  if (!existingGame) {
    return res.status(404).json({
      success: false,
      error: 'Videojuego no encontrado.'
    });
  }

  // Validaciones
  if (!title || !description || !genre || !developer || release_year === undefined || rating === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos requeridos: title, description, genre, developer, release_year, rating'
    });
  }

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'El título debe ser una cadena de texto no vacía.'
    });
  }

  if (!Number.isInteger(release_year) || release_year < 2000 || release_year > new Date().getFullYear()) {
    return res.status(400).json({
      success: false,
      error: `El año debe ser un número entero entre 2000 y ${new Date().getFullYear()}.`
    });
  }

  if (typeof rating !== 'number' || rating < 0 || rating > 10) {
    return res.status(400).json({
      success: false,
      error: 'La calificación debe ser un número entre 0 y 10.'
    });
  }

  try {
    await dbRun(
      `UPDATE games SET title = ?, description = ?, genre = ?, developer = ?, release_year = ?, rating = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title.trim(), description.trim(), genre.trim(), developer.trim(), release_year, rating, id]
    );

    const updatedGame = await dbGet('SELECT * FROM games WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Videojuego actualizado exitosamente.',
      data: updatedGame
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({
        success: false,
        error: 'El título ya existe en la base de datos.'
      });
    }
    throw error;
  }
}));

/**
 * PATCH /api/games/:id
 * Actualiza parcialmente un videojuego
 */
app.patch('/api/games/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Validar UUID
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    return res.status(400).json({
      success: false,
      error: 'ID inválido. Debe ser un UUID válido.'
    });
  }

  // Verificar que el juego existe
  const existingGame = await dbGet('SELECT * FROM games WHERE id = ?', [id]);
  if (!existingGame) {
    return res.status(404).json({
      success: false,
      error: 'Videojuego no encontrado.'
    });
  }

  // Campos permitidos para actualización parcial
  const allowedFields = ['title', 'description', 'genre', 'developer', 'release_year', 'rating'];
  const validUpdates = {};

  for (const [key, value] of Object.entries(updates)) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({
        success: false,
        error: `Campo no permitido: ${key}. Campos permitidos: ${allowedFields.join(', ')}`
      });
    }

    // Validaciones según el campo
    if (key === 'title' && (typeof value !== 'string' || value.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'El título debe ser una cadena de texto no vacía.'
      });
    }

    if (key === 'release_year' && (!Number.isInteger(value) || value < 2000 || value > new Date().getFullYear())) {
      return res.status(400).json({
        success: false,
        error: `El año debe ser un número entero entre 2000 y ${new Date().getFullYear()}.`
      });
    }

    if (key === 'rating' && (typeof value !== 'number' || value < 0 || value > 10)) {
      return res.status(400).json({
        success: false,
        error: 'La calificación debe ser un número entre 0 y 10.'
      });
    }

    validUpdates[key] = typeof value === 'string' ? value.trim() : value;
  }

  if (Object.keys(validUpdates).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No hay campos válidos para actualizar.'
    });
  }

  try {
    // Construir dinámicamente la query UPDATE
    const fields = Object.keys(validUpdates);
    const values = Object.values(validUpdates);
    const setClause = fields.map(f => `${f} = ?`).join(', ');

    await dbRun(
      `UPDATE games SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id]
    );

    const updatedGame = await dbGet('SELECT * FROM games WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Videojuego actualizado parcialmente.',
      data: updatedGame
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({
        success: false,
        error: 'El título ya existe en la base de datos.'
      });
    }
    throw error;
  }
}));

/**
 * DELETE /api/games/:id
 * Elimina un videojuego
 */
app.delete('/api/games/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validar UUID
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    return res.status(400).json({
      success: false,
      error: 'ID inválido. Debe ser un UUID válido.'
    });
  }

  const game = await dbGet('SELECT * FROM games WHERE id = ?', [id]);
  if (!game) {
    return res.status(404).json({
      success: false,
      error: 'Videojuego no encontrado.'
    });
  }

  await dbRun('DELETE FROM games WHERE id = ?', [id]);

  res.status(200).json({
    success: true,
    message: 'Videojuego eliminado exitosamente.',
    data: game
  });
}));

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║       INDIE GAMES API - Servidor iniciado                  ║
╚════════════════════════════════════════════════════════════╝
📡 Servidor ejecutándose en: http://localhost:${PORT}
🌐 Frontend disponible en: http://localhost:${PORT}
📚 Documentación de endpoints:
   - GET    /api/games           - Obtener todos los juegos
   - GET    /api/games/:id       - Obtener un juego específico
   - POST   /api/games           - Crear nuevo juego
   - PUT    /api/games/:id       - Actualizar completamente un juego
   - PATCH  /api/games/:id       - Actualizar parcialmente un juego
   - DELETE /api/games/:id       - Eliminar un juego
🔗 Para probar con Bruno o Postman: http://localhost:${PORT}/api/games
  `);
});

