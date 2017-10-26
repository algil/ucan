import * as serviceApi from '../../api/service.api';
import { setLoading } from './base';

const actions = {
  async get({commit}, serviceId) {
    try {
      setLoading(commit, true);
      return await serviceApi.get(serviceId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },
  async getAll({commit}) {
    try {
      setLoading(commit, true);
      return await serviceApi.getAll();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },
  async save({commit}, service) {
    try {
      setLoading(commit, true);
      return await serviceApi.save(service);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(commit, false);
    }
  },
  async remove({commit}, services) {
    try {
      setLoading(commit, true);
      let promises = services.map((service) => serviceApi.remove(service.id));
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
}
