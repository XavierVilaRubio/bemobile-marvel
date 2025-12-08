# BeMobile Marvel

Aplicación web moderna para explorar personajes de superhéroes, construida con React Router v7. Permite buscar personajes, ver detalles y gestionar favoritos usando localStorage.

## 🚀 Características

- **Búsqueda de personajes**: Búsqueda en tiempo real con debounce
- **Sistema de favoritos**: Guarda tus personajes favoritos en localStorage
- **Página de detalle**: Vista detallada de cada personaje con información completa
- **Diseño responsive**: Optimizado para móvil, tablet y desktop
- **Server-Side Rendering (SSR)**: Renderizado del lado del servidor para mejor SEO y rendimiento
- **TypeScript**: Tipado estático para mayor seguridad y mantenibilidad
- **Tests**: Suite completa de tests unitarios y end-to-end

## 📋 Requisitos Previos

- **Node.js**: v20 o superior
- **npm**: v9 o superior (o bun, pnpm, yarn)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd bemobile-marvel
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃 Ejecución

### Desarrollo

Inicia el servidor de desarrollo con Hot Module Replacement (HMR):

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Producción

1. Construye la aplicación:
```bash
npm run build
```

2. Inicia el servidor de producción:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000` (puerto por defecto).

## 🐳 Docker

### Construir la imagen

```bash
docker build -t bemobile-marvel .
```

### Ejecutar el contenedor

```bash
docker run -p 3000:3000 bemobile-marvel
```

La aplicación estará disponible en `http://localhost:3000`.

## 🧪 Testing

### Tests Unitarios

Ejecuta los tests unitarios con Vitest:

```bash
# Ejecutar una vez
npm run test

# Modo watch
npm run test:watch

# Interfaz UI
npm run test:ui
```

### Tests End-to-End

Ejecuta los tests E2E con Playwright:

```bash
# Ejecutar en modo headless
npm run test:e2e

# Ejecutar con interfaz UI
npm run test:e2e:ui

# Ejecutar en modo headed (con navegador visible)
npm run test:e2e:headed

# Modo debug
npm run test:e2e:debug
```

## 📁 Estructura del Proyecto

```
bemobile-marvel/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── icons/           # Iconos SVG
│   │   └── ui/              # Componentes de UI
│   │       ├── character-card.tsx
│   │       ├── fav-button.tsx
│   │       ├── fav-link.tsx
│   │       └── search-bar.tsx
│   ├── routes/              # Rutas de la aplicación
│   │   ├── home.tsx         # Página principal
│   │   ├── character.tsx   # Página de detalle
│   │   └── layout.tsx      # Layout principal
│   ├── services/            # Servicios y API
│   │   └── api.ts          # Cliente API
│   ├── types.tsx            # Tipos TypeScript
│   ├── app.css             # Estilos globales
│   └── root.tsx            # Componente raíz
├── e2e/                     # Tests end-to-end
│   ├── character.spec.ts
│   ├── favorites.spec.ts
│   ├── home.spec.ts
│   └── navigation.spec.ts
├── public/                  # Archivos estáticos
│   ├── favicon.ico
│   └── marvel-logo.svg
├── .react-router/           # Tipos generados por React Router
├── Dockerfile              # Configuración Docker
├── package.json            # Dependencias y scripts
├── react-router.config.ts  # Configuración React Router
├── tsconfig.json           # Configuración TypeScript
├── vite.config.ts          # Configuración Vite
└── vitest.setup.ts         # Configuración Vitest
```

## 🏗️ Arquitectura

### Stack Tecnológico

- **React Router v7**: Framework full-stack con SSR
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **TailwindCSS v4**: Framework CSS utility-first
- **Vite**: Build tool y dev server
- **Vitest**: Framework de testing unitario
- **Playwright**: Framework de testing E2E
- **Biome**: Linter y formateador

### Flujo de Datos

1. **Carga de datos**: Los datos se cargan mediante `clientLoader` en las rutas usando la API de Superhero API
2. **Estado local**: Los favoritos se gestionan con `useLocalStorage` de `usehooks-ts`
3. **Búsqueda**: Implementada con debounce para optimizar las peticiones
4. **Navegación**: React Router maneja el enrutamiento del lado del cliente y servidor

### API Externa

La aplicación consume datos de [Superhero API](https://github.com/akabab/superhero-api) a través de jsDelivr CDN:

- **Base URL**: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api`
- **Endpoints**:
  - `/all.json`: Lista completa de personajes
  - `/id/{id}.json`: Detalle de un personaje específico

### Componentes Principales

#### `CharacterCard`
Tarjeta que muestra un personaje con imagen, nombre y botón de favorito. Incluye efecto hover con animación CSS.

#### `FavButton`
Botón para agregar/quitar favoritos. Persiste el estado en localStorage y se sincroniza entre componentes.

#### `SearchBar`
Barra de búsqueda con debounce para filtrar personajes en tiempo real.

#### `FavLink`
Enlace en el header que muestra el contador de favoritos y navega a la página de favoritos.

### Rutas

- **`/`**: Página principal con lista de personajes y búsqueda
- **`/?favs=true`**: Vista de favoritos con filtrado
- **`/character/:characterId`**: Página de detalle del personaje

## 🎨 Estilos

El proyecto utiliza TailwindCSS v4 con configuración personalizada:

- **Color primario**: `oklch(0.6016 0.2335 27.05)` (rojo)
- **Fuente**: Roboto Condensed como fuente principal

Los estilos se definen en `app/app.css` usando la nueva sintaxis `@theme` de TailwindCSS v4.

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run typecheck`: Verifica tipos TypeScript
- `npm run lint`: Ejecuta el linter (Biome)
- `npm run format`: Formatea el código (Biome)
- `npm run check`: Ejecuta lint y format (Biome)
- `npm run test`: Ejecuta tests unitarios
- `npm run test:watch`: Tests unitarios en modo watch
- `npm run test:ui`: Tests unitarios con interfaz UI
- `npm run test:e2e`: Ejecuta tests E2E
- `npm run test:e2e:ui`: Tests E2E con interfaz UI
- `npm run test:e2e:headed`: Tests E2E con navegador visible
- `npm run test:e2e:debug`: Tests E2E en modo debug

## 📝 Configuración

### React Router

La configuración se encuentra en `react-router.config.ts`:
- SSR habilitado por defecto (`ssr: true`)

### TypeScript

Configuración en `tsconfig.json`:
- Path aliases: `~/*` apunta a `./app/*`
- Target: ES2022
- Strict mode habilitado

### Vite

Configuración en `vite.config.ts`:
- Plugins: TailwindCSS, React Router, tsconfig-paths
- Configuración de tests con jsdom

## 🧩 Funcionalidades Detalladas

### Sistema de Favoritos

- Los favoritos se almacenan en `localStorage` con la clave `favs-characters`
- El estado se sincroniza automáticamente entre todas las páginas
- El contador en el header se actualiza en tiempo real
- Los favoritos persisten entre sesiones del navegador

### Búsqueda

- Búsqueda en tiempo real con debounce de 500ms
- Filtrado tanto en la lista principal como en favoritos
- Búsqueda case-insensitive
- Muestra el número de resultados encontrados

### Página de Detalle

- Muestra imagen grande del personaje
- Información completa: biografía, trabajo, conexiones
- Botón de favorito integrado
- Diseño responsive con layout adaptativo