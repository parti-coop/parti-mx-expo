import * as admin from "firebase-admin";
// import hasuraWebhook from "./components/hasuraWebhook";
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
import notification from "./components/notification";
admin.initializeApp();
export { authCreate, authDelete, notification };
