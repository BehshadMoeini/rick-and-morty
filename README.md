# 🚀 Rick and Morty Explorer

> **A modern, feature-rich web application to explore the Rick and Morty multiverse**

![Rick and Morty Explorer](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-0081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.20.4-FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

## ✨ Features

### 🔍 **Advanced Search & Filtering**

- **Global Search**: Search characters by name with real-time results and debounced input
- **Keyboard Shortcut**: Press `Ctrl+K` to quickly focus the search bar from anywhere
- **Smart Filters**: Filter by status (Alive, Dead, Unknown), gender, and species with emoji indicators
- **URL Synchronization**: Shareable URLs that maintain search and filter states across sessions
- **Debounced Search**: Optimized search with 500ms debounce to reduce API calls and improve performance
- **Active Filter Indicators**: Visual chips showing currently applied filters with quick clear options

### 📱 **Modern User Interface**

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices with adaptive layouts
- **Dark/Light Theme**: Toggle between themes with system preference detection and persistent storage
- **Material-UI Components**: Beautiful, accessible UI components with consistent design language
- **Smooth Animations**: Enhanced user experience with hover effects, transitions, and loading states
- **Sticky Navigation**: Always accessible navigation bar with seamless search integration
- **Mobile-First Design**: Touch-friendly interface optimized for mobile interactions

### 🎯 **Character Management**

- **Character Grid**: Browse characters in an organized, responsive grid layout with hover effects
- **Detailed Character Pages**: View comprehensive character information including:
  - Personal details (status, species, gender, origin, location)
  - Episode appearances with episode count and first appearance
  - High-quality character images with zoom effects
  - Related character information and navigation
- **Infinite Scrolling**: Seamless browsing experience with automatic content loading using intersection observer
- **Character Prefetching**: Smart preloading on hover for instant navigation and improved performance
- **Character Cards**: Rich cards with status indicators, favorite toggles, and quick action buttons

### ❤️ **Favorites System**

- **Persistent Favorites**: Save your favorite characters with localStorage persistence across sessions
- **Favorites Counter**: Visual badge indicator in navigation showing current favorite count
- **Dedicated Favorites Page**: Easy access to all your saved characters with search functionality
- **Quick Toggle**: Add/remove favorites directly from character cards with instant feedback
- **Favorites Search**: Search through your favorite characters with real-time filtering
- **Optimistic Updates**: Instant UI feedback while favorites are being updated

### 🚀 **Performance Optimizations**

- **React Query Integration**: Advanced caching, background updates, and intelligent error handling
- **Optimistic Updates**: Instant UI feedback for better user experience during data operations
- **Smart Prefetching**: Preload character details on hover for instant navigation
- **Efficient Pagination**: Infinite scroll with proper cache management and memory optimization
- **Bundle Optimization**: Vite-powered build system for fast loading and optimal bundle sizes
- **GraphQL Queries**: Efficient data fetching with structured queries and proper error handling
- **Image Optimization**: Lazy loading and optimized image delivery for faster page loads

### 🎨 **Enhanced User Experience**

- **Sticky Navigation**: Always accessible navigation with integrated search functionality
- **Loading States**: Beautiful loading indicators, skeletons, and progress indicators
- **Error Boundaries**: Graceful error handling with user-friendly messages and recovery options
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Progressive Enhancement**: Core functionality works with or without JavaScript
- **Visual Feedback**: Hover effects, focus states, and interactive animations
- **Responsive Images**: Adaptive image loading based on device capabilities
- **Context-Aware UI**: Interface adapts based on current page and user actions

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.0** - Latest React with concurrent features and enhanced performance
- **TypeScript 5.8.3** - Type-safe development with strict type checking
- **Vite 7.0.4** - Lightning-fast build tool and development server with HMR

### **UI & Styling**

- **Material-UI 7.2.0** - Comprehensive React component library with theming
- **Emotion 11.14.0** - Performant CSS-in-JS styling solution
- **Material Icons 7.2.0** - Beautiful, consistent iconography

### **Data Management**

- **TanStack React Query 5.20.4** - Powerful data synchronization with intelligent caching
- **Zustand 4.5.1** - Lightweight state management for client-side state
- **Axios 1.6.7** - HTTP client for API requests with interceptors
- **GraphQL 16.11.0** - Efficient data fetching with typed queries
- **GraphQL Request 7.2.0** - Lightweight GraphQL client

### **Routing & Navigation**

- **React Router DOM 6.22.2** - Declarative routing with nested routes
- **React Intersection Observer 9.8.1** - Optimized infinite scrolling and visibility detection

### **Development Tools**

- **ESLint 9.30.1** - Code linting and quality enforcement with modern config
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting rules
- **React Hooks ESLint 5.2.0** - Hooks usage validation and best practices
- **Vite React Plugin 4.6.0** - Fast refresh and optimized development experience

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **Package Manager**: npm (comes with Node.js) or **yarn** - [Install yarn](https://yarnpkg.com/getting-started/install)
- **Git** - [Download here](https://git-scm.com/downloads)

### Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BehshadMoeini/rick-and-morty-explorer.git
   cd rick_and_morty
   ```

2. **Install dependencies:**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. **Start the development server:**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

4. **Open the application:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes
   - Use `Ctrl+C` to stop the development server

### Available Scripts

```bash
# Development
npm run dev          # Start development server
yarn dev

# Production Build
npm run build        # Build for production
yarn build

# Preview Production Build
npm run preview      # Preview production build locally
yarn preview

# Code Quality
npm run lint         # Run ESLint
yarn lint
```

## 📁 Project Structure

```
rick_and_morty/
├── 📁 public/                  # Static assets
│   ├── 🎨 favicon.svg         # Application favicon
│   └── 🎨 Rick_and_Morty.svg  # Main logo and branding
├── 📁 src/
│   ├── 📁 api/                # API layer and data fetching
│   │   ├── 📄 queries.ts      # GraphQL queries and fragments
│   │   └── 📄 rickAndMortyApi.ts  # API client, types, and utilities
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📄 CharacterCard.tsx   # Individual character display card
│   │   ├── 📄 CharacterList.tsx   # Character grid with infinite scroll
│   │   ├── 📄 Filters.tsx         # Advanced filtering component
│   │   ├── 📄 Layout.tsx          # Main layout wrapper with routing
│   │   └── 📄 Navbar.tsx          # Navigation with search and theme toggle
│   ├── 📁 contexts/           # React contexts for global state
│   │   └── 📄 ThemeContext.tsx    # Theme management and persistence
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📄 useCharacterPrefetch.ts  # Smart character prefetching
│   │   ├── 📄 useCharacters.ts        # Character data fetching hooks
│   │   └── 📄 useDebounce.ts          # Debounced input optimization
│   ├── 📁 pages/              # Page components and routing
│   │   ├── 📄 CharacterDetailPage.tsx  # Individual character details
│   │   ├── 📄 FavoritesPage.tsx       # Favorites management
│   │   └── 📄 HomePage.tsx            # Main landing page
│   ├── 📁 store/              # State management
│   │   └── 📄 favorites.ts    # Favorites store with Zustand
│   ├── 📄 App.tsx             # Main application component
│   ├── 📄 main.tsx            # Application entry point
│   ├── 📄 theme.ts            # Material-UI theme configuration
│   ├── 📄 index.css           # Global styles and CSS reset
│   └── 📄 vite-env.d.ts       # Vite type definitions
├── 📄 index.html              # HTML template
├── 📄 vite.config.ts          # Vite configuration and plugins
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 tsconfig.app.json       # App-specific TypeScript config
├── 📄 tsconfig.node.json      # Node.js TypeScript config
├── 📄 eslint.config.js        # ESLint configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 REACT_QUERY_IMPLEMENTATION.md  # React Query documentation
└── 📄 README.md               # Project documentation
```

## 🔧 Key Features Implementation

### 🔍 Search Functionality

- **Real-time Search**: Instant character search with URL synchronization
- **Keyboard Shortcuts**: `Ctrl+K` for quick search access
- **Debounced Input**: 500ms debounce prevents excessive API calls
- **Search History**: URL-based search state persistence

### 🎨 State Management Architecture

- **Server State**: React Query handles all API data with intelligent caching
- **Client State**: Zustand manages favorites with localStorage persistence
- **UI State**: React Context for theme management with system preference detection
- **URL State**: React Router manages navigation and search parameters

### ⚡ Performance Optimizations

- **Infinite Scrolling**: Intersection Observer for seamless character browsing
- **Smart Prefetching**: Hover-triggered character detail preloading
- **Optimized Queries**: Structured query keys for efficient cache management
- **Code Splitting**: Dynamic imports for optimal bundle sizes
- **Image Optimization**: Lazy loading and responsive images

## 🌐 API Integration

This application integrates with the **Rick and Morty GraphQL API** for efficient data fetching:

- **Endpoint**: `https://rickandmortyapi.com/graphql`
- **Query Type**: GraphQL with structured queries and fragments
- **Features**: Character search, filtering, pagination, and detailed character information
- **Documentation**: [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation)

### GraphQL Implementation

- **Structured Queries**: Organized GraphQL queries with reusable fragments
- **Efficient Fetching**: Only request needed data fields to optimize performance
- **Error Handling**: Comprehensive error states with proper retry logic
- **Type Safety**: Full TypeScript integration with generated types

### Query Optimization Strategy

- **Structured Query Keys**: Hierarchical cache keys for precise invalidation
- **Background Refetching**: Automatic data synchronization with smart intervals
- **Prefetching**: Proactive data loading for improved user experience
- **Cache Management**: Intelligent cache retention and garbage collection

## 🎮 User Guide

### 🏠 Navigation

- **Home Page**: Browse all characters with search and filtering capabilities
- **Character Details**: Click any character card for comprehensive information
- **Favorites Page**: Manage and search through your saved characters
- **Responsive Design**: Seamless experience across all device sizes

### ⌨️ Keyboard Shortcuts

| Shortcut | Action           | Available On |
| -------- | ---------------- | ------------ |
| `Ctrl+K` | Focus search bar | Home page    |

### 🔍 Search & Filter Guide

1. **Text Search**: Use the search bar to find characters by name (real-time results)
2. **Status Filter**: Filter by Alive 🟢, Dead 🔴, or Unknown ⚪ status
3. **Species Filter**: Choose from Human 👤, Alien 👽, Robot 🤖, and more
4. **Gender Filter**: Filter by Female 👩, Male 👨, Genderless ⚪, or Unknown ❓
5. **Combine Filters**: Use multiple filters together for precise results
6. **Share Results**: Copy the URL to share your search results with others
7. **Clear Filters**: Use the "Clear All" button to reset all active filters
