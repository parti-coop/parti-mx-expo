import React from "react";
import { WebView } from "react-native-webview";
import { NavigationSwitchScreenProps } from "react-navigation";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  return <WebView source={{ uri: "https://expo.io" }} />;
};
