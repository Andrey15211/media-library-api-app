import type { MediaItem } from '~/types/media'

const STORAGE_KEY = 'nova-favorites-v1'

export function useFavorites() {
  const favorites = useState<MediaItem[]>('favorites', () => [])
  const hydrated = useState('favorites-hydrated', () => false)

  function hydrate() {
    if (!import.meta.client || hydrated.value) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      favorites.value = stored ? JSON.parse(stored) : []
    } catch {
      favorites.value = []
    }
    hydrated.value = true
  }

  function persist() {
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  function isFavorite(id: number) {
    return favorites.value.some(item => item.id === id)
  }

  function toggleFavorite(item: MediaItem) {
    favorites.value = isFavorite(item.id)
      ? favorites.value.filter(favorite => favorite.id !== item.id)
      : [item, ...favorites.value]
    persist()
  }

  onMounted(hydrate)

  return { favorites, hydrated, isFavorite, toggleFavorite, hydrate }
}
