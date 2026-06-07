<script setup lang="ts">
import type { CatalogResponse } from '~/types/media'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const query = ref(String(route.query.q || ''))
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const submittedQuery = computed(() => String(route.query.q || '').trim())

const { data, status, error, refresh } = await useAsyncData<CatalogResponse>(
  'media-search',
  () => $fetch('/api/media/search', { query: { q: submittedQuery.value, page: page.value } }),
  { watch: [submittedQuery, page] }
)

function submit(value: string) {
  router.push({ path: '/search', query: value ? { q: value } : {} })
}

function changePage(nextPage: number) {
  router.push({ path: '/search', query: { q: submittedQuery.value, page: nextPage } })
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSeoMeta({
  title: () => submittedQuery.value ? t('search.seoTitle', { query: submittedQuery.value }) : t('search.seoBrowse'),
  description: () => t('search.seoDescription')
})
</script>

<template>
  <div class="site-container page-shell">
    <header class="page-intro">
      <p class="page-number">{{ t('search.eyebrow') }}</p>
      <h1>{{ t('search.titleStart') }}<br><span>{{ t('search.titleAccent') }}</span></h1>
      <SearchBar v-model="query" large autofocus @submit="submit" />
    </header>

    <section class="results-section">
      <div class="section-heading">
        <div>
          <p class="section-index">{{ t('search.resultsLabel') }}</p>
          <h2>{{ submittedQuery ? t('search.resultsFor', { query: submittedQuery }) : t('search.browse') }}</h2>
        </div>
        <p v-if="data">{{ t('search.titles', { count: data.totalItems.toLocaleString(locale) }) }} · {{ data.source === 'mock' ? t('search.offline') : t('search.live') }}</p>
      </div>

      <StatusPanel v-if="status === 'pending'" type="loading" />
      <StatusPanel v-else-if="error" type="error" @retry="refresh" />
      <StatusPanel
        v-else-if="!data?.items.length"
        type="empty"
        :title="submittedQuery ? t('search.emptyTitle') : t('search.emptyBrowseTitle')"
        :message="t('search.emptyMessage')"
      />
      <template v-else>
        <MediaGrid :items="data.items" />
        <PaginationControls :page="data.page" :total-pages="data.totalPages" @change="changePage" />
      </template>
    </section>
  </div>
</template>
