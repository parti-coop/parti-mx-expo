import React from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";

import { Alert2 } from "./Alert";

import { useStore } from "../Store";
import { deleteUserGroup } from "../graphql/mutation";

export default function useUserGroupDelete(callback: () => void) {
  const [{ group_id }, dispatch] = useStore();
  const [set, { loading }] = useMutation(deleteUserGroup);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function alert(user_id: number) {
    Alert2("탈퇴", "탈퇴 시키겠습니까?", () => handler(user_id));
  }
  async function handler(user_id: number) {
    await set({
      variables: { group_id, user_id },
    });
    callback();
    showMessage({ type: "success", message: "탈퇴시켰습니다" });
  }
  return alert;
}
