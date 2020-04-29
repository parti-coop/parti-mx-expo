import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { useStore } from "../Store";
import { denouncePost } from "../graphql/mutation";

export default function usePostDenounce(id: number) {
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [denounce, { loading }] = useMutation(denouncePost, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  async function handler() {
    await denounce();
    showMessage({
      type: "success",
      message: "공지 내립니다",
    });
    goBack();
  }

  function showAlert() {
    return Alert.alert("공지 내림", "공지 내리시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "내림",
        onPress: handler,
      },
    ]);
  }
  return [showAlert];
}
