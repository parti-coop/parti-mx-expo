import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "node-fetch";
type UserRecord = admin.auth.UserRecord;

const query = `
mutation($email: String!, $uid: String!) {
  insert_mx_users_one(
    object: {
      email: $email
      firebase_uid: $uid
      name: $email
      groups: { data: [{ group_id: 5 }, { group_id: 25 }] }
    }
  ) {
    id
  }
}`;

export default functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    const { uid, email } = user;
    const variables = { uid, email };
    const res = await fetch(HASURA_GRAPHQL_ENGINE_URL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": ADMIN_SECRET,
        "x-hasura-use-backend-only-permissions": "true",
      },
    })
      .then((r) => r.json())
      .catch(console.error);
    const userId = res.data?.insert_mx_users_one?.id;
    let customClaims;
    if (user.email && user.email.indexOf("@parti.") !== -1) {
      customClaims = {
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-user-id": String(userId),
        },
      };
    } else {
      customClaims = {
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": String(userId),
        },
      };
    }
    // Set custom user claims on this newly created user.
    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .catch(console.error);
  });
