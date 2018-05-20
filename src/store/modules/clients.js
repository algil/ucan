import * as clientApi from '@/api/client.api'
import { setLoading } from './base'

const actions = {
  async get ({commit}, id) {
    try {
      setLoading(commit, true)
      return await clientApi.get(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async getAll ({commit}) {
    try {
      setLoading(commit, true)
      return await clientApi.getAll()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async save ({commit}, client) {
    try {
      setLoading(commit, true)
      return await clientApi.save(client)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(commit, false)
    }
  },

  async remove ({commit}, clients) {
    try {
      setLoading(commit, true)
      let promises = clients.map((client) => clientApi.remove(client.id))
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
