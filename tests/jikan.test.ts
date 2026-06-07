import { describe, expect, it } from 'vitest'
import { normalizeJikanItem } from '../server/utils/jikan'

describe('normalizeJikanItem', () => {
  it('maps external API fields into the internal media contract', () => {
    const result = normalizeJikanItem({
      mal_id: 21,
      title: 'Neon Story',
      title_english: 'Neon Story EN',
      synopsis: 'A complete synopsis.',
      images: { webp: { large_image_url: 'poster.webp' }, jpg: {} },
      trailer: { url: 'https://example.com/trailer', images: { maximum_image_url: 'banner.jpg' } },
      score: 8.42,
      aired: { from: '2024-01-10T00:00:00+00:00' },
      year: 2024,
      genres: [{ name: 'Action' }],
      studios: [{ name: 'Studio Nova' }],
      status: 'Finished Airing',
      type: 'TV',
      episodes: 12,
      duration: '24 min per ep',
      rating: 'PG-13',
      source: 'Manga'
    })

    expect(result).toMatchObject({
      id: 21,
      title: 'Neon Story',
      image: 'poster.webp',
      genres: ['Action'],
      studios: ['Studio Nova'],
      rating: 8.42
    })
  })
})
