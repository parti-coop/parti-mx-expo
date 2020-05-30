import * as admin from "firebase-admin";
// import hasuraWebhook from "./components/hasuraWebhook";
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
admin.initializeApp();
export { authCreate, authDelete };
