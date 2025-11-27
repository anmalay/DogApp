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

**Component Priority Rules (CRITICAL FOR NATIVE APP):**
1. **FIRST: Use existing components from @shared/ui** when they provide the needed functionality
2. **SECOND: Use Ionic components** when shared components don't exist (IonModal, IonButton, IonInput, IonImg, IonIcon, IonPopover, etc.)
3. **THIRD: Create custom components** only when neither shared nor Ionic components provide the needed functionality
- 🔴 **MANDATORY:** ALWAYS use `Text` component from `@shared/ui` for ALL text elements (no `<h1>`, `<h2>`, `<p>`, `<span>`)
- 🔴 **MANDATORY:** ALWAYS use `IonImg` instead of `<img>` for native image handling
- 🔴 **MANDATORY:** ALWAYS use `IonIcon` (import from `ionicons/icons`) instead of emoji or custom SVG icons
- 🔴 **MANDATORY:** NEVER use `<input>` or `<textarea>` - use `IonInput`/`IonTextarea` or custom wrappers from `@shared/ui`
- 🔴 **MANDATORY:** NEVER use `<button>` - use `IonButton` or `Button` component from `@shared/ui`
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

**Capacitor Native Features:**
- **Available Plugins:** Camera, Geolocation, Haptics, Keyboard, StatusBar, PushNotifications, App
- **Usage Pattern:** Always import from `@capacitor/[plugin-name]` and check platform before using
- **Error Handling:** Wrap Capacitor calls in try/catch blocks for web fallbacks
- **Example Usage:** 
  ```typescript
  import { Camera, CameraResultType } from '@capacitor/camera';
  import { Capacitor } from '@capacitor/core';
  
  if (Capacitor.isNativePlatform()) {
    const image = await Camera.getPhoto({ resultType: CameraResultType.Uri });
  }
  ```

## Critical Best Practices & Anti-Patterns

**IONIC PAGE STRUCTURE - MANDATORY REQUIREMENTS:**
- ✅ **ALWAYS WRAP PAGES IN:** `<IonPage><IonContent>...content...</IonContent></IonPage>`
- ❌ **NEVER USE:** `<IonPage><div>...content...</div></IonPage>` (missing IonContent)
- ✅ **REQUIRED STRUCTURE:** Every page must have `IonContent` for proper transitions and scrolling
- ✅ **LAYOUT CONTAINERS:** Use `IonGrid`, `IonRow`, `IonCol` instead of `div` grids when possible
- ✅ **LIST CONTAINERS:** Use `IonList`, `IonItem` instead of `ul`, `li` for mobile optimization
- ✅ **CARD CONTAINERS:** Use `IonCard`, `IonCardHeader`, `IonCardContent` instead of generic divs
- ✅ **HEADER/FOOTER:** Use `IonHeader`, `IonToolbar`, `IonFooter` for native-like behavior

**PROPER PAGE ARCHITECTURE (CRITICAL FOR FUTURE DEVELOPMENT):**
```typescript
// ✅ CORRECT: Page component (top-level route)
export const MyPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <MyFeatureComponent />
      </IonContent>
    </IonPage>
  );
};

// ✅ CORRECT: Feature component (child of page)
export const MyFeatureComponent: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Content here - NO IonPage/IonContent */}
    </div>
  );
};

// ❌ WRONG: Feature component with IonPage/IonContent
export const MyFeatureComponent: React.FC = () => {
  return (
    <IonPage>  {/* ❌ Creates nesting conflict! */}
      <IonContent>
        <div>Content</div>
      </IonContent>
    </IonPage>
  );
};
```

**RULES FOR MULTI-SCREEN FLOWS:**
- Only **ONE** `IonPage` + `IonContent` per route
- Child components return plain JSX (div/Ionic components)
- Use conditional rendering for screen switching within one route
- Example: OnboardingPage switches between StepperIntroView/DogProfileStepper/VerificationView without nested IonPage

**NAVIGATION - USE PROPER IONIC ROUTER:**
- ✅ **CORRECT:** `const router = useIonRouter(); router.push('/path', 'forward', 'push');`
- ✅ **CORRECT:** `router.goBack();` for back navigation
- ❌ **WRONG:** `const history = useHistory(); history.goBack();` (use useIonRouter instead)
- ❌ **WRONG:** `window.history.back()` or `window.location.href`
- ✅ **TRANSITIONS:** Always specify direction: `router.push(path, 'forward'|'back', 'push'|'replace')`

**IONIC COMPONENT HIERARCHY - REPLACE HTML WITH IONIC:**
- 🔴 **NATIVE APP REQUIREMENT:** This app runs natively on mobile devices via Capacitor - ALL components MUST use Ionic equivalents for proper native behavior
- ✅ **BUTTONS:** Use `IonButton` instead of `<button>` for native styling and haptics
- ✅ **INPUTS:** Use `IonInput`, `IonTextarea` instead of `<input>`, `<textarea>` (MANDATORY for native keyboard)
- ✅ **IMAGES:** Use `IonImg` instead of `<img>` for lazy loading and caching
- ✅ **CONTAINERS:** Use `IonCard`, `IonItem`, `IonGrid` instead of generic `<div>` when possible
- ✅ **LISTS:** Use `IonList`, `IonItem`, `IonLabel` instead of `<ul>`, `<li>` for native scrolling
- ✅ **MODALS:** Use `IonModal`, `IonPopover` instead of custom overlay solutions
- ✅ **LOADING:** Use `IonLoading`, `IonSpinner` instead of custom loading indicators
- ✅ **ICONS:** Use `IonIcon` with ionicons library (import from `ionicons/icons`)
- ✅ **TABS:** Use `IonTabs`, `IonTabBar`, `IonTabButton` for tab navigation
- ✅ **PROGRESS:** Use `IonProgressBar` instead of custom progress indicators
- ✅ **TEXT ELEMENTS:** Use `Text` component from `@shared/ui` instead of `<h1>`, `<h2>`, `<p>`, `<span>`
- ❌ **NEVER USE:** `<input>`, `<textarea>`, `<button>`, `<img>`, `<h1-h6>`, `<p>` - these break native behavior
- ❌ **AVOID:** Generic HTML elements when Ionic equivalents exist

**MANDATORY IONIC INTEGRATION RULES:**
- 🔴 **ALWAYS USE:** Capacitor Keyboard plugin with `KeyboardResize.Ionic` for keyboard handling
- 🔴 **NEVER OVERRIDE:** Ionic's native keyboard behavior with custom CSS or JS
- 🔴 **ALWAYS PLACE:** Navigation buttons INSIDE IonContent, never as fixed overlays
- 🔴 **ALWAYS USE:** Ionic's built-in viewport and safe area handling
- 🔴 **FORCE IONIC:** When using third-party components (Swiper, etc), add CSS to force Ionic mechanisms:
  ```css
  /* Force stable heights to prevent conflicts */
  .third-party-component {
    height: 100% !important;
    min-height: 100% !important;
  }
  /* Ensure Ionic keyboard handling takes precedence */
  ion-content.keyboard-open .third-party-component {
    height: 100% !important;
  }
  ```
- 🔴 **KEYBOARD RESTORATION:** Always use multiple setTimeout attempts to restore viewport after keyboard hide
- 🔴 **SWIPER INTEGRATION:** When using Swiper with Ionic, force height restoration and call `updateSize()` on keyboard events

**IONIC COMPONENT NESTING CONFLICTS - CRITICAL:**
- ❌ **NEVER NEST:** `IonPage` inside another `IonPage` (only one per route/screen)
- ❌ **NEVER NEST:** `IonContent` inside another `IonContent` (causes scroll conflicts)
- ✅ **RULE:** Only the top-level page component should have `IonPage` + `IonContent`
- ✅ **RULE:** Child components should return plain divs or Ionic components (no IonPage/IonContent)
- ❌ **WRONG:** Page → Component → IonPage (nested IonPage)
- ✅ **CORRECT:** Page (IonPage + IonContent) → Component (div/Ionic components)

**CODE QUALITY RULES:**
- ❌ **NEVER USE:** `console.log()` in production code (remove all debug statements)
- ❌ **NEVER USE:** `any` types (always specify proper TypeScript types)
- ❌ **NEVER USE:** Direct DOM manipulation (use React refs and proper patterns)
- ❌ **NEVER USE:** `!important` in CSS/Tailwind (breaks maintainability and specificity)
- ✅ **ALWAYS USE:** Proper React hooks and patterns
- ✅ **ALWAYS USE:** Proper error handling (try/catch, error boundaries)
- ✅ **ALWAYS USE:** Semantic HTML and accessibility best practices
- ✅ **CSS PRIORITY:** Use proper CSS specificity and Tailwind utilities instead of `!important`

**TYPESCRIPT RULES:**
- Define proper interfaces instead of `any`
- Use union types for restricted values
- Proper error handling with typed errors
- No implicit any, enable strict mode compliance