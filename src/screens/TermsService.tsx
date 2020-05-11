import React from "react";
import { ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

import { ViewRow } from "../components/View";
import { Title30 } from "../components/Text";
import HeaderBack from "../components/HeaderBack";
import { whiteRoundBg } from "../components/Styles";

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
      <ScrollView style={[whiteRoundBg, { padding: 30 }]}>
        <Markdown style={{ body: { fontSize: 16, color: "#555555" } }}>
          {md}
        </Markdown>
      </ScrollView>
    </>
  );
}
