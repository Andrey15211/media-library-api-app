<script setup lang="ts">
const props = defineProps<{ page: number, totalPages: number }>()
const emit = defineEmits<{ change: [page: number] }>()
const { t } = useI18n()

const pages = computed(() => {
  const start = Math.max(1, Math.min(props.page - 1, props.totalPages - 2))
  return Array.from({ length: Math.min(3, props.totalPages) }, (_, index) => start + index)
})
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" :aria-label="t('common.pagination')">
    <button type="button" :disabled="page === 1" :aria-label="t('common.previousPage')" @click="emit('change', page - 1)">
      <AppIcon name="arrow-left" />
    </button>
    <button
      v-for="pageNumber in pages"
      :key="pageNumber"
      type="button"
      :class="{ active: pageNumber === page }"
      :aria-current="pageNumber === page ? 'page' : undefined"
      @click="emit('change', pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <span v-if="totalPages > 3">/ {{ totalPages }}</span>
    <button type="button" :disabled="page === totalPages" :aria-label="t('common.nextPage')" @click="emit('change', page + 1)">
      <AppIcon name="arrow-right" />
    </button>
  </nav>
</template>
