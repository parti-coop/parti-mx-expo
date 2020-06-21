import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
const mrkdwn = require("amo-html-to-mrkdwn");

import { GROUPS_ACCESS_TOKEN, SLACK_USER_TOKEN } from "../env";
const exampleBody = {
  token: "6yqrWvLm86oMPnMY69jIcCXs",
  team_id: "TUB3BHHKJ",
  api_app_id: "A014ZMLEMQU",
  event: {
    type: "link_shared",
    channel: "DUEQW2423",
    user: "UUF5PUFP0",
    event_ts: "1592698544.474776",
    thread_ts: "123456621.1855",
    message_ts: "1592702863.002900",
    links: [
      {
        domain: "parti.xyz",
        url: "https://union.parti.xyz/posts/34856",
      },
    ],
  },
  type: "event_callback",
  authed_users: ["U014LRSGGA2"],
  event_id: "Ev015BKLN9QF",
  event_time: 1592698544,
};
type Body = typeof exampleBody;

export default functions
  .region("asia-northeast1")
  .firestore.document("slackunfurl/{docId}")
  .onCreate(async function (snapshot, context) {
    const body = snapshot.data() as Body;
    const { channel, message_ts, links } = body.event;
    const Cookie = await fetch(
      "https://parti.xyz/mobile_app/sessions/restore?access_token=" +
        GROUPS_ACCESS_TOKEN,
      {
        redirect: "manual",
        headers: {
          "User-Agent": `" catanSparkIos/2`,
        },
      }
    ).then((_res) => {
      // console.info(JSON.stringify(_res));
      // if (!_res.ok) {
      //   throw new Error("parti groups login not successful");
      // }
      return _res.headers.raw()["set-cookie"];
    });
    // console.log(Cookie);
    async function fetchUrl(args: { url: string; domain: string }) {
      const { url } = args;
      const originalJS = await fetch(`${url}.js?assigns=`, {
        headers: {
          Cookie: Cookie.join(" "),
          Accept: `text/javascript`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }).then((_res) => {
        if (!_res.ok) {
          throw new Error("js fetch api not successful");
        }
        return _res.text();
      });
      const regex = /var \$post_dom = \$\('([\s\S]+)'\);[\s\n]+var \$target_dom/g;
      const matches = regex.exec(originalJS);
      if (matches === null || matches.length < 2) {
        throw new Error("problem with parti groups api");
      }
      const unescapedHtml2 = matches[1];
      const window = new JSDOM().window;
      const $ = require("jquery")(window);
      const $body = $("body");
      $body.html(
        unescapedHtml2.replace(/\\(["'/])/g, "$1").replace(/\\n/g, "")
      );
      $body
        .find(
          ".post-info, .control, .post-card__buttons, .clearfix, .comment-form, .tooltip-no-wrap, .btn, .writer, .post-reaction, .comment-line"
        )
        .remove();
      const escapedHtml = $body
        .html()
        .replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/g, "");
      const markdown = mrkdwn(escapedHtml);
      // console.log(markdown);
      return {
        [url]: {
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: markdown.text,
              },
            },
          ],
        },
      };
    }
    const urlBlocksArr = await Promise.all(links.map(fetchUrl));
    const aggregatedBlocks = urlBlocksArr.reduce(
      (prev, curr) => ({ ...prev, ...curr }),
      {}
    );

    const unfurlData = {
      channel,
      ts: message_ts,
      unfurls: aggregatedBlocks,
    };
    // console.log(unfurlData);
    const res = await fetch("https://slack.com/api/chat.unfurl", {
      method: "post",
      body: JSON.stringify(unfurlData),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${SLACK_USER_TOKEN}`,
      },
    });
    const json = await res.json();
    console.debug(json);
    if (json.ok === true) {
      await snapshot.ref.delete();
      return true;
    } else {
      throw new Error(json.error);
    }
  });
