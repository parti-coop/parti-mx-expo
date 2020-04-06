import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { setOrganizer } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default (callback: () => void) => {
  const [{ group_id }, dispatch] = useStore();
  const [set, { loading }] = useMutation(setOrganizer);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  async function setAsOrganizer(user_id: number) {
    await set({
      variables: { group_id, user_id },
    });
    callback();
    showMessage({ type: "success", message: "오거나이저로 지정되었습니다" });
  }
  return setAsOrganizer;
};
