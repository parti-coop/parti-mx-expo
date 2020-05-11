import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { View } from "./View";
import { White13 } from "./Text";
export default function ViewNewRed(props: { style?: StyleProp<ViewStyle> }) {
  const { style = {} } = props;
  return (
    <View
      style={[
        {
          width: 28,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#ff4848",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <White13
        style={{
          textAlign: "center",
          lineHeight: 18,
          fontFamily: "notosans500",
        }}
      >
        N
      </White13>
    </View>
  );
}
