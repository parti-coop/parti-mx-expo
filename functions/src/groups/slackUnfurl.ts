import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { SLACK_SIGNING_SECRET } from "../env";
import * as crypto from "crypto";
import { TextEncoder } from "util";
interface SlackBody {
  token: string;
  challenge: string;
  type: string;
}
const firestore = admin.firestore();
export default functions
  .region("asia-northeast1")
  .https.onRequest(slackLinkSharedEvent);

async function slackLinkSharedEvent(
  req: functions.https.Request,
  res: functions.Response<any>
) {
  const { challenge }: SlackBody = req.body;
  if (challenge) {
    //register for the first time
    console.log(req.headers);
    const timestamp = req.headers["x-slack-request-timestamp"];
    const slack_signature = req.headers["x-slack-signature"] as string;
    const timeDiff = Math.abs(new Date().getTime() / 1000 - Number(timestamp));
    if (timeDiff > 60 * 5) {
      console.error(timeDiff);
      throw new Error("more than 5 minutes difference");
    }
    const slackBody = req.rawBody?.toString();
    const sig_basestring: string = `v0:${timestamp}:${slackBody}`;
    const hmac = crypto.createHmac("sha256", SLACK_SIGNING_SECRET);
    hmac.update(sig_basestring);
    const my_signature = "v0=" + hmac.digest("hex");
    console.log(
      my_signature,
      slack_signature,
      slack_signature === my_signature
    );
    const enc = new TextEncoder();

    if (
      crypto.timingSafeEqual(
        enc.encode(my_signature),
        enc.encode(slack_signature)
      )
    ) {
      return res.status(200).send({
        challenge,
      });
    } else {
      return res.status(403);
    }
  } else {
    const { body } = req;
    await firestore.collection("slackunfurl").add(body);
    return res.status(200);
  }
}
