import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './en.js';
import es from './es.js';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {en, es}
});

export default i18n;
