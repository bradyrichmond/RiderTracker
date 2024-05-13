import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import auth from '../locales/en/auth.json'
import buses from '../locales/en/buses.json'
import common from '../locales/en/common.json'
import onboarding from '../locales/en/onboarding.json'
import settings from '../locales/en/settings.json'

export const defaultNS = 'buses'

i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
        auth,
        buses,
        common,
        onboarding,
        settings
    },
  },
  defaultNS
})