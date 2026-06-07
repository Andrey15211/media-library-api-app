import type { CatalogResponse, MediaItem } from '~/types/media'

export function useCatalog() {
  const { t } = useI18n()
  const loading = ref(false)
  const error = ref('')

  async function request<T>(url: string, query?: Record<string, string | number>) {
    loading.value = true
    error.value = ''
    try {
      return await $fetch<T>(url, { query })
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : t('status.errorMessage')
      throw cause
    } finally {
      loading.value = false
    }
  }

  const getPopular = (page = 1) => request<CatalogResponse>('/api/media/popular', { page })
  const search = (query: string, page = 1) => request<CatalogResponse>('/api/media/search', { q: query, page })
  const getDetails = (id: number) => request<MediaItem>(`/api/media/${id}`)

  return { loading: readonly(loading), error: readonly(error), getPopular, search, getDetails }
}
