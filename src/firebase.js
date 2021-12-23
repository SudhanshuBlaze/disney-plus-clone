import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "disneyplus-clone-a8356.firebaseapp.com",
  projectId: "disneyplus-clone-a8356",
  storageBucket: "disneyplus-clone-a8356.appspot.com",
  messagingSenderId: "872473927101",
  appId: "1:872473927101:web:f392a7a0b4a6f1a9eb46d4",
  measurementId: "G-D6SJMNNYQ2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
