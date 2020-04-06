import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { deleteUserGroup } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default () => {
  const [{ group_id }, dispatch] = useStore();
  const [set, { loading }] = useMutation(deleteUserGroup);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  async function handler(user_id: number) {
    await set({
      variables: { group_id, user_id },
    });
    showMessage({ type: "success", message: "탈퇴시켰습니다" });
  }
  return handler;
};
