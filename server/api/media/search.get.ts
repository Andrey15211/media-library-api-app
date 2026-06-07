import type { CatalogResponse } from '../../../types/media'
import { getMockCatalog } from '../../utils/mock-catalog'
import { fetchJikan, normalizeJikanList } from '../../utils/jikan'

export default defineEventHandler(async (event): Promise<CatalogResponse> => {
  const query = getQuery(event)
  const term = String(query.q || '').trim()
  const page = Math.max(1, Number(query.page) || 1)

  if (!term) return getMockCatalog('', page, 8)

  try {
    const response = await fetchJikan<any>('/anime', {
      q: term,
      page,
      limit: 12,
      order_by: 'score',
      sort: 'desc',
      sfw: 'true'
    })
    return normalizeJikanList(response, page)
  } catch {
    return getMockCatalog(term, page, 8)
  }
})
