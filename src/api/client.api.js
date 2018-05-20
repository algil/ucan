import { db } from './firebase'

const clientsRef = db.collection('clients')

export async function get (id) {
  const doc = await clientsRef.doc(id).get()
  return doc.data()
}

export async function getAll () {
  const clients = []
  const querySnapshot = await clientsRef.get()
  querySnapshot.forEach((doc) => {
    clients.push(doc.data())
  })
  return clients
}

export async function save (client) {
  try {
    let clientDoc = client.id ? clientsRef.doc(client.id) : clientsRef.doc()
    client.id = clientDoc.id
    await clientDoc.set(client)
    return client.id
  } catch (error) {
    console.error(error)
  }
}

export async function addPet (petId, clientId) {
  try {
    const client = await get(clientId)
    let pets = client.pets
    pets.push({
      [petId]: petId
    })
    return update(clientId, {pets})
  } catch (error) {
    console.error(error)
  }
}

export async function removePet (petId, clientId) {
  try {
    const client = await get(clientId)
    let pets = client.pets
    delete pets[petId]
    return update(clientId, {pets})
  } catch (error) {
    console.error(error)
  }
}

export async function update (id, data) {
  await clientsRef.doc(id).update(data)
}

export async function remove (id) {
  await clientsRef.doc(id).delete()
}
