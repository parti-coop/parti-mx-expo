import React from "react";
import { ViewStyle } from "react-native";

import { View } from "./View";

export function DotRed8(props: { style?: ViewStyle }) {
  return (
    <View
      style={[
        props.style,
        {
          width: 8,
          height: 8,
          backgroundColor: "#ff4848",
          borderRadius: 4,
        },
      ]}
    />
  );
}

export function DotMint4(props: { style?: ViewStyle }) {
  return (
    <View
      style={[
        props.style,
        {
          width: 4,
          height: 4,
          backgroundColor: "#12BD8E",
          borderRadius: 2,
        },
      ]}
    />
  );
}
