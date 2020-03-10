import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast1")
  .https.onRequest((request: any, response: any) => {
    const authHeaders = request.get("Authorization");
    // Send anonymous role if there are no auth headers
    if (!authHeaders) {
      response.json({ "x-hasura-role": "anonymous" });
      return;
    } else {
      // Validate the received id_tokenolp;
      const idToken = extractToken(authHeaders);
      console.log(idToken);
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: any) => {
          console.log("decodedToken", decodedToken);
          const hasuraVariables = {
            "X-Hasura-User-Id": decodedToken.uid,
            "X-Hasura-Role": "user"
          };
          console.log(hasuraVariables); // For debug
          // Send appropriate variables
          response.json(hasuraVariables);
          return;
        })
        .catch((e: Error) => {
          // Throw authentication error
          console.log(e);
          response.json({ "x-hasura-role": "anonymous" });
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
