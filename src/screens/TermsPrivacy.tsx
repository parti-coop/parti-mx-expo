import React from "react";
import { WebView } from "react-native-webview";
import { NavigationSwitchScreenProps } from "react-navigation";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  return <WebView source={{ uri: "https://github.com/parti-coop/expo-2020/wiki/빠띠-2020-개인정보처리방침" }} />;
};
