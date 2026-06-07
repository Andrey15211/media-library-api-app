# NOVA Media Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Nuxt 3 media catalog with API-backed search, details, pagination, and persistent favorites.

**Architecture:** Nuxt server endpoints isolate and normalize Jikan API responses, with a local mock catalog as an automatic fallback. Typed client composables expose catalog and favorites state to focused page and component modules.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, Tailwind CSS, Vitest

---

### Task 1: Foundation and contracts

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `tailwind.config.ts`
- Create: `types/media.ts`
- Create: `utils/catalog.ts`
- Test: `tests/catalog.test.ts`

- [ ] Add failing tests for genre filtering and page bounds.
- [ ] Run `npm test` and confirm missing implementation failures.
- [ ] Implement the media contract and catalog helpers.
- [ ] Run `npm test` and confirm the helper tests pass.

### Task 2: API and fallback

**Files:**
- Create: `server/data/mock-media.ts`
- Create: `server/utils/jikan.ts`
- Create: `server/api/media/popular.get.ts`
- Create: `server/api/media/search.get.ts`
- Create: `server/api/media/[id].get.ts`
- Test: `tests/jikan.test.ts`

- [ ] Add failing normalization tests for Jikan list and detail records.
- [ ] Implement the Jikan client, normalization, timeout, and mock fallback.
- [ ] Implement popular, search, and detail server endpoints.
- [ ] Run the complete test suite.

### Task 3: Client state and reusable UI

**Files:**
- Create: `composables/useCatalog.ts`
- Create: `composables/useFavorites.ts`
- Create: `components/AppHeader.vue`
- Create: `components/SearchBar.vue`
- Create: `components/GenreFilters.vue`
- Create: `components/MediaCard.vue`
- Create: `components/MediaGrid.vue`
- Create: `components/PaginationControls.vue`
- Create: `components/StatusPanel.vue`

- [ ] Implement typed catalog requests and favorites persistence.
- [ ] Implement accessible reusable controls and poster cards.
- [ ] Add loading, error, empty, and pagination components.

### Task 4: Pages and visual system

**Files:**
- Create: `app.vue`
- Create: `assets/css/main.css`
- Create: `pages/index.vue`
- Create: `pages/search.vue`
- Create: `pages/media/[id].vue`
- Create: `pages/favorites.vue`

- [ ] Implement the spotlight-led home page and genre filtering.
- [ ] Implement query-based search with pagination and all async states.
- [ ] Implement the metadata-rich detail page.
- [ ] Implement favorites with populated and empty states.
- [ ] Verify keyboard focus, responsive layout, and reduced motion.

### Task 5: Documentation and verification

**Files:**
- Create: `.env.example`
- Create: `.gitignore`
- Create: `README.md`

- [ ] Document goal, framework choice, API behavior, setup, features, and Vercel deployment.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start the development server and inspect desktop and mobile with CloakBrowser.
- [ ] Fix material layout, readability, proportions, hover, and responsive issues.
- [ ] Repeat tests, production build, and browser screenshots.
