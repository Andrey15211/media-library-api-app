<script setup lang="ts">
import type { MediaItem } from '~/types/media'

defineProps<{ item: MediaItem }>()
const { isFavorite, toggleFavorite } = useFavorites()
const { t, translateValue } = useI18n()
</script>

<template>
  <article class="media-card">
    <NuxtLink :to="`/media/${item.id}`" class="poster-link" :aria-label="`${t('common.viewDetails')}: ${item.title}`">
      <div class="poster-frame">
        <img :src="item.image" :alt="`${item.title}: ${t('common.poster')}`" loading="eager">
        <div class="poster-shade" />
        <span v-if="item.rating" class="rating">★ {{ item.rating.toFixed(1) }}</span>
        <span class="card-cta">{{ t('common.viewDetails') }} <AppIcon name="arrow-right" /></span>
      </div>
    </NuxtLink>
    <button
      type="button"
      class="favorite-button"
      :class="{ active: isFavorite(item.id) }"
      :aria-label="`${isFavorite(item.id) ? t('favoritesAction.remove') : t('favoritesAction.add')}: ${item.title}`"
      :aria-pressed="isFavorite(item.id)"
      @click="toggleFavorite(item)"
    >
      <AppIcon name="heart" :filled="isFavorite(item.id)" />
    </button>
    <div class="card-copy">
      <NuxtLink :to="`/media/${item.id}`">{{ item.title }}</NuxtLink>
      <p>{{ item.year || t('common.tba') }} <span /> {{ translateValue('formats', item.format) }}</p>
    </div>
  </article>
</template>
