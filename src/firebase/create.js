import firebase from './clientApp';
import {
  cleanData,
  ANIMALS,
} from './utility';

async function create(path, data) {
  const db = firebase.firestore();
  const auth = firebase.auth();

  if (!path || !data) {
    throw new ReferenceError('skip document creation, no path or data provided');
  }

  // Remove any empty values
  const newData = cleanData(data);

  const newDocumentRef = db.collection(path).doc();

  const newDocumentId = newDocumentRef.id;
  const authorId = auth.currentUser.uid;
  const createdAt = Date.now();

  const finalData = {
    id: newDocumentId,
    authorId,
    createdAt,
    ...newData,
  };

  await newDocumentRef.set(finalData);
  return newDocumentId;
}

export async function createAnimal(data) {
  create(ANIMALS, data)
    .then((newDocId) => {
      console.log(`New document created at ${ANIMALS}/${newDocId}`);
      return newDocId;
    })
    .catch((error) => {
      console.error('Error creating the document: ', error);
    });
}
