import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

const initI18next = async (locale: string, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../public/locales/${language}/${namespace}.json`)))
    .init({
      lng: locale,
      ns,
      fallbackLng: 'en',
      supportedLngs: ['en', 'hi', 'gu'],
      defaultNS: 'common',
      fallbackNS: 'common',
    })
  return i18nInstance
}

export { initI18next }