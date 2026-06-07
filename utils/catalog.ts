import type { MediaItem } from '~/types/media'

export function filterByGenre(items: MediaItem[], genre: string) {
  if (!genre || genre.toLowerCase() === 'all') return items
  const target = genre.toLowerCase()
  return items.filter(item => item.genres.some(value => value.toLowerCase() === target))
}

export function normalizePage(page: number, totalPages: number) {
  const max = Math.max(1, totalPages)
  return Math.min(Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1), max)
}
