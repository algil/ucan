import Vue from 'vue';
import Vuetify from 'vuetify';
import VueEvents from 'vue-events'
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';

Vue.use(Vuetify);
Vue.use(VueEvents);
Vue.use(VeeValidate);
Vue.config.productionTip = false;

Object.defineProperties(Vue.prototype, {
  isMobile: {
    get: function () {
      return this.$vuetify.breakpoint.xs;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
