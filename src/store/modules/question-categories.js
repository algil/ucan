import * as questionCategoriesApi from '@/api/question-category.api';
import { setLoading } from './base';

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true);
      return await questionCategoriesApi.get(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },

  async getAll ({commit}) {
    try {
      setLoading(commit, true);
      return await questionCategoriesApi.getAll();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },

  async save ({commit}, questionCategory) {
    try {
      setLoading(commit, true);
      return await questionCategoriesApi.save(questionCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },

  async remove ({commit}, questionCategories) {
    try {
      setLoading(commit, true);
      let promises = questionCategories.map((questionCategory) => questionCategoriesApi.remove(questionCategory.id));
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  }
};

export default {
  namespaced: true,
  actions
};
