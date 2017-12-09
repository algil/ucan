import { db } from './firebase';

const petsRef = db.collection('pets');

export async function get (id) {
  const doc = await petsRef.doc(id).get();
  return doc.data();
}

export async function getByClientId (clientId) {
  const pets = [];
  const querySnapshot = await petsRef.get();
  querySnapshot.forEach((doc) => {
    pets.push(doc.data());
  });
  return pets;
}

export async function save (pet) {
  try {
    let petDoc = pet.id ? petsRef.doc(pet.id) : petsRef.doc();
    pet.id = petDoc.id;
    await petDoc.set(pet);
    return pet.id;
  } catch (error) {
    console.error(error);
  }
}

export async function remove (id) {
  await petsRef.doc(id).delete();
}
