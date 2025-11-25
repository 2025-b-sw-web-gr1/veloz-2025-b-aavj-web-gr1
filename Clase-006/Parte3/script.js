// ============================================
// MENÚ HAMBURGUESA RESPONSIVE
// ============================================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Cerrar menú cuando se hace clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// SCROLL SUAVE CON OBSERVADOR
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.feature-card, .tech-card, .testimonial-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación del formulario
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        const formStatus = document.getElementById('form-status');

        let isValid = true;

        // Validar nombre
        if (!nombre.value.trim()) {
            showError(nombre, 'El nombre es requerido');
            isValid = false;
        } else {
            clearError(nombre);
        }

        // Validar email
        if (!email.value.trim()) {
            showError(email, 'El correo electrónico es requerido');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor ingresa un correo válido');
            isValid = false;
        } else {
            clearError(email);
        }

        // Validar mensaje
        if (!mensaje.value.trim()) {
            showError(mensaje, 'El mensaje es requerido');
            isValid = false;
        } else if (mensaje.value.trim().length < 10) {
            showError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        } else {
            clearError(mensaje);
        }

        if (!isValid) return;

        // Simular envío
        formStatus.textContent = 'Enviando...';
        formStatus.classList.add('show');

        try {
            // Simulación de llamada API (reemplazar con endpoint real)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Éxito
            formStatus.textContent = '✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.';
            formStatus.classList.remove('error');
            formStatus.classList.add('success');

            // Limpiar formulario
            contactForm.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);

        } catch (error) {
            formStatus.textContent = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.classList.add('show');
        }
    });
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar errores
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.setAttribute('aria-invalid', 'true');
    }
}

// Función para limpiar errores
function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        input.setAttribute('aria-invalid', 'false');
    }
}

// ============================================
// INTERACTIVIDAD DE TARJETAS
// ============================================

// Agregar interactividad a tarjetas de tecnología
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.perspective = '1000px';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) * 0.1;
        const rotateY = (centerX - x) * 0.1;

        // Solo aplicar en pantallas grandes
        if (window.innerWidth > 768) {
            this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ============================================
// ANIMACIÓN DE CONTADOR
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    }
});

// ============================================
// BOTÓN CTA HERO
// ============================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const caracteristicas = document.getElementById('caracteristicas');
        if (caracteristicas) {
            caracteristicas.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACCESIBILIDAD - SOPORTE DE TECLADO
// ============================================

// Mejorar navegación por teclado en tarjetas
document.querySelectorAll('.feature-card, .tech-card, .testimonial-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ============================================
// MODO CLARO/OSCURO (OPCIONAL)
// ============================================

function initThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Usar preferencia del sistema operativo
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode');
    }

    // Escuchar cambios en la preferencia del sistema
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initThemeToggle);

// ============================================
// SOPORTE PARA REDUCIR MOVIMIENTO
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    // Animar elementos cuando entren en vista
    document.querySelectorAll('.feature-card, .tech-card').forEach((element, index) => {
        element.style.setProperty('--card-index', index);
    });
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================

const inputElements = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputElements.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'nombre') {
            if (input.value.trim() === '') {
                showError(input, 'El nombre es requerido');
            } else {
                clearError(input);
            }
        }

        if (input.id === 'email') {
            if (input.value.trim() === '') {
                showError(input, 'El correo electrónico es requerido');
            } else if (!isValidEmail(input.value)) {
                showError(input, 'Por favor ingresa un correo válido');
            } else {
                clearError(input);
            }
        }

        if (input.id === 'mensaje') {
            if (input.value.trim() === '') {
                showError(input, 'El mensaje es requerido');
            } else if (input.value.trim().length < 10) {
                showError(input, 'Mínimo 10 caracteres');
            } else {
                clearError(input);
            }
        }
    });
});

// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

console.log('✓ Página web de Agentes de IA cargada correctamente');
console.log('✓ Accesibilidad WCAG 2.1 y WAI-ARIA implementadas');
console.log('✓ Diseño responsivo activo');

