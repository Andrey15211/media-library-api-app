<script setup lang="ts">
import type { MediaItem } from '~/types/media'
defineProps<{ items: MediaItem[] }>()
</script>

<template>
  <div class="media-grid">
    <MediaCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
