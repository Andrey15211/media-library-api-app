import type { CatalogResponse } from '../../types/media'
import { mockMedia } from '../data/mock-media'

export function getMockCatalog(query = '', page = 1, limit = 8): CatalogResponse {
  const needle = query.trim().toLowerCase()
  const matched = needle
    ? mockMedia.filter(item => [
        item.title,
        item.titleEnglish,
        item.description,
        ...item.genres,
        ...item.studios
      ].filter(Boolean).some(value => String(value).toLowerCase().includes(needle)))
    : mockMedia
  const totalPages = Math.max(1, Math.ceil(matched.length / limit))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const offset = (safePage - 1) * limit

  return {
    items: matched.slice(offset, offset + limit),
    page: safePage,
    totalPages,
    totalItems: matched.length,
    source: 'mock'
  }
}
