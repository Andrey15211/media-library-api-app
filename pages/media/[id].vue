<script setup lang="ts">
import type { MediaItem } from '~/types/media'

const route = useRoute()
const { t, locale, translateValue } = useI18n()
const id = computed(() => Number(route.params.id))
const { data: item, status, error, refresh } = await useAsyncData<MediaItem>(
  `media-${id.value}`,
  () => $fetch(`/api/media/${id.value}`)
)

const formattedDate = computed(() => {
  if (!item.value?.releaseDate) return t('details.unavailableDate')
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', { dateStyle: 'long' }).format(new Date(item.value.releaseDate))
})

useSeoMeta({
  title: () => item.value?.title || t('details.seoFallback'),
  description: () => item.value?.description || t('details.seoDescription')
})
</script>

<template>
  <div>
    <section v-if="status === 'pending'" class="site-container page-shell">
      <StatusPanel type="loading" />
    </section>
    <section v-else-if="error || !item" class="site-container page-shell">
      <StatusPanel type="error" :title="t('details.errorTitle')" :message="t('details.errorMessage')" @retry="refresh" />
    </section>
    <article v-else class="detail-page" :style="{ '--detail-image': `url(${item.bannerImage || item.image})` }">
      <div class="detail-backdrop" />
      <div class="site-container detail-layout">
        <div class="detail-poster">
          <img :src="item.image" :alt="`${item.title}: ${t('common.poster')}`">
        </div>
        <div class="detail-copy">
          <NuxtLink to="/search" class="back-link"><AppIcon name="arrow-left" /> {{ t('details.back') }}</NuxtLink>
          <p class="detail-format">{{ translateValue('formats', item.format) }} · {{ translateValue('mediaStatus', item.status) }}</p>
          <h1>{{ item.titleEnglish || item.title }}</h1>
          <p v-if="item.titleEnglish && item.titleEnglish !== item.title" class="original-title">{{ item.title }}</p>
          <div class="detail-rating">
            <strong>{{ item.rating?.toFixed(1) || 'N/A' }}</strong>
            <span>{{ t('details.score') }}<br>{{ t('details.outOf') }}</span>
          </div>
          <p class="detail-description">{{ item.description }}</p>
          <div class="detail-genres">
            <span v-for="genre in item.genres" :key="genre">{{ translateValue('genres', genre) }}</span>
          </div>
          <FavoriteHeroButton :item="item" />
        </div>
      </div>

      <div class="site-container metadata-section">
        <div class="section-heading">
          <div><p class="section-index">{{ t('details.file') }}</p><h2>{{ t('details.metadata') }}</h2></div>
        </div>
        <dl class="metadata-grid">
          <div><dt>{{ t('details.releaseDate') }}</dt><dd>{{ formattedDate }}</dd></div>
          <div><dt>{{ t('details.studio') }}</dt><dd>{{ item.studios.join(', ') || t('common.unknown') }}</dd></div>
          <div><dt>{{ t('details.episodes') }}</dt><dd>{{ item.episodes ?? t('common.ongoing') }}</dd></div>
          <div><dt>{{ t('details.duration') }}</dt><dd>{{ item.duration || t('common.unknown') }}</dd></div>
          <div><dt>{{ t('details.source') }}</dt><dd>{{ item.source || t('common.unknown') }}</dd></div>
          <div><dt>{{ t('details.ageRating') }}</dt><dd>{{ item.ageRating || t('common.notRated') }}</dd></div>
        </dl>
      </div>
    </article>
  </div>
</template>
