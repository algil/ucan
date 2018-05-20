import { db } from './firebase'

const centersRef = db.collection('centers')

export async function get (id) {
  const doc = await centersRef.doc(id).get()
  return doc.data()
}

export async function getAll () {
  const centers = []
  const querySnapshot = await centersRef.get()
  querySnapshot.forEach((doc) => {
    centers.push(doc.data())
  })
  return centers
}

export async function save (center) {
  try {
    let centerDoc = center.id ? centersRef.doc(center.id) : centersRef.doc()
    center.id = centerDoc.id
    await centerDoc.set(center)
  } catch (error) {
    console.error(error)
  }
}

export async function remove (id) {
  await centersRef.doc(id).delete()
}
