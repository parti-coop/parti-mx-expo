import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { useStore } from "../Store";
import { deletePost } from "../graphql/mutation";

export default (id: number) => {
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [del, { loading }] = useMutation(deletePost, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  async function deleteHandler() {
    await del();
    showMessage({
      type: "success",
      message: "삭제 되었습니다",
    });
    goBack();
  }

  function showAlert() {
    return Alert.alert("제안 삭제", "삭제하겠습니까? 복구할 수 없습니다.", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: deleteHandler,
      },
    ]);
  }
  return [showAlert];
};
