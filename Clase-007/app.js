const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Pug como motor de renderizado
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Electronic Music Hub',
    subtitle: 'Descubre el ritmo del futuro'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

