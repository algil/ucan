import * as questionCategoryApi from '@/api/question-category.api'
import { setLoading } from './base'

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true)
      return await questionCategoryApi.get(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async getAll ({commit}) {
    try {
      setLoading(commit, true)
      return await questionCategoryApi.getAll()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async save ({commit}, questionCategory) {
    try {
      setLoading(commit, true)
      return await questionCategoryApi.save(questionCategory)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async remove ({commit}, questionCategories) {
    try {
      setLoading(commit, true)
      let promises = questionCategories.map((questionCategory) => questionCategoryApi.remove(questionCategory.id))
      return await Promise.all(promises)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  }
}

export default {
  namespaced: true,
  actions
}
