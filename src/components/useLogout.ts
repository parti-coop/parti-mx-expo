import React from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

import { auth } from "../firebase";
import { useStore } from "../Store";

export default function useLogout() {
  const [, dispatch] = useStore();
  function handler() {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        onPress: async () => {
          dispatch({ type: "LOGOUT" });
          await auth.signOut();
          showMessage({ type: "success", message: "로그아웃 하였습니다." });
          dispatch({ type: "SET_LOADING", loading: false });
        },
      },
    ]);
  }
  return handler;
}
