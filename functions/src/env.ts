import * as functions from "firebase-functions";
// export const HASURA_GRAPHQL_ENGINE_URL = process.env.hasura.url;
// export const ADMIN_SECRET = process.env.hasura.secret;
export const HASURA_GRAPHQL_ENGINE_URL = functions.config().hasura.url;
export const ADMIN_SECRET = functions.config().hasura.secret;
