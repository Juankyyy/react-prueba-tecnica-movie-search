# Movie Search

Aplicacion web para buscar peliculas y series usando OMDb.

## Objetivo

Permitir buscar titulos rapido, ver resultados en una grilla clara y mantener una experiencia visual moderna en mobile y desktop.

## Funcionalidades

- Busqueda por titulo con debounce.
- Resultados en grid responsive.
- Modo claro/oscuro.
- Boton random con overlay animado.
- Loader en posters mientras cargan.
- Manejo de posters faltantes y estados vacios.

## Stack

- React + Vite
- Zustand para estado global
- Tailwind CSS (v4) + CSS custom
- Lucide React para iconos
- OMDb API para datos

## Ejecutar en local

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build produccion
npm run preview  # previsualizar build
npm run lint     # revisar codigo
```

## Build

```bash
npm run build
```

## Estructura base

- src/components: UI (Navbar, Movies, cards, overlay)
- src/contexts: store principal con Zustand
- src/services: llamadas a OMDb
- src/utils: helpers de variantes y titulos random

## Nota

Este proyecto esta orientado a una prueba tecnica y prioriza simplicidad, claridad visual y buena experiencia de uso.