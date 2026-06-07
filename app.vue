<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <footer class="app-footer">
      <div class="site-container">
        <span>NOVA</span>
        <p>{{ t('footer.tagline') }}</p>
        <p>{{ t('footer.attribution') }}</p>
      </div>
    </footer>
  </div>
</template>
