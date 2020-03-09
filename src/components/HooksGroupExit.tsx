import React from "react";
import { Alert } from "react-native";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { deleteUsersGroup, insertUserGroup } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default () => {
  const [{ user_id, group_id }, dispatch] = useStore();
  const [exit, exitO] = useMutation(deleteUsersGroup, {
    variables: { group_id, user_id }
  });
  const [join, joinO] = useMutation(insertUserGroup, {
    variables: { group_id, user_id }
  });
  React.useEffect(() => {
    const loading = exitO.loading || joinO.loading;
    dispatch({ type: "SET_LOADING", loading });
  }, [exitO.loading, joinO.loading]);
  function joinGroup() {
    join().then(()=> showMessage({ type: "success", message: "가입 하였습니다." }));
  }
  function exitGroup() {
    return Alert.alert("그룹 탈퇴", "그룹을 나가시겠습니까?", [
      {
        text: "취소",
        style: "cancel"
      },
      {
        text: "나가기",
        onPress: () =>
          exit()
            .then(() => showMessage({ type: "success", message: "탈퇴하였습니다." }))
            .catch(console.error)
      }
    ]);
  }
  return { exitGroup, joinGroup };
};
