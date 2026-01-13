import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    ns: ['slides', 'common'],
    defaultNS: 'slides',
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
