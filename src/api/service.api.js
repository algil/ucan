import { db } from './firebase'

const servicesRef = db.collection('services')

export async function get (id) {
  const doc = await servicesRef.doc(id).get()
  return doc.data()
}

export async function getAll () {
  const services = []
  const querySnapshot = await servicesRef.get()
  querySnapshot.forEach((doc) => {
    services.push(doc.data())
  })
  return services
}

export async function save (service) {
  try {
    let serviceDoc = service.id ? servicesRef.doc(service.id) : servicesRef.doc()
    service.id = serviceDoc.id
    await serviceDoc.set(service)
  } catch (error) {
    console.error(error)
  }
}

export async function remove (id) {
  try {
    await servicesRef.doc(id).delete()
  } catch (error) {
    console.error(error)
  }
}
