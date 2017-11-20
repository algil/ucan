import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import services from './modules/services';
import centers from './modules/centers';
import questionCategories from './modules/question-categories';
import questions from './modules/questions';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';
const debug = false;

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],

  state,
  getters,
  actions,
  mutations,
  modules: {
    services,
    centers,
    questionCategories,
    questions
  }
});
