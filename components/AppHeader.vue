<script setup lang="ts">
const route = useRoute()
const { favorites } = useFavorites()
const { locale, setLocale, t } = useI18n()

const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.discover'), to: '/search' },
  { label: t('nav.favorites'), to: '/favorites' }
])
</script>

<template>
  <header class="app-header">
    <div class="site-container header-inner">
      <NuxtLink to="/" class="brand" :aria-label="t('nav.homeLabel')">
        <span class="brand-mark">N</span>
        <span>NOVA</span>
      </NuxtLink>

      <nav class="primary-nav" :aria-label="t('nav.primary')">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="{ active: route.path === link.to || (link.to === '/search' && route.path.startsWith('/search')) }"
        >
          {{ link.label }}
          <span v-if="link.to === '/favorites' && favorites.length" class="nav-count">{{ favorites.length }}</span>
        </NuxtLink>
      </nav>

      <div class="locale-switcher" :aria-label="locale === 'ru' ? 'Выбор языка' : 'Language selector'">
        <button type="button" :class="{ active: locale === 'ru' }" :aria-pressed="locale === 'ru'" @click="setLocale('ru')">RU</button>
        <span>/</span>
        <button type="button" :class="{ active: locale === 'en' }" :aria-pressed="locale === 'en'" @click="setLocale('en')">EN</button>
      </div>

      <NuxtLink to="/search" class="header-search" :aria-label="t('nav.openSearch')">
        <AppIcon name="search" />
      </NuxtLink>
    </div>
  </header>
</template>
