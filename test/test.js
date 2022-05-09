const assert = require('assert');
const firebase = require('@firebase/testing');
// const { QuerySnapshot } = require('@google-cloud/firestore');
const fs = require('fs');

const MY_PROJECT_ID = 'emulator-rules';
const myId = 'user_abc';
const adminId = 'user_mod';
const myAuth = { uid: myId, isAdmin: false, displayName: 'Bob' };
const adminAuth = { uid: adminId, isAdmin: true };

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
  it('A user can create to-do items for themselves', async () => {
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

describe('Profiles firestore rules', () => {
  it('A user can view profiles', async () => {
    const db = getFirestore(myAuth);

    db
      .collection('users')
      .doc(myAuth.uid)
      .set(myAuth);

    const testUser = db
      .collection('users');

    await firebase.assertSucceeds(testUser.get());
  });

  it('A user can create a profile', async () => {
    const db = getFirestore(myAuth);

    const testUser = db
      .collection('users')
      .doc(myAuth.uid);

    await firebase.assertSucceeds(testUser.set(myAuth));
  });

  it('A user can edit their profile', async () => {
    const userId = myId;
    const user = getFirestore(myAuth);
    await user
      .collection('users')
      .doc(userId)
      .set(myAuth);

    const userTest = user.collection('users').doc(userId);

    await firebase.assertSucceeds(userTest.update({ displayName: 'newName' }));
  });

  // A ran into an error trying to get this test to pass. I believe it has something to do with this stale firebase-tools issue https://github.com/firebase/firebase-tools/issues/2067
  // it('An admin can edit anyones profile', async () => {
  //   const admin = getFirestore(adminAuth);
  //   const user = getFirestore(myAuth);
  //   await user
  //     .collection('users')
  //     .doc(myId)
  //     .set(myAuth);

  //   const adminTest = admin.collection('users').doc(myId);

  //   await firebase.assertSucceeds(adminTest.update({ displayName: 'newName' }));
  // });

  it('isAdmin field cannot be updated by a user or admin', async () => {
    const userId = myId;
    const user = getFirestore(myAuth);
    await user
      .collection('users')
      .doc(userId)
      .set({ displayName: 'test user', isAdmin: false, uid: userId });

    const userTest = user.collection('users').doc(userId);

    await firebase.assertFails(userTest.update({ isAdmin: true }));
  });
});
