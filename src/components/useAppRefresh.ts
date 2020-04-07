import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { useStore } from "../Store";
export default function() {
  const [, dispatch] = useStore();
  function refreshApp() {
    Alert.alert(
      "앱 리로딩",
      `앱을 새로 다운받고 시작하시겠습니까?
          \n 현재 앱 버전: 4월 7일
          \n nativeBuildVersion: ${Constants.nativeBuildVersion}`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "reload",
          onPress: () => dispatch({ type: "APP_REFRESH" })
        }
      ]
    );
  }
  return refreshApp;
}
