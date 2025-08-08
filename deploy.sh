#!/bin/bash

# Script para desplegar a GitHub Pages

echo "🚀 Desplegando Adaptia Presentation a GitHub Pages..."

# Build del proyecto
echo "📦 Construyendo proyecto..."
npm run build

# Crear repositorio si no existe
if [ ! -d ".git" ]; then
    echo "🔧 Inicializando repositorio Git..."
    git init
    git add .
    git commit -m "Initial commit: Adaptia MVP Presentation"
fi

# Instalar gh-pages si no está instalado
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📥 Instalando gh-pages..."
    npm install --save-dev gh-pages
fi

# Desplegar a GitHub Pages
echo "🌐 Desplegando a GitHub Pages..."
npm run deploy

echo "✅ ¡Despliegue completado!"
echo "📋 Próximos pasos:"
echo "1. Ve a tu repositorio en GitHub"
echo "2. Ve a Settings > Pages"
echo "3. Selecciona 'Deploy from a branch' y elige 'gh-pages'"
echo "4. Tu presentación estará disponible en: https://tu-usuario.github.io/adaptia-presentation"
