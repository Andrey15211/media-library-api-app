<script setup lang="ts">
defineProps<{ genres: string[], modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const { t, translateValue } = useI18n()
</script>

<template>
  <div class="genre-filters" :aria-label="t('home.genreTitle')">
    <button
      v-for="genre in genres"
      :key="genre"
      type="button"
      :class="{ active: modelValue === genre }"
      :aria-pressed="modelValue === genre"
      @click="emit('update:modelValue', genre)"
    >
      {{ translateValue('genres', genre) }}
    </button>
  </div>
</template>
