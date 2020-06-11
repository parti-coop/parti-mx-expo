import React from "react";
import { ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

import { ViewRow } from "../components/View";
import { Title30, Body16 } from "../components/Text";
import HeaderBack from "../components/HeaderBack";
import { whiteRoundBg } from "../components/Styles";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";

export default function TermsPrivacy() {
  return (
    <>
      <HeaderBack />
      <ViewRow style={{ padding: 30, paddingTop: 6 }}>
        <Title30>없는 화면</Title30>
      </ViewRow>

      <KeyboardAwareScrollView
        style={[whiteRoundBg]}
        contentContainerStyle={{ padding: 30 }}
      >
        <Body16>찾으시는 게시물이 지워졌거나 권한이 없습니다.</Body16>
      </KeyboardAwareScrollView>
    </>
  );
}
