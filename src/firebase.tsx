type Modify<T, R> = Omit<T, keyof R> & R;
import { File } from "./types";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import uuid from "uuid";
// 패키징 할 때만 넣는다.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
// export async function signUpWithGoogle() {
//   try {
//     await GoogleSignIn.askForPlayServicesAsync();
//     const { type, user } = await GoogleSignIn.signInAsync();
//     if (type === "success") {
//       await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//       const credential = firebase.auth.GoogleAuthProvider.credential(
//         user.auth.idToken,
//         user.auth.accessToken
//       );
//       const googleProfileData = await auth.signInWithCredential(credential);
//       return googleProfileData;
//     }
//   } catch ({ message }) {
//     alert("login: Error:" + message);
//   }
// }
export async function uploadFileUUIDGetUrl(uri: string, dir: string) {
  const path = `${dir}/${uuid.v4()}`;
  console.log({ path });
  const res = await uploadImage(uri, path);
  return res.ref.getDownloadURL();
}
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
      "https://hasura.io/jwt/claims"?: {
        "x-hasura-allowed-roles": string[];
        "x-hasura-default-role": string;
        "x-hasura-user-id": string;
      };
    };
  }
>;

export async function getUserId(refresh = false): Promise<number | null> {
  const res: IdTokenResult = await auth.currentUser.getIdTokenResult(refresh);
  const string =
    res?.claims?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"];
  if (string === undefined) {
    return null;
  } else {
    return Number(string);
  }
}

export async function uploadGetUriArray(o: ImageInfo | File) {
  return new Promise(async function (res) {
    let uri = o.uri;
    if (uri.startsWith("file://")) {
      uri = await uploadFileUUIDGetUrl(o.uri, "posts");
    }
    return res({ ...o, uri });
  });
}
