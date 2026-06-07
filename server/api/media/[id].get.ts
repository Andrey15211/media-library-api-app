import type { MediaItem } from '../../../types/media'
import { mockMedia } from '../../data/mock-media'
import { fetchJikan, normalizeJikanItem } from '../../utils/jikan'

export default defineEventHandler(async (event): Promise<MediaItem> => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid media id' })

  try {
    const response = await fetchJikan<any>(`/anime/${id}/full`)
    if (!response?.data) throw new Error('Jikan returned no title')
    return normalizeJikanItem(response.data)
  } catch {
    const fallback = mockMedia.find(item => item.id === id)
    if (!fallback) throw createError({ statusCode: 404, statusMessage: 'Title not found' })
    return fallback
  }
})
