import firebase from "firebase";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn4woNEW0TacYXYlXJWHj4Un6NPP8rYlc",
  authDomain: "slack-clone-d572b.firebaseapp.com",
  projectId: "slack-clone-d572b",
  storageBucket: "slack-clone-d572b.appspot.com",
  messagingSenderId: "920250412867",
  appId: "1:920250412867:web:f9d94094762bd3312b49f6",
  measurementId: "G-9WV8RWV516",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();

export { storageRef };
export default storageRef;
