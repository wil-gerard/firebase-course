// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add Firebase products that you need here
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = { projectId: 'demo-codebusters' };

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099');
  firebase.firestore().useEmulator('localhost', 8080);
}

export default firebase;
