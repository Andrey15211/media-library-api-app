import { describe, expect, it } from 'vitest'
import type { MediaItem } from '../types/media'
import { filterByGenre, normalizePage } from '../utils/catalog'

const items = [
  { id: 1, genres: ['Action', 'Fantasy'] },
  { id: 2, genres: ['Drama'] },
  { id: 3, genres: ['Action'] }
] as MediaItem[]

describe('filterByGenre', () => {
  it('returns every item when no genre is active', () => {
    expect(filterByGenre(items, 'All')).toHaveLength(3)
  })

  it('matches genres case-insensitively', () => {
    expect(filterByGenre(items, 'action').map(item => item.id)).toEqual([1, 3])
  })
})

describe('normalizePage', () => {
  it('clamps invalid pages to available bounds', () => {
    expect(normalizePage(-2, 5)).toBe(1)
    expect(normalizePage(8, 5)).toBe(5)
  })
})
