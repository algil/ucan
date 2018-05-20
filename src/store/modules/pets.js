import * as petApi from '@/api/pet.api'
import { setLoading } from './base'

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true)
      return await petApi.get(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async getByClientId ({commit}, clientId) {
    try {
      setLoading(commit, true)
      return await petApi.getByClientId(clientId)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async save ({commit}, client) {
    try {
      setLoading(commit, true)
      return await petApi.save(client)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async remove ({commit}, id) {
    try {
      setLoading(commit, true)
      return await petApi.remove(id)
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
