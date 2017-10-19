import { servicesRef } from '../firebase';

export default {
  saveService({commit}, service) {
    servicesRef.push(service);
  }
};
