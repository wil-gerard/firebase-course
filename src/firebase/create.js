import firebase from './clientApp';
import {
  cleanData,
  TEST_DOCUMENTS,
} from './utility';

async function create(path, data) {
  const db = firebase.firestore();
  const auth = firebase.auth();

  if (!path || !data) {
    throw new ReferenceError('skip document creation, no path or data provided');
  }

  const newDocumentRef = db.collection(path).doc();

  const newDocumentId = newDocumentRef.id;
  const authorId = auth.currentUser.uid;
  const createdAt = Date.now();

  // Remove any empty values
  const newData = cleanData(data);

  const finalData = {
    id: newDocumentId,
    authorId,
    createdAt,
    ...newData,
  };

  await newDocumentRef.set(finalData);
  return newDocumentId;
}

export default async function createAnimal(data) {
  create(TEST_DOCUMENTS, data)
    .then((newDocId) => {
      console.log(`New document created at ${TEST_DOCUMENTS}/${newDocId}`);
      return newDocId;
    })
    .catch((error) => {
      console.error('Error creating the document: ', JSON.stringify(error));
    });
}
