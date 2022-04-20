// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add Firebase products that you need here
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyBAcAgGSADla4CUqZijWc6OowVbFQjGbJ8',
  authDomain: 'fir-codebusters-7ad88.firebaseapp.com',
  projectId: 'fir-codebusters-7ad88',
  storageBucket: 'fir-codebusters-7ad88.appspot.com',
  messagingSenderId: '74784526031',
  appId: '1:74784526031:web:eb8b393e11b95e4993b1ba',
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099');
  firebase.firestore().useEmulator('localhost', 8080);
}

export default firebase;
