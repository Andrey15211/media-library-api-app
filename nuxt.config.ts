export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s · NOVA',
      meta: [
        { name: 'description', content: 'Ищите аниме, изучайте подробности и сохраняйте личную коллекцию.' },
        { name: 'theme-color', content: '#08090d' }
      ]
    }
  },
  runtimeConfig: {
    jikanBaseUrl: process.env.NUXT_JIKAN_BASE_URL || 'https://api.jikan.moe/v4'
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
