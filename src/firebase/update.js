import firebase from './clientApp';
import {
  cleanData,
  ANIMALS,
} from './utility';

async function update(path, data) {
  const db = firebase.firestore();
  const auth = firebase.auth();

  if (!path || !data) {
    throw new ReferenceError('skip update: no path or data provided');
  }

  // Remove any empty values
  const newData = cleanData(data);

  const documentRef = db.doc(path);
  const updatedAt = Date.now();
  const updatedBy = auth.currentUser ? auth.currentUser.uid : null;

  const finalData = {
    updatedAt,
    updatedBy,
    ...newData,
  };

  await documentRef.update(finalData);
  return documentRef.id;
}

export async function updateAnimal(id, data) {
  const path = `${ANIMALS}/${id}`;

  update(path, data)
    .then((docId) => {
      console.log(`Document updated at ${path}`);
      return docId;
    })
    .catch((error) => {
      console.error('Error updating the document: ', error);
    });
}
