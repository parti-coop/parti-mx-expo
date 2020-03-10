import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "node-fetch";
type UserRecord = admin.auth.UserRecord;
const query = `
mutation($email: String!, $name: String!, $uid: String!) {
  insert_parti_2020_users(
    objects: { email: $email, name: $name, firebase_uid: $uid }
  ) {
    returning {
      id
      token
    }
  }
}`;

export default functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate((user: UserRecord) => {
    const { uid, displayName, email } = user;
    const variables = { uid, name: displayName, email };
    return fetch(HASURA_GRAPHQL_ENGINE_URL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": ADMIN_SECRET
      }
    })
      .then(res => res.json())
      .then(console.log);
  });
