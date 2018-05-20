import * as questionApi from '@/api/question.api'
import { setLoading } from './base'

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true)
      return await questionApi.get(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async getAll ({commit}) {
    try {
      setLoading(commit, true)
      return await questionApi.getAll()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async save ({commit}, question) {
    try {
      setLoading(commit, true)
      return await questionApi.save(question)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async remove ({commit}, questions) {
    try {
      setLoading(commit, true)
      let promises = questions.map((question) => questionApi.remove(question.id))
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
