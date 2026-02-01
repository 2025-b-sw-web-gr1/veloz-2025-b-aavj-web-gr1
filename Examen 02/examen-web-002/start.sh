#!/bin/bash

# 🚀 SCRIPT DE INICIO RÁPIDO - EXAMEN 02

echo "=========================================="
echo "🏆 Examen 02 - API RESTful con NestJS"
echo "=========================================="
echo ""

# Obtener la ruta correcta
PROJECT_PATH="/home/alejandrov/WebstormProjects/veloz-2025-b-aavj-web-gr1/Examen 02/examen-web-002"

# Verificar que el directorio existe
if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Error: Directorio no encontrado en $PROJECT_PATH"
    exit 1
fi

echo "📁 Cambiando a directorio del proyecto..."
cd "$PROJECT_PATH" || exit 1

echo "✅ Ubicación: $(pwd)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas"
    echo ""
fi

echo "🔧 Compilando proyecto..."
npm run build
echo "✅ Proyecto compilado"
echo ""

echo "=========================================="
echo "🚀 Iniciando servidor en modo desarrollo"
echo "=========================================="
echo ""
echo "📍 URL base: http://localhost:3000"
echo ""
echo "📚 Ejemplos de endpoints:"
echo "   GET  http://localhost:3000/teams"
echo "   POST http://localhost:3000/teams"
echo "   GET  http://localhost:3000/players"
echo "   POST http://localhost:3000/players"
echo ""
echo "📖 Consulta los archivos para más información:"
echo "   - README.md    (Documentación principal)"
echo "   - SETUP.md     (Guía de instalación)"
echo "   - EXAMPLES.md  (Ejemplos de peticiones)"
echo ""
echo "⚠️  Presiona Ctrl+C para detener el servidor"
echo "=========================================="
echo ""

# Iniciar el servidor
npm run start:dev
