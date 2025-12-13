// ============================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';
const GAMES_ENDPOINT = `${API_BASE_URL}/games`;

let allGames = [];
let filteredGames = [];
let currentPage = 1;
let itemsPerPage = 12;

// ============================================
// ELEMENTOS DEL DOM
// ============================================

// Navegación
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

// Sección de Juegos
const gamesContainer = document.getElementById('games-container');
const loadingDiv = document.getElementById('loading');
const noResultsDiv = document.getElementById('no-results');
const errorMessageDiv = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Formulario de Crear
const createForm = document.getElementById('create-form');
const createFeedback = document.getElementById('create-feedback');

// Modal de Edición
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const closeModalBtn = document.getElementById('close-modal');
const cancelEditBtn = document.getElementById('cancel-edit');
const editFeedback = document.getElementById('edit-feedback');
let editGameId = null;

// Modal de Eliminación
const deleteModal = document.getElementById('delete-modal');
const deleteMessage = document.getElementById('delete-message');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
let deleteGameId = null;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Indie Games Hub - Frontend iniciado');
    setupEventListeners();
    loadGames();
});

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function setupEventListeners() {
    // Navegación
    navBtns.forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });

    // Búsqueda y ordenamiento
    searchInput.addEventListener('input', handleSearch);
    sortSelect.addEventListener('change', handleSort);

    // Formulario de crear
    createForm.addEventListener('submit', handleCreateGame);

    // Modales
    closeModalBtn.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);
    editForm.addEventListener('submit', handleEditGame);

    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    confirmDeleteBtn.addEventListener('click', confirmDelete);

    // Cerrar modal al hacer clic fuera
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });

    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
}

// ============================================
// NAVEGACIÓN ENTRE SECCIONES
// ============================================

function handleNavigation(e) {
    const targetSection = e.target.dataset.section;

    // Actualizar botones activos
    navBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Mostrar/ocultar secciones
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`${targetSection}-section`).classList.add('active');

    // Limpiar mensajes de retroalimentación
    clearFeedbacks();
}

// ============================================
// CARGA DE JUEGOS
// ============================================

async function loadGames() {
    try {
        showLoading(true);
        hideErrors();

        const response = await fetch(GAMES_ENDPOINT);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error al cargar los juegos');
        }

        allGames = result.data;
        filteredGames = [...allGames];
        renderGames();
        showLoading(false);

        console.log(`✅ ${allGames.length} juegos cargados exitosamente`);
    } catch (error) {
        console.error('❌ Error al cargar juegos:', error);
        showLoading(false);
        showError(`Error al cargar juegos: ${error.message}`);
    }
}

// ============================================
// RENDERIZADO DE JUEGOS
// ============================================

function renderGames() {
    gamesContainer.innerHTML = '';

    if (filteredGames.length === 0) {
        noResultsDiv.classList.remove('hidden');
        return;
    }

    noResultsDiv.classList.add('hidden');

    filteredGames.forEach(game => {
        const card = createGameCard(game);
        gamesContainer.appendChild(card);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';

    // Determinar clase de calificación
    let ratingClass = 'low';
    if (game.rating >= 8) ratingClass = 'high';
    else if (game.rating >= 6) ratingClass = 'medium';

    const ratingStars = '⭐'.repeat(Math.floor(game.rating / 2));

    card.innerHTML = `
        <div class="game-header">
            <h3 class="game-title">${escapeHtml(game.title)}</h3>
            <div class="game-meta">
                <span class="game-year">${game.release_year}</span>
                <span class="game-rating ${ratingClass}">${ratingStars} ${game.rating}/10</span>
            </div>
        </div>
        <div class="game-body">
            <p class="game-description">${escapeHtml(game.description)}</p>
            <div class="game-details">
                <span class="detail-badge">🎮 ${escapeHtml(game.genre)}</span>
                <span class="detail-badge">👨‍💻 ${escapeHtml(game.developer)}</span>
            </div>
        </div>
        <div class="game-footer">
            <button class="btn-small btn-edit" data-id="${game.id}">✏️ Editar</button>
            <button class="btn-small btn-delete" data-id="${game.id}">🗑️ Eliminar</button>
        </div>
    `;

    // Agregar event listeners a los botones
    card.querySelector('.btn-edit').addEventListener('click', () => openEditModal(game));
    card.querySelector('.btn-delete').addEventListener('click', () => openDeleteModal(game));

    return card;
}

// ============================================
// BÚSQUEDA Y ORDENAMIENTO
// ============================================

function handleSearch() {
    const query = searchInput.value.toLowerCase();

    filteredGames = allGames.filter(game => {
        const matchTitle = game.title.toLowerCase().includes(query);
        const matchGenre = game.genre.toLowerCase().includes(query);
        const matchDeveloper = game.developer.toLowerCase().includes(query);
        return matchTitle || matchGenre || matchDeveloper;
    });

    currentPage = 1;
    handleSort();
}

function handleSort() {
    const sortValue = sortSelect.value;

    switch (sortValue) {
        case 'newest':
            filteredGames.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'oldest':
            filteredGames.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            break;
        case 'highest-rated':
            filteredGames.sort((a, b) => b.rating - a.rating);
            break;
        case 'lowest-rated':
            filteredGames.sort((a, b) => a.rating - b.rating);
            break;
        case 'a-z':
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    renderGames();
}

// ============================================
// CREAR JUEGO
// ============================================

async function handleCreateGame(e) {
    e.preventDefault();

    const formData = new FormData(createForm);
    const gameData = {
        title: formData.get('title'),
        description: formData.get('description'),
        genre: formData.get('genre'),
        developer: formData.get('developer'),
        release_year: parseInt(formData.get('release_year')),
        rating: parseFloat(formData.get('rating'))
    };

    // Validación básica en cliente
    if (!validateGameData(gameData)) {
        return;
    }

    try {
        createFeedback.textContent = '⏳ Creando videojuego...';
        createFeedback.className = 'feedback';
        createFeedback.classList.remove('hidden');

        const response = await fetch(GAMES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error al crear el videojuego');
        }

        // Éxito
        createFeedback.textContent = `✅ ${result.message}`;
        createFeedback.className = 'feedback success';

        createForm.reset();

        // Recargar juegos después de 1 segundo
        setTimeout(() => {
            loadGames();
            // Volver a la sección de juegos
            document.querySelector('[data-section="games"]').click();
        }, 1000);

        console.log('✅ Videojuego creado:', result.data);
    } catch (error) {
        console.error('❌ Error al crear videojuego:', error);
        createFeedback.textContent = `❌ ${error.message}`;
        createFeedback.className = 'feedback error';
    }
}

// ============================================
// EDITAR JUEGO
// ============================================

function openEditModal(game) {
    editGameId = game.id;
    document.getElementById('edit-id').value = game.id;
    document.getElementById('edit-title').value = game.title;
    document.getElementById('edit-description').value = game.description;
    document.getElementById('edit-genre').value = game.genre;
    document.getElementById('edit-developer').value = game.developer;
    document.getElementById('edit-release_year').value = game.release_year;
    document.getElementById('edit-rating').value = game.rating;

    editFeedback.classList.add('hidden');
    editModal.classList.remove('hidden');
}

function closeEditModal() {
    editModal.classList.add('hidden');
    editGameId = null;
    editFeedback.classList.add('hidden');
}

async function handleEditGame(e) {
    e.preventDefault();

    const gameData = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        genre: document.getElementById('edit-genre').value,
        developer: document.getElementById('edit-developer').value,
        release_year: parseInt(document.getElementById('edit-release_year').value),
        rating: parseFloat(document.getElementById('edit-rating').value)
    };

    if (!validateGameData(gameData)) {
        return;
    }

    try {
        editFeedback.textContent = '⏳ Actualizando videojuego...';
        editFeedback.className = 'feedback';
        editFeedback.classList.remove('hidden');

        const response = await fetch(`${GAMES_ENDPOINT}/${editGameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error al actualizar el videojuego');
        }

        editFeedback.textContent = `✅ ${result.message}`;
        editFeedback.className = 'feedback success';

        setTimeout(() => {
            loadGames();
            closeEditModal();
        }, 1000);

        console.log('✅ Videojuego actualizado:', result.data);
    } catch (error) {
        console.error('❌ Error al actualizar videojuego:', error);
        editFeedback.textContent = `❌ ${error.message}`;
        editFeedback.className = 'feedback error';
    }
}

// ============================================
// ELIMINAR JUEGO
// ============================================

function openDeleteModal(game) {
    deleteGameId = game.id;
    deleteMessage.textContent = `¿Estás seguro de que deseas eliminar "${escapeHtml(game.title)}"? Esta acción no se puede deshacer.`;
    deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    deleteGameId = null;
}

async function confirmDelete() {
    if (!deleteGameId) return;

    try {
        const response = await fetch(`${GAMES_ENDPOINT}/${deleteGameId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error al eliminar el videojuego');
        }

        console.log('✅ Videojuego eliminado:', result.data);
        loadGames();
        closeDeleteModal();
    } catch (error) {
        console.error('❌ Error al eliminar videojuego:', error);
        alert(`Error: ${error.message}`);
    }
}

// ============================================
// UTILIDADES Y VALIDACIÓN
// ============================================

function validateGameData(data) {
    const errors = {};

    if (!data.title || data.title.trim().length === 0) {
        errors.title = 'El título es requerido';
    }

    if (!data.description || data.description.trim().length === 0) {
        errors.description = 'La descripción es requerida';
    }

    if (!data.genre || data.genre.trim().length === 0) {
        errors.genre = 'El género es requerido';
    }

    if (!data.developer || data.developer.trim().length === 0) {
        errors.developer = 'El desarrollador es requerido';
    }

    if (!Number.isInteger(data.release_year) || data.release_year < 2000 || data.release_year > new Date().getFullYear()) {
        errors.release_year = `El año debe estar entre 2000 y ${new Date().getFullYear()}`;
    }

    if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 10) {
        errors.rating = 'La calificación debe estar entre 0 y 10';
    }

    if (Object.keys(errors).length > 0) {
        displayValidationErrors(errors);
        return false;
    }

    clearValidationErrors();
    return true;
}

function displayValidationErrors(errors) {
    clearValidationErrors();

    for (const [field, message] of Object.entries(errors)) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
}

function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-text');
    errorElements.forEach(el => el.textContent = '');
}

function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
        gamesContainer.innerHTML = '';
    } else {
        loadingDiv.classList.add('hidden');
    }
}

function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
}

function hideErrors() {
    errorMessageDiv.classList.add('hidden');
    errorMessageDiv.textContent = '';
}

function clearFeedbacks() {
    createFeedback.classList.add('hidden');
    editFeedback.classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================

window.addEventListener('error', (event) => {
    console.error('❌ Error global:', event.error);
    showError(`Error inesperado: ${event.error.message}`);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promesa rechazada no manejada:', event.reason);
    showError(`Error: ${event.reason}`);
});

