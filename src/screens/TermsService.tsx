import React from "react";
import { WebView } from "react-native-webview";

import { ViewRow, V0, View } from "../components/View";
import { Text, Title30 } from "../components/Text";

import HeaderBack from "../components/HeaderBack";
export default () => {
  return (
    <>
      <HeaderBack />
      <ViewRow style={{ padding: 30, paddingTop: 6 }}>
        <Title30>이용약관</Title30>
      </ViewRow>
      <WebView
        source={{
          uri:
            "https://github.com/parti-coop/expo-2020/wiki/빠띠-2020-서비스-이용약관"
        }}
      />
    </>
  );
};
