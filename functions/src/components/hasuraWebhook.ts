import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast1")
  .https.onRequest((request: functions.Request, response: any) => {
    let authHeaders = request.get("Authorization");
    // Send anonymous role if there are no auth headers
    if (!authHeaders) {
      return response.json({ "x-hasura-role": "anonymous" });
    } else {
      // Validate the received id_tokenolp;
      const idToken = extractToken(authHeaders);
      console.log(idToken);
      return admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: any) => {
          // console.log("decodedToken", decodedToken);
          const hasuraVariables = {
            "X-Hasura-User-Id": decodedToken.uid,
            "X-Hasura-Role": "user"
          };
          console.log(hasuraVariables); // For debug
          // Send appropriate variables
          return response.json(hasuraVariables);
        })
        .catch((e: Error) => {
          // Throw authentication error
          console.error(e);
          return response.json({ "x-hasura-role": "anonymous" });
        });
    }
  });

const extractToken = (bearerToken: any) => {
  const regex = /^(Bearer) (.*)$/g;
  const match = regex.exec(bearerToken);
  if (match && match[2]) {
    return match[2];
  }
  throw Error("Error 403 auth failed");
};
