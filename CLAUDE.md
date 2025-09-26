# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ionic React dog walking app built with Vite, TypeScript, and Tailwind CSS. The app targets mobile platforms through Capacitor and uses Feature-Sliced Design (FSD) architecture. The app includes a multi-step dog profile onboarding flow, user authentication, and internationalization support.

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

**Component Priority Rules:**
1. **FIRST: Use existing components from @shared/ui** when they provide the needed functionality
2. **SECOND: Use Ionic components** when shared components don't exist (IonModal, IonButton, IonInput, IonPopover, etc.)
3. **THIRD: Create custom components** only when neither shared nor Ionic components provide the needed functionality
- **ALWAYS use Text component from @shared/ui** for all text elements instead of div, span, p, or h tags with manual styling
- When using Ionic components, overlay custom styling/behavior rather than recreating from scratch
- Examples: Use IonModal with custom content instead of building custom modal, use IonInput with custom wrapper instead of pure HTML input
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

## Key Architecture Details

**Onboarding Flow:**
The app features a comprehensive dog profile creation process managed by `useDogProfileStepper.ts` hook:
- 10-step onboarding: Welcome → Dog Name → Gender → Weight → Breed → Birth Date → Health → Character → Comment → Photos → Owner Info
- Each step has validation and error handling
- Progress tracking with visual stepper header
- Data structure defined in `src/features/onboarding/model/types.ts`
- Complex multi-step state management with Zustand integration

**Internationalization System:**
- Uses i18next with English keys and Russian translations
- Configuration in `src/i18n/config.ts` with `changeLanguage()` helper
- All user-facing text wrapped in `t()` calls with English keys
- Complex interpolated text uses `Trans` component
- Translation files: `translation.en.json` and `translation.ru.json`
- Switch languages via `changeLanguage('en')` or `changeLanguage('ru')`

**State Management Architecture:**
- Zustand store (`app.store.ts`) handles global state including:
  - User authentication and profile data
  - App preferences (language, theme)
  - Onboarding status and loading states
- State persisted to localStorage with selective persistence
- DevTools integration enabled for debugging

**Routing Structure:**
- Currently minimal: single `/welcome` route redirecting from root
- Uses Ionic React Router with React Router v5
- Tab-based navigation structure prepared but not fully implemented
- Route definitions in `src/app/routes/AppRoutes.tsx`

**Component Generation System:**
Plop.js templates support FSD architecture:
- Page generation: Creates complete page structure with lazy loading
- UI component generation: Supports all FSD layers (shared, features, widgets, etc.)
- Automatic index.ts file management and exports

## Development Guidelines

**Working with Translations:**
- Always use English keys in `t()` calls: `t("Create Account")` not `t("Создать аккаунт")`
- Add new keys to both `translation.en.json` and `translation.ru.json`
- Use `Trans` component for complex text with interpolation: `<Trans i18nKey="Profile is {{percentage}}% complete" values={{percentage: 85}} />`

**Onboarding Flow Modifications:**
- Step modifications require updates to `useDogProfileStepper.ts` validation logic
- New steps need corresponding UI components in `src/features/onboarding/ui/steps/`
- Update total step count in `DogProfileStepper.tsx` and progress calculation
- Data structure changes require updates to `DogProfileData` interface in `types.ts`

**State Management Patterns:**
- Use `useAppStore()` for global app state (auth, preferences)
- Feature-specific state should use local hooks (like `useDogProfileStepper`)
- Persistent data goes through Zustand's `partialize` function in store config

**API Integration Notes:**
- API client auto-generated from OpenAPI spec via Orval
- Development uses MSW mocking (configured in `orval.config.ts`)
- Generated files in `src/shared/api/generated/` should not be edited manually
- Custom API instance with auth handling in `src/shared/api/client.ts`

**Ionic React Considerations:**
- App uses iOS mode for consistent design across platforms
- Ionic components preferred over basic HTML elements for mobile optimization
- Navigation uses Ionic Router with React Router v5 (not v6)
- Capacitor plugins available for native functionality (camera, geolocation, etc.)

## Critical Best Practices & Anti-Patterns

**NAVIGATION - USE PROPER REACT ROUTER:**
- ✅ **CORRECT:** `const history = useHistory(); history.goBack();`
- ❌ **WRONG:** `window.history.back()`
- ✅ **CORRECT:** `history.push('/path')` or `history.replace('/path')`
- ❌ **WRONG:** `window.location.href = '/path'`

**CODE QUALITY RULES:**
- ❌ **NEVER USE:** `console.log()` in production code (remove all debug statements)
- ❌ **NEVER USE:** `any` types (always specify proper TypeScript types)
- ❌ **NEVER USE:** Direct DOM manipulation (use React refs and proper patterns)
- ✅ **ALWAYS USE:** Proper React hooks and patterns
- ✅ **ALWAYS USE:** Proper error handling (try/catch, error boundaries)
- ✅ **ALWAYS USE:** Semantic HTML and accessibility best practices

**TYPESCRIPT RULES:**
- Define proper interfaces instead of `any`
- Use union types for restricted values
- Proper error handling with typed errors
- No implicit any, enable strict mode compliance