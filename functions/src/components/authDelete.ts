import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "node-fetch";
type UserRecord = admin.auth.UserRecord;

const query = `
mutation($uid: String!) {
  update_mx_users_group(where:{user:{firebase_uid:{_eq: $uid}}},_set:{status:"exit"}){
    affected_rows
  }
}`;

export default functions
  .region("asia-northeast1")
  .auth.user()
  .onDelete(async (user: UserRecord) => {
    const { uid } = user;
    const variables = { uid };
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
    if (res.data?.update_mx_users_group?.affected_rows > 0) {
      console.log("success");
    } else {
      console.log(
        "affected_rows: " + res.data?.update_mx_users_group?.affected_rows
      );
    }
  });
