import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@/locales/en';
import { zh } from '@/locales/zh';

const resources = {
  en,
  zh,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then((res) => {
    console.info('i18n init');
  })
  .catch((e) => {
    console.error('i18n init error', e);
  });
export default i18n;
