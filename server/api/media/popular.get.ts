import type { CatalogResponse } from '../../../types/media'
import { getMockCatalog } from '../../utils/mock-catalog'
import { fetchJikan, normalizeJikanList } from '../../utils/jikan'

export default defineEventHandler(async (event): Promise<CatalogResponse> => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)

  try {
    const response = await fetchJikan<any>('/top/anime', { page, limit: 12, filter: 'bypopularity' })
    const normalized = normalizeJikanList(response, page)
    if (!normalized.items.length) throw new Error('Jikan returned no popular titles')
    return normalized
  } catch {
    return getMockCatalog('', page, 8)
  }
})
