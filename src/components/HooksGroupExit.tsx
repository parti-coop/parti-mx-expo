import React from "react";
import { Alert } from "react-native";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { deleteUsersGroup } from "../graphql/mutation";
export default (group_id: number) => {
  const [{ user_id }, dispatch] = useStore();
  const [exit, { loading }] = useMutation(deleteUsersGroup, {
    variables: { group_id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  function showAlert() {
    return Alert.alert("그룹 탈퇴", "그룹을 나가시겠습니까?", [
      {
        text: "취소",
        style: "cancel"
      },
      {
        text: "나가기",
        onPress: () =>
          exit()
            .then(() => alert("탈퇴하였습니다."))
            .catch(console.error)
      }
    ]);
  }
  return showAlert;
};
