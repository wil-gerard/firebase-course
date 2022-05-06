const assert = require('assert');
const firebase = require('@firebase/testing');
// const { QuerySnapshot } = require('@google-cloud/firestore');
const fs = require('fs');

const MY_PROJECT_ID = 'emulator-rules';
const myId = 'user_abc';
// const theirId = 'user_xyz';
// const modId = 'user_mod';
const myAuth = { uid: myId, email: 'abc@gmail.com' };
// const modAuth = { uid: modId, email: 'mod@gmail.com', isModerator: true };

// Enforce firestore rules hot update in emulators
before(async () => {
  await firebase.loadFirestoreRules({
    projectId: MY_PROJECT_ID,
    rules: fs.readFileSync('./firestore.rules', 'utf8'),
  });
});

function getFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth })
    .firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore();
}

// Clear firestore before each test
beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
});

describe('Setup', () => {
  it('Understands basic addition, sanity check mocha working', () => {
    assert.equal(2 + 2, 4);
  });
});

describe('To-do list firestore rules', () => {
  it('Any authenticated user can create to-do items for themselves', async () => {
    const docId = 'form123';
    const db = getFirestore(myAuth);

    const docRef = db
      .collection('todos')
      .doc(docId);

    await firebase.assertSucceeds(docRef.set({ uid: myId }));
  });

  it('Users can read their to-do items', async () => {
    const docId = 'form123';
    const db = getFirestore(myAuth);

    const docRef = db
      .collection('todos')
      .doc(docId);
    await docRef
      .set({ uid: myAuth.uid });

    const testDoc = db
      .collection('todos')
      .doc(docId);

    await firebase.assertSucceeds(testDoc.get());
  });

  it('Users can update and delete their to-do items', async () => {
    const docId = 'form123';
    const db = getFirestore(myAuth);

    const docRef = db
      .collection('todos')
      .doc(docId);
    await docRef
      .set({ content: 'before', uid: myAuth.uid });

    const testDoc = db
      .collection('todos')
      .doc(docId);

    await firebase.assertSucceeds(testDoc.update({ content: 'after' }));
  });
});
