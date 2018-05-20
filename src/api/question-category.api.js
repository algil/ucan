import { db } from './firebase'

const questionCategoriesRef = db.collection('questionCategories')

export async function get (id) {
  const doc = await questionCategoriesRef.doc(id).get()
  return doc.data()
}

export async function getAll () {
  const questionCategories = []
  const querySnapshot = await questionCategoriesRef.get()
  querySnapshot.forEach((doc) => {
    questionCategories.push(doc.data())
  })
  return questionCategories
}

export async function save (questionCategory) {
  try {
    let questionCategoryDoc = questionCategory.id ? questionCategoriesRef.doc(questionCategory.id) : questionCategoriesRef.doc()
    questionCategory.id = questionCategoryDoc.id
    await questionCategoryDoc.set(questionCategory)
  } catch (error) {
    console.error(error)
  }
}

export async function remove (id) {
  await questionCategoriesRef.doc(id).delete()
}
