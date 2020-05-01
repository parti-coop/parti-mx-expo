import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Alert2 } from "./Alert";

import { useStore } from "../Store";
import { setOrganizer } from "../graphql/mutation";
export default function useSetOrganizer(callback: () => void) {
  const [{ group_id }, dispatch] = useStore();
  const [set, { loading }] = useMutation(setOrganizer);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function alert(user_id: number) {
    Alert2(
      "오거나이저",
      "오거나이저로 지정하겠습니까?\n오거나이저는 당신과 동일한 권한을 가지게 됩니다.\n이 행동은 되돌릴 수 없습니다.",
      () => handler(user_id)
    );
  }
  async function handler(user_id: number) {
    await set({
      variables: { group_id, user_id },
    });
    callback();
    showMessage({ type: "success", message: "오거나이저로 지정되었습니다" });
  }
  return alert;
}
