import React from "react";
import { ViewStyle } from "react-native";

import { View } from "./View";

export function DotRed(props: { style?: ViewStyle; size?: number }) {
  const { style, size = 8 } = props;
  return (
    <View
      style={[
        style,
        {
          width: size,
          height: size,
          backgroundColor: "#ff4848",
          borderRadius: size / 2,
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
