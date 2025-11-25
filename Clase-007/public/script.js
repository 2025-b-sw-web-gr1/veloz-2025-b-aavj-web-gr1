// Variables globales
let isVisualizerRunning = false;
let animationId;
let tempo = 120;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  initializeVisualizer();
});

// Inicializar listeners de eventos
function initializeEventListeners() {
  // Botón de exploración
  const exploreBtn = document.querySelector('.pulse-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      smoothScroll('#genres');
      showNotification('¡Exploremos juntos!');
    });
  }

  // Botones del visualizador
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const tempoSlider = document.getElementById('tempoSlider');
  const tempoValue = document.getElementById('tempoValue');

  if (startBtn) startBtn.addEventListener('click', startVisualizer);
  if (stopBtn) stopBtn.addEventListener('click', stopVisualizer);

  if (tempoSlider) {
    tempoSlider.addEventListener('input', (e) => {
      tempo = e.target.value;
      if (tempoValue) tempoValue.textContent = tempo;
    });
  }

  // Newsletter
  const emailInput = document.getElementById('emailInput');
  const subscribeBtn = document.querySelector('.newsletter-form .btn-primary');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      if (emailInput && emailInput.value.trim()) {
        showNotification(`¡Suscripción exitosa! ${emailInput.value}`);
        emailInput.value = '';
      } else {
        showNotification('Por favor ingresa un correo válido', 'error');
      }
    });
  }

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScroll(target);
    });
  });

  // Efecto hover en tarjetas
  addCardHoverEffects();

  // Scroll animations
  initializeScrollAnimations();
}

// Scroll suave
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Mostrar notificación
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00ff88' : '#ff0000'};
    color: ${type === 'success' ? '#000' : '#fff'};
    padding: 1rem 2rem;
    border-radius: 50px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    font-weight: bold;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar estilos de animación al documento
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @keyframes cardPop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

// Efectos hover en tarjetas
function addCardHoverEffects() {
  document.querySelectorAll('.genre-card, .artist-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'cardPop 0.3s ease';
    });
  });
}

// Inicializar visualizador de audio
function initializeVisualizer() {
  const canvas = document.getElementById('visualizer');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Definir dimensiones del canvas
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Dibujar visualizador
  function drawVisualizer() {
    const barCount = 40;
    const barWidth = canvas.width / barCount;
    const baseHeight = 50;

    ctx.fillStyle = 'rgba(10, 14, 39, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar barras animadas
    for (let i = 0; i < barCount; i++) {
      const randomHeight = Math.random() * (canvas.height - baseHeight) + baseHeight;
      const hue = (i / barCount * 360) + (Date.now() / 50) % 360;

      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(
        i * barWidth,
        canvas.height - randomHeight,
        barWidth - 2,
        randomHeight
      );

      // Línea de brillo
      ctx.strokeStyle = `hsla(${hue}, 100%, 80%, 0.5)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(
        i * barWidth,
        canvas.height - randomHeight,
        barWidth - 2,
        randomHeight
      );
    }

    // Ondas de sonido
    const waveY = canvas.height / 2;
    ctx.strokeStyle = `rgba(0, 255, 136, 0.6)`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < canvas.width; i++) {
      const y = waveY + Math.sin((i + Date.now() / 100) / 30) * 20;
      if (i === 0) {
        ctx.moveTo(i, y);
      } else {
        ctx.lineTo(i, y);
      }
    }
    ctx.stroke();

    // Círculos pulsantes
    const circles = 3;
    for (let i = 0; i < circles; i++) {
      const radius = 30 + i * 30 + (Date.now() / 20) % 30;
      const alpha = Math.max(0, 1 - (radius - 30) / 90);

      ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (isVisualizerRunning) {
      animationId = requestAnimationFrame(drawVisualizer);
    }
  }

  // Funciones de control
  window.startVisualizer = function() {
    if (!isVisualizerRunning) {
      isVisualizerRunning = true;
      drawVisualizer();
      showNotification('🎵 Visualizador iniciado');
    }
  };

  window.stopVisualizer = function() {
    isVisualizerRunning = false;
    cancelAnimationFrame(animationId);
    ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Visualizador pausado', canvas.width / 2, canvas.height / 2);
    showNotification('⏸️ Visualizador pausado');
  };
}

// Animaciones al hacer scroll
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.genre-card, .artist-card, .event-item').forEach(el => {
    observer.observe(el);
  });
}

// Efectos interactivos adicionales
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.genre-card, .artist-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    if (Math.abs(rotateX) < 10 && Math.abs(rotateY) < 10) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
});

// Resetear perspectiva cuando se va el mouse
document.addEventListener('mouseleave', () => {
  document.querySelectorAll('.genre-card, .artist-card').forEach(card => {
    card.style.transform = '';
  });
});

// Agregar efecto de clic en el visualizador
const canvas = document.getElementById('visualizer');
if (canvas) {
  canvas.addEventListener('click', () => {
    if (isVisualizerRunning) {
      showNotification('🎉 ¡Ritmo activado!');
    }
  });
}

console.log('🎵 Electronic Music Hub - Script cargado correctamente');

