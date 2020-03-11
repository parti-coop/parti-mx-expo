import * as firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
// 패키징 할 때만 넣는다.
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
const uploadImage = async (uri: string, path: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase
    .storage()
    .ref()
    .child(path);
  return ref.put(blob);
};
export { auth, uploadImage };
