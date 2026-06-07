export interface MediaItem {
  id: number
  title: string
  titleEnglish?: string
  description: string
  image: string
  bannerImage?: string
  rating: number | null
  releaseDate: string | null
  year: number | null
  genres: string[]
  studios: string[]
  status: string
  format: string
  episodes: number | null
  duration?: string
  ageRating?: string
  source?: string
  trailerUrl?: string
}

export interface CatalogResponse {
  items: MediaItem[]
  page: number
  totalPages: number
  totalItems: number
  source: 'api' | 'mock'
}
