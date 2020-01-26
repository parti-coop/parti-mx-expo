import * as firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJImw0nqvfEhKt9POJRuteOEVRXZyA27g",
  authDomain: "parti-2020.firebaseapp.com",
  databaseURL: "https://parti-2020.firebaseio.com",
  projectId: "parti-2020",
  storageBucket: "parti-2020.appspot.com",
  messagingSenderId: "959324853924",
  appId: "1:959324853924:web:0fdb1b2838fb9147b53831",
  measurementId: "G-84TGWTQ100"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();

export { auth };
