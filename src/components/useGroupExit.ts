import React from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";

import { useStore } from "../Store";
import { exitUsersGroup } from "../graphql/mutation";

export default function useGroupExit() {
  const [{ user_id, group_id }, dispatch] = useStore();
  const [exit, { loading, error }] = useMutation(exitUsersGroup, {
    variables: { group_id, user_id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  if (error) {
    console.log(error);
  }
  function exitGroup() {
    return Alert.alert("그룹 탈퇴", "그룹을 나가시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "나가기",
        onPress: () =>
          exit()
            .then(() =>
              showMessage({ type: "success", message: "탈퇴하였습니다." })
            )
            .catch(console.error),
      },
    ]);
  }
  return exitGroup;
}
