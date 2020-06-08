import * as functions from "firebase-functions";
import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "node-fetch";
import {
  Expo,
  ExpoPushMessage,
  ExpoPushTicket,
  ExpoPushReceipt,
  ExpoPushErrorReceipt,
} from "expo-server-sdk";

const expo = new Expo();

interface Payload {
  event: {
    session_variables: any;
    op: "INSERT" | "UPDATE" | "DELETE" | "MANUAL";
    data: {
      old: any;
      new: { id: number; title: string };
    };
  };
  created_at: "<timestamp>";
  id: string;
  trigger: {
    name: string;
  };
  table: {
    schema: string;
    name: string;
  };
}
interface QueryResult {
  data: {
    mx_posts_by_pk: {
      board: {
        type: "suggestion" | "vote" | "event" | "notice";
        group: {
          id: number;
          title: string;
          users: {
            user: { push_tokens: { token: string; created_at: string } };
          }[];
        };
      };
    };
  };
}
const query = `
query($post_id: Int!){
    mx_posts_by_pk(id: $post_id) {
      board {
        type
        group {
          id
          title
          users(where: {notification_type: {_in: ["all"]}}) {
            user {
              push_tokens
            }
          }
        }
      }
    }
  }`;

// Create the messages that you want to send to clients

export default functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    const body: Payload = req.body;
    const post_id = body.event.data.new.id;
    const postTitle = body.event.data.new.title;
    const variables = { post_id };
    const queryResult: QueryResult = await fetch(HASURA_GRAPHQL_ENGINE_URL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": ADMIN_SECRET,
        "x-hasura-use-backend-only-permissions": "true",
      },
    }).then((r) => r.json());
    const { board } = queryResult.data.mx_posts_by_pk;
    const group_id = board.group.id;
    const groupTitle = board.group.title;
    const boardType = board.type;
    let boardTypeStr = null;
    switch (boardType) {
      case "suggestion":
        boardTypeStr = "제안이";
        break;
      case "vote":
        boardTypeStr = "투표가";
        break;
      case "event":
        boardTypeStr = "모임이";
        break;
      case "notice":
        boardTypeStr = "공지가";
        break;
    }
    const tokensArr = board.group.users.map((u) => u.user.push_tokens.token);
    const tokensUniqueArr = [...new Set(tokensArr)];
    const messages: ExpoPushMessage[] = [];
    for (const pushToken of tokensUniqueArr) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: "default",
        body: `${postTitle}: ${groupTitle} 그룹에 새로운 ${boardTypeStr} 만들어졌습니다.`,
        data: { post_id, group_id, boardType },
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];
    await (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })();

    const receiptIds = [];
    for (const ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.status === "ok") {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    await (async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (const chunk of receiptIdChunks) {
        try {
          const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);

          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (const receiptId in receipts) {
            const { status }: ExpoPushReceipt = receipts[receiptId];
            if (status === "ok") {
              continue;
            } else if (status === "error") {
              const { details, message } = receipts[
                receiptId
              ] as ExpoPushErrorReceipt;
              console.error(
                `There was an error sending a notification: ${message}`
              );
              if (details && details.error) {
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications/#individual-errors
                // You must handle the errors appropriately.
                console.error(`The error code is ${details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
    res.send({ tickets });
  });
