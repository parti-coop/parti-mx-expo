import * as admin from "firebase-admin";
import hasuraWebhook from "./components/hasuraWebhook";
import authCreate from "./components/authCreate";
admin.initializeApp();
export { hasuraWebhook, authCreate };
