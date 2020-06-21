import * as functions from "firebase-functions";
// export const HASURA_GRAPHQL_ENGINE_URL = process.env.hasura.url;
// export const ADMIN_SECRET = process.env.hasura.secret;
interface Config extends functions.config.Config {
  hasura: {
    url: string;
    secret: string;
  };
  slack: {
    signing_secret: string;
    bot_token: string;
    user_token: string;
  };
  partigroups: {
    access_token: string;
  };
}
const config = functions.config() as Config;
export const HASURA_GRAPHQL_ENGINE_URL = config.hasura.url;
export const ADMIN_SECRET = config.hasura.secret;
export const SLACK_SIGNING_SECRET = config.slack.signing_secret;
export const GROUPS_ACCESS_TOKEN = config.partigroups.access_token;
export const SLACK_USER_TOKEN = config.slack.user_token;
export const SLACK_BOT_TOKEN = config.slack.bot_token;
