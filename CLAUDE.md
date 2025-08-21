# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ionic React dog walking app built with Vite, TypeScript, and Tailwind CSS. The app targets mobile platforms through Capacitor and uses Feature-Sliced Design (FSD) architecture.

## Development Commands

**Build & Development:**
```bash
npm run dev          # Start development server
npm run build        # Build for production (runs TypeScript check + Vite build)
npm run preview      # Preview production build
```

**Testing:**
```bash
npm run test.unit    # Run unit tests with Vitest
npm run test.e2e     # Run E2E tests with Cypress
```

**Code Quality:**
```bash
npm run lint         # Run ESLint
```

**API Management:**
```bash
npm run api:generate # Generate API client from OpenAPI spec
npm run api:watch    # Watch for OpenAPI changes and regenerate
npm run api:clean    # Remove generated API files
```

## Architecture

**Feature-Sliced Design (FSD):**
The project follows FSD methodology with these layers:
- `src/shared/` - Shared utilities, components, API client, store, hooks
- `src/entities/` - Business entities (currently empty)
- `src/features/` - Feature-specific logic (currently empty)
- `src/widgets/` - Large UI blocks (layout components)
- `src/pages/` - Route-level pages
- `src/app/` - App initialization and routing

**Key Technologies:**
- **UI Framework:** Ionic React with iOS mode for consistent design
- **State Management:** Zustand with persistence and devtools
- **API:** Auto-generated client using Orval from OpenAPI spec
- **Data Fetching:** TanStack React Query
- **Styling:** Tailwind CSS + Ionic CSS variables
- **Internationalization:** i18next with English and Russian translations
- **Mobile:** Capacitor for native functionality

**API Configuration:**
- Development API: `http://localhost/api`
- Production API: `https://api.yourapp.com` (placeholder - needs updating)
- Auto-generated types and hooks from OpenAPI spec at `/api/openapi/v1.json`
- MSW mocking enabled for development

**Component Generation:**
Use Plop.js for scaffolding:
```bash
npx plop page    # Generate new page
npx plop ui      # Generate UI component in any FSD layer
```

**Store Structure:**
Global app state managed by Zustand includes user authentication, app preferences (language, theme), loading states, and onboarding status. State is persisted to localStorage.

**Mobile Development:**
Capacitor configuration uses `dist/` as web directory. The app is configured as a generic Ionic starter but should be updated with proper app ID and name for production.