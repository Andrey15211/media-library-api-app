<script setup lang="ts">
import type { MediaItem } from '~/types/media'
const props = defineProps<{ item: MediaItem }>()
const { isFavorite, toggleFavorite } = useFavorites()
const { t } = useI18n()
</script>

<template>
  <button type="button" class="ghost-button" :aria-pressed="isFavorite(item.id)" @click="toggleFavorite(props.item)">
    <AppIcon name="heart" :filled="isFavorite(item.id)" />
    {{ isFavorite(item.id) ? t('favoritesAction.saved') : t('favoritesAction.add') }}
  </button>
</template>
