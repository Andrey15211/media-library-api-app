# NOVA Media Catalog

NOVA is a standalone portfolio case study focused on external API integration
and resilient frontend state. It presents an anime catalog through a cinematic,
neon interface with search, pagination, detail pages, genre filtering, and
browser-persistent favorites.

Русский язык используется по умолчанию. Интерфейс также полностью доступен на
английском языке.

## Why Nuxt 3

This project intentionally uses **Nuxt 3 + TypeScript + Tailwind CSS** instead
of Next.js. Nuxt provides file-based Vue routing, server API endpoints, SSR,
typed composables, and straightforward Vercel deployment while demonstrating
adaptability across frontend ecosystems.

## API setup

The app uses the public [Jikan v4 API](https://docs.api.jikan.moe/) for
MyAnimeList catalog data. No API key is required.

The API client lives in `server/utils/jikan.ts`. All remote responses are
normalized to the internal `MediaItem` type before reaching UI components.
When Jikan is unavailable, rate-limited, or returns unusable data, server routes
automatically use `server/data/mock-media.ts`. The demo therefore remains usable
without credentials or network-dependent setup.

Optional configuration:

```bash
cp .env.example .env
```

`NUXT_JIKAN_BASE_URL` defaults to `https://api.jikan.moe/v4`.

## Features

- Popular media spotlight and poster catalog
- Genre filtering
- Query-based search
- Loading, error, and empty states
- Server-backed pagination
- Rich title details and metadata
- Add/remove favorites with `localStorage` persistence
- Separate favorites page and empty state
- Responsive desktop and mobile layouts
- Keyboard focus styles and reduced-motion support
- Automatic mock fallback dataset
- Complete RU/EN interface localization with a persistent language switcher

## RU/EN localization

The interface uses a typed dictionary in `i18n/messages.ts` and a small Nuxt
composable in `composables/useI18n.ts`.

- `ru` is the default language for SSR and first visits.
- The header switcher changes the interface between RU and EN without reloading.
- The selected language is persisted in a cookie and `localStorage`.
- Navigation, controls, filters, loading/error/empty states, metadata labels,
  dates, media formats, genres, statuses, accessibility labels, and SEO copy are
  localized.
- Titles and descriptions returned by Jikan remain original catalog content.

## Local setup

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
npm test
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Import the repository into Vercel.
2. Keep the detected framework preset as **Nuxt.js**.
3. Use the default build command, `npm run build`.
4. No environment variables are required. Optionally add
   `NUXT_JIKAN_BASE_URL=https://api.jikan.moe/v4`.
5. Deploy. Nuxt's Nitro server endpoints run as Vercel functions.

## Skills demonstrated

- Designing a typed API client and normalization boundary
- Consuming a third-party REST API from server routes
- Handling rate limits and network failures with graceful fallback data
- Query-driven routing and pagination
- Async loading, error, retry, and empty-state UX
- Vue composables and local persistence
- Dynamic detail routes and SEO metadata
- Responsive component architecture and accessible interactions
- Production build and deployment configuration outside the React/Next.js stack
