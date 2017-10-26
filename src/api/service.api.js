import { db } from './firebase';

const servicesRef = db.collection('services');

export async function get(serviceId) {
  const doc = await servicesRef.doc(serviceId).get();
  const service = doc.data();
  service.id = doc.id;
  return service;
}

export async function getAll() {
  const services = [];
  const querySnapshot = await servicesRef.get();
  querySnapshot.forEach((doc) => {
    let service = doc.data();
    service.id = doc.id;
    services.push(service);
  });
  return services;
}

export async function save(service) {
  if (service.id) {
    await servicesRef.doc(service.id).update({
      name: service.name,
      cost: service.cost,
      active: service.active
    });
  } else {
    await servicesRef.add(service);
  }
}

export async function remove(serviceId) {
  await servicesRef.doc(serviceId).delete();
}
