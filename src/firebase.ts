import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcx_Q0v8LQl-BfYnJOjwJBgOt7T43K2uo",
  authDomain: "todo-ts-socket.firebaseapp.com",
  databaseURL: "https://todo-ts-socket.firebaseio.com",
  projectId: "todo-ts-socket",
  storageBucket: "todo-ts-socket.appspot.com",
  messagingSenderId: "1061609815730",
  appId: "1:1061609815730:web:a95f56303d38d618a813ab",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
