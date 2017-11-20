import { db } from './firebase';

const questionsRef = db.collection('questions');

export async function get (id) {
  const doc = await questionsRef.doc(id).get();
  return doc.data();
}

export async function getAll () {
  const questions = [];
  const querySnapshot = await questionsRef.get();
  querySnapshot.forEach((doc) => {
    questions.push(doc.data());
  });
  return questions;
}

export async function save (question) {
  try {
    let questionCategoryDoc = question.id ? questionsRef.doc(question.id) : questionsRef.doc();
    question.id = questionCategoryDoc.id;
    await questionCategoryDoc.set(question);
  } catch (error) {
    console.error(error);
  }
}

export async function remove (id) {
  await questionsRef.doc(id).delete();
}
