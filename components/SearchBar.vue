<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  large?: boolean
  autofocus?: boolean
}>(), {
  modelValue: '',
  large: false,
  autofocus: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()
const { t } = useI18n()

const value = computed({
  get: () => props.modelValue,
  set: input => emit('update:modelValue', input)
})

function submit() {
  emit('submit', value.value.trim())
}
</script>

<template>
  <form class="search-bar" :class="{ large }" role="search" @submit.prevent="submit">
    <AppIcon name="search" />
    <label class="sr-only" for="catalog-search">{{ t('search.label') }}</label>
    <input
      id="catalog-search"
      v-model="value"
      type="search"
      name="q"
      :placeholder="t('search.placeholder')"
      autocomplete="off"
      :autofocus="autofocus"
    >
    <button type="submit">{{ t('search.button') }}</button>
  </form>
</template>
