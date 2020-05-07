import React from "react";
import { ScrollView, ViewStyle } from "react-native";

import { ViewRow } from "../components/View";
import { Title30 } from "../components/Text";
import Markdown from "react-native-markdown-display";
import HeaderBack from "../components/HeaderBack";
const box = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  padding: 30,
} as ViewStyle;
export default function TermsService() {
  const [md, setMd] = React.useState("");
  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/wiki/parti-coop/parti-mx/서비스-이용약관.md"
    )
      .then((res) => res.text())
      .then(setMd);
  }, []);
  return (
    <>
      <HeaderBack />
      <ViewRow style={{ padding: 30, paddingTop: 6 }}>
        <Title30>이용약관</Title30>
      </ViewRow>
      <ScrollView style={box}>
        <Markdown style={{ body: { fontSize: 16, color: "#555555" } }}>
          {md}
        </Markdown>
      </ScrollView>
    </>
  );
}
