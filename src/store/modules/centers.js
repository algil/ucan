import * as centersApi from '@/api/center.api'
import { setLoading } from './base'

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true)
      return await centersApi.get(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async getAll ({commit}) {
    try {
      setLoading(commit, true)
      return await centersApi.getAll()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async save ({commit}, center) {
    try {
      setLoading(commit, true)
      return await centersApi.save(center)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async remove ({commit}, centers) {
    try {
      setLoading(commit, true)
      let promises = centers.map((center) => centersApi.remove(center.id))
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
