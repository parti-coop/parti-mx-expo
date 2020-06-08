import React from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { useStore } from "../Store";
import { Alert1 } from "./Alert";
import { Whoami } from "../types";
import { whoami } from "../graphql/query";
import { updateNotificationToken } from "../graphql/mutation";
import useNavigateToPost from "./useNavigateToPost";
async function expoNotification() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  console.log({ existingStatus });
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  console.log({ finalStatus });
  if (finalStatus !== "granted") {
    return Alert1("Failed", "Failed to get push token for push notification!");
  }
  const token = await Notifications.getExpoPushTokenAsync();
  console.log({ token });
  return token;
}
export default function useNotification() {
  const [{ user_id }, dispatch] = useStore();
  const navigatePost = useNavigateToPost();
  React.useEffect(() => {
    const unsubscribe = Notifications.addListener((noti) => {
      if (noti.origin === "selected") {
        const { group_id, post_id, boardType } = noti.data || {};
        dispatch({ type: "SET_GROUP", group_id });
        navigatePost(boardType, post_id);
      }
    });
    return unsubscribe.remove;
  }, []);
  const { error, data, refetch } = useQuery<Whoami>(whoami, {
    variables: { id: user_id },
    fetchPolicy: "network-only",
  });
  const [update] = useMutation(updateNotificationToken);
  if (error) {
    console.log(error);
  }
  const pushToken = data?.mx_users_by_pk?.push_tokens;
  async function saveToken() {
    const token = await expoNotification();
    if (!token) {
      return console.log(token);
    }
    const res = await update({
      variables: {
        user_id,
        push_tokens: { created_at: new Date().toISOString(), token },
      },
    });
    if (res.data?.update_mx_users_by_pk?.push_tokens) {
      console.log(res.data?.update_mx_users_by_pk?.push_tokens);
      showMessage({ type: "success", message: "알림토큰을 저장했습니다." });
      try {
        refetch();
      } catch (error) {}
    } else {
      showMessage({ type: "info", message: "알림토큰 저장실패" });
    }
  }
  const save = React.useCallback(() => {
    if (pushToken && pushToken.token) {
      console.log(pushToken);
    } else {
      setTimeout(saveToken, 500);
      // saveToken();
    }
  }, [pushToken]);
  return [save];
}
