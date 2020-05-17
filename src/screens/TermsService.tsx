import React from "react";
import { Linking } from "react-native";
import Markdown from "react-native-markdown-display";

import { ViewRow } from "../components/View";
import { Title30, Mint16 } from "../components/Text";
import HeaderBack from "../components/HeaderBack";
import { whiteRoundBg } from "../components/Styles";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";

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
      <KeyboardAwareScrollView
        style={[whiteRoundBg]}
        contentContainerStyle={{ padding: 30 }}
      >
        <Markdown
          style={{
            body: { fontSize: 16, color: "#555555" },
            heading2: { marginVertical: 20 },
            heading3: { marginTop: 10 },
            heading4: { marginTop: 10 },
          }}
        >
          {md}
        </Markdown>
      </KeyboardAwareScrollView>
    </>
  );
}
