<script setup lang="ts">
defineProps<{
  name: 'search' | 'heart' | 'arrow-left' | 'arrow-right' | 'play' | 'spark'
  filled?: boolean
}>()
</script>

<template>
  <svg
    class="app-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'search'">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.7-3.7" />
    </template>
    <template v-else-if="name === 'heart'">
      <path
        :fill="filled ? 'currentColor' : 'none'"
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
      />
    </template>
    <template v-else-if="name === 'arrow-left'">
      <path d="m15 18-6-6 6-6" />
    </template>
    <template v-else-if="name === 'arrow-right'">
      <path d="m9 18 6-6-6-6" />
    </template>
    <template v-else-if="name === 'play'">
      <path fill="currentColor" d="m8 5 11 7-11 7Z" stroke="none" />
    </template>
    <template v-else>
      <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Z" />
      <path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </template>
  </svg>
</template>
