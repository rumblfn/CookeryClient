import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAlufOJnT7wYuIm3Sd6bm3aCsa38HGKIWQ",
  authDomain: "cookery-d67cf.firebaseapp.com",
  projectId: "cookery-d67cf",
  storageBucket: "cookery-d67cf.appspot.com",
  messagingSenderId: "730742650012",
  appId: "1:730742650012:web:f5ff79c95f6c959e7be959",
  databaseURL: "https://cookery-d67cf-default-rtdb.europe-west1.firebasedatabase.app",
  measurementId: "G-GY1FKZQB3K"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.database();
export const rootRef = db.ref('root');
export const chatsRef = rootRef.child('chats')