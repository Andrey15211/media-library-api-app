import { messages, type Locale } from '~/i18n/messages'

type Primitive = string | number

function getByPath(source: object, path: string): unknown {
  return path.split('.').reduce<unknown>((value, key) => {
    if (!value || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[key]
  }, source)
}

export function useI18n() {
  const localeCookie = useCookie<Locale>('nova-locale', {
    default: () => 'ru',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })
  const locale = useState<Locale>('locale', () => localeCookie.value === 'en' ? 'en' : 'ru')

  function setLocale(nextLocale: Locale) {
    locale.value = nextLocale
    localeCookie.value = nextLocale
    if (import.meta.client) localStorage.setItem('nova-locale', nextLocale)
  }

  function t(path: string, params: Record<string, Primitive> = {}) {
    const translated = getByPath(messages[locale.value], path)
    const fallback = getByPath(messages.en, path)
    const template = typeof translated === 'string'
      ? translated
      : typeof fallback === 'string' ? fallback : path

    return Object.entries(params).reduce(
      (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
      template
    )
  }

  function translateValue(group: 'genres' | 'mediaStatus' | 'formats', value: string) {
    const translated = getByPath(messages[locale.value], `${group}.${value}`)
    return typeof translated === 'string' ? translated : value
  }

  onMounted(() => {
    const stored = localStorage.getItem('nova-locale')
    if (stored === 'ru' || stored === 'en') setLocale(stored)
  })

  useHead({
    htmlAttrs: { lang: computed(() => locale.value) }
  })

  return {
    locale: readonly(locale),
    setLocale,
    t,
    translateValue
  }
}
