<script setup lang="ts">
import type { CatalogResponse } from '~/types/media'
import { filterByGenre } from '~/utils/catalog'

const searchQuery = ref('')
const activeGenre = ref('All')
const { t, translateValue } = useI18n()
const genres = ['All', 'Action', 'Adventure', 'Drama', 'Fantasy', 'Comedy', 'Sci-Fi', 'Suspense']

const { data, status, error, refresh } = await useAsyncData<CatalogResponse>(
  'popular-media',
  () => $fetch('/api/media/popular')
)

const items = computed(() => data.value?.items || [])
const featured = computed(() => items.value[0])
const filteredItems = computed(() => filterByGenre(items.value, activeGenre.value))

function submitSearch(query: string) {
  if (query) navigateTo({ path: '/search', query: { q: query } })
}

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription')
})
</script>

<template>
  <div>
    <section v-if="featured" class="hero" :style="{ '--hero-image': featured.bannerImage ? `url(${featured.bannerImage})` : 'none' }">
      <div class="hero-backdrop" />
      <div class="site-container hero-content">
        <div class="hero-copy">
          <h1>{{ featured.titleEnglish || featured.title }}</h1>
          <p>{{ featured.description }}</p>
          <div class="hero-meta">
            <span v-if="featured.rating">★ {{ featured.rating.toFixed(1) }}</span>
            <span>{{ featured.year }}</span>
            <span>{{ translateValue('formats', featured.format) }}</span>
            <span>{{ featured.genres.slice(0, 2).map(genre => translateValue('genres', genre)).join(' · ') }}</span>
          </div>
          <div class="hero-actions">
            <NuxtLink :to="`/media/${featured.id}`" class="primary-button">
              <AppIcon name="play" /> {{ t('home.exploreTitle') }}
            </NuxtLink>
            <FavoriteHeroButton :item="featured" />
          </div>
        </div>
        <SearchBar v-model="searchQuery" large @submit="submitSearch" />
      </div>
    </section>

    <section v-if="status === 'pending'" class="site-container section-block">
      <StatusPanel type="loading" />
    </section>
    <section v-else-if="error" class="site-container section-block">
      <StatusPanel type="error" @retry="refresh" />
    </section>

    <template v-else>
      <section class="site-container section-block genre-section">
        <div class="section-heading">
          <div>
            <p class="section-index">{{ t('home.genreLabel') }}</p>
            <h2>{{ t('home.genreTitle') }}</h2>
          </div>
          <p>{{ t('home.genreHint') }}</p>
        </div>
        <GenreFilters v-model="activeGenre" :genres="genres" />
      </section>

      <section class="site-container section-block">
        <div class="section-heading">
          <div>
            <p class="section-index">{{ t('home.popularLabel') }}</p>
            <h2>{{ t('home.popularTitle') }}</h2>
          </div>
          <NuxtLink to="/search" class="text-link">{{ t('home.fullCatalog') }} <AppIcon name="arrow-right" /></NuxtLink>
        </div>
        <MediaGrid v-if="filteredItems.length" :items="filteredItems" />
        <StatusPanel v-else type="empty" :title="t('home.noGenreTitle')" :message="t('home.noGenreMessage')" />
      </section>
    </template>
  </div>
</template>
