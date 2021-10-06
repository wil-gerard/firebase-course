import toast from 'react-hot-toast';
import firebase from './clientApp';
import {
  cleanData,
  TODOS,
} from './utility';

async function create(collection, data) {
  const db = firebase.firestore();
  const auth = firebase.auth();

  if (!collection || !data) {
    throw new ReferenceError('No path or data provided');
  }

  // Remove any empty values
  const newData = cleanData(data);

  const newDocumentRef = db.collection(collection).doc();

  const newDocumentId = newDocumentRef.id;
  const createdBy = auth.currentUser.uid;
  const createdAt = Date.now();

  const finalData = {
    id: newDocumentId,
    createdBy,
    createdAt,
    ...newData,
  };

  await newDocumentRef.set(finalData);
  return newDocumentId;
}

export async function createTodo(name) {
  const data = {
    name,
    done: false,
  };

  create(TODOS, data)
    .then((newDocId) => {
      console.log(`New list created at ${TODOS}/${newDocId}`);
      toast.success('Item created');
      return newDocId;
    })
    .catch((error) => {
      console.error(error);
      toast.error('Error adding item');
    });
}
