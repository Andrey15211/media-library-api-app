<script setup lang="ts">
const { favorites, hydrated, hydrate } = useFavorites()
const { t, locale } = useI18n()
onMounted(hydrate)

function favoriteCount() {
  const count = favorites.value.length
  if (locale.value === 'en') return t(count === 1 ? 'favorites.countOne' : 'favorites.countMany', { count })
  const mod10 = count % 10
  const mod100 = count % 100
  const key = mod10 === 1 && mod100 !== 11
    ? 'favorites.countOne'
    : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
      ? 'favorites.countFew'
      : 'favorites.countMany'
  return t(key, { count })
}

useSeoMeta({ title: () => t('nav.favorites'), description: () => t('favorites.seoDescription') })
</script>

<template>
  <div class="site-container page-shell">
    <header class="page-intro favorites-intro">
      <p class="page-number">{{ t('favorites.eyebrow') }}</p>
      <h1>{{ t('favorites.titleStart') }}<br><span>{{ t('favorites.titleAccent') }}</span></h1>
      <p>{{ t('favorites.description') }}</p>
    </header>

    <section class="results-section">
      <div v-if="hydrated && favorites.length" class="section-heading">
        <div><p class="section-index">{{ t('favorites.collection') }}</p><h2>{{ favoriteCount() }}</h2></div>
      </div>
      <StatusPanel v-if="!hydrated" type="loading" />
      <MediaGrid v-else-if="favorites.length" :items="favorites" />
      <StatusPanel
        v-else
        type="empty"
        :title="t('favorites.emptyTitle')"
        :message="t('favorites.emptyMessage')"
      >
        <NuxtLink to="/search" class="primary-button">{{ t('favorites.explore') }} <AppIcon name="arrow-right" /></NuxtLink>
      </StatusPanel>
    </section>
  </div>
</template>
