type Modify<T, R> = Omit<T, keyof R> & R;

import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import * as GoogleSignIn from "expo-google-sign-in";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import uuid from "uuid";
// 패키징 할 때만 넣는다.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export async function signInWithGoogle() {
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type } = await GoogleSignIn.signInAsync();
    const data = GoogleSignIn.GoogleAuthentication.prototype.toJSON();
    if (type === "success") {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      const googleProfileData = await auth.signInWithCredential(credential);
      return googleProfileData;
    }
  } catch ({ message }) {
    alert("login: Error:" + message);
  }
}
export const uploadFileUUID = async (uri: string, dir: string) => {
  const path = `${dir}/${uuid.v4()}`;
  console.log({ path });
  return uploadImage(uri, path);
};
export const uploadImage = async (uri: string, path: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child(path);
  return ref.put(blob);
};
export const Firebase = firebase;
export type IdTokenResult = Modify<
  firebase.auth.IdTokenResult,
  {
    claims: {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": string[];
        "x-hasura-default-role": string;
        "x-hasura-user-id": string;
      };
    };
  }
>;
