# NOVA Media Catalog Design

## Product

NOVA is a standalone portfolio case study showing API integration in a framework
different from the surrounding Next.js projects. It uses Nuxt 3, TypeScript, and
Tailwind CSS to deliver an anime and entertainment catalog with a cinematic,
neon streaming-service visual language.

## Experience

The home page opens with a compact navigation bar, a large featured title, a
prominent search field, genre filters, and poster-led popular content. Search
uses a dedicated results page with query state, pagination, loading, error, and
empty states. Details show a large cover, synopsis, rating, release information,
genres, studios, format, episode count, and status. Favorites persist in
`localStorage` and have a dedicated empty and populated view.

## Architecture

Nuxt server routes call the public Jikan API. The external response is normalized
into a small internal `MediaItem` type by a dedicated API client. Network errors,
rate limits, or malformed responses fall back to a local dataset, so the
portfolio demo remains functional without keys or setup.

Client composables own asynchronous catalog state and favorites persistence.
Pages compose focused components for navigation, search, filters, cards, states,
and pagination. No component depends on Jikan-specific response shapes.

## Visual System

The interface uses near-black and graphite surfaces, warm white typography,
electric violet and cyan accents, restrained glow, and 2:3 poster artwork.
The first viewport is anchored by a cinematic spotlight rather than dashboard
panels. Cards use scale, border-color, and image treatment for hover feedback.
Mobile collapses navigation, stacks the hero, and preserves readable poster
proportions.

## Quality

Behavioral helpers and API normalization are covered with Vitest. Verification
includes tests, Nuxt production build, and live browser checks at desktop and
mobile widths. Accessibility includes semantic landmarks, labels, visible focus
states, button names, reduced-motion handling, and sufficient contrast.
