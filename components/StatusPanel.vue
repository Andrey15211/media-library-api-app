<script setup lang="ts">
withDefaults(defineProps<{
  type: 'loading' | 'error' | 'empty'
  title?: string
  message?: string
}>(), {
  title: '',
  message: ''
})
defineEmits<{ retry: [] }>()
const { t } = useI18n()
</script>

<template>
  <div class="status-panel" :class="type" role="status" aria-live="polite">
    <div v-if="type === 'loading'" class="loader" aria-hidden="true" />
    <div v-else class="status-icon">
      <AppIcon :name="type === 'error' ? 'spark' : 'search'" />
    </div>
    <h2>{{ title || t(`status.${type}Title`) }}</h2>
    <p>{{ message || t(`status.${type}Message`) }}</p>
    <button v-if="type === 'error'" type="button" class="secondary-button" @click="$emit('retry')">{{ t('common.retry') }}</button>
    <slot />
  </div>
</template>
