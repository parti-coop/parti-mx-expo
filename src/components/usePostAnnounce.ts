import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { useStore } from "../Store";
import { announcePost } from "../graphql/mutation";

export default function usePostAnnounce(id: number) {
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [announce, { loading }] = useMutation(announcePost, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  async function handler() {
    await announce();
    showMessage({
      type: "success",
      message: "공지 했습니다",
    });
    goBack();
  }

  function showAlert() {
    return Alert.alert("공지", "공지 하겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "공지",
        onPress: handler,
      },
    ]);
  }
  return [showAlert];
}
