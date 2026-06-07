import type { CatalogResponse, MediaItem } from '../../types/media'

interface JikanPagination {
  last_visible_page?: number
  items?: { total?: number }
}

interface JikanListResponse {
  data?: unknown[]
  pagination?: JikanPagination
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === 'object' ? value as Record<string, any> : {}
}

export function normalizeJikanItem(input: unknown): MediaItem {
  const item = asRecord(input)
  const images = asRecord(item.images)
  const webp = asRecord(images.webp)
  const jpg = asRecord(images.jpg)
  const trailer = asRecord(item.trailer)
  const trailerImages = asRecord(trailer.images)
  const aired = asRecord(item.aired)

  return {
    id: Number(item.mal_id),
    title: String(item.title || item.title_english || 'Untitled'),
    titleEnglish: item.title_english || undefined,
    description: String(item.synopsis || 'No synopsis is available for this title yet.'),
    image: String(webp.large_image_url || jpg.large_image_url || webp.image_url || jpg.image_url || ''),
    bannerImage: trailerImages.maximum_image_url || trailerImages.large_image_url || undefined,
    rating: typeof item.score === 'number' ? item.score : null,
    releaseDate: typeof aired.from === 'string' ? aired.from : null,
    year: typeof item.year === 'number' ? item.year : null,
    genres: Array.isArray(item.genres) ? item.genres.map((genre: any) => String(genre.name)) : [],
    studios: Array.isArray(item.studios) ? item.studios.map((studio: any) => String(studio.name)) : [],
    status: String(item.status || 'Unknown'),
    format: String(item.type || 'Unknown'),
    episodes: typeof item.episodes === 'number' ? item.episodes : null,
    duration: item.duration || undefined,
    ageRating: item.rating || undefined,
    source: item.source || undefined,
    trailerUrl: trailer.url || undefined
  }
}

export function normalizeJikanList(response: JikanListResponse, page: number): CatalogResponse {
  const items = Array.isArray(response.data) ? response.data.map(normalizeJikanItem) : []
  return {
    items,
    page,
    totalPages: Math.max(1, response.pagination?.last_visible_page || 1),
    totalItems: response.pagination?.items?.total || items.length,
    source: 'api'
  }
}

export async function fetchJikan<T>(path: string, query?: Record<string, string | number>) {
  const config = useRuntimeConfig()
  return await $fetch<T>(`${config.jikanBaseUrl}${path}`, {
    query,
    timeout: 6500,
    retry: 1,
    headers: { accept: 'application/json' }
  })
}
